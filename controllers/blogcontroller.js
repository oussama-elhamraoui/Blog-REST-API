const {findAllPosts,findPostById,create,update,remove} = require('../models/blogmodel');
const { getPostData } = require('../utils');

// @desc get all Posts
// @route GET /api/posts
async function getPosts(req,res){
    try{
        const posts = await findAllPosts();
        res.writeHead(200, { 'Content-Type': 'application/json' })
        // console.log(posts)
        res.end(JSON.stringify(posts))
    }catch(err){
        console.error(err)
    }
}
// @desc get a Post
// @route GET /api/posts/:id
async function getPost(req,res,post_id){
    try{
        const post = await findPostById(post_id)
        res.writeHead(200,{'Content-Type':'application/json'})
        console.log(post_id)
        res.end(JSON.stringify(post))
    }catch(err){
        console.error(err)
    }
}
// @desc Create a Post
// @route POST /api/posts
async function createPost(req,res){
    const body = await getPostData(req); // Read request body data
    const { title, content, author } = JSON.parse(body); // Parse the JSON data from body

    // Create the post object
    const post = {
      title,
      content,
      author
    };

    // Call the create function to insert the post into the database
    const newPost = await create(post); // Assume create returns a JavaScript object representing the new post

    // Set the response header to indicate the content type is JSON
    res.writeHead(201, { 'Content-Type': 'application/json' });

    // Return the newly created post as a JSON string
    return res.end(JSON.stringify(newPost)); 

}
// @desc Update a Post
// @route PUT /api/posts/:id
async function updatePost(req,res,post_id){
    try{
        const post = await findPostById(post_id)
        const body = await getPostData(req); 
        const { title, content, author } = JSON.parse(body);
        const postData = {
            title:title || post.title,
            content:content || post.content,
            author:author || post.author
          };
      
        const updPost = await update(postData,post_id); 
      

        res.writeHead(200, { 'Content-Type': 'application/json' });
      

        return res.end(JSON.stringify(updPost)); 
    }catch(err){
        console.error(err)
    }
}

// @desc delete a Post
// @route DELETE /api/posts/:id
async function deletePost(req,res,post_id){
    try{
        const deletedPost = await remove(post_id);
      
        res.writeHead(200, { 'Content-Type': 'application/json' });
      
        return res.end(JSON.stringify(deletedPost)); 
    }catch(err){
        console.error(err)
    }
}
module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}