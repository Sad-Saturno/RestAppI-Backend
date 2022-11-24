'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.belongsTo(models.users, { as: "user", foreignKey: "user_id" });
      address.belongsTo(models.employees, { as: "employee", foreignKey: "employee_id" });
      address.hasMany(models.orders, { as: 'orders', foreignKey: 'id_address' });
    }
  }
  address.init({
    calle: DataTypes.STRING,
    numInt: DataTypes.INTEGER,
    numExt: DataTypes.INTEGER,
    colonia: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    ciudad: DataTypes.STRING,
    estado: DataTypes.STRING,
    pais: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};