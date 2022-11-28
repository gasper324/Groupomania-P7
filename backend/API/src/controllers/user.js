const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../config/database.js");

exports.signup = async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const { rows } = await db.query('INSERT INTO "user" (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)', 
        [firstName, lastName, email, password]);
    res.status(201).send({
        message: 'User created successfully',
        body: {firstName, lastName, email, password}
    });
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userProfile = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
    if(userProfile.rows.length === 0) {
        return res.status(401).send({
            error: 'Login failed.  User not found!'
            });
    };
    const passwordMatchBoolean = await bcrypt.compare(password, userProfile.rows[0].password);
    if (passwordMatchBoolean === false) {
        return res.status(401).send({
            error: 'Login failed.  Invaild password'
        });
    };
    const token = jwt.sign(
        { userId: userProfile.rows[0].userid},
        process.env.TOKEN,
        { expiresIn: '24h' });
    res.status(200).send({
        userId: userProfile.rows[0].userid,
        token: token,
        message: "Login successful"
    });
};

exports.deleteAccount = async (req, res, next) => {
    const userId = req.params.userId
    await db.query('DELETE FROM "user" WHERE userid = $1', [userId]);
    res.status(200).send({
        message: 'Account deleted'})

}

exports.getUserData = async (req, res, next) => {
    const userId = req.params.userId
    const userData = await db.query('SELECT firstname, lastname FROM "user" WHERE userId = $1', [userId]);
    res.status(200).send(userData.rows);
}
