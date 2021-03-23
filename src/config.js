require('dotenv').config();

export const con = {
    host: process.env.HOST,
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    connectionLimit: 10
};
