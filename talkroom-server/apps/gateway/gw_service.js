var netbus = require("./../../netbus/netbus");
var proto_man = require("./../../netbus/proto_man");
var Respones = require("./../Respones");
var Cmd = require("./../Cmd");
var Stype = require("./../Stype");

var uid_session_map = {};

function get_session_by_uid(uid) {
    return uid_session_map[uid];
}

function save_session_with_uid(uid, session) {
    uid_session_map[uid] = session;
}

function clear_session_with_uid(uid) {
    uid_session_map[uid] = null;
    delete uid_session_map[uid];
}

var service = {
    name: "broadcast service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_recv_server_return: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_player_disconnect: function (stype, uid) {

    }
};

module.exports = service;