var util = require('util');

var LEVEL = {
    ALL: Infinity,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    NONE: -Infinity
};

var COLOR = {
    RESET: '\u001b[0m',
    INFO:  '\u001b[32m', // green   绿
    WARN:  '\u001b[33m', // yellow  黄
    ERROR: '\u001b[31m'  // red     红
}

var globalLevel = LEVEL.ALL;

var coloredOutput = true;

function setLevel(level) {
    globalLevel = level;
}

function setColoredOutput(bool) {
    coloredOutput = bool;
}

function info() {
    if (LEVEL.INFO <= globalLevel) {
        log(LEVEL.INFO, util.format.apply(null, arguments));
        // log(LEVEL.INFO, util.format(arguments));
    }
}

function warn() {
    if (LEVEL.WARN <= globalLevel) {
        log(LEVEL.WARN, util.format.apply(null, arguments));
    }
}

function error() {
    if (LEVEL.ERROR <= globalLevel) {
        log(LEVEL.ERROR, util.format.apply(null, arguments));
    }
}

function newPrepareStackTrace(error, structuredStack) {
    return structuredStack;
}

function log(level, message) {
    // get call stack and find the caller
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = newPrepareStackTrace;

    var structuredStack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;

    var caller = structuredStack[2];
    var lineSep = process.platform == 'win32' ? '\\' : '/';
    var fileNameSplited = caller.getFileName().split(lineSep);
    var fileName = fileNameSplited[fileNameSplited.length - 1]; // 文件名字
    var lineNumber = caller.getLineNumber(); // 所在行

    var columnNumber = caller.getColumnNumber(); // 所在列

    // function name may be empty if it is a global call
    // var functionName = caller.getFunctionName();
    var levelString;

    switch (level) {
        case LEVEL.INFO:
            levelString = '[INFO]';
            break;
        case LEVEL.WARN:
            levelString = '[WARN]';
            break;
        case LEVEL.ERROR:
            levelString = '[ERROR]';
            break;
        default:
            levelString = '[]';
            break;
    }

    var output = util.format('%s %s(%d,%d) %s', levelString, fileName, lineNumber, columnNumber, message);

    if (!coloredOutput) { // 没有染色
        process.stdout.write(output + '\n');
    } else { //　染色了
        switch (level) {
            case LEVEL.INFO:
                process.stdout.write(COLOR.INFO + output + COLOR.RESET + '\n');
                break;

            case LEVEL.WARN:
                process.stdout.write(COLOR.WARN + output + COLOR.RESET + '\n');
                break;

            case LEVEL.ERROR:
                process.stdout.write(COLOR.ERROR + output + COLOR.RESET + '\n');
                break;
            default:
                break;
        }
    }
}

module.exports = {
    info: info,
    warn: warn,
    error: error,
    LEVEL: LEVEL,
    setLevel: setLevel,
    setColoredOutput: setColoredOutput
};
