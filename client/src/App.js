import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useRouteMatch, useHistory, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap/';
import Navigation from './components/Navigation';
import API from './API'
import { LoginForm } from './components/Login';

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
  const history = useHistory();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // if another filter is selected, redirect to a new view/url
  const changeRoute = (route) => {
    setRoute(route);
    history.push("/" + route);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      setRoute("");
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
    setLoggedIn(false);
    setUser(null);
    /*     setTaskList([]);
        setDirty(true); */
  }

  return (
    <Container fluid>
      <Row>
        <Navigation onLogOut={handleLogOut} changeRoute={changeRoute} setRoute={setRoute} loggedIn={loggedIn} user={user} />
      </Row>
      <Switch>
        <Route path="/login">
          <Row className="vh-100 below-nav">
            {loggedIn ? <Redirect to="/" /> : <LoginForm login={handleLogIn} />}
          </Row>
        </Route>
        <Route exact path="/">
          <Row className="vh-100 below-nav">
            <h1>HOME</h1>
          </Row>
        </Route>
        <Route path="/createMeme">
          <Row className="vh-100 below-nav">
            <h1>CREATE A NEW POST</h1>
          </Row>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
