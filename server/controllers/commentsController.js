const prisma = require('../prisma/client');

const getAllComments = async (req, res) => {
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
}

const createComment = async (req, res) => {
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
      const findComment = await prisma.comments.findFirst({
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
      console.error('Error adding comment: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const updateComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const { content, likes, dislikes } = req.body;
  
    const dataToUpdate = Object.fromEntries(
      Object.entries({ content, likes, dislikes })
            .filter(([_, value]) => value !== undefined)
    );
  
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }
  
    try {
      const comment = await prisma.comments.update({
        where: {
          id: id
        },
        data: dataToUpdate
      })
      const updatedComment = await prisma.comments.findFirst({
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
      console.error('Error updating comment: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.comments.delete({
        where: {
          id: id
        }
      })
      res.status(200).json({ message: 'Comment deleted successfully' })
    } catch(error) {
      console.error('Error deleting comment: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
}