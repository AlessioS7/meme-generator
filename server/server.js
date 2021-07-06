'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const memeDao = require('./meme-dao'); // module for accessing the memes in the DB
const userDao = require('./user-dao'); // module for accessing the users in the DB

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** SET UP PASSPORT ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((username, done) => {
  done(null, username);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// starting from the data in the session, we extract the current (logged-in) username
passport.deserializeUser((username, done) => {
  done(null, username); // this will be available in req.user
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Format express-validate errors as strings
  return `${location}[${param}]: ${msg}`;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** INIT EXPRESS ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: '- lorem ipsum dolor sit amet -',
  resave: false,
  saveUninitialized: false
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** MEMES APIs ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /api/memes (get memes' list)
app.get('/api/memes',
  [],
  async (req, res) => {
    try {
      const result = await memeDao.listMemes(req.isAuthenticated());

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
  isLoggedIn,
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
  isLoggedIn,
  [check('id').isInt()],
  async (req, res) => {
    try {
      await memeDao.deleteMeme(req.params.id);
      res.status(200).json({});
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of meme ${req.params.id}` });
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** USERS APIs ***/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Login --> POST /sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.username contains the authenticated username that we send back
      // this is coming from userDao.getUser()
      return res.json(user);
    });
  })(req, res, next);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});