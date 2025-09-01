const express = require('express');
const { register, login } = require('../controllers/authController.js'); // ή userController αν όντως τα έχεις εκεί
const validate = require('../middleware/validate');
const { RegisterDTO, LoginDTO } = require('../dtos/auth.dto.js');

const router = express.Router();

router.post('/register', validate(RegisterDTO, 'body'), register);
router.post('/login', validate(LoginDTO, 'body'), login);




module.exports = router;
