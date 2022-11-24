const { users: User } = require('../../../../database/db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const OAuthMobile = {

    registerUser: async (req, res) => {

        try {
            const { nombre, apellidos, telefono, email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });
            if (user) return res.status(400).json({ msg: 'El email o el telefono ya existe' });

            await User.build({ nombre, apellidos, direcciones, telefono, email, password }).save()
                .then((newUser) => {
                    res.status(201).json(newUser);
                }).catch((err) => {
                    res.status(400).json(`Ocurrio un error ${err}`);
                });

        } catch (error) {
            return res.status(500).json(`Ocurrio un error: ${error.message}`);
        }

    },

}

module.exports = OAuthMobile;