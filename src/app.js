const express = require('express');
const path = require('path'); // Importar el módulo path
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productsFilePath = path.join(__dirname, "products.json")

// Crear una instancia de ProductManager
const productManager = new ProductManager(productsFilePath);


// Endpoint para obtener todos los productos o limitarlos
app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit; // Obtener el parámetro de consulta 'limit'

        // Leer todos los productos
        let products = productManager.getProducts();

        // Verificar si se proporcionó un límite
        if (limit) {
            // Convertir el límite a un número entero
            limit = parseInt(limit);

            // Devolver solo el número de productos solicitados
            products = products.slice(0, limit);
        }

        // Enviar los productos como respuesta
        res.json(products);
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); // Obtener el ID del producto de los parámetros de ruta
        const product = await productManager.getProductById(productId);

        // Verificar si se encontró el producto
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        // Enviar el producto como respuesta
        res.json(product);
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
