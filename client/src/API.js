/**
 * All the API calls
 */

const BASEURL = '/api';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json(); // the json function parse from json format to JS Object
        return user;
    }
    else {
        // ERROR HANDLING
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch (err) {
            throw err;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getMemes() {
    const response = await fetch('/api/memes');
    if (response.ok) {
        const memes = await response.json();
        return memes;
    }
    else {
        // ERROR HANDLING
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch (err) {
            throw err;
        }
    }
}

const API = { logIn, logOut, getMemes }
export default API;