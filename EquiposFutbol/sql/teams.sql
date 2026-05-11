DROP TABLE IF EXISTS Teams;

CREATE TABLE Teams (
    teamId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    president VARCHAR(256) NOT NULL,
    fieldCapacity INT NOT NULL,
    foundationDate DATE NOT NULL,
    photoURL VARCHAR(512)
);

INSERT INTO Teams (name, president, fieldCapacity, foundationDate, photoURL) VALUES
    ('Real Murcia Club de Fútbol', 'Agustín Ramos', 31179, '1919-12-06', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Escudo_Real_Murcia.png'),
    ('Sevilla Fútbol Club', 'José Castro', 43864, '1890-01-25', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1920px-Sevilla_FC_logo.svg.png'),
    ('Levante Unión Deportiva', 'Quico Catalán', 26354, '1909-09-09', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg/225px-Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg.png'),
    ('Real Betis Balompié', 'Ángel Haro.', 60784, '1907-09-12', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/2560px-Real_betis_logo.svg.png'),
    ('Salamanca Club de Fútbol UDS', 'Manuel Lovato', 17341, '2013-08-12', 'https://upload.wikimedia.org/wikipedia/en/7/71/Salamanca_CF_UDS.png');