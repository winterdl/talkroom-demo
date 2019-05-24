var ugame = require("./../ugame");
var auth = require("./../protobufs/auth");

cc.Class({
    extends: cc.Component,

    properties: {
        edit_uname: cc.EditBox,
        edit_pwd: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onClick: function(event, customEventData){
        if(customEventData == "btn_uname_login"){
            if(!this.edit_uname.string ||  this.edit_uname.string.length != 11){
                return;
            }

            if(!this.edit_pwd.string ||  this.edit_pwd.string.length == 0){
                return;
            }

            ugame.save_temp_uname_and_pwd(this.edit_uname.string, this.edit_pwd.string);
            auth.uname_login();
        }
    }
});
