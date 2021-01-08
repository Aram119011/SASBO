const User = require('../models/subscribeRegister');
//Express-Validator
const {validationResult} = require('express-validator');


module.exports.subscribeRegister = async (req, res) => {
    console.log('subscribeRegister')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let candidate = await User.findOne({email: req.body.email});

    // if (user.roll === 'admin') {
    //     return res.status(201).json({
    //         msg:'admin'
    //     })
    // }else{
    //     return res.status(408).json({
    //         msg:'error not admin'
    //     })
    // }


    if (!candidate) {
        const userData = {
            passportId,
            name,
            surName,
            employer,
            employerNumber,
            email,
            phoneNumber
        } = req.body;
        const user = await new User({
            email,
            passportId
        });
        try {
            userData.accepted = false;
            userData.roll = 'user';
            await new User(userData).save();
            res.status(201).json({
                success: true,
                user
            })
        } catch (e) {
            res.status(404).json({
                msg: 'Error: User not saved please try again later'
            })
        }
    } else {
        res.status(422).json({
            msg: 'The email is already used. Please, use another email'
        })
    }
};



module.exports.findId = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    try {
        let userPassportId = await User.findOne({passportId: req.body.passportId});
        console.log(userPassportId);
        res.status(201).json({
            msg: 'success',
            userPassportId: {
                TITLE: userPassportId.TITLE,
                INITIALS:userPassportId.INITIALS,
                SURNAME:userPassportId.SURNAME,
                EMAILS:userPassportId.EMAILS,
                AREA:userPassportId.AREA,
                MEM_NO:userPassportId.MEM_NO,
                EMPLOYEE:userPassportId.EMPLOYEE,
                CONTACT:userPassportId.CONTACT,
                CONTACT2:userPassportId.CONTACT2,
                CONTACT3:userPassportId.CONTACT3,
                BANK:userPassportId.BANK,
                BRANCH_NAME:userPassportId.BRANCH_NAME
            }
        })
    } catch (e) {
        res.status(408).json({
            msg: 'this not passportId'
        })
    }


};



