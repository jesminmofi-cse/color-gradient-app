require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true, 
}));
app.use(express.json()); 
app.use(cookieParser());

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
   secure:false
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
const authRoutes = require('./routes/auth'); 
const gradientRoutes = require('./routes/gradientRoutes'); // Handles saving and generating gradients
const historyRoutes = require('./routes/historyRoutes'); // Handles gradient history

app.use('/api/auth', authRoutes);
app.use('/api/gradients', gradientRoutes);
app.use('/api/history', historyRoutes);

// Default route
app.get('/', (req, res) => {

  res.send('<h1>🎨 Welcome to Gradient Generator Backend!</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});   
  