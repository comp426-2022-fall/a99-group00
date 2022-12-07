#!/usr/bin/env node

import { execute } from "./lib/db.js";

import express from 'express';
import parseArgs from 'minimist';

const args = parseArgs(process.argv.slice(2));
const port = args.port || 9000;

let app = express();
app.use(express.urlencoded({extended:true}));

// Root endpoint message for testing
app.get('/app/', (req, res) => {
    res.status(200).send("This message is from the api root endpoint!");
});

// GET: get user info
app.get('/app/users/:user', async(req, res) => {
    const query = `SELECT * FROM users WHERE username='${req.params.user}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

// POST: create new user
app.post('/app/users/:user', async(req, res) => {
    const query = `INSERT INTO users(username) VALUES ('${req.params.user}')`;
    const result = await execute(query);
    res.status(200).send(result);
});

// PATCH: update score/last access date of user
app.patch('/app/users/:user/correct', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1, number_correct=number_correct+1 WHERE username = '${req.params.user}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

app.patch('/app/users/:user/incorrect', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1 WHERE username = '${req.params.user}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

// DELETE: delete user from database
app.delete('/app/users/:user', async(req, res) => {
    const query = `DELETE FROM users WHERE users.username = '${req.params.user}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

// GET: get 5 top scoring users
app.get('/app/users/leaderboard', (req, res) => {

});

// GET: get a question from trivia DB API
app.get('/app/trivia', (req, res) => {

});

app.listen(port);
console.log(`Listening on port ${port}`);