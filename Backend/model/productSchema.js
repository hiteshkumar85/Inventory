const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    buyingPrice : {
        type : Number,
        required : true,
    },
    sellingPrice : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now(),
    }

});

const productModel = model('Product', productSchema);

module.exports = productModel;