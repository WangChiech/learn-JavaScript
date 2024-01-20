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