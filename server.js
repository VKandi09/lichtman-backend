import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from "./routes/productRoutes.js";
import { syncFeaturedTypes } from './utils/syncFeaturedTypes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('MongoDB connected');
    // Call syncFeaturedTypes here
    try {
      const synced = await syncFeaturedTypes();
      console.log('Featured products synced on startup:', synced.length);
    } catch (err) {
      console.error('Error syncing featured products:', err);
    }
  })
.catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/test', (req, res) => {
  res.send('Server works!');
});

app.use('/api/products', productRoutes);
// app.use('/api/featured', productRoutes);

const PORT = process.env.PORT || 5001;
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});