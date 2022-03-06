const mongoose = require('mongoose')
require('dotenv').config();

// const dbURI = process.env.DB_URI;
// mongoose.connect(dbURI)
//     .then (result => console.log("Connected to Mongodb Cloud"))
//     .catch (err => console.log(err));

// const dbURI = process.env.MongoURI;

// mongoose.connect(dbURI)
//     .then (result => console.log("Connected to Mongodb Cloud"))
//     .catch (err => console.log(err));

mongoose.connect('mongodb://localhost/Impact-Week-FinalTest')
.then ( result => console.log('Local DB connected'))
.catch( err => console.log(err))