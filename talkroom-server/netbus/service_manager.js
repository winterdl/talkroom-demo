var proto_man = require("./proto_man");

var service_modules = {};

function register_service(stype, service) {
    if(service_modules[stype]){
        console.log(service_modules[stype].name, "is registered!!!");
    }
    service_modules[stype] = service;
}

function on_recv_server_return(session, cmd_buf) {
    var stype, ctype, body, utag;
    var cmd = proto_man.decode_cmd(cmd_buf);

    if(!cmd){
        return false;
    }

    stype = cmd[0];
    ctype = cmd[1];
    body = cmd[2];
    utag = cmd[3];

    service_modules[stype].on_recv_server_return(session, stype, ctype, body, utag, body);
    return true;
}

function on_recv_client_cmd(session, cmd_buf) {
    var stype, ctype, body, utag;
    var cmd = proto_man.decode_cmd(cmd_buf);
    if(!cmd){
        return false;
    }

    stype = cmd[0];
    ctype = cmd[1];
    body = cmd[2];
    utag = cmd[3];

    if(!service_modules[stype]){
        return false;
    }

    service_modules[stype].on_recv_player_cmd(session, stype, ctype, body, utag, body);
    return true;
}

function on_client_lost_connect(session) {
    var uid = session.uid;
    if(uid == 0){
        return;
    }
    session.uid = 0;
    for(var key in service_modules){
        service_modules[key].on_player_disconnect(key, uid);
    }
}

module.exports = {
    on_client_lost_connect: on_client_lost_connect,
    on_recv_client_cmd: on_recv_client_cmd,
    on_recv_server_return: on_recv_server_return,
    register_service: register_service
};











