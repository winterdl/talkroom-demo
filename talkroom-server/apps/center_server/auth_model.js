var mysql_center = require("./../../database/mysql_center");


function uname_login(uname, upwd, ret_func) {
    //
    mysql_center.get_uinfo_by_uname_upwd(uname, upwd, function (status, data) {
        if(status != 0){
            var ret = {};
            ret.status = status;
            ret_func(ret);
            return;
        }

        var ret = {};
        ret.status = 0;
        ret.uid = data.uid;
        ret_func(ret);
    });
    // end
}

module.exports = {
    uname_login: uname_login
};