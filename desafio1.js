class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Valida que todos los campos sean proporcionados
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

        const product = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
        console.log("Producto agregado correctamente:", product);
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
}

// Ejemplo
const manager = new ProductManager();
manager.addProduct("Producto 1", "Descripción producto 1", 10, "imagen1", "ABD123", 50);
manager.addProduct("Producto 2", "Descripción producto 2", 20, "imagen2", "ARL456", 30);
console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3)); // Producto no encontrado
