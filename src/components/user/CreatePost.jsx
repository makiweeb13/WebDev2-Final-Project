import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: '',
            rate: 1,
            status: false,
            genre: [],
            medium: [],
            synopsis: '',
            review: ''
        }
    })
    return (
        <main className="center-add-post">
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
                <label htmlFor="status">Status</label>
                <select id="status" name="rate">
                    <option value={true}>Completed</option>
                    <option value={false}>Ongoing</option>
                </select>
                <div className="dropdown-container">
                    <div className="dropdown">
                        <label htmlFor="genre">Select Genre <FontAwesomeIcon icon={faCaretDown} /></label>
                        <div className="dropdown-content">
                            <label><input type="checkbox" name="Action" value={1} /> Action</label>
                            <label><input type="checkbox" name="Adventure" value={2} /> Adventure</label>
                            <label><input type="checkbox" name="Comedy" value={3} /> Comedy</label>
                            <label><input type="checkbox" name="Drama" value={4} /> Drama</label>
                            <label><input type="checkbox" name="Fantasy" value={5} /> Fantasy</label>
                            <label><input type="checkbox" name="Horror" value={6} /> Horror</label>
                            <label><input type="checkbox" name="Mystery" value={7} /> Mystery</label>
                            <label><input type="checkbox" name="Romance" value={8} /> Romance</label>
                            <label><input type="checkbox" name="Sci-Fi" value={9} /> Sci-Fi</label>
                            <label><input type="checkbox" name="Thriller" value={10} /> Thriller</label>
                            <label><input type="checkbox" name="Supernatural" value={11} /> Supernatural</label>
                            <label><input type="checkbox" name="Psychological" value={12} /> Psychological</label>
                            <label><input type="checkbox" name="Historical" value={13} /> Historical</label>
                        </div>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="medium">Select Medium <FontAwesomeIcon icon={faCaretDown} /></label>
                        <div className="dropdown-content">
                            <label><input type="checkbox" name="Movie" value={1} /> Movie</label>
                            <label><input type="checkbox" name="Anime" value={2} /> Anime</label>
                            <label><input type="checkbox" name="Manga" value={3} /> Manga</label>
                            <label><input type="checkbox" name="Novel" value={4} /> Novel</label>
                            <label><input type="checkbox" name="Comic" value={5} /> Comic</label>
                            <label><input type="checkbox" name="TV Show" value={6} /> TV Show</label>
                            <label><input type="checkbox" name="Video Game" value={7} /> Video Game</label>
                            <label><input type="checkbox" name="Webtoon" value={8} /> Webtoon</label>
                            <label><input type="checkbox" name="Light Novel" value={9} /> Light Novel</label>
                            <label><input type="checkbox" name="TV Series" value={10} /> TV Series</label>
                            <label><input type="checkbox" name="Movie Series" value={11} /> Movie Series</label>
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