const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

const connectDB = ( async () => {
        await mongoose.connect('mongodb+srv://kashyapneha1013:neha1013@cluster0.brwowq6.mongodb.net/Book-management-app').then(()=>console.log("DB Connected"));
    }
    
);
connectDB();

let books = []; 
let currentId = 1;

app.post('/books', (req, res) => {
    const { title,author,genre } = req.body;
    const newBook = { id: currentId++, title, author, genre };
    books.push(newBook);
    res.json(newBook);
    console.log(genre);
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.put('/books/:id', (req, res) => {
    const {id} = req.params;
    const {title, author, genre} = req.body;
    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        return res.json({ error: 'Book not found' });
    }
    book.title = title;
    book.author = author;
    book.genre = genre;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const {id} = req.params;
    const Index = books.findIndex(b => b.id === parseInt(id));
    if (Index === -1) {
        return res.json({ error: 'Book not found' });
    }
    books.splice(Index, 1);
    res.send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});