import React from 'react';
import Posts from './Posts';

// temporary data
let posts = [
    {
        id: 1,
        username: "Jane Doe",
        date: "09/20/2024",
        title: "Heaven Official's Blessing",
        genre: ["Xianxia", "BL"],
        status: "Completed",
        rate: 10,
        medium: ["Donghua", "Novel", "Manhua", "Audio Drama"],
        synopsis: "Eight hundred years ago, Xie Lian was the Crown Prince of the Xian Le kingdom. He was loved by his citizens and was considered the darling of the world. He ascended to the Heavens at a young age; however, due to unfortunate circumstances, was quickly banished back to the mortal realm. Years later, he ascends again, only to be banished again a few minutes after his ascension. Now, eight hundred years later, Xie Lian ascends to the Heavens for the third time as the laughing stock among all three realms. On his first task as a god thrice ascended, he meets a mysterious demon who rules the ghosts and terrifies the Heavens, yet, unbeknownst to Xie Lian, this demon king has been paying attention to him for a very, very long time.",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["src/assets/tgcf.jpg", "src/assets/tgcf.jpg"]
    },
    {
        id: 2,
        username: "John Doe",
        date: "09/20/2024",
        title: "Movie",
        genre: ["Action", "Mystery"],
        status: "Ongoing",
        rate: 8,
        medium: ["Novel", "Movie"],
        synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["src/assets/tgcf.jpg"]
    },
    {
        id: 3,
        username: "James Moriarty",
        date: "09/20/2024",
        title: "Anime",
        genre: ["Psychological", "Mystery", "Romance"],
        status: "Completed",
        rate: 8,
        medium: ["Anime", "Manga"],
        synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: []
    }
]

function MainContent() {
    return (
        <main>
            <h2>Home</h2>
            <Posts posts={posts} />
        </main>
    )
}

export default MainContent