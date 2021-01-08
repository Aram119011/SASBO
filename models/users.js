const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');


const imageEnum = {
    defaultImage: 'default.jpg'
};

const UserSchema = new Schema({
    UserName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    myPhoto: {
        type: String,
        default: imageEnum.defaultImage
    },
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
};

module.exports = model('User', UserSchema);
