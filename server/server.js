import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Memory schema
const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  description: { type: String, default: '' },
  category: { type: String, default: 'other' },
  mood: { type: String, default: '❤️' },
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
    const memory = new Memory({
      title: req.body.title,
      date: req.body.date,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      description: req.body.description || '',
      category: req.body.category || 'other',
      mood: req.body.mood || '❤️'
    });
    const newMemory = await memory.save();
    res.status(201).json(newMemory);
  } catch (error) {
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
      mood: req.body.mood || '❤️'
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedMemory);
  } catch (error) {
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
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
