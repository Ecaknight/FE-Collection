import { Deletion, Placement, Update } from "./const";

let wipRoot = null; // 根节点 工作中的任务 fiber结构
let wipFiber = null; // 当前工作的fiber
let currentRoot = null;
let deletions = [];

function render(vnode, container) {
  wipRoot = {
    type: "div",
    props: { children: { ...vnode } },
    stateNode: container,
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}

function isStringOrNumber(str) {
  return typeof str === "string" || typeof str === "number";
}

// 根据vnode创建node
function createNode(workInProgress) {
  const { type, props } = workInProgress;
  const node = document.createElement(type);
  updateNodeProps(node, {}, props);
  return node;
}

// 更新原生标签
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  reconcileChildren(workInProgress, workInProgress.props.children);
}

function updateNodeProps(node, prevProps, props) {
  Object.keys(prevProps).forEach((k) => {
    if (k === "children") {
      if (isStringOrNumber(prevProps[k])) {
        // 更新文本
        node.textContent = "";
      }
    } else if (k.slice(0, 2) === "on") {
      const eventName = k.slice(2).toLocaleLowerCase();
      node.removeEventListener(eventName, prevProps[k]);
    } else {
      if (!(k in props)) {
        node[k] = "";
      }
    }
  });

  Object.keys(props).forEach((k) => {
    if (k === "children") {
      if (isStringOrNumber(props[k])) {
        // 更新文本
        node.textContent = props[k];
      }
    } else if (k.slice(0, 2) === "on") {
      // 粗暴点
      const eventName = k.slice(2).toLocaleLowerCase();
      node.addEventListener(eventName, props[k]);
    } else {
      node[k] = props[k];
    }
  });
}

function updateClassComponent(workInProgress) {
  const { type, props } = workInProgress;
  const instance = new type(props);
  const child = instance.render();

  reconcileChildren(workInProgress, child);
}

function updateFunctionComponent(workInProgress) {
  wipFiber = workInProgress;
  wipFiber.hooks = [];
  wipFiber.hooksIndex = 0;

  const { type, props } = workInProgress;
  const child = type(props);
  reconcileChildren(workInProgress, child);
}

function updateFramgeComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 协调子节点
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) return;

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // 构建fiber结构
    let newFiber = null;
    let same = child && oldFiber && child.type === oldFiber.type;

    if (same) {
      // 更新 - 复用子字节
      newFiber = {
        key: child.key || null,
        type: child.type,
        props: { ...child.props },
        child: null,
        sibling: null,
        return: workInProgress,
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update,
      };
    }

    if (!same && child) {
      // 新增
      newFiber = {
        key: null,
        type: child.type,
        props: { ...child.props },
        stateNode: null,
        child: null,
        sibling: null,
        return: workInProgress,
        alternate: null,
        flags: Placement,
      };
    }

    if (!same && oldFiber) {
      // 删除
      oldFiber.flags = Deletion;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      // 获取下一个oldFiber
      oldFiber = oldFiber.sibling;
    }

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

// * fiber
// * type 类型  key 当前层级的唯一性  props 属性
// child 第一个子节点 sibling 下一个兄弟节点 return 父节点（暂时—）
// stateNode 原生标签的dom节点， Fragment和函数组件没有，类组件的实例
// index 数字，从0开始，标记当前层级的位置

let nextUnitOfWork = null; // 下一个任务 fibwer

function performUnitOfWork(workInProgress) {
  // 更新fiber任务
  const { type } = workInProgress;
  if (typeof type === "string") {
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateFramgeComponent(workInProgress);
  }

  // console.log('workInProgress', workInProgress)
  // 返回下一个更新的任务

  // * 先子节点
  if (workInProgress.child) {
    return workInProgress.child;
  }

  let nextFiber = workInProgress;
  // * 再兄弟节点
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // commit
  if (!nextUnitOfWork && wipRoot) {
    // 把fiber更新到根节点中，其实就是把vnode->node
    commitRoot();
  }
  // 可能还得进来， 类似监听，如果还有中断的任务，需要恢复
  requestIdleCallback(workLoop);
}

function commitRoot() {
  // 将vnode-》node展示
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(workInProgress) {
  if (!workInProgress) return;
  let parentNodeFiber = workInProgress.return;
  // 找到父节点的原生节点，如果没有就往上找
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;

  // 新增 插入
  if (workInProgress.flags & Placement && workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flags & Update && workInProgress.stateNode) {
    updateNodeProps(
      workInProgress.stateNode,
      workInProgress.alternate.props,
      workInProgress.props
    );
  } else if (workInProgress.flags & Deletion && workInProgress.stateNode) {
    commitDeletions(workInProgress, parentNode);
  }
  // 提交子节点和兄弟节点
  commitWork(workInProgress.child);
  commitWork(workInProgress.sibling);
}

function commitDeletions(workInProgress, parentNode) {
  if (workInProgress.stateNode) {
    parentNode.removeChild(workInProgress.stateNode);
  } else {
    commitDeletions(workInProgress.child, parentNode);
  }
}

// 空闲时间调用
requestIdleCallback(workLoop);

// hook api
export function useState(init) {
  // 找到老的hook
  console.log('wip', wipFiber.hooksIndex)
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks[wipFiber.hooksIndex]; // 这里出了问题，hookIndex取值有问题

  const hook = oldHook
    ? { state: oldHook.state, queue: oldHook.queue }
    : { state: init, queue: [] };

  hook.queue.forEach((action) => {
    console.log('sta', action)
    hook.state = action
  });

  const setState = (action) => {
    console.log("ddd", action);
    hook.queue.push(action);
    wipRoot = {
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  wipFiber.hooksIndex++;

  return [hook.state, setState];
}

const obj = { render };
export default obj;
