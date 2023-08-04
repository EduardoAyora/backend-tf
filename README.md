node src/index.js
node src/moneyWorker.js consumeMessage

mysql -u root -p
CREATE DATABASE app;
USE app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  money DOUBLE
);

GRANT ALL PRIVILEGES ON app.* TO 'admin'@'%';

INSERT INTO users (email, money)
VALUES ('eduardoaayora24@gmail.com', 200);

INSERT INTO users (email, money)
VALUES ('eduardoaayora64@gmail.com', 800);