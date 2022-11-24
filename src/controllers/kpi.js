const sequelize = require('sequelize');
const { contabilidad: Contabilidad } = require('../../database/db');

const KPICtrl = {

    kpiGananciaPorMes: async (req, res) => {
        try {
            const { mes } = req.params;
            const gananciaXMes = await Contabilidad.findAll({ where: { mes_cierre: mes } });

            let total = gananciaXMes.reduce((acc, total) => acc + total.total_cierre, 0 );
            res.json(total)

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    kpiGananciasTotales: async (req, res) => {
        try {;
            const ganancias = await Contabilidad.findAll();
            let total = ganancias.reduce((acc, total) => acc + total.total_cierre, 0 );
            res.json({total, ganancias})

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    kpiCuentasPorMes: async (req, res) => {
        try {
            const { mes } = req.params;
            const cuentasXMes = await Contabilidad.findAll({ where: { mes_cierre: mes } });

            let totalCuentasXMes = cuentasXMes.reduce((acc, total) => acc + total.cuentas_atendidas, 0 );
            res.json(totalCuentasXMes)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    kpiCuentasTotales: async (req, res) => {
        try {
            const cuentasTotales = await Contabilidad.findAll();

            let cuentas = cuentasTotales.reduce((acc, total) => acc + total.cuentas_atendidas, 0 );
            res.json({cuentas, cuentasTotales})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = KPICtrl;