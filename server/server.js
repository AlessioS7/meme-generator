'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const memeDao = require('./meme-dao'); // module for accessing the memes in the DB

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*** MEMES APIs ***/

// GET /api/memes 
app.get('/api/memes',
  [],
  async (req, res) => {
    try {
      const result = await memeDao.listMemes(true/* req.isAuthenticated() */);

      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});