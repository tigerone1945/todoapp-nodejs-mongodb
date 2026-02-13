require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const taskRouter = require('./routers/tasks');

// Middleware
app.use(express.json());

// Routers
app.use('/api/v1/tasks', taskRouter);

const PORT = process.env.PORT || 3000;

// Connect to DB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Failed to connect to DB', error);
  }
};
start();

// Start server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});