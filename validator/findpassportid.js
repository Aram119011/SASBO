const {check} = require('express-validator');


const rules = [
    check('passportId').not().isEmpty()
        .isLength({min: 13, max:50}).withMessage('passportId is required')
];

module.exports = {
    rules
};
