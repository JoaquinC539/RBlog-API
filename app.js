'use strict'
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const app=express();
const routes=require('./routes/routes');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Express server
const serverCreate=(port)=>{
    app.listen(port,()=>{
        console.log("Server Started at port: "+port);
    })
}

//Routes
app.use('/api',express.static(path.join(__dirname,'views')))
app.use('/api',routes)
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){

        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
    res.json({message:"404 Not Found"})
    } else{ res.type('txt').send('404 Not Found')}
})



module.exports={app,serverCreate};