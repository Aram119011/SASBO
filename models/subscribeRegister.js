const {Schema, model} = require('mongoose');

const SubscribeSchema = new Schema({
    passportId: {
        type: String
    },
    TITLE: {
        type: String
    },
    INITIALS: {
        type: String
    },
    SURNAME: {
        type: String
    },
    EMAILS: {
        type: String,
        unique: true
    },
    AREA: {
        type: String
    },
    MEM_NO: {
        type: String
    },
    EMPLOYEE: {
        type: Boolean
    },
    CONTACT:{
        type: String
    },
    CONTACT2:{
        type: String
    },
    CONTACT3:{
        type: String
    },
    BANK:{
        type: String
    },
    BRANCH_NAME:{
        type: String
    }
});

module.exports = model('subscribeRegister', SubscribeSchema);
