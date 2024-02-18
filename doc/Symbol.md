# 内置对象 Symbol

## 创建 symbol 类型数据

语法

```
Symbol([description]) // description 仅为 symbol 值的描述，作为标识，方便调试
```

```
Symbol() // description: undefined

Symbol(undefined) // description: undefined

Symbol(null) // description: 'null'

Symbol(1) // description: '1'

Symbol([1, 'a']) // description: '1,a'
```

```
new Symbol() // Uncaught TypeError: Symbol is not a constructor
```

## 属性

**Symbol.asyncIterator**

指定一个默认异步迭代器，可用于`for await...of`

**Symbol.species**

在类中使用，用于覆盖子类中的默认构造器(用类 A 扩展内建类 Array，A 实例的 map 等方法返回的新实例对象由子类 A 的构造器生成，若想使用其他构造器则使用 `Symbol.species`)

```
class mArray extends Array {}
class mArray1 extends Array {
  static get [Symbol.species] () {
    return Array
  }
}
const arr = new mArray
const arr1 = new mArray1
const subArr = arr.map(item => item)
const subArr1 = arr1.map(item => item)

console.log(arr.constructor === mArray) // true
console.log(arr1.constructor === mArray1) // true
console.log(subArr.constructor === mArray) // true
console.log(subArr1.constructor === mArray1) // false
console.log(subArr1.constructor === Array) // true
```

**Symbol.hasInstance**

`class` 类函数内部若含有 `Symbol.hasInstance`，则在使用 `instanceof` 时，首先调用此方法。[instanceof](https://zh.javascript.info/instanceof)

```
class Cls {}
class Cls1 {
  static [Symbol.hasInstance]() {
    return false
  }
}
function Fn() {}
function Fn1() {}
Fn1[Symbol.hasInstance] = function() { // 不生效
  return false
}

const insCls = new Cls
const insCls1 = new Cls1
const insFn = new Fn
const insFn1 = new Fn1

console.log(insCls instanceof Cls) // true
console.log(insCls1 instanceof Cls1) // false
console.log(insFn instanceof Fn) // true
console.log(insFn1 instanceof Fn1) // true
```

**Symbol.toStringTag**

自定义 `Object.prototype.toString()` 的行为。

```
function fn() {}
function fn1() {}
fn1[Symbol.toStringTag] = 'fn1'

console.log(fn.toString()) // 'function fn() {}'
console.log(fn1.toString()) // 'function fn1() {}'
console.log(Object.prototype.toString.call(fn)) // '[object Function]'
console.log(Object.prototype.toString.call(fn1)) // '[object Fn1]'
```