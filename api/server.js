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
    const result = await execute_get(query);

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
    const username = req.params.username;

    // First check if username already exists
    const query_check = `SELECT * FROM users WHERE username='${username}'`;
    const result_check = await execute(query_check);
    if (result_check.length > 0) {
        const output = {
            status: 400,
            message: `${username} already exists`
        }
        res.status(400).send(output);
    }

    // If user does not exist, create user
    const query = `INSERT INTO users(username) VALUES ('${username}')`;
    const result = await execute(query)
    const output = {
        status: 200,
        message: `${username} was successfully created`
    }
    res.status(200).send(output);
});

// PATCH: update score/last access date of user
app.patch('/app/users/:username/correct', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1, number_correct=number_correct+1 WHERE username = '${req.params.username}'`;
    const result = await execute(query);

    const output = {
        status: 400,
        message: "${Username} does not exist."
    }
    if (result.affectedRows == 1) {
        output.status = 200;
        output.message = "${Username} was succesfully updated.";
        res.status(200).send(output);
    } else {
        res.status(400).send(output);
    }
});

app.patch('/app/users/:username/incorrect', async(req, res) => {
    const query = `UPDATE users SET number_attempts=number_attempts+1 WHERE username = '${req.params.username}'`;
    const result = await execute(query);

    const output = {
        status: 400,
        message: "${Username} does not exist."
    }
    if (result.affectedRows == 1) {
        output.status = 200;
        output.message = "${Username} was succesfully updated.";
        res.status(200).send(output);
    } else {
        res.status(400).send(output);
    }
});

// DELETE: delete user from database
app.delete('/app/users/:username', async(req, res) => {
    const query = `DELETE FROM users WHERE users.username = '${req.params.username}'`;
    const result = await execute(query);

    const output = {
        status: 400,
        message: "${Username} does not exist."
    }
    if (result.affectedRows == 1) {
        output.status = 200;
        output.message = "${Username} was succesfully deleted.";
        res.status(200).send(output);
    } else {
        res.status(400).send(output);
    }
});

// GET: get 5 top scoring users
app.get('/app/leaderboard', async(req, res) => {
    const query = "SELECT * FROM users ORDER BY number_correct DESC LIMIT 5";
    const result = await execute(query);
    const output = {
        users: result
    }
    res.status(200).send(output);
});

// Undefined paths
app.get("*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
});

app.listen(port);
console.log(`Listening at http://localhost:${port}`);