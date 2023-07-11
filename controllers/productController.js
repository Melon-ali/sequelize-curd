const db = require('../models');

// create main model
const Products = db.products;

// create products 
const addProducts = async (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            massage: 'Please Insert Title'
        });
        return
    }

    const productInfo = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published: false,
    }

    try {
        const product = await Products.create(productInfo)
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({
            massage: error.massage || 'Error is Common Problem'
        });
    }
};

// get all products
const getAllProducts = async (req, res) => {
    const products = await Products.findAll({});
    res.status(200).send(products);
};

// single product
const getSingleProduct = async (req, res) => {
    let id = req.params.id;
    const product = await Products.findOne({ where: {id: id }});
    res.status(200).send(product);
};

// update product 
const updateProduct = async (req, res) => {
    let id = req.params.id;
    const product = await Products.update(req.body, {where: { id: id }});
    res.status(200).send(product);
};

// delete product 
const deleteProduct = async (req, res) => {
    let id = req.params.id;
    await Products.destroy({ where: {id: id }});
    res.status(200).send('Product is deleted');
};

// get published products
const getPublishedProducts = async (req, res) => {
    const products = await Products.findAll({where: {published: true}});
    res.status(200).send(products);
};

module.exports = {
    addProducts,
    getAllProducts,
    getSingleProduct,
    getPublishedProducts,
    updateProduct,
    deleteProduct
}