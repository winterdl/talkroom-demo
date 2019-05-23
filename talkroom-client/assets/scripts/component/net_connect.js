var websocket = require("./../modules/websocket");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    connect_to_server: function(){
        websocket.connect("ws://127.0.0.1:6080");
    },

    start () {
        this.connect_to_server();
    },

    // update (dt) {},
});
