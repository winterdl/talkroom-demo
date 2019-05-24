var log = require("./../../utils/log");

var netbus = require("./../../netbus/netbus");
var proto_man = require("./../../netbus/proto_man");
var Respones = require("./../Respones");
var Cmd = require("./../Cmd");
var Stype = require("./../Stype");

function uname_login(session, utag, body) {
    // 验证数据合法性

    //
    var uname = body[0];
    var upwd = body[1];

}

var service = {
    name: "auth_service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag, raw_cmd) {

        log.info("~on_recv_player_cmd auth_service=", stype, ctype, body, utag, raw_cmd);

        switch (ctype) {
            case Cmd.Auth.UNAME_LOGIN:
                uname_login(session, utag, body);
                break;
        }
    },

    on_recv_server_return: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_player_disconnect: function (stype, uid) {

    }
};

module.exports = service;