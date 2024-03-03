# Promise 实现

- 一个类，本质上是一个**代码执行器**，将代码执行相关信息维护到实例化的对象上
- 对象实例内部存储了状态、结果(成功/失败)、成功的回调队列、失败的回调队列
- 对象实例上有 `then() catch() finally()` 方法

```
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  status = PENDING
  value = null
  reason = null
  successCallbackList = []
  failCallbackList = []
  constructor(ctor) {
    try {
      ctor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve(v) {
    if (this.status !== PENDING) return
    this.value = v
    this.status = FULFILLED
    while (this.successCallbackList.length) this.successCallbackList.shift()()
  }
  reject(v) {
    if (this.status !== PENDING) return
    this.reason = v
    this.status = REJECTED
    while (this.failCallbackList.length) this.failCallbackList.shift()()
  }
  then(successCallback, failCallback) {
    const thenRPromise = new myPromise((resolve, reject) => {
      successCallback = typeof successCallback !== 'function'
        ? () => this.value: successCallback
      failCallback = typeof failCallback !== 'function'
        ? () => { throw this.reason } : failCallback
      // status -> FULFILLED
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const res = successCallback(this.value)
            handleThenRes(res, thenRPromise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      // status -> REJECTED
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const res = failCallback(this.reason)
            handleThenRes(res, thenRPromise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      // status -> PENDING
      if (this.status === PENDING) {
        this.successCallbackList.push(() => setTimeout(() => {
          try {
            const res = successCallback(this.value)
            handleThenRes(res, thenRPromise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }))
        this.failCallbackList.push(() => setTimeout(() => {
          try {
            const res = failCallback(this.reason)
            handleThenRes(res, thenRPromise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }))
      }
    })
    return thenRPromise
  }
}
function handleThenRes(res, thenRPromise, resolve, reject) {
  if (res === thenRPromise) throw 'find promise chain cycle'
  if (res instanceof myPromise) {
    res.then(resolve, reject)
  } else {
    resolve(res)
  }
}
```

## 应用
**手动触发**

sleep、halk函数
```
const engine = (cb) => {
  let _resolve;
  new Promise((resolve, reject) => {
    _resolve = resolve;
  }).then(res => {
    cb()
  })

  return {
    start: () => {
      _resolve()
    }
  }
}

let e = engine(() => {
  console.log("engine")
})

e.start()
```

**链式执行**

100 个 promise，10 个先执行，每 resolve 一个，加一个进去，形成 stream
```
const promiseArrGenerator = (num) => new Array(num).fill(0)
  .map((item, index) => () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index)
    }, Math.random() * 1000)
  })
)

let arr = promiseArrGenerator(100);

// arr.map((fn) => {
//     fn().then(console.log)
// })
// Promise.all(arr.map(fn => fn())).then(res => console.log(res))

// 设计一个 promise Chain 链式调用

const promiseChain = (arr) => {
  arr.reduce((proChain, pro) => proChain.then(res => {
    ~res && console.log(res);
      return pro()
  }), Promise.resolve(-1))
}

promiseChain(arr)
```