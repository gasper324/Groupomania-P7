// allowing comments to be added to posts is a proposed feature to be added later date

const db = require("../config/database.js");
const jwt = require('jsonwebtoken');

exports.createComment = async (req, res, next) => {
    const commentText = req.body.commenttext;
    const postId = req.params.postId;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const commentAuthor = decodedToken.userId;
    try { 
        const rows = await db.query(
            'INSERT INTO "comment" (commenttext, commentauthor, postid) VALUES ($1, $2, $3)',
            [commentText, commentAuthor, postId]
            );
            res.status(200).send({
            message: 'Comment added'
            }
        );
    } catch {
        res.status(400).send({
            error: 'Failed to post comment to server.  Please try again.'
        })
    }
};

exports.getAllComments = async (req, res, next) => {
    try { 
        const comments = await db.query('SELECT * FROM comment ORDER BY commentId ASC');
            res.status(200).send(comments.rows)
    } catch {
        res.status(400).send({
            error: 'Failed to get comments from server'
        })
    }
};
