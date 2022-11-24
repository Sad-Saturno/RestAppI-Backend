const { Op } = require('sequelize');
const { localOrders: LocalOrders } = require('../../database/db');
const { products: Product } = require('../../database/db');
const { tables: Table } = require('../../database/db');


const LocalOrdersCtrl = {

    createLocalOrder: async (req, res, next) => {

        try {

            const { products, table_id, total, emailcostumer } = req.body;

            await LocalOrders.build({ status: 'Abierta', table_id, total, emailcostumer }, { include: 'products' }).save().then(async (newOrder) => {

                for (const product of products) {
                    const quantity = product.quantity;
                    const totalPrice = product.totalPrice;
                    newOrder.setProducts([product.id], { through: { quantity, totalPrice } });
                }

                await Table.update({ status: 'Ocupada' }, { where: { id: table_id } });
                return res.status(201).json(newOrder);
            }).catch(err => {
                console.log(err);
                return res.status(400).json(`Ocurrio un error ${err}`)
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getAllLocalOrders: async (req, res) => {

        try {

            const orders = await LocalOrders.findAll({
                include: {
                    association: 'products',
                }
            });
            if (!orders) return res.status(404).json(`No hay ninguna orden registrada`);

            res.status(200).json(orders);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOrdersByTable: async (req, res) => {

        try {

            const { id } = req.params;
            await Table.findByPk(id, {
                include: {
                    association: 'localOrders',
                    where: {
                        status: 'Abierta',
                        table_id: id
                    }
                }
            }).then(ordersByTable => {
                res.status(200).json(ordersByTable);
            });



        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOneLocalOrder: async (req, res) => {

        try {

            const { id } = req.params;

            await LocalOrders.findByPk(id, {
                include: {
                    association: 'products'
                }
            }).then(response => {
                res.status(200).json(response);
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getLocalOrderWithStatusCerrado: async (req, res) => {
        try {
            const { id } = req.params;
            await LocalOrders.findAll({
                include: {
                    association: 'products'
                },
                where: {
                    status: 'Cerrada',
                    table_id: id
                }
            }).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                return res.status(500).json({ msg: err.message });
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    closeOrders: async (req, res) => {
        try {
            const { orders } = req.body;
            for (const order of orders) {
                const id = order.id;
                console.log(id);
                await LocalOrders.update({ status: 'Cerrada' }, { where: { id: id } }).then(() => {
                    return res.status(200).json('Ordenes cerradas');
                }).catch(err => {
                    return res.status(500).json({ msg: err.message });
                });               
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = LocalOrdersCtrl;