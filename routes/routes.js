const express=require('express');
const path=require('path')
var router=express.Router();
var controller=require('../controller/controller');

// router.get('^/$|index(.html)?',controller.views);
router.get('',controller.views);
router.get('/test',(req,res)=>{
    res.json({message:"working"})
})
router.get('/posts',controller.getPosts);
router.post('/posts',controller.newPost);
router.get('/posts/:id',controller.getPostById);
router.delete('/posts/:id',controller.deletePost);
router.put('/posts/:id',controller.editPost)
module.exports=router;