require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Tietokantayhteys muodostettu');
    })
    .catch(err => {
        console.error('Virhe tietokantayhteydessä:', err);
    });


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/tags', tagRoutes);

app.get('/', (req, res) => res.send('Blogi API toimii'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Palvelin käynnistetty portissa ${PORT}`));
