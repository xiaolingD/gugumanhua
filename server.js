'use strict'
const http = require('http');
const request = require('request');
const url = require('url');
const express = require('express');
const proxy = require('http-proxy-middleware');

let app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});


app.use('/api',proxy({
    "target": "https://m.dajiaochongmanhua.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api" : "/"
    }
}))
app.listen(4004,function(){
    console.log('Server start')
})

