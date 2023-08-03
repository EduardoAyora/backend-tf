node src/index.js
node src/moneyWorker.js consumeMessage

Create database app;
\c app

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email       varchar(40) NOT NULL,
    money   NUMERIC
);