const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
  return sequelize.define('Job', {
    // Model attributes
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    http_code: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'links'
  });
};

module.exports.STATUS = {
  NEW: "NEW",
  RUN: "PROCESSING",
  ERR: "ERROR",
  DONE: "DONE"
};