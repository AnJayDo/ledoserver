const express = require('express');
const router =express.Router();
const authControllers= require('../api/controllers/AuthController');
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

router.post('/login',authControllers.login);
router.post('/register',authControllers.register);
router.get('/me',authControllers.me);
router.post('/logout',authControllers.logout);
router.post('/logoutall',authControllers.logoutall);
router.post('/changepassword',authControllers.changepassword);
router.post('/resetpassword',authControllers.resetpassword); // yêu cầu cấp lại mk
router.get('/recieve',authControllers.recieve); // nhận lại mk
router.get('/verify',authControllers.verify);
router.put('/update',authControllers.update);
router.put('/avartar',upload.single('avartar'),authControllers.avartar);






module.exports = router;
