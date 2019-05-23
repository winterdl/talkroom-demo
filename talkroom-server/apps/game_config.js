var Stype = require("./Stype");
var HOST_IP = "127.0.0.1";

var game_config = {
    GATEWAY_CONNECT_IP: "127.0.0.1",

    gateway_config:{
        host: HOST_IP,
        port: 6080
    },

    gw_connect_servers: {
        0: {
            stype: Stype.TalkRoom,
            host: HOST_IP,
            port: 6084
        }
    }
};

module.exports = game_config;