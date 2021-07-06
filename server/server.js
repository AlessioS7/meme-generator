'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const memeDao = require('./meme-dao'); // module for accessing the memes in the DB

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Format express-validate errors as strings
  return `${location}[${param}]: ${msg}`;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** MEMES APIs ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /api/memes (get memes' list)
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

// POST /api/memes (create meme)
app.post('/api/memes',
  /* isLoggedIn, */
  [
    check('title').isLength({ min: 1, max: 160 }),
    check('image').isLength({ min: 1, max: 20 }),
    check('public').isBoolean(),
    check('creator').isLength({ min: 1, max: 20 })
    // that at least a sentence is given is checked directly in the front end
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }

    const meme = {
      title: req.body.title,
      image: req.body.image,
      sentence1: req.body.sentence1,
      sentence2: req.body.sentence2,
      sentence3: req.body.sentence3,
      public: req.body.public,
      creator: req.body.creator
    };

    try {
      const result = await memeDao.createMeme(meme);
      res.status(200).json({});
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new meme: ${err}.` });
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DELETE /api/memes/<id> (delete a meme)
app.delete('/api/memes/:id', 
  /* isLoggedIn, */ 
  [ check('id').isInt() ], 
  async (req, res) => {
  try {
    await memeDao.deleteMeme(req.params.id);
    res.status(200).json({}); 
  } catch (err) {
    res.status(503).json({ error: `Database error during the deletion of meme ${req.params.id}` });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** CREATORS APIs ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});