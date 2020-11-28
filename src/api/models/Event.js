const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event= new Schema({
    id:Schema.Types.ObjectId,
    name :String,
    discription:String,
    image: String,
    cover_image:String,
    date:{
        date_start:Date,
        date_end:Date
        },

    slug: { type: String, slug: 'name',unique: true }


});
module.exports= mongoose.model('event', Event);
