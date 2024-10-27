const prisma = require('../prisma/client');

const getAllPosts = async (req, res) => {
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
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

const getPost = async (req, res) => {
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
}

const createPost = async (req, res) => {
    const { title, rate, status, genres, mediums, synopsis, review } = req.body;
    const user_id = req.user.id
  
    try {
      const post = await prisma.posts.create({
        data: {
          title,
          user_id,
          date: new Date(),
          rate: parseInt(rate),
          status: JSON.parse(status),
          synopsis: synopsis || null,
          review
        }
      })
  
      const postGenres = genres.map(genreId => ({
        post_id: post.id,
        genre_id: genreId
      }))
      await prisma.postgenres.createMany({
        data: postGenres,
        skipDuplicates: true
      })
  
      const postMediums = mediums.map(mediumId => ({
        post_id: post.id,
        medium_id: mediumId
      }))
      await prisma.postmediums.createMany({
        data: postMediums,
        skipDuplicates: true
      })
      
      res.status(200).json({ message: 'Post created successfully'});
    } catch (error) {
      console.error('Error creating post: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, rate, status, genres, mediums, synopsis, review, likes, dislikes } = req.body;
  
    const dataToUpdate = Object.fromEntries(
      Object.entries({ title, rate, status, synopsis, review, likes, dislikes })
            .filter(([_, value]) => value !== undefined)
    )
  
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }
  
    try {
      const post = await prisma.posts.update({
        where: {
          id: id
        },
        data: dataToUpdate
      })
      
      await prisma.postgenres.deleteMany({
        where: {
          post_id: id
        }
      })
  
      await prisma.postmediums.deleteMany({
        where: {
          post_id: id
        }
      })
  
      const postGenres = genres.map(genreId => ({
        post_id: id,
        genre_id: genreId
      }))
      await prisma.postgenres.createMany({
        data: postGenres,
        skipDuplicates: true
      })
  
      const postMediums = mediums.map(mediumId => ({
        post_id: id,
        medium_id: mediumId
      }))
  
      await prisma.postmediums.createMany({
        data: postMediums,
        skipDuplicates: true
      })
  
      const updatedPost = await prisma.posts.findFirst({
        where: {
          id: post.id
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
      })
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost })
    } catch (error) {
      console.error('Error updating post: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.posts.delete({
        where: {
          id: id
        }
      })
      await prisma.postgenres.deleteMany({
        where: {
          post_id: id
        }
      })
      await prisma.postmediums.deleteMany({
        where: {
          post_id: id
        }
      })
      res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      console.error('Error deleting post: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}