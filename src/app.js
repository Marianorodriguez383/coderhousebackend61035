import express from 'express';
import bodyParser from 'body-parser';
import productsRouter from './productsRouter.js';
import cartsRouter from './cartsRouter.js';

const app = express();
const port = 8080;

// Middleware para permitir el análisis de datos de formulario
app.use(bodyParser.json());

// Middleware para manejar las rutas relacionadas con los productos
app.use('/api/products', productsRouter);

// Middleware para manejar las rutas relacionadas con los carritos
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
