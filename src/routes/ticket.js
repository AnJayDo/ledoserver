const express = require('express');
const router =express.Router();
const ticketControllers= require('../api/controllers/TicketController');


router.get('/history',ticketControllers.show);
router.get('/paymentMoMo/:id',ticketControllers.paymentMoMo); // thanh toan vi momo
router.post('/:id/create',ticketControllers.create); // để lưu dữ liệu khi đăng phim ticket mới


module.exports = router;
