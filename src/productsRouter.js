import { Router } from "express";
import fs from "fs/promises";

const productsRouter = Router();

// Ruta GET /api/products para obtener todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("src/products.json", "utf8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error("Error al leer el archivo de productos:", error.message);
    res.status(500).json({ error: "Error al leer el archivo de productos" });
  }
});

// Ruta GET /api/products/:id para obtener un producto por su ID
productsRouter.get("/:id", async (req, res) => {
    const productId = req.params.id; 
    try {
      
      const data = await fs.readFile("src/products.json", "utf8");
      const products = JSON.parse(data);
      const product = products.find((product) => String(product.id) === productId);
      
      if (!product) {
        
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }
      
      
      res.json(product);
    } catch (error) {
      console.error("Error al leer el archivo de productos:", error.message);
      res.status(500).json({ error: "Error al leer el archivo de productoxxx" });
    }
});

  

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  
  console.log("Datos del nuevo producto:", newProduct);
  try {
    const data = await fs.readFile("src/products.json", "utf8");
    const products = JSON.parse(data);
    products.push(newProduct);
    await fs.writeFile("src/products.json", JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al guardar el producto:", error.message);
    res.status(500).json({ error: "Error al guardar el producto" });
  }
});


// Ruta PUT /api/products/:id para actualizar un producto por su ID
productsRouter.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  try {
    const data = await fs.readFile("src/products.json", "utf8");
    let products = JSON.parse(data);
    const index = products.findIndex((product) => product.id === parseInt(productId));
    if (index === -1) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    products[index] = { ...products[index], ...updatedProduct };
    await fs.writeFile("src/products.json", JSON.stringify(products, null, 2));
    res.json(products[index]);
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// Ruta DELETE /api/products/:id para eliminar un producto por su ID
productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    let data = await fs.readFile("src/products.json", "utf8");
    let products = JSON.parse(data);
    const index = products.findIndex((product) => product.id === parseInt(productId));
    if (index === -1) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    products.splice(index, 1);
    await fs.writeFile("src/products.json", JSON.stringify(products, null, 2));
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default productsRouter;
