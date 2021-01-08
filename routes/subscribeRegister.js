const {Router} = require('express');
const router = Router();

const subscribeRegisterControllers = require('../controllers/subscribeRegister');

const ValidatorSubscribeRegister = require('../validator/subscribeRegister');
const ValidatorPassportId = require('../validator/findpassportid');
router.post('/register', ValidatorSubscribeRegister.rules, subscribeRegisterControllers.subscribeRegister);

router.get('/find', ValidatorPassportId.rules, subscribeRegisterControllers.findId);
// router.post('/creat', subscribeRegisterControllers.creat)


module.exports = router;
