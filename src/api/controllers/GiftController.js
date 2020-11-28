
const Gift = require('../models/Gift')
const voucher_codes = require('voucher-code-generator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class GiftControllers {

     //get /gift/:id
     show(req,res,next) {
        Gift.findOne({_id:req.params.id})
        .then(gift =>  res.json(gift))
        .catch(next)
    }

    
 // GET /gift/all
    index(req, res,next) {

        Gift.find({},function(err,gift){
            if(!err)  {
                res.json(gift);
            }
            else
            res.json({message:'Không tìm thấy'})
        });
    }


    // tạo gift
    //POST /gift/create      
    create(req,res,next) {
     req.body.code =voucher_codes.generate({
         length:10,
         count:req.body.amount
     })
     req.body.available =req.body.code.length
     req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}

     const gift =new Gift(req.body);
     
    gift.save()
    .then(() => res.json(req.body))
    .catch(next)
    }

    //POST /gift/:id/get
    get(req,res,next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user =>{       
            Gift.findOne({_id:req.params.id})
            .then(gift =>{

                if(gift.code.length >0 ){
                    if(user.point>=gift.point_to_get){
                        var n={code:gift.code[0],
                                value:gift.value}
                            user.gift_code.push(n) // thêm code và value vào user
                            user.point=user.point-gift.point_to_get
                            user.save()
                            gift.code.shift() // xóa đầu mảng
                            gift.available=gift.available-1
                            gift.save()
                            res.json({message:'Đổi code thành công vui lòng vào Ví Voucher để xem chi tiết'})
                    }
                    else res.json({message:'Không đủ điểm để đổi'})
                }
                else res.json({message:'Hết code'})
            })
            .catch(next)
        })
        .catch(next)

    }


    //PUT /gift/:id 
    // PUT là method để chỉnh sửa
     update(req,res,next) {
        req.body.date={date_start:req.body.date_start,date_end:req.body.date_end}
        Gift.updateOne({_id:req.params.id} ,req.body) // điều kiện , reqbody là các bản ghi để sữa
        .then(() => res.json({message:'Đã cập nhập'}))
   
    .catch(next)
     }

//DELETE /gift/:id 
     delete(req,res,next) {
        Gift.deleteOne({_id:req.params.id}) 
        //redirec điều hướng sang
        .then(() => res.json({message:'Đã xóa'})) 
   
    .catch(next)
     }
}


module.exports = new GiftControllers;