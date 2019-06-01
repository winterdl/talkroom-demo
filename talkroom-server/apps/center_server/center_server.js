var log = require("./../../utils/log");

var game_config = require("./../game_config");
var proto_man = require("./../../netbus/proto_man");
var netbus = require("./../../netbus/netbus");
var service_manager = require("./../../netbus/service_manager");
var Stype = require("./../Stype");

// -----中心服务，用于客户端请求时查找
var auth_service = require("./auth_service");
service_manager.register_service(Stype.Auth, auth_service);

// -----中心服务器
var center = game_config.center_server;
netbus.start_ws_server(center.port);

// -----数据库
var center_mysql_config = game_config.center_database;
var mysql_center = require("./../../database/mysql_center");
mysql_center.connect(center_mysql_config.host, center_mysql_config.port, center_mysql_config.db_name, center_mysql_config.uname, center_mysql_config.upwd);

log.info("center_server start success!");
