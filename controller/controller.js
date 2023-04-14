const path=require('path');
const fs=require('fs');
const { json } = require('body-parser');
const DBPath=path.join(__dirname,"..",'data','db.json');
const controller={

    views:(req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','index.html'))
    },
    getPosts:async (req,res)=>{
        try{
            await fs.readFile(DBPath,'utf-8',(err,data)=>{
                if(err){
                    return res.status(500).json({error:"Internal server error"});
                }
               const posts=JSON.parse(data).posts;
               res.json(posts); 
            })
        }catch(err){
            res.json(err)
        }

    },
    newPost:async (req,res)=>{
      try {
        const data= await fs.promises.readFile(DBPath,'utf-8'); 
        const post={
            id:Number(req.body.id),
            title:req.body.title,
            datetime:req.body.datetime,
            body:req.body.body
        };
        const posts=JSON.parse(data);
        let postArray=posts.posts
        postArray.push(post);
        postArray=postArray.sort((a,b)=> {if(a.id<b.id){return -1}})
        await fs.promises.writeFile(DBPath,JSON.stringify(posts));
        res.json(post)
      } catch (error) {
        res.status(500).json({error:"Internal Server Error. Post was not created"})
      }  
},
   getPostById:async (req,res)=>{
    try {
        const data= await fs.promises.readFile(DBPath,'utf-8'); 
        const posts=JSON.parse(data).posts;
        const post=posts.find(post=>Number(post.id)===Number(req.params.id));
        if(!post){
            res.status(404).json({});
        }else{
            res.json(post)
        }
    } catch (error) {
       res.status(500).json({error:"Internal Server Error"})
    }
   },
   deletePost:async (req,res)=>{
    try {
        const data= await fs.promises.readFile(DBPath,'utf-8'); 
        let posts=JSON.parse(data).posts;
        const postIndex=posts.findIndex(post=>Number(post.id)===Number(req.params.id));
        if(postIndex==-1){
            res.status(404).json({index:-1})
        }else{  
            posts.splice(postIndex,1);
            await fs.promises.writeFile(DBPath,JSON.stringify({posts}))
            res.json({});
        }
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
   }, 
   editPost:async (req,res)=>{
    try {
        const data= await fs.promises.readFile(DBPath,'utf-8');
        let posts=JSON.parse(data);
        const postIndex=posts.posts.findIndex((post)=>Number(post.id)===Number(req.params.id));
        if(postIndex==-1){
            res.status(404).json({index:-1});
        }else{
            const post={
                id:Number(req.body.id),
                title:req.body.title,
                datetime:req.body.datetime,
                body:req.body.body
            }
        let postsArray=posts.posts;
         postsArray.splice(postIndex,1);
         postsArray.push(post);
         postsArray=postsArray.sort((a,b)=>{if(a.id<b.id){return -1}});
         await fs.promises.writeFile(DBPath,JSON.stringify(posts));
         res.status(200).json(post)   
        }
    } catch (error) {
        res.status(500).json({"error":error});
    }
   }
}


module.exports=controller;