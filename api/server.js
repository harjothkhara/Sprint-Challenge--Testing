const express = require('express');
const helmet = require('helmet');
const gamesRouter = require('../router/router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/games', gamesRouter);

module.exports = server;