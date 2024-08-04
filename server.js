const http= require('http');
const {getPosts,getPost,createPost,updatePost,deletePost} = require('./controllers/blogcontroller');

server = http.createServer((req,res)=>{
    if(req.url ==="/api/posts" && req.method === 'GET'){
        getPosts(req,res);
    }else if (req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'GET'){
        const post_id = req.url.split('/')[3];
        getPost(req,res,post_id);
    }else if(req.url === '/api/posts' && req.method === 'POST'){
        createPost(req,res);
    }
    else if (req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'PUT'){
        const post_id = req.url.split('/')[3];
        updatePost(req,res,post_id);
    }
    else if (req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'DELETE'){
        const post_id = req.url.split('/')[3];
        deletePost(req,res,post_id);
    }
    else{
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ message: "Page Not Found" })); 
    }
})
const PORT = 5000
server.listen(PORT,()=>console.log('Running server on port 5000'));
