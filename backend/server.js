const express = require('express');
const cors = require('cors');
const session = require('express-session'); // <-- Import express-session here
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());


app.use(
  session({
    secret: 'every-cup-is-a-blast-from-the-past',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.get('/api/get-username', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ username: req.session.user.username });
  } else {
    res.status(401).json({ message: 'No session found' });
  }
});
// Routes
app.get('/', (req, res) => {
  res.send("Hello, world!");
});

// Use routes
app.use('/', userRoutes);
app.use('/api', productRoutes);
app.use('/api', ratingRoutes);
app.use('/api/favorites', favoriteRoutes);

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
