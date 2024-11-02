const prisma = require('../prisma/client');

const getAllUsers = async (req, res, next) => {
    try {
      const users = await prisma.users.findMany({
        include: {
          posts: true, // Fetch related posts for each user
          comments: true, // Fetch related comments for each user
        },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
      const id  = parseInt(req.params.id);
      const user = await prisma.users.findUnique({
        where: {
          id: id
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
          },
          comments: true
        }
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
}

const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { username, email, bio } = req.body
  
    try {
      const user = await prisma.users.update({
        where: {
          id: id
        },
        data: {
          username,
          email,
          bio
        }
      })
      const updatedUser = await prisma.users.findUnique({
        where: {
          id: user.id
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
          },
          comments: true
        }
      })
      res.status(200).json({ message: 'User updated successfully', user: updatedUser })
    } catch (error) {
      next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser
}