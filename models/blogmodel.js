const {getRows,getRowById,insertRow,updateRow,deleteRow} = require('./dbmodel')

function findAllPosts(){
    return new Promise((resolve,reject)=>{
        getRows().then(rows=>resolve(rows)).catch(err=>reject(err));
    })
}
function findPostById(post_id){
    return new Promise((resolve,reject)=>{
        getRowById(post_id).then(row=>resolve(row)).catch(err=>reject(err));
    })
}
function create(post){
    return new Promise(async (resolve, reject) => {
        try {
          // Assuming insertRow returns a promise
          const insertedPost = await insertRow(post); // Insert the post into the database
          resolve(insertedPost); // Resolve with the inserted post
        } catch (error) {
          console.error('Error inserting post:', error);
          reject(error); // Reject with the error
        }
      });
    }
function update(post,post_id){
    return new Promise(async (resolve, reject) => {
        try {
          // Assuming insertRow returns a promise
          const updatedPost = await updateRow(post,post_id); // Insert the post into the database
          resolve(updatedPost); // Resolve with the inserted post
        } catch (error) {
          console.error('Error inserting post:', error);
          reject(error); // Reject with the error
        }
      });
    }
function remove(post_id){
    return new Promise(async (resolve, reject) => {
        try {
          // Assuming insertRow returns a promise
          const deletedPost = await deleteRow(post_id); // Insert the post into the database
          resolve(deletedPost); // Resolve with the inserted post
        } catch (error) {
          console.error('Error inserting post:', error);
          reject(error); // Reject with the error
        }
      });
    }
module.exports = {
    findAllPosts,
    findPostById,
    create,
    update,
    remove
}