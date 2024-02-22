# Number

## 属性

### MAX_VALUE

```
function getMaxVal() {
  const maxValStr = '1.'.padEnd(54, 1)
}
```
## parseInt()

将指定字符串以指定的基数解析成 10 进制数字

```
parseInt(string, radix) 
Number.parseInt === parseInt // true
```

- 若第一个参数为 number 类型，则直接返回其对应十进制值的字符串
- 第二个参数 radix 范围为 [2, 36]，默认为 10

## parseFloat()

## isFinite()

## isNaN()

## isInteger()

## isSafeInteger()

## prototype

### toString(radix)

重写了 `Object.prototype.toString`，返回当前数字指定基数的字符串。

```
1..toString(radix) // radix 范围 [2, 36]，默认 10
```


## 参考

[数字类型-js_info](https://zh.javascript.info/number)