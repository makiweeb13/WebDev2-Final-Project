import { create } from 'zustand';
import data from '../util/data'; //temporary data

// Define the Zustand store
const useStore = create((set, get) => ({
    users: data.users,
    posts: data.posts,
    comments: data.comments,

    // Method to set the fetched data into Zustand store
    initialize: (data) => set(() => ({
        users: data.users,
        posts: data.posts,
        comments: data.comments,
    })),

    // Actions for Users
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (updatedUser) =>
        set((state) => ({
        users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        ),
    })),
    removeUser: (userId) =>
        set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
    })),

    // Actions for Posts
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    updatePost: (updatedPost) =>
        set((state) => ({
        posts: state.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        ),
    })),
    removePost: (postId) =>
        set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
    })),

    // Actions for Comments
    addComment: (comment) =>
        set((state) => ({ comments: [...state.comments, comment] })),
    updateComment: (updatedComment) =>
        set((state) => ({
        comments: state.comments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
        ),
    })),
    removeComment: (commentId) =>
        set((state) => ({
        comments: state.comments.filter(
            (comment) => comment.id !== commentId
        ),
    })),

    // Handling replies (comments on comments)
    addReply: (commentId, reply) =>
        set((state) => ({
        comments: state.comments.map((comment) =>
            comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        ),
    })),
}));

export default useStore;