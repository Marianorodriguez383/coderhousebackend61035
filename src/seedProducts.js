import mongoose from 'mongoose';
import Product from './dao/mongo/models/Product.js';
import connectDB from './config/db.js';

const products = [
  {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 1000,
    thumbnail: "url1",
    code: "P001",
    stock: 10,
    category: "category1",
    available: true
  },
  {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 200,
    thumbnail: "url2",
    code: "P002",
    stock: 20,
    category: "category2",
    available: false
  },
  {
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 300,
    thumbnail: "url3",
    code: "P003",
    stock: 30,
    category: "category1",
    available: true
  },
  {
    title: "Producto 4",
    description: "Descripción del producto 4",
    price: 400,
    thumbnail: "url4",
    code: "P004",
    stock: 40,
    category: "category3",
    available: true
  },
  {
    title: "Producto 5",
    description: "Descripción del producto 5",
    price: 500,
    thumbnail: "url5",
    code: "P005",
    stock: 50,
    category: "category2",
    available: false
  },
  {
    title: "Producto 6",
    description: "Descripción del producto 6",
    price: 600,
    thumbnail: "url6",
    code: "P006",
    stock: 60,
    category: "category1",
    available: true
  },
  {
    title: "Producto 7",
    description: "Descripción del producto 7",
    price: 700,
    thumbnail: "url7",
    code: "P007",
    stock: 70,
    category: "category3",
    available: false
  },
  {
    title: "Producto 8",
    description: "Descripción del producto 8",
    price: 800,
    thumbnail: "url8",
    code: "P008",
    stock: 80,
    category: "category2",
    available: true
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.insertMany(products);
    console.log('Productos agregados exitosamente');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al agregar productos:', error);
    mongoose.connection.close();
  }
};

seedProducts();


