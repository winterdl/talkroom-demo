var game_config = require("./../game_config");
var proto_man = require("./../../netbus/proto_man");
var netbus = require("./../../netbus/netbus");
var service_manager = require("./../../netbus/service_manager");
var Stype = require("./../Stype");

var auth_service = require("./auth_service");

var center = game_config.center_server;

netbus.start_ws_server(center.port);

service_manager.register_service(Stype.Auth, auth_service);

console.log("center_server start success!");