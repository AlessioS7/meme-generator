import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useRouteMatch, useHistory, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap/';
import Navigation from './components/Navigation';
import API from './API'
import { LoginForm } from './components/Login';
import MemesList from './components/MemesList';
import TemplatesList from './components/CreateMeme';
import Modals from './components/Modals';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <Router>
      <Main></Main>
    </Router>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState("");
  const [memesList, setMemesList] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);

  const history = useHistory();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // if another filter is selected, redirect to a new view/url
  const changeRoute = (route) => {
    setRoute(route);
    history.push("/" + route);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // show error message in toast
  const handleErrors = (err) => {
    setMessage({ msg: err.error, type: 'danger' });
    console.log(err);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setUser(user);
        setLoggedIn(true);
      } catch (err) {
        console.log("No logged user"); // mostly unauthenticated user
      }
      changeRoute(window.location.pathname.substring(1));
    };
    checkAuth();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getMemeById = id => memesList.filter(m => m.id === id)[0];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (dirty) {
      API.getMemes()
        .then(memes => {
          setMemesList(memes);
          setDirty(false);
        })
        .catch(e => handleErrors(e));
    }
  }, [dirty, loggedIn])

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      setDirty(true);
      changeRoute("");
    }
    catch (err) {
      // error is handled and visualized in the login form, do not manage error, throw it
      // handleErrors(err)
      throw err;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleLogOut = async () => {
    await API.logOut()
    // clean up everything
    changeRoute("");
    setLoggedIn(false);
    setUser(null);
    setDirty(true);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container fluid>
      <Row>
        <Navigation onLogOut={handleLogOut} changeRoute={changeRoute} route={route} loggedIn={loggedIn} user={user} />
      </Row>
      <Switch>
        <Route path="/login">
          <Row className="vh-100 below-nav">
            {loggedIn ? <Redirect to="/" /> : <LoginForm login={handleLogIn} />}
          </Row>
        </Route>
        <Route exact path="/">
          <Row className="vh-100 below-nav">
            <MemesList list={memesList} setSelectedMeme={setSelectedMeme} showModal={showModal} />
          </Row>
          {selectedMeme && <Modals.ModalHome show={show} selectedMeme={getMemeById(selectedMeme)} closeModal={closeModal} user={user} />}
        </Route>
        <Route path="/createMeme">
          <Row className="vh-100 below-nav">
            <TemplatesList/>
          </Row>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
