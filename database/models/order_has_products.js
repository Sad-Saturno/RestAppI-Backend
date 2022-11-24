'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_has_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_has_products.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_has_products',
  });
  return order_has_products;
};