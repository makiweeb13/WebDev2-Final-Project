const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');

// Configure CORS to allow frontend origin and allow credentials
const corsOptions = {
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
};

// Middleware 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT;

// Import routes
const routes = require('./routes');

// Routes
app.use('/users', routes.usersRoutes);
app.use('/posts', routes.postsRoutes);
app.use('/comments', routes.commentsRoutes);

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
