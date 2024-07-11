import { Router } from "express";
import ProductManager from '../dao/mongo/ProductManager.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Construir el filtro de búsqueda
    const filters = query ? { $or: [{ category: query }, { available: query === "true"}] } : {};

    // Determinar el campo de ordenamiento y el tipo de orden
    let sortOption = {};
    if (sort === 'asc') {
      sortOption = { price: 1 }; // Cambiar "price" por el nombre correcto del campo de precio en tu base de datos
    } else if (sort === 'desc') {
      sortOption = { price: -1 }; // Cambiar "price" por el nombre correcto del campo de precio en tu base de datos
    }

    // Opciones de paginación
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
    };

    const result = await productManager.getProductsPaginated(filters, options);

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.page - 1 : null,
      nextPage: result.hasNextPage ? result.page + 1 : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.page + 1}&sort=${sort}&query=${query}` : null,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productsRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productManager.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await productManager.addProduct(newProduct);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al guardar el producto:", error.message);
    res.status(500).json({ error: "Error al guardar el producto" });
  }
});

productsRouter.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  try {
    const product = await productManager.updateProduct(productId, updatedProduct);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productManager.deleteProduct(productId);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default productsRouter;




