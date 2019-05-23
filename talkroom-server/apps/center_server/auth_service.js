var service = {
    name: "auth_service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_recv_server_return: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_player_disconnect: function (stype, uid) {

    }
};

module.exports = service;