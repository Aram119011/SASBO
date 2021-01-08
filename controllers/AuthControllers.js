const User = require('../models/users');
const jwt = require('jsonwebtoken');

const Subscrib = require('../models/subscribeRegister');


const config = require('../config/keys');

//Express-Validator
const {validationResult} = require('express-validator');

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let candidate = await User.findOne({email: req.body.email});
    if (!candidate) {
        const userData = {
            UserName,
            email,
            password
        } = req.body;
        req.file ? userData.myPhoto = req.file.filename : null;
        const user = await new User({
            email
        });
        try {
            userData.password = await user.encryptPassword(userData.password);
            await new User(userData).save();
            res.status(201).json({
                UserName,
                email
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

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(404).send("The email doest exists")
    }
    const validatePassword = await user.validatePassword(password);
    if (!validatePassword) {
        return res.status(401).json({
            auth: false, token: null
        });
    }
    try {
        const token = jwt.sign({
                id: user._id.toString(),
                email: user.email.toString(),
            },
            config.jwt_key, {
                expiresIn: 60 * 60 * 24
            });
        user.token = token;
        res.status(201).json({
            success: true,
            user: {
                _id: user.id,
                UserName: user.UserName,
                email: user.email,
                myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : ""
            },
            token: token,
        })
    } catch (e) {
        res.status(500).json({e: e.message});
    }
};


exports.myProfile = async (req, res) => {
    // let passportId = await Subscrib.findOne({passportId: req.body.passportId});
    // if (!passportId) {
    //     return res.status(404).send('No passport Id found');
    // }


    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).send('No user found');
    }

    res.status(201).json({
        success: true,
        // passportId: {
        //     TITLE: passportId.TITLE,
        //     CONTACT: passportId.CONTACT,
        //     CONTACT2: passportId.CONTACT2,
        //     CONTACT3: passportId.CONTACT3,
        // },
        user: {
            _id: user.id,
            UserName: user.UserName,
            email: user.email,
            myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : ""
        }
    })
};
