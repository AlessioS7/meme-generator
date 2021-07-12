'use strict';

/* Data Access Object (DAO) module for accessing memes */

const db = require('./db');


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

// add a new meme
// the meme id is added automatically by the DB
exports.createMeme = (meme) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO memes (title, image, sentence1, sentence2, sentence3, public, creator, font, fontColor) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [meme.title, meme.image, meme.sentence1, meme.sentence2, meme.sentence3, meme.public == true ? 1 : 0, meme.creator, meme.font, meme.fontColor], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

// delete an existing meme
exports.deleteMeme = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM memes WHERE id = ?';
        db.run(sql, [id], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
}
