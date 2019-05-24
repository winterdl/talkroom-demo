var log = require("./../../utils/log");

var netbus = require("./../../netbus/netbus");
var service_manager = require("./../../netbus/service_manager");
var talkroom_service = require("./talkroom_service");
var game_config = require("./../game_config");
var Stype = require("./../Stype");

var talkroom = game_config.talkroom_server;

netbus.start_ws_server(talkroom.port);

service_manager.register_service(Stype.TalkRoom, talkroom_service);

log.info("talkroom_server start success!");