const fs = require("fs");
const path = require("path");

/**
 * Simple logger that logs into console and file
 */
const LOG_FILE = 'run.log'; // this is a setting for a file log

class Logger {

  constructor() {
    this.filename = LOG_FILE;
    const dir = path.dirname(this.filename);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Returns current file name used for log
   * @return {string}
   */
  getFileName() {
    return this.filename;
  }

  /**
   * Performs log operation
   * @param {string} type - type of log item
   * @param {string} msg - message for log
   * @param {object} data - a bulk data to log
   */
  log(type, msg, data) {
    const _date = (new Date).toISOString();
    const _data = (data === undefined) ? "" : JSON.stringify(data);
    const _msg = `${_date} ${type.toUpperCase()} ${msg} ${_data}`;

    // log into console
    console.log(_msg);

    // log into file
    const options = {
      encoded: 'utf8',
      mode: 0o644,
      flag: 'a+'
    };
    fs.writeFileSync(this.getFileName(), _msg + "\r\n", options);
  }

  info(msg, data) {
    this.log('info', msg, data);
  }

  error(msg, data) {
    this.log('error', msg, data);
  }
}
module.exports = Logger;
