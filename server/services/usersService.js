const prisma = require('../prisma/client');

const getAllUser = async () => {
    const users = await prisma.users.findMany({
        include: {
          posts: true, // Fetch related posts for each user
          comments: true, // Fetch related comments for each user
        },
    });
    return users
}

const getUser = async (id) => {
    const user = await prisma.users.findUnique({
        where: {
          id: id
        },
        include: {
          posts: {
            orderBy: {
              date: 'desc'
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
                  },
                  commentlikes: {
                    include: {
                      users: true,
                      comments: true
                    }
                  },
                  commentdislikes: {
                    include: {
                      users: true,
                      comments: true
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
              },
              postlikes: {
                include: {
                  users: true,
                  posts: true
                }
              },
              postdislikes: {
                include: {
                  users: true,
                  posts: true
                }
              }
            }
          },
          comments: true
        }
    });
    return user;
}

const getUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: { 
          email: email
        }
    });
    return user;
}

const updateUser = async (id, username, email, bio) => {
    const user = await prisma.users.update({
        where: {
          id: id
        },
        data: {
          username,
          email,
          bio
        }
    });
    return user;
}

const createUser = async ( username, email, hashedPassword, bio, profile_picture ) => {
    await prisma.users.create({
        data: {
          username,
          email,
          password: hashedPassword,
          bio: bio || null,
          profile_picture: profile_picture || null
        }
    })
}

module.exports = {
    getAllUser,
    getUser,
    getUserByEmail,
    updateUser,
    createUser
}