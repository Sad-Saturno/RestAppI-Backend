const { employees: Employee } = require('../../database/db');
const { address: Address } = require('../../database/db');

const UserCtrl = {

    getAllEmployees: async (req, res) => {
        try {

            const allEmployees = await Employee.findAll({
                include: {
                    association: 'address'
                },
                attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'role', 'createdAt', 'updatedAt']
            });
            if (!allEmployees) return res.status(400).json(`No existe ningun usuario registrado`);

            res.status(200).json(allEmployees);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneEmployee: async (req, res) => {

        try {

            const { id } = req.params;

            const employee = await Employee.findByPk(id, {
                include: {
                    association: 'address'
                },
                attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'role', 'createdAt', 'updatedAt']
            });
            if (!employee) return res.status(400).json(`No existe ningun empleado registrado con el id ${id}`);

            res.status(200).json(employee);


        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateEmployee: async (req, res) => {

        try {

            const { id } = req.params;
            const { nombre, apellidos, direcciones, telefono, email, role } = req.body;

            await Employee.update({ nombre, apellidos, direcciones, telefono, email, role }, { where: { id: id } }).then(() => {
                res.status(200).json('Empleado actualizado');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteEmployee: async(req, res) => {

        try {

            const { id } = req.params;

            await Employee.destroy({ where: { id: id } }).then(() => {
                res.status(200).json('Empleado eliminado');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    createAddress: async (req, res) => {

        try {

            const { employee_id, calle, numInt, numExt, colonia, cp, ciudad, estado, pais, lat, lng } = req.body;

            await Address.build({
                employee_id, calle, numInt, numExt, colonia, cp,
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
                    association: 'employee',
                    attributes: ['id', 'nombre', 'apellidos', 'telefono', 'email', 'role', 'createdAt', 'updatedAt']
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