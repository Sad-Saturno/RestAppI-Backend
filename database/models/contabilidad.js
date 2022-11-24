'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contabilidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contabilidad.init({
    total_cierre: DataTypes.DOUBLE,
    cuentas_atendidas: DataTypes.INTEGER,
    mes_cierre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contabilidad',
  });
  return contabilidad;
};