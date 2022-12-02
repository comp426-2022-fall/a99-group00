#!/usr/bin/env node

import { get_user, update_user, create_user, delete_user, leaderboard } from "./lib/users.js";

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

// GET: get user score
app.get('/app/users/:user', (req, res) => {
    res.status(200).send(get_user(user));
});

// POST: create new user
app.post('/app/users/:user', (req, res) => {
    res.status(200).send(create_user(user));
});

// PATCH: update score/last access date of user
app.patch('/app/users/:user', (req, res) => {

});

// DELETE: delete user from database
app.delete('/app/users/:user', (req, res) => {

});

// GET: get 5 top scoring users
app.get('/app/users/leaderboard', (req, res) => {

});

// GET: get a question from trivia DB API
app.get('/app/trivia', (req, res) => {

});


app.listen(port);