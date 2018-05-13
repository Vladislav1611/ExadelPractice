var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const functional = require('D:/Moment/server/serverFunctions.js');
const way = 'D:/Moment/server/data/posts.json';

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.get('/getPost', (req, res) => {
    let post = functional.getPhotoPost(req.query.id.toString());
    if (post) {
        res.send(post).end();
    } else {
        res.send(404).end();
    }
});
app.delete('/deletePost', (req, res) => {
    let post = functional.removePhotoPostLabeled(req.query.id.toString());
    if(post){
        fs.writeFileSync(way,JSON.stringify(functional.getPosts()));
        res.send('post with id = ' + req.query.id + ' is deleted').end(200);
    }
    else{
        res.send(404).end("Post not found");
    }
});
app.post('/addPost', (req, res) => {
    let addPost = functional.addPhotoPost(req.body);
    console.log(req.body);
    if(addPost){
        fs.writeFileSync(way,JSON.stringify(functional.getPosts()));
        res.send(req.body).end();
    }
    else{
        res.sendStatus(404).end();
    }
});
app.post('/getPosts', (req, res) => {
    let p = functional.getPhotoPosts(req.query.skip,req.query.top,req.body);
    if(p && p.length!==0){
        res.send(p).end();
    }
    else if(req.query.skip > req.query.top){
        res.sendStatus(404).end();
    }
});
app.put('/editPost',(req,res)=>{
    let idPost = req.query.id;
    let newPost = req.body;
    let isEdit = functional.editPhotoPost(idPost,newPost);
    if(isEdit){
        fs.writeFileSync(way,JSON.stringify(functional.getPosts()));
        res.send("edited post with id = " + idPost).end(200);
    }
    else{
        res.send(404).end();
    }
});


app.listen(2000, function () {
    console.log('listen 3000 port');
});