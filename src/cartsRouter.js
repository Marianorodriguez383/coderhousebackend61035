import express from 'express';
import fs from 'fs/promises';

const cartsRouter = express.Router();

// Ruta POST /api/carts/ para crear un nuevo carrito
cartsRouter.post("/", async (req, res) => {
  try {
    // Generar un ID único para el carrito
    const newCartId = generateUniqueId(); // Función para generar IDs únicos
    // Crear un nuevo carrito con el ID generado y un array de productos vacío
    const newCart = { id: newCartId, products: [] };
    // Guardar el nuevo carrito en el archivo carts.json
    await saveCart(newCart);
    res.status(201).json(newCart);
  } catch (error) {
    console.error("Error al crear un nuevo carrito:", error.message);
    res.status(500).json({ error: "Error al crear un nuevo carrito" });
  }
});

// Ruta GET /api/carts/:cid para listar los productos de un carrito por su ID
cartsRouter.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    // Carrito correspondiente al ID proporcionado
    const cart = await getCartById(cartId);
    if (!cart) {
      res.status(404).json({ error: "Carrito no encontrado" });
      return;
    }
    res.json(cart.products);
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid para agregar un producto al carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body; 
    try {
      // Leer el carrito correspondiente al ID proporcionado
      let cart = await getCartById(cartId);
      if (!cart) {
        res.status(404).json({ error: "Carrito no encontrado" });
        return;
      }
  
      // Leer los productos disponibles desde el archivo products.json
      const data = await fs.readFile("src/products.json", "utf8");
      const products = JSON.parse(data);
  
      // Buscar el producto en el array de productos
      const product = products.find(product => product.id === parseInt(productId));
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }
  
      // Verifica si el producto ya está en el carrito
      const existingProduct = cart.products.find(product => product.id === productId);
      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementa su cantidad
        existingProduct.quantity += quantity || 1;
      } else {
        // Si el producto no está en el carrito, añadir con la cantidad especificada
        cart.products.push({ ...product, quantity: quantity || 1 });
      }
  
      // Guardar el carrito actualizado
      await saveCart(cart);
      res.status(201).json(cart);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
  });
  

// Función para obtener un carrito por su ID
async function getCartById(cartId) {
    try {
      const data = await fs.readFile("src/carts.json", "utf8");
      const carts = JSON.parse(data);
      const cart = carts.find(cart => cart.id === cartId);
      return cart || null;
    } catch (error) {
      console.error("Error al leer el archivo de carritos:", error.message);
      throw error;
    }
  }

// Función para guardar un carrito
async function saveCart(cart) {
  try {
    const data = JSON.stringify(cart, null, 2);
    await fs.writeFile("src/carts.json", data);
  } catch (error) {
    console.error("Error al guardar el carrito:", error.message);
    throw error;
  }
}

// Función para generar un ID único para el carrito
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Ejemplo de generación de ID único
}

export default cartsRouter;
