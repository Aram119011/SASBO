const {Router} = require('express');
const router = Router();

const AuthControllers = require('../controllers/AuthControllers');
const upload = require('../middlewares/multer');

const verifyToken = require('../middlewares/jwtCompare');


//Validator
const validateRegister = require('../validator/validateRegister');
const validateLogin = require('../validator/validateLogin');

router.post('/register', upload.single('myPhoto'), validateRegister.rules, AuthControllers.register);
router.post('/login', validateLogin.rules, AuthControllers.login);
router.get('/me', verifyToken, AuthControllers.myProfile);

module.exports = router;
