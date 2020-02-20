// 存取資料庫

//引入先前的mysql connect
var util = require('util');
var db_sql = require('./db');

function readData(inkey, stday, endday, callback) {
    //sql = 'SELECT * FROM sur'
    //sql = SELECT * FROM mysql_nodejs.sur where id='123' and stime between '2020-02-07T06:28:30.498Z' and '2020-02-07T06:33:48.779Z'
    //SELECT * FROM mysql_nodejs.sur where id=%s and stime between %s and %s
    sql = util.format("SELECT * FROM mysql_nodejs.sur where id='%s' and stime between '%s' and '%s'", inkey, stday, endday);
    console.log(">>"+sql);
    db_sql.db(sql, function (err, results) {
        if (err)
            throw err;
        else
            //console.log(results);
            //console.log('type=>'+typeof(results))
            //return results
            //xstr="err!"
            callback(results)
        //else console.log('Selected ' + results.length + ' row(s).');

        //       for (i = 0; i < results.length; i++) {
        //           console.log('Row: ' + JSON.stringify(results[i]));
        //       }
        console.log('db get data ok !');
    })
}

function writeData(key, tm, rh, uptime) {

    str_time = uptime.toJSON();
    sql = util.format("INSERT INTO sur (id,temp, hum, stime) VALUES('%s',%d,%d,'%s')", key, tm, rh, str_time);
    console.log("db sql>>" + sql);

    db_sql.db(sql, function (err, results) {
        if (err)
            throw err;
        else
            //console.log(results);
			return;
        //else console.log('Selected ' + results.length + ' row(s).');

        //       for (i = 0; i < results.length; i++) {
        //           console.log('Row: ' + JSON.stringify(results[i]));
        //       }
        //console.log('>>upload db ok !');
    });

}

exports.readData = readData;
exports.writeData = writeData;
