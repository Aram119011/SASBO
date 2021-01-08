const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


const subscribeRegister = require('./routes/subscribeRegister');
const Auth = require('./routes/auth');
const Profile = require('./routes/ProfileRoutes');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/api/subscribe', subscribeRegister);
app.use('/api/auth', Auth);
app.use('/api/profile', Profile);


app.use('/uploads', express.static('uploads'));


module.exports = app;
