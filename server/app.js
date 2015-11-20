var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors());
app.options(/\.*/, function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.send(200);
    });

app.get('/', function (req, res) {
  res.send('This is an update server');
});

var updatesObj = [
	{ver: 1001, files: ["templates/tabs.html","js/files4.txt"], desc: "This update will change footer style."},
	{ver: 1002, files: ["index.html","js/files4.txt"], desc: "This update will change header style."},
	{ver: 1003, files: ["templates/tab-dash.html","js/files5.txt"], desc: "This update will update content on 'Status' page. (App restart may be needed)."}
]
app.get('/update', function (req, res) {
	console.log("API Update request received.");
  res.send(updatesObj);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Update server start listening at http://%s:%s', host, port);
});

app.use(express.static('updates'));



