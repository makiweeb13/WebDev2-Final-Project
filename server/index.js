const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// Prisma Client library
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Configure CORS to allow frontend origin and allow credentials
const corsOptions = {
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

const SECRET_KEY = process.env.JWT_SECRET;
const PORT = process.env.PORT;

// Fetch all users with their related posts and comments
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        posts: true, // Fetch related posts for each user
        comments: true, // Fetch related comments for each user
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch all posts with related user and comments
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: true, // Include user data for each post
        comments: {
          include: {
            users: true, // Include user data for each comment
            comments: {
              include: {
                users: true // Include user data for parent comment
              }
            }
          }
        }
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Fetch all comments with related post and user
app.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        posts: true, // Include related post for each comment
        users: true, // Include related user for each comment
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        posts: {
          include: {
            users: true, // Include user data for each post
            comments: {
              include: {
                users: true, // Include user data for each comment
                comments: {
                  include: {
                    users: true // Include user data for parent comment
                  }
                }
              }
            }
          }
        },
        comments: true
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
})

// Fetching a single post
app.get('/posts/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        users: true,
        comments: {
          include: {
            users: true, // Include user data for each comment
            comments: {
              include: {
                users: true // Include user data for parent comment
              }
            }
          }
        },
        postgenres: {
          include: {
            genres: true
          }
        },
        postmediums: {
          include: {
            mediums: true
          }
        }
      }
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
})

// Registers a new user
app.post('/signup', async (req, res) => {
  
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

    const newUser = await prisma.users.create({
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
app.post('/login', async (req, res) => {
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
