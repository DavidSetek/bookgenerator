import 'dotenv/config';


import express from "express";
import pg from 'pg';

// Basi settings
const app = express();
const port = 3000;
// app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database
// const db = new pg.Client({
//     host: 'localhost',
//     database: 'bookshop',
//     user: 'david',
//     password: 'admin',
//     port: 5432
// })
const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

console.log('DATABASE_URL exists:', Boolean(process.env.DATABASE_URL));

db.connect()
    .then( () => console.log('Database connected'))
    .catch( err => console.log('Database connection error', err))

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/random', async (req, res) => {
    try {
        const sql = 'SELECT book_title, author FROM books ORDER BY RANDOM() LIMIT 1';
        const result = await db.query(sql);

        // 1) Pokud v databázi nejsou žádné knihy
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'No books found'
            });
        }

        // 2) Vezmeme první (a jediný) řádek
        const { book_title, author } = result.rows[0];

        // 3) Vrátíme JSON klientovi
        res.json({
            book_title: book_title,
            author: author
        });

    } catch (err) {
        console.error('Database error:', err);

        // 4) Chyba na serveru
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});


// Run app
app.listen(port, () => {
    console.log(`App is listen on http://localhost:${port}`);  
})