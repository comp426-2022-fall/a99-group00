#!/usr/bin/env node

import { execute } from "./lib/db.js";
import express from 'express';
import parseArgs from 'minimist';
import cors from 'cors';

const args = parseArgs(process.argv.slice(2));
const port = args.port || 9000;

let app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Helper function used to get specified user's data
async function get_user(username) {
    const query = `SELECT * FROM users WHERE username='${username}'`;
    const result = await execute(query);

    if (result.length == 0) {
        return false;
    }

    return result[0];
}

// Root endpoint message for testing
app.get('/app/', (req, res) => {
    res.status(200).send("This message is from the api root path!");
});

// GET: get specified user info
app.get('/app/users/:username', async(req, res) => {
    const result = await get_user(req.params.username);

    let output = {
        exists: false,
        user: null,
    }
    if (result) {
        output.exists = true;
        output.user = result;
    }
    res.status(200).send(output);
});

// POST: create new user with specified username
app.post('/app/users/:username', async(req, res) => {
    const username = req.params.username;

    const query = `INSERT INTO users(username) VALUES ('${username}')`;
    try {
        await execute(query)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            message: `${username} already exists`
        });
    }

    const user_data = await get_user(username);
    res.status(200).send({
        status: 200,
        message: `${username} was successfully created`,
        user: user_data
    })
})
// PATCH: update score of user when they give a correct answer
app.patch('/app/users/:username/correct', async(req, res) => {
    const username = req.params.username;
    const query = `UPDATE users SET number_attempts=number_attempts+1, number_correct=number_correct+1 WHERE username = '${username}'`;
    const result = await execute(query);

    if (result.affectedRows == 0) {
        res.status(400).send({
            status: 400,
            message: `${username} does not exist.`
        });
    } else {
        const user_data = await get_user(username);
        res.status(200).send({
            status: 200,
            message: `${username} score was updated`,
            user: user_data
        })
    }
});

// PATCH: update score of user when they give an incorrect answer
app.patch('/app/users/:username/incorrect', async(req, res) => {
    const username = req.params.username;
    const query = `UPDATE users SET number_attempts=number_attempts+1 WHERE username = '${username}'`;
    const result = await execute(query);

    if (result.affectedRows == 0) {
        res.status(400).send({
            status: 400,
            message: `${username} does not exist.`
        });
    } else {
        const user_data = await get_user(username);
        res.status(200).send({
            status: 200,
            message: `${username} score was updated`,
            user: user_data
        })
    }
});

// DELETE: delete user from database
app.delete('/app/users/:username', async(req, res) => {
    const username = req.params.username;
    const query = `DELETE FROM users WHERE users.username = '${username}'`;
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