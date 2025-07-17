const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    addedBy : {
        type : String,
        require : true
    },
    name : {
        type : String,
        requried : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    lastLogin : {
        type : Date,
        default : null
    },
    image: {
        type : String,
        default : null
    }
});

const userModel = model('User', userSchema);

module.exports = userModel;