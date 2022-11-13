const express = require('express')
const app = express ();
const mongoose =  require('mongoose')
const path = require('path')

// Require de tous les routes necessaire 
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauces')


app.use(express.json());

// CONFIG BASE DE DONNÉE
mongoose.connect('mongodb+srv://sadberto_project:102030@cluster0.3o3iyhn.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  // Headers en http
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, authorization, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
 //Routes l'api
app.use('/api/auth' , userRoutes);
app.use('/api' , sauceRoutes);
app.use('/images' , express.static(path.join(__dirname, 'images')));
module.exports = app;


