import {execute} from './lib/db.js';
const user = "Alan3";
const query = `DELETE FROM users WHERE users.username = '${user}'`;
const result = await execute(query);
console.log(result);