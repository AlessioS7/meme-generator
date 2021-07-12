// This file contains all the functions to interact with the back end

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
        let toThrow = "";
        try {
            const errDetail = await response.json();
            toThrow =  errDetail.message;
        }
        catch (err) { // if we are here it means the json function didn't work
            toThrow = "Internal Server Error";
        }

        throw toThrow;
    }
}

async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
    const response = await fetch('/api/sessions/current');
    const userInfo = await response.json();

    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;  // an object with the error coming from the server, mostly unauthenticated user
    }
}

async function getMemes() {
    const response = await fetch('/api/memes');
    if (response.ok) {
        const memes = await response.json();

        for (let i = 0; i < memes.length; i++) {
            memes[i].fontColor = JSON.parse(memes[i].fontColor);
        }

        return memes;
    }
    else {
        // ERROR HANDLING
        let toThrow = "";
        try {
            const errDetail = await response.json();
            toThrow = errDetail.message;
        }
        catch (err) { // if we are here it means the json function didn't work
            toThrow = {error: "Internal Server Error"};
        }
        
        throw toThrow;
    }
}

async function addMeme(meme) {
    meme.fontColor = JSON.stringify(meme.fontColor);
    console.log(JSON.stringify(meme));
    const response = await fetch('/api/memes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meme)
    });

    if (response.ok) {
        return null;
    }
    else {
        // ERROR HANDLING
        let toThrow = "";
        try {
            const errDetail = await response.json();
            toThrow = {error: errDetail.error} ;
        }
        catch (err) { // if we are here it means the json function didn't work
            toThrow = {error: "Internal Server Error"};
        }

        throw toThrow;
    }
}

async function deleteMeme(id) {
    const response = await fetch('/api/memes/' + id, {
        method: 'DELETE',
    });

    if (response.ok) {
        return null;
    }
    else {
        // ERROR HANDLING
        let toThrow = "";
        try {
            const errDetail = await response.json();
            toThrow = errDetail.error;
        }
        catch (err) { // if we are here it means the json function didn't work
            toThrow = {error: "Internal Server Error"};
        }
        throw toThrow;
    }
}

const API = { logIn, logOut, getMemes, getUserInfo, addMeme, deleteMeme }
export default API;