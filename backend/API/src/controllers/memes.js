const db = require("../config/database.js");
const fs = require('fs');

exports.createPost = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const image = url + '/' + req.file.filename;
    const { title, postText, description, usersRead } = JSON.parse(req.body.post);
    const { rows } = await db.query(
        "INSERT INTO post (title, postText, image, description, usersRead) VALUES ($1, $2, $3, $4, $5)",
        [title, postText, image, description, usersRead]
      );
      res.status(201).send({
        message: "Post added successfully!",
        body: {
          post: { title, postText, image, description}
        },
      })
    };
    
exports.getAllPosts = async (req, res, next) => {
  const posts = await db.query('SELECT * FROM post ORDER BY postId DESC');
  res.status(200).send(posts.rows)
};

exports.getPostById = async (req, res, next) => {  // needs error for param id not in database
  const postId = parseInt(req.params.postId);
  console.log(postId)
  const post = await db.query('SELECT * FROM post WHERE postId = $1', [postId]);
  res.status(200).send(post.rows);
};

exports.updatePostById = async (req, res, next) => {  // looks successful when param is non-existant
  const postId = parseInt(req.params.postId);
  // const usersRead = await db.query('SELECT usersRead from "user" WHERE userId = $1', [userId])
  const { title, postText, image, description, usersRead} = req.body;
  const post = await db.query('UPDATE post SET title = $1, postText = $2, image = $3, description = $4, usersRead = $5 WHERE postID = $6',
    [title, postText, image, description, usersRead, postId]);
  res.status(200).send({message: 'Post updated successfully'})
};

exports.deletePostById = async (req, res, next) => {
  console.log('here')
  const postId = parseInt(req.params.postId);
  await db.query('DELETE FROM post WHERE postId = $1', [postId]);
  res.status(200).send({message: 
  'Post deleted'})
};