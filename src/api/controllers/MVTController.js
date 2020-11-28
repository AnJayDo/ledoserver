
const Movietime = require('../models/Movietime')


class MovietimeControllers {

     //get /Movietime/:idmovie
     // lấy tất cả movietime theo id movie
     show(req,res,next) {
        Movietime.find({movie_id:req.params.id},function(err,movietime){
            if(!err)  {
                res.json(movietime);
            }
            else
            res.json({message:'Không tìm thấy'})
        })
     
        
    }

    // tạo Movietime
    //POST /Movietime/:id movie/create      
    create(req,res,next) {     
    var colume = ['A','B','C','D','E','F','G','H','I','J']
    var seat=[]
       for(var i = 0;i<colume.length;i++){
        seat[i]=[]
           for( var j=0;j<13;j++){
            seat[i][j]={id:colume[i]+(j+1),available:false}
           }
       }

    //     for(var i=0;i<req.body.movietime.times.length;i++){
    //     req.body.movietime.times[i].seat=seat
    // //    req.body.times[i] ={hour:req.body.hour[i],price:req.body.price[i],seat:seat}
    // //     req.body.movietime={times:req.body.times.concat(req.body.times[i])}
    //    }
    req.body.movietime={date:req.body.date,
                        hour:req.body.hour,
                        price:req.body.price,
                        seat:seat
                    }
    req.body.movie_id=req.params.id
        const movietime =new Movietime(req.body); 
            movietime.save()
    .then(() => res.json(req.body))
    .catch(next)
    }


    //PUT /Movietime/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Movietime.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /Movietime/:id 
     delete(req,res,next) {
        Movietime.deleteOne({_id:req.params.id}) 
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new MovietimeControllers;