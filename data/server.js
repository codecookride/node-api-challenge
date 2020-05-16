const express = require('express');
const helmet = require('helmet');



const server = express();
const projectsRouter = require('./projectsRouter');
server.use(express.json());
server.use(helmet());



server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});





module.exports = server;

