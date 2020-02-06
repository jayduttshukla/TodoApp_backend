const express = require('express');
const mongoose = require('mongoose');

const app = express(); 
const port = process.env.PORT || 3000;
const todos = require('./Routes/todos');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));

// Middlewares
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// routes
app.use('/api/todos', todos);


// DB connection
mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log('Error in connecting to the databse', err))

// Server bootup
app.listen(port, () => console.log(`Listening on port ${port}...`));