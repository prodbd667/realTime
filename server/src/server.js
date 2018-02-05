import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';

import mongoose from 'mongoose';

import http from 'http';
import socket from 'socket.io';
// import routes
import serverRoutes from './routes/server.route';
import * as control from './controllers/server.controller';

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.Server(app);
const io = socket(server);

io.on('connection', (socket) => {
    console.log("Connected to Socket!!" + socket.id);
    // Receiving Todos from client
    socket.on('addTodo', (Todo) => {
        console.log('socketData: ' + JSON.stringify(Todo));
        control.addField(io, Todo);
    });
    // Receiving Updated Todo from client
    socket.on('updateTodo', (Todo, action) => {
        console.log('socketData: ' + JSON.stringify(Todo));
        control.updateField(io, Todo, action);
    });
    // Receiving Todo to Delete
    socket.on('deleteTodo', (Todo) => {
        console.log('socketData: ' + JSON.stringify(Todo));
        control.deleteField(io, Todo);
    });

});

// const router = express.Router();

// /** */
// // middleware
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// allow-cors
app.use('*', cors({ origin: 'http://localhost:4200' }));
// allow-cors
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

// connect to database
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://test:test@ds253587.mlab.com:53587/maintest', {
//     useMongoClient: true,
// });
mongoose.connection.on('open', (ref) => console.log('connect to mongo server'));
mongoose.connection.on('error', (err) => {
    console.log('connect to mongo server');
    console.log(err);
});

mongoose.connect('mongodb://test:test@ds253587.mlab.com:53587/maintest');


app.get('/', function (req, res) {
    res.send('hello world');
});
app.use('/api', serverRoutes);

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

server.listen(PORT, () => console.log('server running'));