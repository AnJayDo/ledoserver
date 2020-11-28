const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = Schema({
    id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId,
    theater_id:Schema.Types.ObjectId,
    numberticket:Number,
    namemovie:String,
    theater:String,
    date:Date,
    hour:String,
    seat:[     
        String
    ],
    paid:Boolean,
    total_price:Number,
    code_gift:String,
},
        {
        timestamps: true
      }

  );
  module.exports= mongoose.model('ticket', Ticket);
