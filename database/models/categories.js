'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.products, { as: 'products', foreignKey: 'id_category' })
    }
  }
  categories.init({
    nombre: DataTypes.STRING,
    cloudinary_id: DataTypes.STRING,
    image: DataTypes.STRING,
    createdat: DataTypes.STRING,
    updatedat: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'categories',
  });
  return categories;
};