const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust the path as needed

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth/discord', userController.redirectToDiscord);
router.get('/auth/discord/callback', userController.discordCallback);


module.exports = router;