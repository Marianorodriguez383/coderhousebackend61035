import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './productsRouter.js';
import cartsRouter from './cartsRouter.js';
import ProductManager from './ProductManager.js';

// Emula __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización del servidor HTTP y WebSocket
const app = express();
const server = createServer(app);
const io = new SocketIOServer(server);

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicialización del ProductManager
const productManager = new ProductManager('src/products.json');

// Rutas
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

// Socket.io para la vista en tiempo real
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('new-product', async (newProduct) => {
        await productManager.addProduct(newProduct);
        const products = await productManager.getProducts();
        io.emit('update-products', products);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Middleware de rutas para productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
const port = 8080;
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});



