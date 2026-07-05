const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const destinationRoutes = require('./routes/destinationRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Travel App API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});