import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import productmodel from './model/productmodel.js';
import fs from 'fs';
import Bill from './model/billmodel.js';

const app = express();

// Ensure 'images' folder exists
if (!fs.existsSync('images')) {
  fs.mkdirSync('images');
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('images'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myproducts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file 
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : undefined;

    const createproduct = await productmodel.create({ name, price, description, imageUrl });
    res.json({ message: 'File uploaded successfully!', product: createproduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await productmodel.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


//for billing aggregation
app.post('/bills', async (req, res) => {
  try {
    const { cart, transactionId } = req.body;

    // Insert all items at once
    const createdBills = await Bill.insertMany(
      cart.map(item => ({
        name: item.name,
        price: item.price,
        transactionId
      }))
    );

    // Calculate total for this transaction
    const totalbill = await Bill.aggregate([
      { $match: { transactionId } },
      { $group: { _id: "$transactionId", total: { $sum: "$price" } } }
    ]);

    console.log("Total Bill:", totalbill[0]?.total || 0);

    res.json({ message: 'Purchase successful', total: totalbill[0]?.total || 0, bills: createdBills });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process purchase' });
  }
});

export default app;