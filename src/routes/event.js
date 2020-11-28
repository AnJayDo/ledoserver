const express = require('express');
const router =express.Router();
const eventControllers= require('../api/controllers/EventController');
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

router.get('/all',eventControllers.index);
router.post('/create',upload.single('image'),eventControllers.create); // để lưu dữ liệu khi đăng phim event mới
router.delete('/:id',eventControllers.delete);
router.put('/:id',upload.single('image'),eventControllers.update);
router.get('/:slug',eventControllers.show);


module.exports = router;
