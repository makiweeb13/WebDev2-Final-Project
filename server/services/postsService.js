const prisma = require('../prisma/client');

const getTotalPosts = async ( search ) => {
    const total = await prisma.posts.count({
        where: {
          title: {
            contains: search || ''
          }
        }
    });
    return total;
}

const getAllPosts = async ( skip, limit, search ) => {
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
        },
    });
    return posts;
}

const getPost = async (id) => {
    const post = await prisma.posts.findUnique({
        where: {
          id: id
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
    });
    return post;
}

const createPost = async ( title, user_id, rate, status, genres, mediums, synopsis, review ) => {
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
}

const updatePost = async ( id, dataToUpdate, genres, mediums ) => {
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
}

const deletePost = async (id) => {
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
}

const createPostLike = async ( user_id, post_id, mode ) => {
    const like = await prisma.postlikes.findUnique({
        where: {
          post_id_user_id: {
            post_id,
            user_id
          }
        }
      })
  
    const dislike = await prisma.postdislikes.findUnique({
        where: {
          post_id_user_id: {
            post_id,
            user_id
          }
        }
      })
  
    if (mode === 'like') {
        if (like) { 
          // Undo like if post already liked
          await prisma.postlikes.delete({
            where: {
              id: like.id
            }
          })
        } else { 
          // Proceed to like post
          await prisma.postlikes.create({
          data: {
            post_id,
            user_id
          }
          })
          // Undo dislike if post already disliked
          if (dislike) {
            await prisma.postdislikes.delete({
              where: {
                id: dislike.id
              }
            })
          }
        }
      } 
    else if (mode === 'dislike') {
        if (dislike) {
          // Undo dislike if post already disliked
          await prisma.postdislikes.delete({
            where: {
              id: dislike.id
            }
          })
        } else {
          // Proceed to dislike post
          await prisma.postdislikes.create({
            data: {
              post_id,
              user_id
            }
          })
          // Undo like if post already liked
          if (like) {
            await prisma.postlikes.delete({
              where: {
                id: like.id
              }
            })
          }
        }
    }
}

module.exports = {
    getTotalPosts,
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    createPostLike
}