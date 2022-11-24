'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employees.hasMany(models.address, { as: 'address', foreignKey: "employee_id" });
    }
  }
  employees.init({
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employees',
  });

  employees.beforeCreate(async (employee) => {
    try {
      const hash = await bcrypt.hash(employee.password, 10);
      employee.password = hash;
    } catch (error) {
      throw new Error();
    }
  });

  return employees;
};