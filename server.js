const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err))

const customerRoute = require('./routes/customerRoute');
const fundsRoute = require('./routes/fundsRoute');

app.use('/customer', customerRoute);
app.use('/funds', fundsRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});