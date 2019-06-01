var mysql_center = require("./../../database/mysql_center");

function write_err(status, data, ret_func) {
    var ret = {};
    ret.status = status;
    ret.errmsg = data.errmsg;
    ret_func(ret);
}

function uname_login_success(data, ret_func) {
    var ret = {};
    ret.status = 0;
    ret.uid = data.uid;
    ret_func(ret);
}

function uname_login(uname, upwd, ret_func) {
    mysql_center.get_uinfo_by_uname_upwd(uname, upwd, function (status, data) {
        if(status != 0){
            write_err(status, data, ret_func);
            return;
        }
        uname_login_success(data, ret_func);
    });
}

module.exports = {
    uname_login: uname_login
};