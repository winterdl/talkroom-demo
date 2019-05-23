var proto_man = require("./proto_man");

var websocket = {
    sock: null,
    services_handler: null,
    is_connected: false,

    _on_opened: function(){
        this.is_connected = true;
    },

    _on_recv_data: function(event){
        var str_or_buf = event.data;
        if(!this.services_handler){
            return;
        }

        var cmd = proto_man.decode_cmd(str_or_buf);
        if(!cmd){
            return;
        }

        var stype = cmd[0];
        if(this.services_handler[stype]){
            this.services_handler[stype](cmd[0], cmd[1], cmd[2]);
        }else{
            cc.log("warn!!! client unregister callback stype=", stype);
        }
    },

    _on_socket_close: function(){
        cc.log("disconnected!!!");
        if(this.sock){
            this.close();
        }
    },

    _on_socket_err: function(){

    },

    connect: function(url){
        this.sock = new WebSocket(url);
        this.sock.binaryType = "arraybuffer";
        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
    },

    send_cmd: function(stype, ctype, body){
        if(!this.sock || !this.is_connected || this.sock.readyState != WebSocket.OPEN){
            return;
        }

        var buf = proto_man.encode_cmd(stype, ctype, body);
        this.sock.send(buf);
    },

    close: function(){
        this.is_connected = false;
        if(this.sock){
            this.sock.close();
            this.sock = null;
        }
    },

    register_services_handler: function(services_handler){
        this.services_handler = services_handler;
    },

    unregister_services_handler: function(){
        this.services_handler = null;
    }
}

module.exports = websocket;