const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.get('/categories/:categoryId/products/:productsId', (req, res) => {
  const { categoryId, productsId } = req.params;
  res.json({
    categoryId,
    productsId
  })
})

module.exports = categoriesRouter;
