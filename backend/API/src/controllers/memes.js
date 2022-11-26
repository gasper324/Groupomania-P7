const db = require("../config/database.js");
const fs = require('fs');
const { post } = require("../app.js");

exports.createPost = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const image = url + '/' + req.file.filename;
    const { title, postText, description, usersRead, postedBy } = JSON.parse(req.body.post);
    const { rows } = await db.query(
        "INSERT INTO post (title, postText, image, description, usersRead, postedBy) VALUES ($1, $2, $3, $4, $5, $6)",
        [title, postText, image, description, usersRead, postedBy]
      );
      res.status(201).send({
        message: "Post added successfully!",
        body: {
          post: { title, postText, image, description, usersRead, postedBy }
        },
      })
    };

    exports.createPostNoImage = async (req, res, next) => {
      const { title, postText, description, usersRead, postedBy } = req.body;
      const image = null
      const { rows } = await db.query(
          "INSERT INTO post (title, postText, image, description, usersRead, postedBy) VALUES ($1, $2, $3, $4, $5, $6)",
          [title, postText, image, description, usersRead, postedBy]
        );
        res.status(201).send({
          message: "Post added successfully!",
          body: {
            post: { title, postText, image, description, usersRead, postedBy}
          },
        })
      };
    
exports.getAllPosts = async (req, res, next) => {
  const posts = await db.query('SELECT * FROM post ORDER BY postId DESC');
  res.status(200).send(posts.rows)
};

exports.getPostById = async (req, res, next) => {  // needs error for param id not in database
  const postId = parseInt(req.params.postId);
  const post = await db.query('SELECT * FROM post WHERE postId = $1', [postId]);
  res.status(200).send(post.rows);
};

exports.updatePostById = async (req, res, next) => {  // looks successful when param is non-existant
  const postId = parseInt(req.params.postId);
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/' + req.file.filename;
  const { title, postText, description} = JSON.parse(req.body.post);
    const post = await db.query('UPDATE post SET title = $1, postText = $2, image = $3, description = $4 WHERE postID = $5',
    [title, postText, image, description, postId]);
  res.status(200).send({message: 'Post updated successfully'})
};

exports.updatePostByIdNoImage = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const { title, postText, description} = req.body;
    const post = await db.query('UPDATE post SET title = $1, postText = $2, description = $3 WHERE postID = $4',
    [title, postText, description, postId]);
  res.status(200).send({message: 'Post updated successfully'})
}; 

exports.updateUsersRead = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  console.log(postId)
  const userNum = req.body.userNum
  console.log(userNum)
  await db.query('UPDATE post SET usersread = array_append(usersread, $1) WHERE postId = $2', [userNum, postId])
  res.status(200).send({message: 'UsersRead updated successfully'})
}

exports.deletePostById = async (req, res, next) => {
  console.log('here')
  const postId = parseInt(req.params.postId);
  await db.query('DELETE FROM post WHERE postId = $1', [postId]);
  res.status(200).send({message: 
  'Post deleted'})
};