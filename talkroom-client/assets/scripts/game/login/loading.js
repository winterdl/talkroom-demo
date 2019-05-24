var websocket = require("./../../modules/websocket");
var Stype = require("./../Stype");
var Cmd = require("./../Cmd");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var service_handlers = {};
        service_handlers[Stype.Auth] = this.on_auth_server_return.bind(this);
    },

    start () {

    },

    on_auth_server_return: function(stype, ctype, body){
        switch(ctype){
            case Cmd.Auth.UNAME_LOGIN:
                cc.log("UNAME_LOGIN body=", body);
                break;
        }
    }
});
