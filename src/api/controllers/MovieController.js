
const Movie = require('../models/Movie')


class MovieControllers {


 

    //get /movie/:slug
    show(req,res,next) {
        Movie.findOne({slug :req.params.slug})
        // nhận về colecttion movie theo slug
        .then(movie =>  res.json(movie))
        .catch(next)
    }
     // tạo phim
    //POST /movie/create      
    create(req,res,next) {
        req.body.image=req.file.path
        req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}

        const movie =new Movie(req.body);
       movie.save()
       .then(() => res.json(req.body))
       .catch(next)
       }
   
   
       //PUT /movie/:id 
       // PUT là method để chỉnh sửa
        update(req,res,next) {
            req.body.image=req.file.path
            req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
           Movie.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
           //redirec điều hướng sang
           .then(() => res.json({message:'Đã cập nhập'}))
      
       .catch(next)
        }
   
   //DELETE /movie/:id 
        delete(req,res,next) {
           Movie.deleteOne({_id:req.params.id}) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Đã xóa'})) // back la quay lại trang vừa đứng
      
       .catch(next)
        }
        //UPDATE /movie/:id/dangchieu
        dangchieu(req,res,next){
            req.body.playing=true
            Movie.updateOne({_id:req.params.id} ,req.body) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Phim đang chiếu'}))
           .catch(next)
        }

        //UPDATE /movie/:id/sapchieu
        sapchieu(req,res,next){
            req.body.playing=false
            Movie.updateOne({_id:req.params.id} ,req.body) 
           //redirec điều hướng sang
           .then(() => res.json({message:'Phim sắp chiếu'}))
           .catch(next)
        }

      
   }
   



module.exports = new MovieControllers;