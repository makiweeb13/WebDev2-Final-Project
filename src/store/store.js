import { create } from 'zustand';

// Define the Zustand store
const useStore = create((set, get) => ({
    user: null,
    users: [],
    posts: [],
    comments: [],

    setUser: (user) => set(() => ({
        user: user
    })),

    setPosts: (posts) => set(() => ({
        posts: posts
    })),

    setComments: (comments) => set(() => ({
        comments: comments
    })),

    // Getting parent comment
    getComment: (parentId) => {
        const { comments } = get();
        return comments.filter((comment) => comment.id == parentId)[0];
    },

    // Get number of comments
    getCommentsNum: (postId) => {
        const { comments } = get();
        return comments.filter((comment) => comment.post_id == postId).length;
    },

    //Getting the formatted date
    getDate: (date) => {
        return new Date(date).toLocaleDateString();
    },

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

    // list genres
    getGenres: (post) => {
        return post.postgenres.map(postgenre => postgenre.genres.name).join(', ');
    },

    // list mediums
    getMediums: (post) => {
        return post.postmediums.map(postmedium => postmedium.mediums.name).join(', ');
    },

    // gets the most popular comment
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