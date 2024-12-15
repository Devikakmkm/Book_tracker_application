const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Book = require('./models/book');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookCollection')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Home - List all books
app.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('index', { books });
});

// New Book Form
app.get('/books/new', (req, res) => {
    res.render('new');
});

// Create New Book
app.post('/books', async (req, res) => {
    const { title, author, genre, description, imageUrl } = req.body;
    await Book.create({ title, author, genre, description, imageUrl });
    res.redirect('/');
});

// Show Book Details
app.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('show', { book });
});

// Edit Book Form
app.get('/books/:id/edit', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
});

// Update Book
app.put('/books/:id', async (req, res) => {
    const { title, author, genre, description, imageUrl } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, genre, description, imageUrl });
    res.redirect('/');
});

// Delete Book
app.delete('/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
