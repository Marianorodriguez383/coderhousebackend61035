import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://marianorodriguez383:141090Morchu@cluster0.uom6ndo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  });
    console.log('MongoDB Connected');
    console.log('MongoDB Connected successfully');

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
