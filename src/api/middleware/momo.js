
const https = require('https');
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
require('dotenv').config()

class GiftControllers {

payment(requestId,amount,orderId,returnUrl){
    var rawSignature = "partnerCode="+process.env.PARTNER+"&accessKey="+process.env.ACCESSKEY+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo=payment"+"&returnUrl=http://localhost:3000/ticket/paymentMoMo/"+returnUrl+"&notifyUrl=http://localhost:3000/ticket/paymentMoMo/"+returnUrl+"&extraData="
var sign=  CryptoJS.HmacSHA256(rawSignature,process.env.SECRET_KEY)
    
var body=  JSON.stringify(
{
    "accessKey": process.env.ACCESSKEY,
    "partnerCode": process.env.PARTNER,
    "requestType": "captureMoMoWallet",
    "notifyUrl": "http://localhost:3000/ticket/paymentMoMo/"+returnUrl,
    "returnUrl": "http://localhost:3000/ticket/paymentMoMo/"+returnUrl,
    "orderId": orderId,
    "amount": String(amount),
    "orderInfo": "payment",
    "requestId":requestId,
    "extraData": "",
    "signature": String(sign)
  })
  var options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/gw_payment/transactionProcessor',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
   }
  }

  var req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
      console.log('Body');
      console.log(body);
      console.log('URL');
      console.log(JSON.parse(body).payUrl);
    
    })
})
  
  // write data to request body
  req.write(body);
  req.end();
}
}
module.exports = new GiftControllers;