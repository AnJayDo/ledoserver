
const Movie = require('../models/Movie')
class HomeControllers {

    index(req, res,next) {

        Movie.find({},function(err,movie){
            if(!err)  {
                res.json(movie);
            }
            else
            res.json({message:'Không tìm thấy phim'});
        });


        // // res.render('home');

        // then là khi thành công , cathch là khi lỗi
        // nhận key là movie và dữ liệu là object ( scheme) movie


        // Movie.find({}).then(movie => res.render('home',{ movietest : multipleMongooseToOject(movie)} ))
        //             .catch( next); 
        // Movie.find({})
        // .then(movie => res.json(movie))
        // .catch( next)
    }}
    



module.exports = new HomeControllers;