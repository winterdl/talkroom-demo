var mysql = require("mysql");
var util = require("util");
var Respones = require("./../apps/Respones");

var conn_pool = null;

function connect_to_center(host, port, db_name, uname, upwd) {
    conn_pool = mysql.createPool({
        host: host,
        port: port,
        database: db_name,
        user: uname,
        password: upwd
    });
}

function mysql_exec(sql, callback) {
    conn_pool.getConnection(function (err, conn) {
        if(err){
            if(callback){
                callback(err, null, null);
            }
            return;
        }

        conn.query(sql, function (sql_err, sql_result, fields_desic) {
            conn.release();

            if(sql_err){
                if(callback){
                    callback(sql_err, null, null);
                }
                return;
            }

            if(callback){
                callback(null, sql_result, fields_desic);
            }
        });
    });
}

function get_uinfo_by_uname_upwd(uname, upwd, callback){
    var sql = 'SELECT uid FROM t_user WHERE uname = "%s" and upwd = "%s limit 1"';
    var sql_cmd = util.format(sql, uname, upwd);
    console.log(sql_cmd);
    mysql_exec(sql_cmd, function (err, sql_ret, field_desic) {
        if(err){
            callback(Respones.Auth.ACCOUNT_NOT_EXIST, {errmsg: "账号不存在"}); // 没有注册
            return;
        }
        callback(0, sql_ret);
    })
}

module.exports = {
    connect: connect_to_center,
    get_uinfo_by_uname_upwd: get_uinfo_by_uname_upwd,
};