var game_config = require("./../game_config");
var netbus = require("./../../netbus/netbus");
var service_manager = require("./../../netbus/service_manager");

var gw_service = require("./gw_service");
var bc_service = require("./bc_service");

var Stype = require("./../Stype");

var port = game_config.gateway_config.port;

netbus.start_ws_server(port, true);

service_manager.register_service(Stype.Broadcast, bc_service);

var game_server = game_config.gw_connect_servers;

for(var key in game_server){
    netbus.connect_tcp_server(
        game_server[key].stype,
        game_server[key].host,
        game_server[key].port
    );

    service_manager.register_service(game_server[key].stype, gw_service);
}

console.log("gw start success!");