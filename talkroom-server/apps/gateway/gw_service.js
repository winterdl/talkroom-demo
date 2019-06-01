var log = require("./../../utils/log");

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

function is_login_cmd(stype, ctype) {
    if(stype == Stype.Auth){
        var loginCmdList = [Cmd.Auth.UNAME_LOGIN];
        if(loginCmdList.indexOf(ctype) > -1){
            return true;
        }
    }
    return false;
}

function is_before_login_cmd(stype, ctype) {
    if(stype == Stype.Auth){
        var cmdList = [Cmd.Auth.UNAME_LOGIN];
        if(cmdList.indexOf(ctype) > -1){
            return true;
        }
    }
    return false;
}

var service = {
    name: "gw_service",
    is_transfer: true,
    on_recv_player_cmd: function (session, stype, ctype, body, utag) {

        log.info("~on_recv_player_cmd gw_service=", stype, ctype, body, utag);

        var server_session = netbus.get_server_session(stype);
        if(is_before_login_cmd(stype, ctype)){
            utag = session.session_key;
        }else {
            if(session.uid == 0){
                return;
            }
            utag = session.uid;
        }

        log.info("gw_service=", stype, ctype, body, utag);

        var cmd_json = proto_man.encode_cmd(stype, ctype, body, utag);
        server_session.send_encoded_cmd(cmd_json);
    },

    on_recv_server_return: function (session, stype, ctype, body, utag) {

        log.info(body);
        var client_session;

        if(is_before_login_cmd(stype, ctype)){
            client_session = netbus.get_client_session(utag);
            if(!client_session){
                return;
            }
            if(is_login_cmd(stype, ctype)){
                var cmd_ret = proto_man.decode_cmd(body);
                if(cmd_ret.status == 0){
                    client_session.uid = cmd_ret.uid;
                    save_session_with_uid(cmd_ret.uid, client_session);
                    cmd_ret.uid = 0;

                    body = proto_man.encode_cmd(stype, ctype, cmd_ret);
                }
            }
        }else {
            client_session = get_session_by_uid(utag);
            if(!client_session){
                return;
            }
        }

        client_session.send_encoded_cmd(body);
    },

    on_player_disconnect: function (stype, uid) {
        if(stype == Stype.Auth){
            clear_session_with_uid(uid);
        }

        var server_session = netbus.get_server_session(stype);
        if(!server_session){
            return;
        }
        var utag = uid;
        server_session.send_cmd(stype, Cmd.USER_DISCONNECT, null, utag);
    }
};

service.get_session_by_uid = get_session_by_uid;

module.exports = service;















