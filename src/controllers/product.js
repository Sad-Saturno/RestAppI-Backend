const { products: Product } = require('../../database/db');
const { categories: Category } = require('../../database/db');
const { Op } = require('sequelize');
const cloudinary = require('../../lib/cloudinary');

const ProductCtrl = {

    createProduct: async (req, res) => {

        try {

            const { id_category, product_id, nombre, precio, stock, description, expirationDate } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);

            await Product.build({
                id_category, product_id, nombre, precio, cloudinary_id: result.public_id, imagen: result.secure_url,
                stock, description, expirationDate, expirationStatus: 'Fresco'
            }).save().then(newProduct => {
                res.status(201).json(newProduct);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getAllProducts: async (req, res) => {

        try {

            const products = await Product.findAll({
                include: {
                    association: 'categories'
                },
                attributes: ['id', 'product_id', 'nombre', 'precio', 'imagen', 'stock', 'discount', 'discount_price', 'newPrice', 'descripcion', 'id_category']
            });
            if (!products) return res.status(400).json('No existe ningun producto registrado');

            res.status(200).json(products);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOneProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const product = await Product.findByPk(id, {
                include: {
                    association: 'categories'
                },
                attributes: ['id', 'product_id', 'nombre', 'precio', 'imagen', 'stock', 'discount', 'discount_price', 'newPrice', 'descripcion', 'id_category']
            });
            if (!product) return res.status(400).json(`No existe ningun producto registrado con el id ${id}`);

            res.status(200).json(product);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const { id_category, product_id, nombre, precio, stock, description } = req.body;
            await Product.update({ id_category, product_id, nombre, precio, stock, description }, { where: { id: id } }).then(() => {
                res.status(200).json('El producto se ha actualizado');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteProduct: async (req, res) => {

        try {

            const { id } = req.params;
            await Product.destroy({ where: { id: id } }).then(() => {
                res.status(200).json('El producto se ha eliminado');
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });


        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    addDiscountToProduct: async (req, res) => {

        try {

            const { id } = req.params;
            const { discount, discount_price } = req.body;

            const product = await Product.findByPk(id);
            const discountPercentage = (discount_price / 100);
            const discountPrice = (product.precio * discountPercentage);

            const new_price = (product.precio - discountPrice);


            await Product.update({ discount, discount_price: discountPercentage, newPrice: new_price }, { where: { id: id } }).then(() => {
                res.status(200).json(`El nuevo precio del producto es ${new_price}`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteDiscountToProduct: async (req, res) => {

        try {

            const { id } = req.params;
            await Product.update({ discount: false, discount_price: null, newPrice: null }, { where: { id: id } }).then(() => {
                res.status(200).json(`El precio regreso a la normalidad`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    productExpirated: async (req, res) => {

        try {

            await Product.findAll().then(async (products) => {
                let fechaActual = new Date();
                for (let expirated of products) {
                    if (fechaActual.getDate() > expirated.expirationDate) {

                    } else {
                        await Promise.all(
                            expirated.update({ expirationStatus: 'Caducado' }, { where: { id: expirated.id } })
                        )
                        return res.status(201).json({ msg: 'Productos Expirados' });
                    }
                }
            });
        } catch (error) {
            return res.status(500).send({ msg: error.message });
        }

    },

    createCategory: async (req, res) => {

        try {

            const { nombre } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);

            await Category.build({ nombre, cloudinary_id: result.public_id, image: result.secure_url, }).save().then(newCategory => {
                res.status(201).json(newCategory);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getAllCategories: async (req, res) => {

        try {

            const categories = await Category.findAll({
                include: {
                    association: 'products'
                },
                attributes: ['id', 'nombre', 'image']
            });
            if (!categories) return res.status(400).json('No existe ninguna categoria registrado');

            res.status(200).json(categories);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getOneCategory: async (req, res) => {

        try {

            const { id } = req.params;
            const category = await Category.findByPk(id, {
                attributes: ['id', 'nombre', 'image']
            });
            if (!category) return res.status(400).json(`No existe la categoria con el id ${id}`);

            res.status(200).json(category);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateCategory: async (req, res) => {

        try {

            const { id } = req.params;
            const { nombre } = req.body;
            await Category.update({ nombre }, { where: { id: id } }).then(() => {
                res.status(201).json(`Categoria actualizada`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deleteCategory: async (req, res) => {

        try {

            const { id } = req.params;
            await Category.destroy({ where: { id: id } }).then(() => {
                res.status(201).json(`Categoria eliminada`);
            }).catch(err => {
                return res.status(400).json(`Ocurrio un error ${err}`);
            });


        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

}

module.exports = ProductCtrl;