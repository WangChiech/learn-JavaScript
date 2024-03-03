# script 之 defer、async、module

每个 script 脚本都将作为一个**独立的宏任务**

所有 script(非 `type="module"`) 代码处于顶层作用域，**Script -> Global**

script(非 `type="module"`) 顶层 `let const` 与 `{}` 构成的作用域 **Block -> Script -> Global**，代码块执行完毕后 **Block** 销毁

## async、defer 执行时序问题
async 、defer 脚本经过各种测试（chrome 环境）
1. 两者都是在后台异步下载，下载不会阻塞主线程
2. 两者执行都是在 DOM 解析完成之后执行
3. defer 脚本是在 DOMContentLoaded 事件触发之前执行
4. async 脚本是可以在 DOMContentLoaded 事件触发之前或之后执行，但一定是在 window.onload 之前执行
5. 两者均只对外联脚本有效(async 对 `type="module"` 的内联脚本有效)

结论：猜测应该是是浏览器在对 ECMAScript 标准进行实现的时候做了优化



## `type="module"`
- 每个 script(`type="module"`) 中的 import 链上的所有文件代码整体作为一个宏任务执行
- 形成独立的作用域 **Module -> Script -> Global**
- 作为独立 module 文件的代码执行完后，其相关作用域 Module 会销毁（因此需要 `import...from..` 与 `export..`）
- script 脚本默认为 defer
- module 语法只能通过 `http(s)` 协议打开文件生效，`file://` 协议打开时 `import/export` 指令不生效
- module 中的代码处于**严格模式**
- 每个 module 文件代码，多次导入只会执行一次(包含不同 script 中分别导入的情况),只有在第一次导入时被执行
  ```html
  <!-- 脚本 my.js 被加载完成（fetched）并只被运行一次 -->
  <script type="module" src="my.js"></script>
  <script type="module" src="my.js"></script>
  ```
- module 模式导入 `另一个源` 的代码，需要支持 cors
  ```html
  <!-- another-site.com 必须提供 Access-Control-Allow-Origin -->
  <!-- 否则，脚本将无法执行 -->
  <script type="module" src="http://another-site.com/their.js"></script>
  ```