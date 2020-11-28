
const Theater = require('../models/Theater')


class TheaterControllers {

     //get /Theater/:slug
     show(req,res,next) {
        Theater.findOne({slug :req.params.slug})
        // nhận về colecttion Theater theo slug
        .then(theater =>  res.json(theater))
        .catch(next)
    }

    
 // GET /Theater/all
    index(req, res,next) {

        Theater.find({},function(err,theater){
            if(!err)  {
                res.json(theater);
            }
            else
            res.json({message:'Không tìm thấy'})
        });
    }


    // tạo Theater
    //POST /Theater/create      
    create(req,res,next) {
     const theater =new Theater(req.body);
    theater.save()
    .then(() => res.json(req.body))
    .catch(next)
    }


    //PUT /Theater/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        Theater.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /Theater/:id 
     delete(req,res,next) {
        Theater.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new TheaterControllers;