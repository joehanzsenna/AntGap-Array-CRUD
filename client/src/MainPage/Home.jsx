import React, { useEffect, useState } from "react";
import "./style.css";
import Navbar from "./Navbar";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Home() {
    const [someData, setSomeData] = useState([])
    const [error, setError] = useState()

    let api = "http://localhost:3000/books";

    const dataFetching = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setSomeData(data);
      } catch {
        setError(`Oops something is wrong`);
        console.log('Oops something is wrong');
      } 
    };
  
    useEffect(() => {
      dataFetching();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete('http://localhost:3000/books/' + id);
            console.log(res);
            window.location.reload();
        } catch (err) {
            console.error('Error deleting data:', err);
        }
    }

  return (
    <div className="home">
      <Navbar/>

      <div className="home-title">
        <h1>Fictional Books </h1>
      </div>

       <table className="table">
           <thead>
                <tr className="table-row">
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                </tr>
           </thead>
            <tbody className="table-row">
                {someData.map((datum) => {
                    return <tr className="table-contents" key={datum.id}>
                        <td>{datum.title}</td>
                        <td>{datum.author}</td>
                        <td>{datum.year}</td>
                        <td className="buttons">
                            <Link to={`/update/${datum.id}`}>
                                <button className="updateBtn">update</button>
                            </Link>
                             <button className="deleteBtn" onClick={(e) => handleDelete(datum.id)}>delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
       </table>
    </div>
  );
}
