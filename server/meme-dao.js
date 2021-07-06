'use strict';

/* Data Access Object (DAO) module for accessing memes */

const db = require('./db');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get all memes
exports.listMemes = (isAuthenticated) => {
    return new Promise((resolve, reject) => {
        const sql = isAuthenticated ? 'SELECT * FROM memes' : 'SELECT * FROM memes WHERE public = 1';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
};
