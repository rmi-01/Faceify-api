const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');


const register = require('./Controllers/register');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
const signin = require('./Controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  }
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, resp) => {
  resp.json("Its working")
  });
server.post('/signin', signin.handleSignin(db, bcrypt));
server.post('/register', register.handleRegister(db, bcrypt));
server.get('/profile/:id', profile.handleProfile(db));
server.put('/image', image.handleImage(db));
server.post('/imageurl', image.handleUrl);

// {
//   db.select('*').from('users')
//   .orderBy('id', 'asc')
//   .then(data => {
//     resp.json(data);
//   })
// }

server.listen(process.env.PORT, () => {
	console.log(`The server is working on ${process.env.PORT}`);
});