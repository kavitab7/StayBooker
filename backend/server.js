const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./dbConnection');
const roomsRoute = require('./routes/roomsRoute');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/rooms', roomsRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})