DROP TABLE IF EXISTS Events;

CREATE TABLE Events (
    eventId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    eventDate DATE NOT NULL,
    maxParticipants INT NOT NULL,
    place VARCHAR(256) NOT NULL,
    imageUrl VARCHAR(512)
);

INSERT INTO Events (name, eventDate, maxParticipants, place, imageUrl) VALUES
    ('Reunión para estudiar física', '2023-05-12', 5, 'Sala de estudios', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/El_aula_como_espacio_educativo.jpg/220px-El_aula_como_espacio_educativo.jpg'),
    ('Celebración del cumple de Rocío', '2023-04-02', 15, 'Casa de Rocío', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tarta_de_cumplea%C3%B1os.svg/640px-Tarta_de_cumplea%C3%B1os.svg.png'),
    ('Partido de pádel', '2023-08-21', 6, 'Pistas de casa de Paco', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pala_de_padel.jpg/1200px-Pala_de_padel.jpg'),
    ('Concierto de violín', '2020-01-01', 250, 'Salón de actos', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Nconcert.jpg');
