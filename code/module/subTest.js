var b5 = 'subTest var b5'
let b6 = 'subTest let b6'
const m = 'subTest'
setTimeout(() => console.log('subTest inner setTimeout'))
Promise.resolve('subTest resolve').then(res => console.log(res))
console.log('subTest')
debugger