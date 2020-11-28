 const homeRoute = require('./home');
 const movieRoute = require('./movies');
 const accountRoute = require('./account');
 const eventRoute = require('./event');
 const giftRoute = require('./gift');
 const theaterRoute = require('./theater');
 const movietimeRoute = require('./movietime');
 const ticketRoute = require('./ticket');


function route(app){
    app.use('/.netlify/functions/server', homeRoute); 
    app.use('/event',eventRoute); // trang sự kiện
    app.use('/movie',movieRoute); // trang movie
    app.use('/account',accountRoute); // trang accout
    app.use('/movietime',movietimeRoute); // trang accout
    app.use('/ticket',ticketRoute); // trang accout
    app.use('/gift',giftRoute); // trang gift
    app.use('/theater',theaterRoute); // trang theater
    app.use('/',homeRoute); // trang chủ showw all phim
}
 module.exports = route;