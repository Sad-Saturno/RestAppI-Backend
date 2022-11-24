'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.address, { as: 'address', foreignKey: "user_id" });
      users.belongsToMany(models.roles, { as: 'roles', through: 'user_has_roles'  });
      users.hasMany(models.orders, { as: 'orders', foreignKey: 'id_user' });
    }
  }
  users.init({
    id_costumer: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    is_available: DataTypes.INTEGER,
    session_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate(async (user) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (error) {
      throw new Error();
    }
  });

  return users;
};