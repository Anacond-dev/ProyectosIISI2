DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects (
    projectId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(256) NOT NULL,
    projectLeader VARCHAR(256) NOT NULL,
    endDate DATE NOT NULL,
    budget INT NOT NULL,
    description VARCHAR(512),
    imageUrl VARCHAR(512),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE OR REPLACE VIEW ProjectsWithUsers AS 
    SELECT Projects.*, Users.username, Users.fullName, Users.avatarUrl, Users.city, Users.age
    FROM Projects
    JOIN Users ON Projects.userId = Users.userId;

INSERT INTO Projects (userId, name, projectLeader, endDate, budget, description, imageUrl) VALUES
    (1, 'Protego', 'Daniel Ayala', '2030-09-12', 500000, 'Implementing cyber-secutiry measures in hospitals. Includes all aspects of security', 'https://protego-project.eu/wp-content/uploads/2020/10/ProTego-logo-main-white.png'),
    (1, 'Asterisk', 'Rafael Ayala', '2027-11-08', 1000000, 'Development of techniques for modelling satellite behavior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Asterisk_logo.svg/1280px-Asterisk_logo.svg.png'),
    (2, 'ISIDORO', 'David Ruiz', '2004-05-21', 250000, 'The Web has information. That information is hard to get. We create programs and stuff to get that information.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Isidor_von_Sevilla.jpeg/320px-Isidor_von_Sevilla.jpeg'),
    (2, 'BigTXT', 'Daniel Ayala', '2050-12-12', 50000, 'In this project, all existing knowledge will be stored in a single txt file', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Text-txt.svg/1200px-Text-txt.svg.png');
