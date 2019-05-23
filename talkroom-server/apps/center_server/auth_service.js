function uname_login(session, utag, body) {
    
}

var service = {
    name: "auth_service",
    is_transfer: false,
    on_recv_player_cmd: function (session, stype, ctype, body, utag, raw_cmd) {
        switch (ctype) {
            case Cmd.Auth.UNAME_LOGIN:
                uname_login(session, utag, body);
                break;
        }
    },

    on_recv_server_return: function (session, stype, ctype, body, utag, raw_cmd) {

    },

    on_player_disconnect: function (stype, uid) {

    }
};

module.exports = service;