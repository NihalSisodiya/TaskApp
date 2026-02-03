const express = require('express');
const { register, registerValidations, login, loginValidations } = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validate(registerValidations), register);
router.post('/login', validate(loginValidations), login);

module.exports = router;