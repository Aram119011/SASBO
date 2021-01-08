const {check} = require('express-validator');


const rules = [
    check('name').not().isEmpty()
        .isLength({min: 4, max:50}).withMessage('name is required')
        .matches(
            /^[a-zA-Z\-]{4,}$/
        ).withMessage('Your  name must contain only letters'),
    check('surName').not().isEmpty()
        .isLength({min: 4, max:50}).withMessage('surname is required')
        .matches(
            /^[a-zA-Z\-]{4,}$/
        ).withMessage('Your  surname must contain only letters'),

    check('surName').not().isEmpty()
        .withMessage('surname is required'),

    check('employerNumber').not().isEmpty()
        .withMessage('employerNumber is required'),
    check('email')
        .not().isEmpty()
        .withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    check('phoneNumber').not().isEmpty()
        .isLength({min: 9, max:80}).withMessage('phone number please be at least 9 characters')
        .matches(
            /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9, ]/
        ).withMessage('Your phoneNumber string'),
];

module.exports = {
    rules
};

