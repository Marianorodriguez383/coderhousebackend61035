import express from 'express';
import ProductManager from '../dao/mongo/ProductManager.js';
import CartManager from '../dao/mongo/CartManager.js';

const viewsRouter = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

viewsRouter.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filters = query ? { $or: [{ category: query }, { available: query }] } : {};
    let sortOption = {};
    if (sort === 'asc') {
      sortOption = { price: 1 };
    } else if (sort === 'desc') {
      sortOption = { price: -1 };
    }
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
    };

    
    const result = await productManager.getProductsPaginated(filters, options);

    res.render('products', {
      products: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

viewsRouter.get('/products/:pid', async (req, res) => {
    try {
      const product = await productManager.getProductById(req.params.pid);
      res.json({ product }); // Utiliza res.json() para enviar JSON
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });

  viewsRouter.get('/carts/:cid', async (req, res) => {
    try {
      const cart = await cartManager.getCartById(req.params.cid);
      if (!cart) {
        console.log(`Carrito con ID ${req.params.cid} no encontrado`);
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
      res.render('cart', { cart });
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

export default viewsRouter;
