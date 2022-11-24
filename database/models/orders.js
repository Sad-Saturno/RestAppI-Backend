'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsToMany(models.products, { as: 'products', through: 'order_has_products' });
      orders.belongsTo(models.users, { as: 'users', foreignKey: 'id_user' });
      orders.belongsTo(models.address, { as: 'address', foreignKey: 'id_address' });
    }
  }
  orders.init({
    id_delivery: DataTypes.BIGINT,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    timestamp: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};