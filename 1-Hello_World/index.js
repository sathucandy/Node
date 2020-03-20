const fs = require('fs');

const hello = 'Hello World';
console.log(hello);

// Blocking Synchronus Way

// const textIn = fs.readFileSync('./file.txt', 'utf-8');
// console.log(textIn);

// const textOut = `${textIn} This is extra string at the end of the text added on date ${Date.now()}`;
// fs.writeFileSync('./file.txt', textOut);
// console.log('File Written');

// Non-Blocking Asynchronus Way
fs.readFile('./file.text', 'utf-8' ,(err, data) => {
    console.log(data)
})

console.log('Will read file');