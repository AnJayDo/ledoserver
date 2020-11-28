const express = require('express');
const router =express.Router();
const giftControllers= require('../api/controllers/GiftController');


router.get('/all',giftControllers.index);
router.post('/create',giftControllers.create); // để lưu dữ liệu khi đăng phim gift mới
router.post('/:id/get',giftControllers.get);
router.delete('/:id',giftControllers.delete);
router.put('/:id',giftControllers.update);
router.get('/:id',giftControllers.show);


module.exports = router;
