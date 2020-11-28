const express = require('express');
const router =express.Router();
const theaterControllers= require('../api/controllers/TheaterController');


router.get('/all',theaterControllers.index);
router.post('/create',theaterControllers.create); // để lưu dữ liệu khi đăng phim theater mới
router.delete('/:id',theaterControllers.delete);
router.put('/:id',theaterControllers.update);
router.get('/:slug',theaterControllers.show);


module.exports = router;
