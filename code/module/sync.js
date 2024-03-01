time = Date.now()
while(Date.now() - time < 1000) {}
debugger
console.log(2, ' sync.js executed', document.readyState)

s = document.createElement('script')
time = Date.now()
while(Date.now() - time < 1000) {}
s.src = './append.js'


document.body.append(s)

document.body.append(s)
document.body.append(s)
document.body.append(s)
document.body.append(s)
document.body.append(s)
document.body.append(s)
document.body.append(s)
document.body.append(s)


console.log('append parent')
