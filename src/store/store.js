import { create } from 'zustand';

// Define the Zustand store
const useStore = create((set, get) => ({
    users: [],
    posts: [],
    comments: [],

    // Method to set the fetched data into Zustand store
    initialize: (users, posts, comments) => set(() => ({
        users: users,
        posts: posts,
        comments: comments,
    })),

    // Set posts 
    setPosts: (posts) => set(() => ({
        posts: posts
    })),

    // Set comments 
    setComments: (comments) => set(() => ({
        comments: comments
    })),

    // Get user
    getUser: (userId) => {
        const { users } = get();
        return users.filter((user) => user.id == userId);
    },

    // Getting parent comment
    getComment: (parentId) => {
        const { comments } = get();
        return comments.filter((comment) => comment.id == parentId)[0];
    },

    getCommentsNum: (postId) => {
        const { comments } = get();
        return comments.filter((comment) => comment.post_id == postId).length;
    },

    //Getting the date
    getDate: (date) => {
        return new Date(date).toLocaleDateString();
    },

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

    // list genres
    getGenres: (post) => {
        return post.postgenres.map(postgenre => postgenre.genres.name).join(', ');
    },

    // list mediums
    getMediums: (post) => {
        return post.postmediums.map(postmedium => postmedium.mediums.name).join(', ');
    },

    // get most popular comment
    getMostPopularComment: (post) => {
        if (post.comments) {
            return post.comments
                .filter(comment => comment.parent_id == null)
                .sort((a, b) => a.likes > b.likes ? 1 : a.likes < b.likes ? -1 : 0)[0];
        }
        return null;
    }
}));

export default useStore;