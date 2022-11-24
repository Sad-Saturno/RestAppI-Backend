'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, { as: 'categories', foreignKey: 'id_category' });
      products.belongsToMany(models.orders, { as: 'orders', through: 'order_has_products'  });
      products.belongsToMany(models.localOrders, { as: 'localOrders', through: 'localOrders_has_products'  });
    }
  }
  products.init({
    product_id: DataTypes.STRING,
    nombre: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    imagen: DataTypes.STRING,
    cloudinary_id: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    discount: DataTypes.BOOLEAN,
    discount_price: DataTypes.FLOAT,
    expirationDate: DataTypes.DATE,
    expirationStatus: DataTypes.STRING,
    newPrice: DataTypes.DOUBLE,
    sold: DataTypes.INTEGER,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};