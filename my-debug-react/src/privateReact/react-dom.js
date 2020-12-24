//
let wipRoot = null;

function render(vnode, container) {
  wipRoot = {
    type: "div",
    props: { children: { ...vnode } },
    stateNdoe: container,
  };
  nextUnitOfWork = wipRoot;
}

function isStringOrNumber(v) {
  return typeof v === "string" || typeof v === "number";
}

function updateNode(node, props) {
  Object.keys(props).forEach((k) => {
    if (k === "children") {
      if (isStringOrNumber(props[k])) {
        console.log("-----", props[k]);
        node.textContent = props[k] + "";
      }
    } else {
      node[k] = props[k];
    }
  });
}

function createNode(workInProgress) {
  const { type, props } = workInProgress;
  const node = document.createElement(type);
  updateNode(node, props);
  return node;
}

function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) return;

  const newChildren = Array.isArray(children) ? children : [children];

  let previousFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];

    let fiberNode = {
      type: child.type,
      props: { ...child.props },
      child: null,
      sibling: null,
      return: workInProgress,
      stateNode: null,
    };

    if (i === 0) {
      workInProgress.child = fiberNode;
    } else {
      previousFiber.sibling = fiberNode;
    }
    previousFiber = fiberNode;
  }
}

function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNdoe) {
    workInProgress.stateNdoe = createNode(workInProgress);
  }
  // 协调子节点
  console.log("workInProgress", workInProgress, workInProgress.props.children);
  reconcileChildren(workInProgress, workInProgress.props.children);
}

function updateClassComponent(workInProgress) {}

function updateFunctionComponent(workInProgress) {}

//* fiber属性
// type 类型
// key 标记当前层级下的唯一性
// props 属性
// ! child 第一个子节点
// ! sibling 下一个兄弟节点
// ! return 父节点（暂时）
// stateNode 原生标签的就是dom节点，Fragment和函数组件的没有，类组件的是实例，
// index 是个数字，从0开始，标记当前层级下的位置

let nextUnitOfWork = null;
// 更新fiber任务
function performUnitOfWork(workInProgress) {
  // 根据fiber任务类型不同进行更新
  const { type } = workInProgress;
  if (typeof type === "string") {
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  }

  // 返回下一个要更新的fiber任务
  if (workInProgress.child) {
    return workInProgress.child;
  }

  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function wookLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 返回下一个fiber任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  requestIdleCallback(wookLoop);

  // 更新dom节点
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(workInProgress) {
  if (!workInProgress) return;

  let parentNodeFiber = workInProgress.return;
  while (!parentNodeFiber.stateNdoe) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNdoe;

  if (workInProgress.stateNdoe) {
    parentNode.appendChild(workInProgress.stateNdoe);
  }

  commitWork(workInProgress.child);
  commitWork(workInProgress.sibling);
}

requestIdleCallback(wookLoop);

// eslint-disable-next-line import/no-anonymous-default-export
export default { render };
