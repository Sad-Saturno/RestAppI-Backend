const { users: User } = require('../../database/db');
const { address: Address } = require('../../database/db');

const UserCtrl = {

    getAllUsers: async (req, res) => {
        try {

            const allUsers = await User.findAll({
                include: {
                    association: 'address'
                },
                attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'createdAt', 'updatedAt']
            });
            if (!allUsers) return res.status(400).json(`No existe ningun usuario registrado`);

            res.status(200).json(allUsers);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneUser: async (req, res) => {

        try {

            const { id } = req.params;

            const user = await User.findByPk(id, {
                include: {
                    association: 'address'
                },
                attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'createdAt', 'updatedAt']
            });
            if (!user) return res.status(400).json(`No existe ningun usuario registrado con el id ${id}`);

            res.status(200).json(user);


        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateUser: async (req, res) => {

        try {

            const { id } = req.params;
            const { nombre, apellidos, direcciones, telefono, email, role } = req.body;

            await User.update({ nombre, apellidos, direcciones, telefono, email, role }, { where: { id: id } }).then(() => {
                res.status(200).json('Usuario actualizado');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    createAddress: async (req, res) => {

        try {

            const { user_id, calle, numInt, numExt, colonia, cp, ciudad, estado, pais, lat, lng } = req.body;

            await Address.build({
                user_id, calle, numInt, numExt, colonia, cp,
                ciudad, estado, pais, lat, lng
            }).save().then(newAddress => {
                res.status(200).json(newAddress);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getAllAdresses: async (req, res) => {

        try {

            const allAdresses = await Address.findAll({
                include: {
                    association: 'user',
                    attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'createdAt', 'updatedAt']
                }
            });
            if (!allAdresses) return res.status(400).json(`No existe ninguna direccion registrada`);

            res.status(200).json(allAdresses);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateAddress: async (req, res) => {

        try {

            const { id } = req.params;
            const { calle, numInt, numExt, colonia, cp, ciudad, estado, pais, lat, lng } = req.body;

            await Address.update({
                calle, numInt, numExt, colonia, cp,
                ciudad, estado, pais, lat, lng
            }, { where: { id: id } }).then(() => {
                res.status(200).json('Direccion actualizada');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteAddress: async (req, res) => {

        try {

            const { id } = req.params;

            await Address.destroy({ where: { id: id } }).then(() => {
                res.status(200).json(`La direccion con el id ${id} se elimino`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    }


}

module.exports = UserCtrl;