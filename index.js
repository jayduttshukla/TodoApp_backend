const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express(); 
const port = process.env.PORT || 3000;
const todos = require('./Routes/todos');
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));
app.use(cors());


// Middlewares
app.use(express.json());

// routes
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/auth', auth);

console.log('config: ',config.dbURL)
// DB connection
mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log('Error in connecting to the databse', err))

// Server bootup
app.listen(port, () => console.log(`Listening on port ${port}...`));