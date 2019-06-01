var gw_service = require("./gw_service");

var service = {
    name: "broadcast service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag) {
        
    },
    
    on_recv_server_return: function (session, stype, ctype, body, utag) {
        
    },
    
    on_player_disconnect: function (stype, uid) {
        
    }
};

module.exports = service;