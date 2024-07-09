import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

export default function UpdatePost() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')


    let api = "http://localhost:3000/books/" + id;

    // useEffect(() => {
    //     axios.get(api)
    //       .then(result => { 
    //         console.log(result);
    //         setTitle(result.data.title);
    //         setAuthor(result.data.author);
    //         setYear(result.data.year);
    //       })
    //       .catch(err => {
    //         console.error('Error fetching data: ', err);
    //         setError('Error fetching data');
    //       });
    //   }, [id]);

    const fetchBookData = async () => {
        try {
            const result = await axios.get(api);
            console.log(result);
            setTitle(result.data.title);
            setAuthor(result.data.author);
            setYear(result.data.year);
        } catch (err) {
            console.error('Error fetching data: ', err);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchBookData();
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/books/' + id, {title, author, year})
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(err => {
            console.error('Error updating data: ', err);
            setError('Error updating data');
          });
    }

  return (
    <div className="createPost">
        <Navbar/>
      <div className="creatPost-content">

        <form onSubmit={update} className="createPost-content-inner ">
            <h1>Update post</h1>
          <div>
            <p>Title</p>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value) }/>
          </div>
          <div>
            <p>Author</p>
            <input type="text" placeholder="Author"  value={author} onChange={(e) => setAuthor(e.target.value) }/>
          </div>
          <div>
            <p>Year</p>
            <input type="text" placeholder="year"  value={year} onChange={(e) => setYear(e.target.value) }/>
          </div>
          <div>
            <input type="submit" value="Update" className="submit-btn" />
          </div>
        </form>
      </div>
    </div>
  );
}
