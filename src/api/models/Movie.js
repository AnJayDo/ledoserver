const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Movie= new Schema({
    id : Schema.Types.ObjectId,
    name: String,
    decription: String,
    image: String,
    trailer: String,
    director:String,
    actor:String,
    type:String,
    length:Number,
    language:String,
    rating: Number,
    playing:Boolean, // true là đang chiếu , false sắp chiếu
    date:{
      date_start:Date,
      date_end:Date
      },
    // tạo slug thông qua name 
    slug: { type: String, slug: 'name',unique: true }
  });
  module.exports= mongoose.model('Movie', Movie);
