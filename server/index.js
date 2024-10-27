const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const prisma = require('./prisma/client');
const { loginSchema, signupSchema, validator } = require('./middleware/validator');

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

const SECRET_KEY = process.env.JWT_SECRET;
const PORT = process.env.PORT;

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

// Routes
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// Registers a new user
app.post('/signup', validator(signupSchema), async (req, res) => {
  
  const { username, email, password, bio, profile_picture } = req.body;
  try {
    const existingUser = await prisma.users.findFirst({
      where: { 
        email: email
      }
    })
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        bio: bio || null,
        profile_picture: profile_picture || null
      }
    })
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Logs in a user
app.post('/login', validator(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await prisma.users.findFirst({
      where: {
        email: email
      }
    })

    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatched = await bcrypt.compare(password, findUser.password);

    if (!passwordMatched) {
      return res.status(400).json({ message: 'Password mismatch' });
    }

    const token = jwt.sign({ id: findUser.id, email: findUser.email }, SECRET_KEY, { expiresIn: '1h' })

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, sameSite: 'Strict' }); // Cookie lasts 1 hour

    res.status(200).json({ message: 'Login successful', user: { id: findUser.id, email: findUser.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ isAuthenticated: false });
    }
    return res.json({ isAuthenticated: true, user: user });
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
