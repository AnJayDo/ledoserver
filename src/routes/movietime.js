const express = require('express');
const router =express.Router();
const mvtControllers= require('../api/controllers/MVTController');


router.post('/:id/create',mvtControllers.create); // để lưu dữ liệu khi đăng phim mvt mới
router.delete('/:id',mvtControllers.delete);
router.put('/:id',mvtControllers.update);
router.get('/:id',mvtControllers.show); // lấy suất chiếu theo phim


module.exports = router;
