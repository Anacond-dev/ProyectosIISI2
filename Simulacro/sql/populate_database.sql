INSERT INTO users
VALUES
	(1,'user1', 'pbkdf2:sha256:150000$RVTpLkIl$976062ffde4796faa57d73fb0abc6743fe337849589163cfe6e3334f477883d7'),
	(2,'user2', 'pbkdf2:sha256:150000$RVTpLkIl$976062ffde4796faa57d73fb0abc6743fe337849589163cfe6e3334f477883d7'),
	(3,'user3', 'pbkdf2:sha256:150000$RVTpLkIl$976062ffde4796faa57d73fb0abc6743fe337849589163cfe6e3334f477883d7'),
	(99,'iissi', 'pbkdf2:sha256:150000$RVTpLkIl$976062ffde4796faa57d73fb0abc6743fe337849589163cfe6e3334f477883d7')
	;

INSERT INTO Photos
VALUES
	(1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.',  '/images/tortilla.jpg', 'Public', 1),
	(2, 'Samoyed', 'A very fluffy dog',  'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public', 1),
	(3, 'Coding in C#', 'A piece of very intricate code',  'https://pbs.twimg.com/media/Ea4HJNaXsAEbzzF?format=jpg&name=900x900', 'Public', 1),
	(4, 'The future society', 'This is what society would look like if PHP didn\'t exist', 'https://pbs.twimg.com/media/Eeeb3R0VAAAiVCp.jpg', 'Public', 1),
	(5, 'Comfy cat', 'A drawing of a cat about to sleep', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 2),
	(6, 'Seville', 'The beautiful city of Seville, Spain', 'images/sevilla.jpg', 'Public', 3),
	(7, 'Mont Saint-Michel', 'An island located in Normandy, France',  'https://www.timetravelturtle.com/wp-content/uploads/2019/11/Mont-St-Michel-2019-356_new.jpg', 'Public', 2),
	(8, 'Night operations', 'A plane flying over Toronto at night',  'https://www.airlive.net/wp-content/uploads/2016/09/maxresdefault-23.jpg', 'Private', 1),
	(9, 'Abstract art', 'A very weird clipart',  'https://i.pinimg.com/originals/19/bc/c0/19bcc01da7045216db8b78a4ecfc1d5d.jpg', 'Private', 2),
	(10, 'Knitting', 'Very relaxing',  'https://cdn.shopify.com/s/files/1/0078/5065/5857/t/8/assets/62638885ceb5--CocoKnitsBook_Appendix_Photo5_2692.jpg?1338', 'Private', 99);
	
INSERT INTO Votes (value, userId, photoId)
VALUES
	(2, 1, 1), (3, 2, 1), (4, 3, 1),
	(4, 1, 2), (5, 2, 2), (3, 3, 2),
	(2, 2, 3), (4, 1, 3), 
	(4, 2, 4),
	(4, 2, 5), (1, 3, 5),
	(5, 1, 6),
	(1, 1, 7), (2, 3, 7),
	(3, 1, 8),
	(4, 2, 9),
	(2, 3, 10);
