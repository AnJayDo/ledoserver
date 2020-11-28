const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config()
const shortid = require('shortid');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGIRD_KEY)

class AuthControllers{

    
    checkemail(req,res){
        User.findOne({email:req.body.email},function(err,user){
            if(user){
                return true
            }
            else return false
        })
        
        
    }
// POST account/register
    register(req,res,next){
        // check email is registed
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
    res.json({message:'email đã đc sử dụng đăng kí cho tk khác'})
                }
            else{
      

        bcrypt.hash(req.body.password,10,function(err,hashedPass){
            if(err){
                res.json({message:'ko mã hóa đc mk'})
            }
            const formData = req.body
            formData.point=0
            formData.avartar='src/resoures/defaulavartar.jpg'
            formData.password = hashedPass
            formData.isVerified = false
            formData.token= jwt.sign({email :req.body.email},process.env.JWT_KEY,{expiresIn:'1h'})                         
            const user = new User(formData)
            user.save()
            // gữi email
            const msg = {
                
                to: user.email, // Change to your recipient
                from: 'than123456qwe@gmail.com', // Change to your verified sender
                subject: 'Xác minh tài khoản Le Do Cinema',      
                html: `<h4>Xin chào ${req.body.name},</h4>
                <p>Chúc mừng bạn trở thành thành viên Lê Độ Cinema - Tích điểm ngay nhận quà liền tay.
                Bạn có thể đăng nhập dễ dàng vào tài khoản Galaxy để cập nhập các chương trình ưu đãi đặc biệt dành riêng cho bạn </p>
                <a href="http://${req.headers.host}/account/verify?token=${user.token}">Vui lòng nhấn vào đây để xác nhận</a>`,
              }
            sgMail.send(msg)
            .then(() => res.json({message:'đăng kí thành công'}))
            .catch(next)          
        })
    }})
    }

// POST account/login
    login(req,res,next){

        
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                bcrypt.compare(req.body.password,user.password,function(err,result){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                       var token = jwt.sign({email: user.email},process.env.JWT_KEY,{expiresIn:'1h'})                         
                        res.json({message:'login succes',token})
                        // for(var i=1 ; i<10 ;i++){
                        //     if(user.token[i]=null){
                        user.token=user.token.concat(token)
                        user.save()
                    // }
                    // }
                                  
                    }
                    else  res.json({message:'Mật khẩu sai'})
                })
        

            }
            else  res.json({message:'Không tìm thấy'})
        })
        .catch(next)

    }
    // GET account/verify
    verify(req,res,next){
       User.findOne({token:req.query.token})
      .then(user => {
         
                     if(user.isVerified==false){
                     user.isVerified=true,
                     user.save()
                     res.render('email.html')
                    // res.json({message:'xác nhận thành công'})
                }
                    else {
                        // res.json({message:'tài khoản đã đc xác nhận trưóc đó'})
                        res.render('email.html')
                        // res.sendFile('/src/view',path.join(__dirname,'view','email.html'));
                    }
      }
                )
   
        .catch(next)
       

    }
    //PUT /account/:token
       // PUT là method để chỉnh sửa
       update(req,res,next) {
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        Movie.updateOne({email: data.email} ,req.body) // điều kiện , formdata là các bản ghi để sữa
        
        .then(() => res.json({message:'Đã cập nhập'}))
   
        .catch(next)
     
    }

    // GET account/me
    me(req,res,next){
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        .then(user => res.json(user) )
        .catch( next)
       
        
     }
     // POST account/logout  1 device
     logout(req,res,next){
        
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        // xóa token trùng với token đã đăng nhập ( truyền từng user.token vào tokenlogout sau đó kiểm tra kết quả trả về cho user.token)
        .then(user => { user.token=user.token.filter( (tokenlogout) => {return tokenlogout != token})
                        user.save()
                        res.json({message:'Đã đăng xuất'})
        })
        .catch(next)
        
     }

     // POST account/logout  all device
     logoutall(req,res,next){
        
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
        // xóa tất cả token
        .then(user => { user.token.splice(0,user.token.length)
        user.save()
        res.json({message:'Đã đăng xuất khỏi tất cả thiết bị'})
        })
        .catch(next)
       
 
     }
     changepassword(req,res,next){
        
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })
     
        .then(user => { 
            bcrypt.compare(req.body.oldpassword,user.password,function(err,result){
            if(err){
                res.json({message:'Mật khẩu cũ không đúng'})
            }
            if(result){
                bcrypt.hash(req.body.newpassword,10,function(err,hashedPass){
                    if(err){
                        res.json({message:'Lỗi đăng nhập'})
                    }
                    if(result){
                user.password=hashedPass
                user.save()
                res.json({message:'thay đổi thành công'})
                    }})
            }
       
        })
    })
        .catch(next)
       
 
     }

     resetpassword(req,res,next){
         
        User.findOne({email: req.body.email },function(err,user){
            if(!err){
                const msg = {
                    to: user.email, // Change to your recipient
                    from: 'than123456qwe@gmail.com', // Change to your verified sender
                    subject: 'Cấp lại mật khẩu Le Do Cinema',
                    text: 'Tìm mật khẩu',
                    html: `<a href="http://${req.headers.host}/account/recieve?email=${user.email}">Vui lòng kích vào đây để nhận lại mật khẩu,Nếu không phải bạn yêu cầu cấp lại mật khẩu thì không cần làm gì</a>`,
                  }
                sgMail.send(msg)
                res.json({message:'Vui lòng vào email để nhận lại mật khẩu'})
            }
            else
            res.json({message:'Không tìm thấy tài khoản'})
            
        })
     }
     recieve(req,res,next){
        User.findOne({email:req.query.email})
        .then(user => {
          var  password=shortid.generate()
            bcrypt.hash(password,10,function(err,hashedPass){
                if(!err){
                    user.password=hashedPass
                    res.json({message:'Mật khẩu mới là '+password})
                    user.save()
                }
                else
                res.json({message:'ko mã hóa đc mk'})

            })
                      
        })
     
          .catch(next)
     }
     //POST /account/avartar
     avartar(req,res,next){
        const token = req.header('auth-token')
        const data = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({email: data.email,token: token })    
        .then(user => { 
            user.avartar = req.file.path  
            user.save()         
           res.json({message:'Đã cập nhập ảnh đại diện'})
        })
        .catch(next)
         
     
}
}
module.exports = new AuthControllers;