const express = require('express');

const ProductsServices = require('../services/products.service');
const  validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const productsRouter = express.Router();
const service = new ProductsServices;

productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

productsRouter.get('/filter', (req, res) => {
  res.send('Im filter');
});

productsRouter.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
})

productsRouter.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

productsRouter.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product)
  } catch (error) {
    next(error);
  }
})

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta)
})

module.exports = productsRouter;
