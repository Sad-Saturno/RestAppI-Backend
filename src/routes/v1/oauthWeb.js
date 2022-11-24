const router = require('express').Router();
const { registerEmployee, login, getEmployeeInfo, refreshToken, logout } = require('../../controllers/auth/web/oauth');
const auth = require('../../middlewares/auth');

router
    .post('/registerEmployee', registerEmployee)
    .post('/login', login)
    .get('/employeeInfo', auth, getEmployeeInfo)
    .get('/refresh_token', refreshToken)
    .get('/logout', logout)

module.exports = router;