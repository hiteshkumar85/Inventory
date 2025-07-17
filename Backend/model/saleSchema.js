const { Schema, model } = require("mongoose");

const saleSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

const saleModel = model('Sale', saleSchema);

module.exports = saleModel;