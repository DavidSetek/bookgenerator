CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    CONSTRAINT unique_book_title_author UNIQUE (book_title, author)
);


INSERT INTO books (book_title, author) VALUES
('1984', 'George Orwell'),
('Animal Farm', 'George Orwell'),
('Brave New World', 'Aldous Huxley'),
('Fahrenheit 451', 'Ray Bradbury'),
('The Catcher in the Rye', 'J. D. Salinger'),
('To Kill a Mockingbird', 'Harper Lee'),
('The Great Gatsby', 'F. Scott Fitzgerald'),
('Moby-Dick', 'Herman Melville'),
('The Hobbit', 'J. R. R. Tolkien'),
('The Lord of the Rings', 'J. R. R. Tolkien');
