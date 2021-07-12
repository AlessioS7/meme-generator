import { Navbar, Button, Image } from 'react-bootstrap/';
import logo from '../logo.png';
import { LogoutButton } from './Login';

// Navigation bar component
const Navigation = (props) => {
    const { onLogOut, changeRoute, route, loggedIn, user } = props;

    // JSX
    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="justify-content-between">
            <Navbar.Brand onClick={() => changeRoute("")} className="clickable">
                <Image src={logo} roundedCircle width={50} height={50} alt="50x50" className="mr-2" />
                Meme Generator
            </Navbar.Brand>
            {route === "login" ? <></> : loggedIn ?
                <div>
                    <Navbar.Text className="mr-3">Welcome, {user}!</Navbar.Text>
                    {route === "" ?
                        <Button variant="secondary" className="mr-2" onClick={() => changeRoute("createMeme")}>Create a meme</Button> : <></>}
                    <LogoutButton logout={onLogOut} />
                </div> :
                <Button variant="secondary" onClick={() => changeRoute("login")}>Log In</Button>}
        </Navbar>
    );
}


export default Navigation;