var ugame = {
    uname: null,
    upwd: null,

    save_temp_uname_and_pwd: function(uname, upwd){
        this.uname = uname;
        this.upwd = upwd;
    }
};

module.exports = ugame;