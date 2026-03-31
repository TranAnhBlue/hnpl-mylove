import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cloudinary from './config/cloudinary.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Tạo thư mục uploads nếu chưa có
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Multer config - sử dụng memory storage cho Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Memory schema
const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  description: { type: String, default: '' },
  category: { type: String, default: 'other' },
  mood: { type: String, default: '❤️' },
  tags: { type: [String], default: [] },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model('Memory', memorySchema);

// Settings schema for anniversary date
const settingsSchema = new mongoose.Schema({
  anniversaryDate: { type: Date, required: true },
  coupleName1: { type: String, default: '' },
  coupleName2: { type: String, default: '' }
});

const Settings = mongoose.model('Settings', settingsSchema);

// Routes
// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Anniversary Memory API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ anniversaryDate: new Date() });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings.anniversaryDate = req.body.anniversaryDate;
      settings.coupleName1 = req.body.coupleName1 || '';
      settings.coupleName2 = req.body.coupleName2 || '';
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/memories', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;
    
    if (req.file) {
      // Upload lên Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'anniversary-memories',
            resource_type: 'auto',
            transformation: [
              { width: 1200, height: 1200, crop: 'limit' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      
      imageUrl = result.secure_url;
      console.log('✅ Uploaded to Cloudinary:', imageUrl);
    }
    
    const memory = new Memory({
      title: req.body.title,
      date: req.body.date,
      image: imageUrl,
      description: req.body.description || '',
      category: req.body.category || 'other',
      mood: req.body.mood || '❤️',
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      favorite: req.body.favorite === 'true'
    });
    const newMemory = await memory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/memories/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description || '',
      category: req.body.category || 'other',
      mood: req.body.mood || '❤️',
      tags: req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : [],
      favorite: req.body.favorite === 'true' || req.body.favorite === true
    };
    
    if (req.file) {
      // Upload lên Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'anniversary-memories',
            resource_type: 'auto',
            transformation: [
              { width: 1200, height: 1200, crop: 'limit' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      
      updateData.image = result.secure_url;
      console.log('✅ Updated image on Cloudinary:', result.secure_url);
    }
    
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedMemory);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/memories/:id', async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Memory deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
