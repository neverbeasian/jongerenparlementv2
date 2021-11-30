var Server  = require('fcc-express-background')
  , Router  = require('./router.js')
  , Express = require('express')
  , App     = Express()
  , Port    = 8000

Server.setupBackgroundApp(App, Router, __dirname).listen(Port, function(){
  Server.log('\u001b[' + 32 + 'm' + '[SERVER]' + '\u001b[1;32m Running on localhost')
});