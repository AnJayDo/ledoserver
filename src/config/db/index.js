const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config()
const URI =process.env.MONGGO_URI;


// const client = new MongoClient(URI, { useNewUrlParser: true,
//      useUnifiedTopology: true  }
//     );




async function connect(){

    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
           
        });
    // await client.connect();
        console.log(' Monggoo connected')
        
    } catch (error) {
        console.log('that bai')
    }

}

module.exports={connect};