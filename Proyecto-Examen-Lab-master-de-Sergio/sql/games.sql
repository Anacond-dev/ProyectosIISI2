DROP TABLE IF EXISTS Games;

CREATE TABLE Games (
    gameId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(256) NOT NULL,
    developer VARCHAR(256) NOT NULL,
    releaseDate DATE NOT NULL,
    imageUrl VARCHAR(512),
    reviewScore INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE OR REPLACE VIEW GamesWithUsers AS 
    SELECT Games.*, Users.username, Users.fullName, Users.avatarUrl, Users.city, Users.age
    FROM Games
    JOIN Users ON Games.userId = Users.userId;

INSERT INTO Games (userId, title, developer, releaseDate, imageUrl, reviewScore) VALUES
    (1, 'Elden Ring', 'FromSoftware', '2022-02-25', 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg', 96),
    (1, 'Super Smash Bros. Ultimate', 'Bandai Namco', '2018-12-07', 'https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg', 93),
    (2, 'Genshin Impact', 'HoYoverse', '2020-09-28', 'https://upload.wikimedia.org/wikipedia/vi/0/0a/Genshin_Impact_cover.jpg', 84),
    (2, 'God of War', 'Santa Monica Studio', '2018-04-20', 'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg', 94),
    (3, 'Stardew Valley', 'ConcernedApe', '2016-02-26', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png', 89),
    (3, 'Microsoft Flight Simulator', 'Asobo Studio', '2020-08-18', 'https://upload.wikimedia.org/wikipedia/en/8/84/Microsoft_Flight_Simulator_2020_cover_art.png', 91);
