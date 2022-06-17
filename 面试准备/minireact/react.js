const Didact = {
  createElement,
  render,
};

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

function render(element, container) {
  // ! fiber 架构
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 是旧纤程的链接，即我们在前一个提交阶段提交给 DOM 的纤程。
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}
// ! 并发模式
/**
 * 如果元素树很大，可能会阻塞主线程太久。
 * 如果浏览器需要做高优先级的事情，比如处理用户输入或保持动画流畅，它必须等到渲染完成。
 * 所以我们将把工作分解成小单元，在我们完成每个单元后，
 * 如果还有其他事情需要做，我们会让浏览器中断渲染。
 */
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = [];

function wookLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  shouldYield = deadline.timeRemaining() < 1;

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(wookLoop);
}

requestIdleCallback(wookLoop);

// 执行工作并返回下一个工作节点
function performUnitOfWork(fiber) {
  const isFunctionComponent =
    typeof fiber.type === "function"
      ? updateFunctionComponent(fiber)
      : updateHostComponent(fiber);

  // 寻找下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // create new fiber
  const elements = fiber.props.children;
  // 协调
  reconcileChildren(fiber, elements);
}

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function reconcileChildren(wipFiber, children) {
  let index = 0;
  let prevSibling = null;
  // 迭代alternate的子元素
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  while (index < children.length || !!oldFiber) {
    const element = children[index];
    const sameType = oldFiber && element && oldFiber.type === element.type;
    let newFiber = null;
    /**compare
         * 如果旧的 Fiber 和新的元素具有相同的类型，
         * 我们可以保留 DOM 节点并使用新的 props 更新它

        如果类型不同并且有新元素，则意味着我们需要创建一个新的 DOM 节点

        如果类型不同并且有旧光纤，我们需要删除旧节点
         */
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: oldFiber.props,
        parent: wipFiber, // 父节点
        dom: oldFiber.dom, // 原生标签
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      // 数组来跟踪我们想要删除的节点。
      deletions.push(oldFiber);
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber);

  return dom;
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT" && !!fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION" && !!fiber.dom) {
    domParent.removeChild(fiber.dom);
  }

  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateDom(dom, prevProps, nextProps) {
  const isEvent = (key) => key.startsWith("on");
  const isProperty = (key) => key !== "children" && !isEvent(key);
  const isGone = (prev, next) => (key) => !(key in next);

  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      if (isEvent(key)) {
        const eventType = name.substring(2).toLowerCase();
        dom.removeEventListener(eventType, prevProps[name]);
      } else {
        dom[name] = "";
      }
    });

  Object.keys(nextProps)
    .filter(isProperty)
    .filter((key) => prevProps[key] !== nextProps[key])
    .forEach((name) => {
      if (isEvent(name)) {
        const eventType = name.substring(2).toLowerCase();
        dom.addEventListener(eventType, nextProps[name]);
      } else {
        dom[name] = nextProps[name];
      }
    });
}
