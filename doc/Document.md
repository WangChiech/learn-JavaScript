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

## 样式

`element.style` 是只读的对象

**重制 style**
- `element.style.cssText = strings`：用 strings 对整个 style 重写
- `element.setAttribute('style', strings)`：用 strings 对整个 style 重写

**`getComputedStyle(element[, pseudo])`**

读取已经完成 计算(computed)、解析(resolved)的样式，pseudo 指定伪元素，默认为 element 自身

返回只读对象

## class

`element.className`：返回 element 的类名集合组成的字符串

`element.classList`：获取 element 类名组成的 iterator 对象
  - `element.classList.add(class)`：添加类
  - `element.classList.remove(class)`：移除类
  - `element.classList.toggle(class)`：类存在就删除，不存在就添加
  - `element.classList.contains(class)`：类存在返回 true