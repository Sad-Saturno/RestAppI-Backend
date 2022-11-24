'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class localOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      localOrders.belongsTo(models.tables, { as: 'tables', foreignKey: 'table_id' });
      localOrders.belongsToMany(models.products, { as: 'products', through: 'localOrders_has_products' });
    }
  }
  localOrders.init({
    status: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    emailcostumer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'localOrders',
  });
  return localOrders;
};