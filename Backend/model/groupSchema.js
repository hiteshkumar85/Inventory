const {Schema, model} = require('mongoose');

const groupSchema = new Schema({
    name : {
        type : String,
        requried : true
    },
    level : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
})

const groupModel = model('Group', groupSchema);

module.exports = groupModel;