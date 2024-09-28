// initialData.js
const data = {
    users: [
        {
            id: 1,
            username: "movieFan123",
            email: "movieFan123@example.com",
            password: "password123",
            bio: "Loves movies and TV shows!"
        },
        {
            id: 2,
            username: "animeLover",
            email: "animeLover@example.com",
            password: "supersecret",
            bio: "Anime enthusiast and reviewer."
        }
    ],
    posts: [
        {
            id: 101,
            user_id: 1,
            date: "2024-09-28T12:00:00",
            title: "Inception",
            genre: ["Sci-Fi", "Action"],
            status: true,
            rate: 9,
            medium: "Movie",
            synopsis: "A mind-bending thriller about dreams within dreams.",
            review: "An amazing film with stunning visuals and a thought-provoking plot.",
            likes: 120,
            dislikes: 10
        },
        {
            id: 102,
            user_id: 2,
            date: "2024-09-25T15:30:00",
            title: "Attack on Titan",
            genre: ["Action", "Fantasy"],
            status: true,
            rate: 10,
            medium: "Anime",
            synopsis: "Humans fight for survival against monstrous titans.",
            review: "A masterpiece in anime with an incredible story and characters.",
            likes: 200,
            dislikes: 5
        }
    ],
    comments: [
        {
            id: 1,
            post_id: 101,
            parent_id: null,
            likes: 25,
            dislikes: 2,
            content: "Inception is a mind-blowing movie!",
            date: "2024-09-29T10:15:00",
        },
        {
            id: 2,
            parent_id: 1,
            post_id: 101,
            likes: 5,
            dislikes: 0,
            content: "Totally agree! The ending was wild.",
            date: "2024-09-29T10:30:00"
        },
        {
            id: 3,
            post_id: 102,
            parent_id: null,
            likes: 40,
            dislikes: 1,
            content: "Attack on Titan is my all-time favorite anime!",
            date: "2024-09-28T18:00:00",
        },
        {
            id: 4,
            parent_id: 3,
            post_id: 102,
            likes: 15,
            dislikes: 1,
            content: "The plot twists are insane, especially in Season 4.",
            date: "2024-09-28T19:00:00"
        },
        {
            id: 5,
            parent_id: 3,
            post_id: 102,
            likes: 8,
            dislikes: 0,
            content: "Can't wait for the final season!",
            date: "2024-09-28T19:15:00"
        }
    ]
  };
  
export default data;  