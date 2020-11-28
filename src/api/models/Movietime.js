const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movietime = Schema({
  // SUẤT CHIẾU PHIM
  
  id:Schema.Types.ObjectId,
  // movie,theater = id tham chiếu đến 2 bảng movie và theater
  movie_id:Schema.Types.ObjectId,
  theater_id:Schema.Types.ObjectId,
  
  movietime:{
    date:Date,
    hour:String,
    price:Number,
    seat:[
        [
      {
        id: String,
        available:Boolean,
      }
        ]
      ]
    // times:[
    // {
    //   hour:String,
    //   price:Number,
    //   seat:[
    //     [
    //   {
    //     id: String,
    //     available:Boolean,
    //   }
    //     ]
    //   ]
    // }
    //       ]
  },
      


  });

  module.exports= mongoose.model('movietime', Movietime);
