const db = require("../config/database.js");
const fs = require('fs');

exports.createPost = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const image = url + '/' + req.file.filename;
    const { title, postText, description, usersRead, postedBy } = JSON.parse(req.body.post);
    try {
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
    } catch {
      res.status(400).send({
        error: "error"
      })
    }
    };

    exports.createPostNoImage = async (req, res, next) => {
      const { title, postText, description, usersRead, postedBy } = req.body;
      const image = null
      try {
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
        } catch {
          res.status(400).send({
            error: "error"
          })
        }
      };
    
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.query('SELECT * FROM post ORDER BY postId DESC');
    res.status(200).send(posts.rows)
  } catch {
    res.status(400).send({
      error: "error"
    })
  }
};

exports.getPostById = async (req, res, next) => {  // needs error for param id not in database
  const postId = parseInt(req.params.postId);
  try {
    const post = await db.query('SELECT * FROM post WHERE postId = $1', [postId]);
    res.status(200).send(post.rows);
  } catch {
    res.status(400).send({
      error: "error"
    })
  }
};

exports.updatePostById = async (req, res, next) => {  // looks successful when param is non-existant
  const postId = parseInt(req.params.postId);
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/' + req.file.filename;
  const { title, postText, description} = JSON.parse(req.body.post);
  try {
    const post = await db.query('UPDATE post SET title = $1, postText = $2, image = $3, description = $4 WHERE postID = $5',
    [title, postText, image, description, postId]);
    res.status(200).send({message: 'Post updated successfully'})
  } catch {
    res.status(400).send({
      error: "error"
    })
  }
};

exports.updatePostByIdNoImage = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const { title, postText, description } = req.body;
  try {
    const post = await db.query('UPDATE post SET title = $1, postText = $2, description = $3 WHERE postID = $4',
    [title, postText, description, postId]);
    res.status(200).send({ message: 'Post updated successfully' })
  } catch {
    res.status(400).send({
      error: "error"
    })
  }
}; 

exports.updateUsersRead = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  console.log(postId)
  const userNum = req.body.userNum
  console.log(userNum)
  try {
    await db.query('UPDATE post SET usersread = array_append(usersread, $1) WHERE postId = $2', [userNum, postId])
    res.status(200).send({message: 'UsersRead updated successfully'})
  } catch {
    res.status(400).send({
      error: "error"
    })
  }
}

exports.deletePostById = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  try {
    await db.query('DELETE FROM post WHERE postId = $1', [postId]);
    res.status(200).send({ 
      message: 'Post deleted from database'
    })
  } catch {
    res.status(400).send({
      error: "Deletion was not successful"
    })
  }
};