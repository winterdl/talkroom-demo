var proto_man = require("./../../netbus/proto_man");
var Cmd = require("./../Cmd");

var room = {};

var service = {
    name: "talkroom_service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag, raw_cmd) {
        console.log("talkroom", stype, ctype, body, utag, raw_cmd);
    },

    on_recv_server_return: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_player_disconnect: function (stype, uid) {

    }
};

module.exports = service;