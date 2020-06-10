import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const uri = 'mongodb://localhost:27017/proyectopooDB';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

//conexion a DB
mongoose.connect(uri, options).then(
  () => { console.log("Conectado a mongoDB"); },
  err => { err }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

/* Rutas
app.get('/', (req, res) => {
  res.send('Esto ya va funcionando');
});*/

app.use('/api', require('./routes/nota'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('App de test escuchando en puerto: '+ app.get('puerto'));
});

app.use('/api', require('./routes/nota'));