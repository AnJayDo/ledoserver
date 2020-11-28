const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './src/resoures/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})


 