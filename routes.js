const fs = require('fs');

function requestHandler(req, res){
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        
        res.setHeader('ContentType', 'text/html');
        res.write('<html>');
        res.write('<head> <title> Enter message </title> </head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" ><button>Send</button type="submit"></form></body>');
        res.write('</html>');
       return res.end();
    }
    if(method==="POST" && url==="/message"){
        const body=[];
        req.on('data', function (chunk){
            body.push(chunk);
            console.log(chunk);
        })
       return req.on('end', function (){
            const parsedBody=Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFile('message.txt', message, function err(){
                res.statusCode=302;
                res.setHeader('Location', '/');
               return res.end();
            });
        
        });
          
    }
    res.setHeader('ContentType', 'text/html');
    res.write('<html>');
    res.write('<head> <title> My First Page </title> </head>');
    res.write('<body><h1> Hello from my first Node.js Server </h1></body>');
    res.write('</html>');
    res.end();
    //process.exit();

    server.listen(3000);
};

exports.handler = requestHandler;
exports.someText= "Some text";



