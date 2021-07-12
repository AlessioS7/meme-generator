'use strict';
/* Data Access Object (DAO) module for accessing users */

const db = require('./db');
const bcrypt = require('bcrypt');

exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM creators WHERE username = ?';
      db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(false);
        }
        else {
          // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
          bcrypt.compare(password, row.hash).then(result => {
            if(result) 
              resolve(row.username);
            else
              resolve(false);
          });
        }
    });
  });
};