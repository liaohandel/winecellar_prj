//引入先前的db.js
//var config = require("./db.js");
var express = require('express');
var app = express();
var fs = require('fs');
var dbtool = require("./Access_data");
var util = require("util")

var mask_drvkey=""
var mask_uptime=0

//app.engine('jade', require('jade').__express);

// 設定靜態檔案所在目錄
app.use(express.static(__dirname + '/views'));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

//=========================================================
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/show', function (req, res) {
    fs.readFile(__dirname + '/views/Group_picture1.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//設備1
app.get('/scart1', function (req, res) {
    console.log(req.query.key);//key =
    fs.readFile(__dirname + '/views/scart1.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//設備2
app.get('/scart2', function (req, res) {
    console.log(req.query.key);//key =
    fs.readFile(__dirname + '/views/scart2.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//save to mqsql 
app.get('/upload', function (req, res) {
    //console.log(req.query.api_key);//field1 =
    //console.log(req.query.field1);//field1 =
    //console.log(req.query.field2);//field2 =
	
    sapi = util.format("http://192.168.1.114/getload?api_key=%s&field1=%s&field2=%s",req.query.api_key,  req.query.field1, req.query.field2)
    console.log(sapi)
	if((typeof(req.query.api_key) == "undefined") || (typeof(req.query.field1) == "undefined") || (typeof(req.query.field2) == "undefined")){		
		jobj = { "success" : "false" };  
		console.log(JSON.stringify(jobj));
		res.json(jobj);
		return;
	}
    uptime = new Date();
	console.log("##1>>",uptime)
	unow = uptime.getTime()
	if( (mask_drvkey == req.query.api_key) && ((unow-mask_uptime)<=(1000 *60*5)) ){		
		jobj = { "success" : "false" }; 
		res.json(jobj);
		return;
	}else{
		mask_drvkey=req.query.api_key;
		mask_uptime=unow;
	}
	uu = unow + (1000 *60*60)*8 //Taipe [+8h]
	xuptime = new Date(uu)
	console.log("##2>>",xuptime)
    dbtool.writeData(req.query.api_key, req.query.field1, req.query.field2, xuptime);
    res.end();
});

//get from mysql 讀
app.get('/getload', function (req, res) {
    //console.log(req.query.field1);//field1= inkey
    //console.log(req.query.field2);//field2= stday
    //console.log(req.query.field3);//field3= endday
	
    var inkey = req.query.field1
    var stday = req.query.field2
    var endday = req.query.field3
	sapi = util.format("http://192.168.1.114/getload?field1=%s&field2=%s&field3=%s",inkey, stday, endday)
    console.log(sapi)
	if((typeof(inkey) == "undefined") || (typeof(stday) == "undefined") || (typeof(endday) == "undefined")){		
		jobj = { "success" : "false" };  
		console.log(JSON.stringify(jobj));
		res.json(jobj);
		return;
	}
    //console.log(req.query.field4);//field4= 日期(確定按鈕)
    jdata = {}
    dbtool.readData(inkey, stday, endday, function (jdata) {
        //console.log(jdata); 
        res.json(jdata);
    });
    //res.send(jdata);
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});
