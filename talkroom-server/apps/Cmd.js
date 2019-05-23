var Cmd = {
    USER_DISCONNECT: 10000,
    BROADCAST: 10001,

    TalkRoom:{
        Enter: 1,
        Exit: 2,
        UserArrived: 3,
        UserExit: 4,
        SendMsg: 5,
        UserMsg: 6,
    },

    Auth:{
        RELOGIN: 2,
        UNAME_LOGIN: 6,
    }
};

module.exports = Cmd;