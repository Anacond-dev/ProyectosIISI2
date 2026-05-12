DROP TABLE IF EXISTS Books;

CREATE TABLE Books (
    bookId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    author VARCHAR(256) NOT NULL,
    releaseDate DATE NOT NULL,
    numPages INT NOT NULL,
    imageUrl VARCHAR(512)
);

INSERT INTO Books (title, author, releaseDate, numPages, imageUrl) VALUES
    ('A Dance with Dragons', 'George R.R. Martin', '2011-07-12', 1016, 'https://upload.wikimedia.org/wikipedia/en/5/5d/A_Dance_With_Dragons_US.jpg'),
    ('Reina Roja', 'Juan Gomez-Jurado', '2018-11-08', 568, 'https://static.wikia.nocookie.net/biblioteca-virtual-de-literatura/images/8/8b/Reina_roja.jpg/revision/latest?cb=20211122054041&path-prefix=es'),
    ('Blood of Elves', 'Andrzej Sapkowski', '1994-02-21', 320, 'https://upload.wikimedia.org/wikipedia/en/6/61/Blood_of_Elves_UK.jpg'),
    ('The Silence of the Lambs', 'Thomas Harris', '1988-05-19', 338, 'https://upload.wikimedia.org/wikipedia/en/6/62/Silence3.png'),
    ('House of Leaves', 'Mark Z. Danielewski', '2000-03-07', 709, 'https://upload.wikimedia.org/wikipedia/en/d/de/House_of_leaves.jpg');
