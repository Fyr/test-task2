const { Sequelize } = require("sequelize");
const cfg = require("../db-config");
module.exports = new Sequelize(cfg.database, cfg.username, cfg.password, {
  host: cfg.host,
  dialect: cfg.dialect,
  logging: false// console.log
});
