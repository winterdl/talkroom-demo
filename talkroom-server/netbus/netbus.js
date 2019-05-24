var log = require("./../utils/log");

var ws = require("ws");
var WebSocket = require("ws");
var proto_man = require("./proto_man");
var service_manager = require("./service_manager");

var global_session_list = {};
var global_session_key = 1;
var server_connect_list = {};

function get_client_session(session_key) {
    return global_session_list[session_key];
}

function on_session_enter(session, isClientToGw) {
    if(isClientToGw){
        log.info("【 client", session._socket.remoteAddress, session._socket.remotePort, "】connect gw success!");
    }else{
        log.info("【 gw", session._socket.remoteAddress, session._socket.remotePort, "】connect business server success!");
    }


    session.is_connected = true;
    session.uid = 0;
    session.send_encoded_cmd = session_send_encoded_cmd.bind(session);
    session.send_cmd = session_send_cmd.bind(session);

    global_session_list[global_session_key] = session;
    session.session_key = global_session_key;
    global_session_key++;
}

function on_session_exit(session) {
    session.is_connected = false;
    service_manager.on_client_lost_connect(session);
    if(global_session_list[session.session_key]){
        global_session_list[session.session_key] = null;
        delete global_session_list[session.session_key];
        session.session_key = null;
    }
}

function on_session_recv_cmd(session, str_or_buf) {
    if(!service_manager.on_recv_client_cmd(session, str_or_buf)){
        session_close(session);
    }
}

function session_send_encoded_cmd(cmd) {
    if(!this.is_connected){
        return;
    }
    this.send(cmd);
}

function session_send_cmd(stype, ctype, body, utag) {
    if(!this.is_connected){
        return;
    }
    var cmd = proto_man.encode_cmd(stype, ctype, body, utag);
    if(cmd){
        this.send_encoded_cmd(cmd);
    }
}

function session_close(session) {
    session.close();
}

function ws_add_client_session_event(session, isClientToGw) {
    session.on("close", function () {
        on_session_exit(session);
        session.close();
    });

    session.on("error", function (err) {

    });

    session.on("message", function (data) {
        on_session_recv_cmd(session, data);
    });

    on_session_enter(session, isClientToGw);
}

function start_ws_server(port, isClientToGw) {
    var server = new ws.Server({
        port: port
    });

    server.on("connection", function (client_sock) {
        ws_add_client_session_event(client_sock, isClientToGw);
    });

    server.on("error", function (err) {
        
    });

    server.on("close", function (err) {
        
    });
}

function get_server_session(stype) {
    return server_connect_list[stype];
}

function connect_tcp_server(stype, host, port) {
    var session = new WebSocket("ws://"+ host + ":" + port);
    session.binaryType = "arraybuffer";
    session.is_connected = false;
    session.onopen = function () {
        on_session_connected(stype, session);
    };
    
    session.onclose = function () {
        if(session.is_connected == true){
            on_session_disconnect(session);
        }
        session.close();

        setTimeout(function () {
            log.warn("warning!!! gw connect to 【 business server stype=", stype, "port=", port, "】 failed, waiting reconnect...");
            connect_tcp_server(stype, host, port);
        }, 3000);
    };
    
    session.onmessage = function (event) {
        on_recv_cmd_server_return(session, event.data);
    };

    session.onerror = function () {

    };
}

function on_session_connected(stype, session) {
    log.info("gw connect to【 business server", session._socket.remoteAddress, session._socket.remotePort, 'stype=', stype, "】success");
    session.is_connected = true;
    session.send_encoded_cmd = session_send_encoded_cmd.bind(session);
    session.send_cmd = session_send_cmd.bind(session);

    server_connect_list[stype] = session;
    session.session_key = stype;
}

function on_session_disconnect(session) {
    session.is_connected = false;
    var stype = session.session_key;
    session.session_key = null;
    if(server_connect_list[stype]){
        server_connect_list[stype] = null;
        delete server_connect_list[stype];
    }
}

function on_recv_cmd_server_return(session, str_or_buf) {
    if(!service_manager.on_recv_server_return(session, str_or_buf)){
        session_close(session);
    }
}

module.exports = {
    start_ws_server: start_ws_server,
    connect_tcp_server: connect_tcp_server,
    session_close: session_close,
    get_client_session: get_client_session,
    get_server_session: get_server_session
};











