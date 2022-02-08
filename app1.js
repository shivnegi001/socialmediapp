// console.log("Process :",process); 
// const {sum} = require("./helpers");
// const http = require('http');

// const total = sum(2,3);

// const server = http.createServer((req,res)=>{
//     res.end('hellow world from node JS')
// })

// server.listen(5000);

// console.log("Total : ",total);

const fs = require("fs");
const fileName = "target.txt";

// fs.watch(fileName,()=> console.log('File Changed'))

// synchronise approach

// const data = fs.readFileSync(fileName)
// console.log(data.toString())
// console.log('node is async programming');


//asynchrnoise approach
// fs.readFile(fileName, (err, data) => {
//     if(err) console.log(err);
//     console.log(data.toString());
// })
// setTimeout(()=>{
//     for(let i=1;i<=10;i++){
//         console.log(i);
//     }
// },1)
// console.log('node is async programming');


//asynchrnoise approach with simple code

const errHandler = err => console.log(err);
const dataHandler = data => console.log(data.toString());

fs.readFile(fileName, (err,data)=>{
    if(err) errHandler(err)
    dataHandler(data)
})

console.log('node is async programming');



