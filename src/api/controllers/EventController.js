
const Event = require('../models/Event')


class EventControllers {

     //get /event/:slug
     show(req,res,next) {
        Event.findOne({slug :req.params.slug})
        // nhận về colecttion event theo slug
        .then(event =>  res.json(event))
        .catch(next)
    }

    
 // GET /event/all
    index(req, res,next) {

        Event.find({},function(err,event){
            if(!err)  {
                res.json(event);
            }
            else
            res.json({message:'Không tìm thấy'})
        });
    }


    // tạo event
    //POST /event/create      
    create(req,res,next) {
        req.body.image = req.file.path
        req.body.cover_image =req.file.path
        req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
     const event =new Event(req.body);
    event.save()
    .then(() => res.json(req.body))
    .catch(next)
    }


    //PUT /event/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        req.body.image = req.file.path
        req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}

        Event.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /event/:id 
     delete(req,res,next) {
        Event.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new EventControllers;