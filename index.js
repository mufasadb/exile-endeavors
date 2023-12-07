require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

// ... other app configurations

app.listen(3001, () => console.log('Server running on port 3000'));
