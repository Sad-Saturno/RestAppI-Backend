const { tables: Table } = require('../../database/db');

const TablesCtrl = {

    addNewTable: async (req, res) => {

        try {

            const { capacity } = req.body;

            await Table.build({ capacity, status: 'Disponible' }).save().then(newTable => {
                res.status(201).json(newTable);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getAllTablesWithOrders: async (req, res) => {

        try {

            const tables = await Table.findAll({
                include: {
                    association: 'localOrders',
                    where: { status: 'Abierta' }
                }
            });
            if (!tables) return res.status(404).json(`No hay ninguna mesa registrada`);

            res.status(200).json(tables);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

    getAllTables: async (req, res) => {

        try {

            const tables = await Table.findAll({
                order: [['id', 'ASC']]
            });
            if (!tables) return res.status(404).json(`No hay ninguna mesa registrada`);

            res.status(200).json(tables);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOneTableWithOrders: async (req, res) => {

        try {

            const { id } = req.params;
            const table = await Table.findByPk(id, {
                include: {
                    association: 'localOrders',
                    where: { status: 'Abierta' }
                }
            });
            if (!table) return res.status(404).json(`No hay ninguna mesa registrada con el id ${id}`);

            res.status(200).json(table);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOneTable: async (req, res) => {

        try {

            const { id } = req.params;
            const table = await Table.findByPk(id);
            if (!table) return res.status(404).json(`No hay ninguna mesa registrada con el id ${id}`);

            res.status(200).json(table);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateTable: async (req, res) => {

        try {

            const { id } = req.params;
            const { status, capacity } = req.body;

            await Table.update({ status, capacity }, { where: { id: id } }).then(() => {
                res.status(200).json(`Mesa actualizada`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteTable: async (req, res) => {

        try {

            const { id } = req.params;

            await Table.destroy({ where: { id: id } }).then(() => {
                res.status(200).json(`Mesa eliminada`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    habilitarMesa: async (req, res) => {
        try {
            const { id } = req.params;

            await Table.update({ status: 'Disponible' }, { where: { id: id } }).then(() => {
                res.status(200).json(`Mesa Habilitada`);
            }).catch(err => {
                console.log(err);
                return res.status(400).json(`Ocurrio un error ${err.message}`);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = TablesCtrl;