const http = require('http');
const file = require('fs');
const url = require('url');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-type': 'text/html',
    });

    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' id='inp' name = 'message' placeholder='please enter your message bellow'>\n");
    res.write("<input type='submit' name='submit' placeholder='Submit'>");
    res.write("</form>");

    const text = file.readFile('new.txt','utf-8',(err,data)=>{
// console.log('o ti ka data');
        file.writeFile('message.txt', `${data}`, 'utf-8', err=>{
            console.log('writting the file');
        });
    });
    

    // const userMsg = file.readFileSync('message','utf-8');
    // const userMsg = "This is the first user message";
    // file.writeFileSync('message.txt', userMsg);
    
   
   return res.end();

   
});


server.listen(8080, 'localhost', ()=>{
    console.log('server is listnening at port 8080');
});