import mysql from 'mysql2/promise';

const config = {
    /* Login information for our testing database. Exposed here for prototype. */
    user: "group00", 
    password: "password",
    host: "db4free.net",
    database: "trivia_group00",
};

export async function execute(query) {
    const connection = await mysql.createConnection(config);
    const [results, ] = await connection.execute(query);
    return results;
}