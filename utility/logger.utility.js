const winston   = require('winston');
const rootPath = require('app-root-path').path;
const logpath   = rootPath+'/log/';
                  
const getFileDateTime = () => {
  var current_date = new Date();
  return current_date.getFullYear() + '_' + (current_date.getMonth() + 1) + '_' + current_date.getDate();
}

const getTimestamp = (_m) => {
  if (_m === 1) {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  } else {
    return new Date();
  }
}

const getFormat = () => {
  return winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  )
}

const getFileName = (dir="application_",level) => {
  var _f = logpath + dir;
  return _f + level + '_' + getFileDateTime() + '.log';
}

const debug = (dir) => {
  var _fn = getFileName(dir,'debug');
  return winston.createLogger({
    levels: {
      debug: 0
    },
    format: getFormat(),
    defaultMeta: { IST: getTimestamp(1) },
    transports: [
      new (winston.transports.File)({ filename: _fn, level: 'debug' })
    ]
  });
}

const info = (dir) => {
  var _fn = getFileName(dir,'info');
  return winston.createLogger({
    levels: {
      info: 1
    },
    format: getFormat(),
    defaultMeta: { IST: getTimestamp(1) },
    transports: [
      new (winston.transports.File)({ filename: _fn, level: 'info' })
    ]
  });
}

const warn = (dir) => {
  var _fn = getFileName(dir,'warn');
  return winston.createLogger({
    levels: {
      warn: 2
    },
    format: getFormat(),
    defaultMeta: { IST: getTimestamp(1) },
    transports: [
      new (winston.transports.File)({ filename: _fn, level: 'warn' })
    ]
  });
}

const error = (dir) => {
  var _fn = getFileName(dir,'error');
  return winston.createLogger({
    levels: {
      error: 3
    },
    format: getFormat(),
    defaultMeta: { IST: getTimestamp(1) },
    transports: [
      new (winston.transports.File)({ filename: _fn, level: 'error' })
    ]
  });
}

module.exports = {
  debug: function (msg, dir) {
    debug(dir).debug(msg);
  },
  info: function (msg, dir) {
    info(dir).info(msg);
  },
  warn: function (msg, dir) {
    warn(dir).warn(msg);
  },
  error: function (msg, dir) {
    error(dir).error(msg);
  },
  log: function (level, msg, dir) {
    var lvl = exports[level];
    lvl(msg, dir);
  }
};