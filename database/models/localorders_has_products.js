'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class localOrders_has_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  localOrders_has_products.init({
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'localOrders_has_products',
  });
  return localOrders_has_products;
};