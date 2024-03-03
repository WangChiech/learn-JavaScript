
export * from './subIndex.js'

export var a = 'a value'
var b = 'b value'
function f() {
  console.dir(f)
  console.dir(fn)
  console.log(a, b)
}
const fn = () => {}
export default a
export {
  b,
  f,
  fn
}