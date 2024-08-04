const pool = require('../db');


async function getRows(){
    const result = await pool.query('SELECT * FROM blog_posts');
    console.log(result.rows);
    return result.rows;
}

async function getRowById(post_id){
    const row = await pool.query(`SELECT * FROM blog_posts WHERE id = ${post_id}`);
    return row.rows;
}

async function insertRow(post) {
    const { title, content, author } = post;
    const queryText = `
      INSERT INTO blog_posts (title, content, author)
      VALUES ($1, $2, $3)
      RETURNING *;`; // Return the inserted row
    const values = [title, content, author];
  
    try {
      const result = await pool.query(queryText, values);
      return result.rows[0]; // Ensure this is an object, not undefined
    } catch (error) {
      throw new Error('Database Insertion Error: ' + error.message);
    }
  }
async function updateRow(post,post_id) {
    const { title, content, author } = post;
    const queryText = `
      UPDATE blog_posts SET title=$1,content=$2,author=$3 WHERE id=$4
      RETURNING *;`; // Return the inserted row
    const values = [title, content, author,post_id];
  
    try {
      const result = await pool.query(queryText, values);
      return result.rows[0]; // Ensure this is an object, not undefined
    } catch (error) {
      throw new Error('Database Insertion Error: ' + error.message);
    }
  }
async function deleteRow(post_id) {
    const queryText = `
      DELETE FROM blog_posts WHERE id=$1
      RETURNING *;`; // Return the inserted row
    const values = [post_id];
  
    try {
      const result = await pool.query(queryText, values);
      return result.rows[0]; // Ensure this is an object, not undefined
    } catch (error) {
      throw new Error('Database Insertion Error: ' + error.message);
    }
  }

module.exports = {
    getRows,
    getRowById,
    insertRow,
    updateRow,
    deleteRow
}