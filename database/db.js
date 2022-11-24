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
db.users = require('./models/users')(db.connection, DataTypes);
db.contabilidad = require('./models/contabilidad')(db.connection, DataTypes);
db.roles = require('./models/roles')(db.connection, DataTypes);
db.address = require('./models/address')(db.connection, DataTypes);
db.employees = require('./models/employees')(db.connection, DataTypes);
db.localOrders = require('./models/localorders')(db.connection, DataTypes);
db.tables = require('./models/tables')(db.connection, DataTypes);
db.products = require('./models/products')(db.connection, DataTypes);
db.orders = require('./models/orders')(db.connection, DataTypes);
db.categories = require('./models/categories')(db.connection, DataTypes);
db.localorders_has_products = require('./models/localorders_has_products')(db.connection, DataTypes);
db.order_has_products = require('./models/order_has_products')(db.connection, DataTypes);

//Se vinculan las asociaciones
db.users.associate(db);
db.employees.associate(db);
db.tables.associate(db);

db.roles.associate(db.connection.models);
db.address.associate(db.connection.models);
db.products.associate(db.connection.models);
db.orders.associate(db.connection.models)
db.localOrders.associate(db)
db.categories.associate(db.connection.models);

module.exports = db;