const prisma = require('../prisma/client');
const { ThrowError } = require('../middleware/errorHandler');

const getAllPosts = async (req, res, next) => {
  const { search, page } = req.query
  const limit = 2;
  const skip = (parseInt(page || 1) - 1) * limit;

  try {
    const totalPosts = await prisma.posts.count({
      where: {
        title: {
          contains: search || ''
        }
      }
    })

    const posts = await prisma.posts.findMany({
      orderBy: {
        date: 'desc'
      },
      skip: skip,
      take: limit,
      where: {
        title: {
          contains: search || ''
        }
      },
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

    res.status(200).json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      posts
    });

  } catch (error) {
    next(error);
  }
}

const getPost = async (req, res, next) => {
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
      next(error);
    }
}

const createPost = async (req, res, next) => {
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
      next(error);
    }
}

const updatePost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, rate, status, genres, mediums, synopsis, review, likes, dislikes } = req.body;
  
    const dataToUpdate = Object.fromEntries(
      Object.entries({ title, rate, status, synopsis, review, likes, dislikes })
            .filter(([_, value]) => value !== undefined)
    )
  
    if (Object.keys(dataToUpdate).length === 0) {
      throw new ThrowError(400, 'No fields provided to update');
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
  
      const updatedPost = await prisma.posts.findUnique({
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
      next(error);
    }
}

const deletePost = async (req, res, next) => {
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
      next(error);
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}