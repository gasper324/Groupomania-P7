//setup router
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteAccount/:userId', auth, userCtrl.deleteAccount);

module.exports = router;