function encode_cmd(stype, ctype, body) {
    var buf = {};
    buf[0] = stype;
    buf[1] = ctype;
    buf[2] = body;
   
    var cmd_data = JSON.stringify(buf);

    return cmd_data;
}

function decode_cmd(cmd_buf) { 
    var cmd_data = null;

    try{
        cmd_data = JSON.parse(cmd_buf);
    }catch (e) {
        cmd_data = null;
    }

    return cmd_data; 
}

module.exports = {
    encode_cmd: encode_cmd,
    decode_cmd: decode_cmd
};