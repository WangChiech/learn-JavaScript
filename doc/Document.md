# Document

### 创建节点

- `document.createElement(tag)`：用给定标签创建一个元素节点
- `document.createTextNode(value)`：创建一个文本节点
- `element.cloneNode(deep)`：克隆元素，deep => true/false
- `parent.appendChild(node)`

### 插入节点
- `node.append(...nodes or strings)`：在 node 最后一个子元素后插入
- `node.prepend(...nodes or strings)`：在 node 第一个子元素前插入
- `node.before(...nodes or strings)`：在 node 之前插入
- `node.after(...nodes or strings)`：在 node 之后插入
- `parent.insertBefore(node, nextSibling)`

### 替换节点
- `node.replaceWith(...nodes or string)`：替换 node
- `parent.replaceChild(newElem, node)`

### 移除节点
- `node.remove()`：移除节点
- `parent.replaceChild(node)`

### `insertAdjacentHTML/Text/Element`
- `element.insertAdjacentHTML(where, html)`
  - where => `beforebegin`：将 html 插入 element 之前
  - where => `afterbegin`：将 html 插入 element 第一个子元素之前
  - where => `beforeend`：将 html 插入到 element 最后一个子元素之后
  - where => `afterend`：将 html 插入到 element 之后