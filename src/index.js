import http from 'http';
import express from 'express';
import socket from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';

import dhtService from './services/DhtService';
import PasswordVerifier from './services/PasswordVerifier';
import Socket from './socket';
import checkPassword from './middleware/checkPassword';
import config from './config';
import api from './v1';

if (!config.password && process.env.ENV !== 'development') {
  throw new Error('Password not set. Set the value in ADMIN_PASSWORD env variable.');
}

const app = express();
app.server = http.createServer(app);

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: config.corsHeaders,
}));

const verifier = new PasswordVerifier(config.password);
const sensor = dhtService(4);

const socketServer = socket(app.server);
Socket(socketServer, verifier, sensor);

app.use(checkPassword(verifier));
app.use(bodyParser.json({ limit: config.bodyLimit }), api({ sensor }));

// starting actual server
app.server.listen(config.port);

console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line no-console
