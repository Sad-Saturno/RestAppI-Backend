const { employees: Employee } = require('../../../../database/db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const OAuthWeb = {

    registerEmployee: async (req, res) => {

        try {
            const { nombre, apellidos, telefono, email, password, role } = req.body;

            const employee = await Employee.findOne({ where: { email: email } });
            if (employee) return res.status(400).json({ msg: 'El correo electrónico ya existe' });

            await Employee.build({ nombre, apellidos, telefono, email, password, role }).save()
                .then((newEmployee) => {
                    res.status(201).json(newEmployee);
                }).catch((err) => {
                    res.status(400).json(`Ocurrio un error ${err}`);
                });

        } catch (error) {
            return res.status(500).json(`Ocurrio un error: ${error.message}`);
        }

    },

    login: async (req, res) => {

        try {

            const { email, password } = req.body;

            const employee = await Employee.findOne({ where: { email: email } });
            if (!employee) return res.status(400).json({ msg: `El usuario con email ${email} no existe` });

            const isMatch = await bcrypt.compare(password, employee.password);
            if(!isMatch) return res.status(400).json({msg: "Contraseña incorrecta."});

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: employee.id});
            const refreshtoken = createRefreshToken({id: employee.id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/v1/oauth/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            });

            res.json({accesstoken});

        } catch (error) {
            return res.status(500).json(`Ocurrio un error: ${error.message}`);
        }

    },

    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, employees) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: employees.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },

    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/api/v1/oauth/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getEmployeeInfo: async (req, res) =>{
        try {

            const employee = await Employee.findOne({ 
                where: {
                    id: req.employees.id
                },  
                include: {
                    association: 'address'
                },
                attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'role', 'createdAt', 'updatedAt']
            });
            if(!employee) return res.status(400).json({msg: "El empleado no existe"});

            res.json(employee);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

const createAccessToken = (employees) =>{
    return jwt.sign(employees, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (employees) =>{
    return jwt.sign(employees, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = OAuthWeb;