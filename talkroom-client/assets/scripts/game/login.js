var websocket = require("./../modules/websocket");
var Stype = require("./Stype");
var Cmd = require("./Cmd");
var Respones = require("Respones");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var service_handlers = {};
        service_handlers[Stype.Auth] = this.on_auth_server_return.bind(this);
        websocket.register_services_handler(service_handlers);
    },

    on_auth_server_return: function(stype, ctype, body){
        switch(ctype){
            case Cmd.Auth.UNAME_LOGIN:
                break;
        }
    }
});

