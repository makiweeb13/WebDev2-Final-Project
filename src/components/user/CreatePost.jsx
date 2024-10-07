import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
    return (
        <main>
            <h2>Add Recommendation</h2>
            <form action="add-post" className="add-post">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="rate">Rate</label>
                <select id="rate" name="rate">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div className="dropdown-container">
                    <div className="dropdown">
                        <label htmlFor="genre">Select Genre <FontAwesomeIcon icon={faCaretDown} /></label>
                        <div className="dropdown-content">
                            <label><input type="checkbox" name="genres" value="Action" /> Action</label>
                            <label><input type="checkbox" name="genres" value="Adventure" /> Adventure</label>
                            <label><input type="checkbox" name="genres" value="Comedy" /> Comedy</label>
                            <label><input type="checkbox" name="genres" value="Drama" /> Drama</label>
                            <label><input type="checkbox" name="genres" value="Fantasy" /> Fantasy</label>
                            <label><input type="checkbox" name="genres" value="Horror" /> Horror</label>
                            <label><input type="checkbox" name="genres" value="Mystery" /> Mystery</label>
                            <label><input type="checkbox" name="genres" value="Romance" /> Romance</label>
                            <label><input type="checkbox" name="genres" value="Sci-Fi" /> Sci-Fi</label>
                            <label><input type="checkbox" name="genres" value="Thriller" /> Thriller</label>
                        </div>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="medium">Select Medium <FontAwesomeIcon icon={faCaretDown} /></label>
                        <div className="dropdown-content">
                            <label><input type="checkbox" name="mediums" value="Movie" /> Movie</label>
                            <label><input type="checkbox" name="mediums" value="Anime" /> Anime</label>
                            <label><input type="checkbox" name="mediums" value="Manga" /> Manga</label>
                            <label><input type="checkbox" name="mediums" value="Novel" /> Novel</label>
                            <label><input type="checkbox" name="mediums" value="Comic" /> Comic</label>
                            <label><input type="checkbox" name="mediums" value="TV Show" /> TV Show</label>
                            <label><input type="checkbox" name="mediums" value="Video Game" /> Video Game</label>
                            <label><input type="checkbox" name="mediums" value="Webtoon" /> Webtoon</label>
                            <label><input type="checkbox" name="mediums" value="Light Novel" /> Light Novel</label>
                        </div>
                    </div>
                </div>
                <label htmlFor="synopsis">Synopsis</label><br />
                <textarea name="synopsis" id="synopsis" cols="30" rows="10" placeholder='Write synopsis..' ></textarea><br />
                <label htmlFor="review">Review</label><br />
                <textarea name="review" id="review" cols="30" rows="10" placeholder='Write review..'></textarea><br />
                <button type="submit">Post</button>
            </form>
        </main>
    )
}

export default CreatePost;