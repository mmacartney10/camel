var express = require('express');
var website = express();
var http = require('http').Server(website);
var io = require('socket.io')(http);
var path = require('path');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 7000;

website.set('socket', io);

website.enable('strict routing');
website.engine('hbs', exphbs({
	extname:'hbs',
	layoutsDir:path.join(__dirname, 'views'),
	defaultLayout:'layout.hbs',
	partialsDir: [path.join(__dirname, 'views/_partials')],
}));

website.set('views', path.join(__dirname, 'views'));
website.set('view engine', 'hbs');
website.use(express.static(path.join(__dirname, '_client')));

require('./router')(website);
require('./website/socket').init(io);

http.listen(port, function () {
  console.log('Server listening on port ' + port);
});

module.exports = website;
