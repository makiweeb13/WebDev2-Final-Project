const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Prisma Client library
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Middleware
app.use(cors());
app.use(express.json()); 

// Fetch all users with their related posts and comments
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        posts: true, // Fetch related posts for each user
        comments: true, // Fetch related comments for each user
      },
    });
    res.json(users);
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
        comments: true, // Include comments for each post
      },
    });
    res.json(posts);
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
    res.json(comments);
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
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
