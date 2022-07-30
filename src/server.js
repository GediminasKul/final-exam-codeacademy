const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoute');
const answerRoutes = require('./routes/answerRoute');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Helloooooo bro');
});

// Routes
app.use('/api', userRoutes);
app.use('/api', questionRoutes);
app.use('/api', answerRoutes);

app.all('*', (req, res) => {
  res.status(400).json({ error: 'page not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
