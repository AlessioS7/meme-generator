import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Spinner, Toast } from 'react-bootstrap/';
import Navigation from './components/Navigation';
import API from './API'
import { LoginForm } from './components/Login';
import MemesList from './components/MemesList';
import TemplatesList from './components/CreateMeme';
import Modals from './components/Modals';

function App() {
  return (
    <Router>
      <Main></Main>
    </Router>
  );
}

// Main component (contains all the other major components)
const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState("");
  const [memesList, setMemesList] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const history = useHistory();

  const closeModal = () => { setShow(false); setSelectedMeme(null); };
  const showModal = () => setShow(true);

  const changeRoute = (route) => {
    setMessage('');
    setDirty(true); // to force loading new (possible) memes from other users as often as possible and to update message 
    setRoute(route);
    history.push("/" + route);
  }

  if (route === "login" && loggedIn === true)
  changeRoute(""); // needed to properly show the logout button when the user type manually the URL "/login" when already logged in

  // show error message in toast
  const handleErrors = (err) => {
    setMessage({ msg: err.error, type: 'danger' });
    console.log(err);
    setDirty(false); // in case of server error this is required to block the spinner and to show the error message 
  }

  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setUser(user);
        setLoggedIn(true);
      } catch (err) {
        setUser(null);
        setLoggedIn(false);
        console.log("No logged user"); // mostly unauthenticated user
      }
      changeRoute(window.location.pathname.substring(1));
    };
    checkAuth();
  }, []);

  const getMemeById = id => memesList.filter(m => m.id === id)[0];

  const addMeme = (meme) => {
    API.addMeme(meme)
      .then(() => setDirty(true))
      .catch(e => handleErrors(e));

    setShow(false);
    changeRoute("");
  }

  const deleteMeme = (meme) => {
    API.deleteMeme(meme)
      .then(() => setDirty(true))
      .catch(e => handleErrors(e));

    setShow(false);
  }

  // useful to reload the list of memes when there are some updates
  useEffect(() => {
    if (dirty) {
      API.getMemes()
        .then(memes => {
          setMemesList(memes);
          setDirty(false);
          if (route === "" && memes.length === 0) handleErrors({ error: "There are no memes to show." });
        })
        .catch(e => handleErrors(e));
    }
  }, [dirty, loggedIn])

  const handleLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      changeRoute("");
      setUser(user);
      setLoggedIn(true);
      setDirty(true);
    }
    catch (err) {
      // error is handled and visualized in the login form, do not manage error, throw it
      //handleErrors(err)
      throw err;
    }
  }

  const handleLogOut = async () => {
    await API.logOut()
    // clean up everything
    changeRoute("");
    setLoggedIn(false);
    setUser(null);
    setDirty(true);
  }

  // JSX
  return (
    <Container fluid>
      <Row>
        <Navigation onLogOut={handleLogOut} changeRoute={changeRoute} route={route} loggedIn={loggedIn} user={user} />
      </Row>
      {dirty ?
        <Row><Spinner animation="border" className="spinner" variant="secondary" /></Row> :
        <Switch>
          <Route path="/login">
            <Row className="vh-100 below-nav">
              {loggedIn ? <Redirect to="/" /> : <LoginForm login={handleLogIn} />}
            </Row>
          </Route>
          <Route exact path="/">
            <Row>
              <Toast show={message !== ''} onClose={() => setMessage('')} /*delay={3000}  autohide */ className="rounded toast">
                <Toast.Header> <strong className="mr-auto">Message</strong> </Toast.Header>
                <Toast.Body>{message?.msg}</Toast.Body>
              </Toast>
            </Row>
            <Row className="vh-100 below-nav">
              <MemesList list={memesList} setSelectedMeme={setSelectedMeme} showModal={showModal} />
              {selectedMeme && <Modals.ModalHome show={show} selectedMeme={getMemeById(selectedMeme)} closeModal={closeModal} user={user} changeRoute={changeRoute} deleteMeme={deleteMeme} />}
            </Row>
          </Route>
          <Route path="/createMeme">
            <Row className="vh-100 below-nav">
              {(route !== "" && !loggedIn) && <Redirect to="/" />}
              <TemplatesList setSelectedTemplate={setSelectedTemplate} showModal={showModal} route={route} loggedIn={loggedIn} changeRoute={changeRoute} />
              <Modals.ModalCreate show={show} selectedTemplate={selectedTemplate} cm={closeModal} user={user} addMeme={addMeme} selectedMeme={getMemeById(selectedMeme)} setSelectedMeme={setSelectedMeme} />
            </Row>
          </Route>
        </Switch>}
    </Container>
  );
}

export default App;
