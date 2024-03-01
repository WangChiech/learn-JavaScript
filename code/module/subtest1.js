var b7 = 'subTest var b5'
let b8 = 'subTest let b6'
const m = 'subTest1'
setTimeout(() => console.log('subtest1 inner setTimeout'))
Promise.resolve('subtest1 resolve').then(res => console.log(res))
console.log('subtest1')
debugger
