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
    res.status(200).send("This message is from the api root path!");
});

// GET: get specified user info
app.get('/app/users/:username', async(req, res) => {
    const query = `SELECT * FROM users WHERE username='${req.params.username}'`;
    const result = await execute(query);

    const output = {
        exists: false,
        user: null,
    }

    if (result.length == 1) {
        output.exists = true;
        output.user = result[0];
    }
    
    res.status(200).send(output);
});

// POST: create new user with specified username
app.post('/app/users/:username', async(req, res) => {
    const query = `INSERT INTO users(username) VALUES ('${req.params.username}')`;
    const result = await execute(query);
    res.status(200).send(result);
});

// PATCH: update score/last access date of user
app.patch('/app/users/:username/correct', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1, number_correct=number_correct+1 WHERE username = '${req.params.username}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

app.patch('/app/users/:username/incorrect', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1 WHERE username = '${req.params.username}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

// DELETE: delete user from database
app.delete('/app/users/:username', async(req, res) => {
    const query = `DELETE FROM users WHERE users.username = '${req.params.username}'`;
    const result = await execute(query);
    res.status(200).send(result);
});

// GET: get 5 top scoring users
app.get('/app/leaderboard', async(req, res) => {
    const query = "SELECT * FROM users ORDER BY number_correct DESC LIMIT 5";
    const result = await execute(query);
    res.status(200).send(result);
});

// Undefined paths
app.get("*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
});

app.listen(port);
console.log(`Listening at http://localhost:${port}`);