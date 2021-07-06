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
        const user = await response.json(); // json parse from json format to JS Object
        return user;
    }
    else {
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

const API = { logIn, logOut}
export default API;