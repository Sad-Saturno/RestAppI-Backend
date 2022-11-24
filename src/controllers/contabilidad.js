const { contabilidad: Contabilidad } = require('../../database/db');

const ContabilidadCtrl = {

    generarCierre: async (req, res) => {
        try {
            const { total_cierre, cuentas_atendidas, mes_cierre } = req.body;

            await Contabilidad.build({ total_cierre, cuentas_atendidas, mes_cierre }).save().then(() => {
                res.status(201).json('Cierre Creado');
            }).catch(error => {
                return res.status(500).json({ msg: error.message });
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    consultarCierre: async(req, res) => {
        try {
            await Contabilidad.findAll().then((response) => {
                res.status(200).json(response);
            }).catch(error => {
                return res.status(500).json({ msg: error.message });
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = ContabilidadCtrl;