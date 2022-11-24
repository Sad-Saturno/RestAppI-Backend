require('dotenv').config();
require('colors');

const express = require('express');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./database/db');



const app = express();

//Configuracion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(cookies());

//Inicializar servidor
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server initialized on port`, PORT);

    connection.sync({ force: false }).then(() => {
        console.log(`Base de datos en linea`.green);
    }).catch((error) => {
        console.log(`Ocurrio un error ${error}`.red);
    });

});

//Rutas
const v1Router = require('./src/routes/v1');
const v1UserRoute = require('./src/routes/v1/user');
const v1OAuthRoute = require('./src/routes/v1/oauthWeb');
const v1ProductRouter = require('./src/routes/v1/product');
const v1EmployeeRoute = require('./src/routes/v1/employee');
const v1TableRoute = require('./src/routes/v1/table');
const v1LocalOrder = require('./src/routes/v1/localOrder');
const v1Conta = require('./src/routes/v1/contabilidad');
const v1Kpi = require('./src/routes/v1/kpi');

app.use('/api/v1', v1Router);
app.use('/api/v1/user', v1UserRoute);
app.use('/api/v1/oauth', v1OAuthRoute);
app.use('/api/v1/product', v1ProductRouter);
app.use('/api/v1/employee', v1EmployeeRoute);
app.use('/api/v1/table', v1TableRoute);
app.use('/api/v1/localOrder', v1LocalOrder);
app.use('/api/v1/contabilidad', v1Conta);
app.use('/api/v1/kpi', v1Kpi);