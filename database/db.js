const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');
const db = {};

db.connection = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, {
    host: config.development.host,
    logging: false,
    dialect: config.development.dialect,
    port: config.development.port
});

//Se vinculan los modelos generados en la base de datos
db.contabilidad = require('./models/contabilidad')(db.connection, DataTypes);
db.address = require('./models/address')(db.connection, DataTypes);
db.employees = require('./models/employees')(db.connection, DataTypes);
db.localOrders = require('./models/localorders')(db.connection, DataTypes);
db.tables = require('./models/tables')(db.connection, DataTypes);
db.products = require('./models/products')(db.connection, DataTypes);
db.categories = require('./models/categories')(db.connection, DataTypes);
db.localorders_has_products = require('./models/localorders_has_products')(db.connection, DataTypes);

//Se vinculan las asociaciones
db.employees.associate(db);
db.tables.associate(db);

db.address.associate(db.connection.models);
db.products.associate(db.connection.models);
db.localOrders.associate(db)
db.categories.associate(db.connection.models);

module.exports = db;