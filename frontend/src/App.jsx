import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost:5000/books';

function App() {

    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', author: '', genre: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(URL);
        setBooks(response.data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (form.id) {
            await axios.put(`${URL}/${form.id}`, { title: form.title, author: form.author, genre: form.genre });
        } else {
            await axios.post(URL, { title: form.title, author: form.author, genre:form.genre });
        }
        setForm({ id: null, title: '', author: '', genre: '' });
        fetchData();
    };

    const editHandler = (book) => {
        setForm(book);
    };

    const deleteHandler= async (id) => {
        await axios.delete(`${URL}/${id}`);
        fetchData();
    };

    return (
        <div className="App">
            <h1>Book Management App</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                /><br/>
                <input
                    type="text"
                    placeholder="Author"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                /><br/>
                 <input
                    type="text"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                /><br/>
                <button type="submit">{form.id ? 'Update' : 'Add'} Book</button>
            </form>

                {books.map((book) => (
                    <div key={book.id}>
                        Title of the book: {book.title}<br/>
                        Author: {book.author}<br/>
                        Genre: {book.genre}<br/>
                        <button onClick={() => editHandler(book)}>Edit</button>
                        <button onClick={() => deleteHandler(book.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}

export default App
