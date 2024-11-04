const prisma = require('../prisma/client');
const { ThrowError } = require('../middleware/errorHandler');

const getAllComments = async (req, res, next) => {
    try {
      const comments = await prisma.comments.findMany({
        include: {
          posts: true, // Include related post for each comment
          users: true // Include related user for each comment
        },
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
}

const createComment = async (req, res, next) => {
    const { post_id, parent_id, content } = req.body;
    const user_id = req.user.id
  
    try {
      const newComment = await prisma.comments.create({
        data: {
          post_id: parseInt(post_id),
          user_id: parseInt(user_id),
          parent_id: null || parent_id,
          content
        }
      })
      const findComment = await prisma.comments.findUnique({
        where: {
          id: newComment.id
        },
        include: {
          users: true, // Include user data for each comment
          comments: {
            include: {
              users: true // Include user data for parent comment
            }
          }
        }
      })
      res.status(200).json({ message: 'Comment added successfully', comment: findComment });
    } catch (error) {
      next(error);
    }
}

const updateComment = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { content, likes, dislikes } = req.body;
  
    const dataToUpdate = Object.fromEntries(
      Object.entries({ content, likes, dislikes })
            .filter(([_, value]) => value !== undefined)
    );
  
    if (Object.keys(dataToUpdate).length === 0) {
      throw new ThrowError(400, 'No fields provided to update');
    }
  
    try {
      const comment = await prisma.comments.update({
        where: {
          id: id
        },
        data: dataToUpdate
      })
      const updatedComment = await prisma.comments.findUnique({
        where: {
          id: comment.id
        },
        include: {
          users: true, // Include user data for each comment
          comments: {
            include: {
              users: true // Include user data for parent comment
            }
          }
        }
      })
      res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment })
    } catch (error) {
      next(error);
    }
}

const deleteComment = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.comments.delete({
        where: {
          id: id
        }
      })
      res.status(200).json({ message: 'Comment deleted successfully' })
    } catch(error) {
      next(error);
    }
}

const createCommentLike = async (req, res, next) => {
  const user_id = req.user.id
  const { comment, mode } = req.query
  const comment_id = parseInt(comment)

  try {
    const like = await prisma.commentlikes.findUnique({
      where: {
        comment_id_user_id: {
          comment_id,
          user_id
        }
      }
    })

    const dislike = await prisma.commentdislikes.findUnique({
      where: {
        comment_id_user_id: {
          comment_id,
          user_id
        }
      }
    })

    if (mode === 'like') {
      if (like) { 
        // Undo like if comment already liked
        await prisma.commentlikes.delete({
          where: {
            id: like.id
          }
        })
      } else { 
        // Proceed to like comment
        await prisma.commentlikes.create({
        data: {
          comment_id,
          user_id
        }
        })
        // Undo dislike if comment already disliked
        if (dislike) {
          await prisma.commentdislikes.delete({
            where: {
              id: dislike.id
            }
          })
        }
      }
    } 
    else if (mode === 'dislike') {
      if (dislike) {
        // Undo dislike if comment already disliked
        await prisma.commentdislikes.delete({
          where: {
            id: dislike.id
          }
        })
      } else {
        // Proceed to dislike comment
        await prisma.commentdislikes.create({
          data: {
            comment_id,
            user_id
          }
        })
        // Undo like if comment already liked
        if (like) {
          await prisma.commentlikes.delete({
            where: {
              id: like.id
            }
          })
        }
      }
    }

    const comment = await prisma.comments.findUnique({
      where: {
        id: comment_id
      },
      include: {
        users: true,
        comments: {
          include: {
            users: true
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
    })

    res.status(200).json({ message: 'Comment liked/disliked successfully', comment })
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment,
    createCommentLike
}