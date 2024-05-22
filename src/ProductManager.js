import fs from 'fs/promises';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
        this.io = null;
    }

    setSocket(io) {
        this.io = io;
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error("Error al cargar los productos:", error.message);
        }           
    }

    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.path, data);
            if (this.io) {
                this.io.emit('updateProducts', this.products);
            }
        } catch (error) {
            console.error("Error al guardar los productos:", error.message);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
            return null;
        }
        return product;
    }

    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

export default ProductManager;














