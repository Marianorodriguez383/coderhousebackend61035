const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error("Error al cargar los productos:", error.message);
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error("Error al guardar los productos:", error.message);
        }
    }

    addProduct(productData) {
        // Valida que todos los campos sean proporcionados
        const { title, description, price, thumbnail, code, stock } = productData;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que el código no esté repetido
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.error("Ya existe un producto con el mismo código.");
            return;
        }

        const newProduct = {
            id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
            ...productData
        };

        this.products.push(newProduct);
        this.saveProducts();
        console.log("Producto agregado correctamente:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
            return;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("Producto no encontrado.");
            return;
        }

        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
        console.log("Producto actualizado correctamente:", this.products[index]);
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("Producto no encontrado.");
            return;
        }

        this.products.splice(index, 1);
        this.saveProducts();
        console.log("Producto eliminado correctamente.");
    }
}

// Ejemplo de uso:
const manager = new ProductManager("products.json");

manager.addProduct({
    title: "Producto 1",
    description: "Descripción producto 1",
    price: 10,
    thumbnail: "imagen1",
    code: "ABD123",
    stock: 50
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción producto 2",
    price: 20,
    thumbnail: "imagen2",
    code: "ARL456",
    stock: 30
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3)); // Producto no encontrado

// Actualizar un producto
manager.updateProduct(1, { price: 15, stock: 60 });

// Eliminar un producto
manager.deleteProduct(2);

console.log(manager.getProducts());
