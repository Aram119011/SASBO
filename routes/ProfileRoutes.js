const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/jwtCompare');


const controllerUpdate = require('../controllers/profileControllers');
const Multer = require('../middlewares/multer');
const validateChangepassword = require('../validator/validateChangepassword');
const validatorChangeInfo = require('../validator/validatorChangeinfo');


router.post('/upload/img', verifyToken, Multer.single('myPhoto'), controllerUpdate.uplodaeProfile);
router.put('/upload/img/delete', verifyToken, controllerUpdate.uplodaeDelete);
router.put('/change/info', verifyToken, validatorChangeInfo.rules, controllerUpdate.saveInfoupdate);
router.put('/change/password', verifyToken, validateChangepassword.rules, controllerUpdate.savePasswordNew);


module.exports = router;
