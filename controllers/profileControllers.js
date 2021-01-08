const User = require('../models/users');
const fs = require('fs');

//Express-Validator

const {validationResult} = require('express-validator');


module.exports.uplodaeProfile = async (req, res) => {
    console.log(req.file, 'uploade');
    console.log(req.userId, 'req.userId');
    let userId = await User.findOne({_id: req.userId});
    if (userId.myPhoto &&
        fs.existsSync(__dirname + `/../uploads/users/${userId.myPhoto}`))
        fs.unlinkSync(__dirname + `/../uploads/users/${userId.myPhoto}`);
    try {
        let user = await User.updateOne({_id: req.userId}, {
            myPhoto: req.file.filename
        });
        res.status(201).json({
            success: {
                myPhoto: `${req.protocol}://${req.get("host")}/uploads/users/${req.file.filename}`,
                msg: 'success',
                user
            }
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error',
            delete: e
        })
    }
};

exports.uplodaeDelete = async (req, res) => {
    let userId = await User.findOne({_id: req.userId});
    if (userId.myPhoto &&
        fs.existsSync(__dirname + `/../uploads/users/${userId.myPhoto}`))
        fs.unlinkSync(__dirname + `/../uploads/users/${userId.myPhoto}`);
    try{
        let user = await User.updateOne({_id: req.userId}, {
            myPhoto: 'default.jpg'
        });
        res.status(201).json({
            success: {
                myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : "",
                msg: 'success',
                user

            },
        })
    }catch (e) {
        res.status(409).json({msg: 'error', delete: e})
    }
};


exports.saveInfoupdate = async (req, res) => {
    // let userId = await User.findOne({_id: req.userId});
    // console.log(userId,'userId');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        await User.updateOne({_id: req.userId}, {
            email,
            UserName
        } = req.body);
        res.status(201).json({
            msg: "updated successfully a post with id = ",
            email,
            UserName
        })
    } catch (e) {
        res.status(409).json({msg: 'error', delete: e})
    }

};


module.exports.savePasswordNew = async (req, res) => {
    let userId = await User.findOne({_id: req.userId});
    console.log(userId, 'userId');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const {
            oldPassword,
            newPassword
        } = req.body;
        const user = await User.findOne({_id: req.userId});
        const validatePassword = await user.validatePassword(oldPassword);
        if (!validatePassword) {
            return res.status(500).json({msg: 'error'})
        }
        const newPassupdate = await user.encryptPassword(newPassword);
        await User.updateOne({_id: req.userId}, {
            password: newPassupdate
        });
        res.status(201).json({message: 'Password changed'})
    } catch (e) {
        res.status(404).json({
            message: 'error'
        })
    }

};
