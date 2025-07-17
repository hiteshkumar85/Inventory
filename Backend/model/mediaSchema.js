const {Schema, model} = require('mongoose')

const mediaSchema = new Schema({
    imageName : {
        type : String,
        required : true,
    }
});

const mediaModel = model('photo', mediaSchema);

module.exports = mediaModel;