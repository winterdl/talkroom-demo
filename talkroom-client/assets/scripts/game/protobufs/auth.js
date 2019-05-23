var websocket = require("./../../modules/websocket");
var Stype = require("./../Stype");
var Cmd = require("./../Cmd");
var ugame = require("./../ugame");

function uname_login(){
    var body = {
        0: ugame.uname,
        1: ugame.upwd
    };
    websocket.send_cmd(Stype.Auth, Cmd.Auth.UNAME_LOGIN, body);
}

module.exports = {
    uname_login: uname_login
}