const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gift= new Schema({
    id:Schema.Types.ObjectId,
    name :String,
    amount:Number,
    code:[String],
    value : Number,
    available:Number,
    point_to_get:Number,
    date:{
        date_start:Date,
        date_end:Date
    }


});
module.exports= mongoose.model('gift', Gift);
