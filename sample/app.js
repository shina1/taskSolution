// const path = require('path');
const http = require('http');
const { parse } = require('querystring');
const file = require('fs');

const newData = JSON.parse(
    file.readFileSync(`${__dirname}/app.json`));
const server = http.createServer((req,res)=>{
     // i first check if its a pst request once a user click on the submit button.
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            const newMessage = newData[newData.length -1].name + 1;
            const appendMessage = Object.assign({name : newMessage}, result) 
           newData.push(appendMessage);
        //    console.log(newData);
           file.writeFile(`${__dirname}/app.json`, JSON.stringify(newData), err => {
           
            res.json({
                status : "success",
                data : {
                    appendMessage
                }
            })
           });
            res.end(`Parsed data belonging to ${result.uName}`);
        });
    }else{
 
    res.end(`
    <!doctype html>
            <html>
            <body>
                <form action="/" method="post" style='margin: 0 auto; width:350px; height:450px; border: 1px solid grey; border-radius:10px; padding:30px;'>
                    <div style='text-align:center; margin-top:30px;'>
                        <input type="text" name="uName" placeholder='please enter yout name' style='width:70%; padding:5px;' /><br /> <br />
                        <input type="text" name="message" placeholder='please enter yout message' style='width:70%;padding:10px;' /><br /> <br />
                        <button style='width:70%; padding:15px;border:none; border-radius:15px; background:#2D314D; color:#fff;font-size:20px;font-weight:300;'>Save</button>
                    </div>
                </form>
            </body>
            </html>
    `);
    }
});
function collectRequestData(request,callback){
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
      
    if(request.headers['content-type'] === FORM_URLENCODED){
        // i will now handle the post stuff
        //note that request sent to the bsckend is a readable stream, eventEmmiter API is used to read data off this stream.
        //we dont need to import any even module cos since the request object extends event emmiters
        let body = '';
        request.on('data', chunk=>{
            body += chunk.toString() //converting buffer to string.
        });
        // now i will use node's inbuilt queryString module to convert data to object
        request.on('end', ()=>{
            callback( parse(body));
        });

    }else{
        callback(parse(null));
    }

}

server.listen(5050, 'localhost', ()=>{
    console.log('server is listnening at port 5050');
});
