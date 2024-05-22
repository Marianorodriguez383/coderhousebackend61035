import { Router } from 'express';
import ProductManager from './ProductManager.js';

const viewsRouter = Router();
const productManager = new ProductManager('src/products.json');

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default viewsRouter;
