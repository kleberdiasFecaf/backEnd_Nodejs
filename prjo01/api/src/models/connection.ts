import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createPool({
        host: process.env.HOSTMYSQL,
        user: process.env.USERMYSQL,
        password: process.env.PASSWORDMYSQL,    
        database: process.env.DATABASEMYSQL,
});