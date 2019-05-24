function encode_cmd(stype, ctype, body, utag) {
    var buf = {};
    buf[0] = stype;
    buf[1] = ctype;
    buf[2] = body;
    buf[3] = utag;

    var cmd_data = JSON.stringify(buf);

    return cmd_data;
}

function decode_cmd(cmd_buf) { // 不再需要根据stype ctype定位解码器了，所以去掉了这2个参数
    var cmd_data = null;

    try{
        cmd_data = JSON.parse(cmd_buf);
    }catch (e) {
        cmd_data = null;
    }

    return cmd_data; // 0:stype  1:ctype  2:body  3:utag 共4个字段
}

module.exports = {
    encode_cmd: encode_cmd,
    decode_cmd: decode_cmd
};












