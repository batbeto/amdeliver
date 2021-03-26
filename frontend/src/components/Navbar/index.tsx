import './styles.css';
import { ReactComponent as Logo } from '../../assets/location_brasil.svg';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login'

function Mainavbar(){
    return(
        
        <Navbar bg="dark" variant="dark" className="main-navbar">
            <Navbar.Brand href="/">
                <Logo
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Mutlu
            </Navbar.Brand>
            <Navbar.Brand className="btn_google">
                <Login />
            </Navbar.Brand>
        </Navbar>
        
   
    )
}


export default Mainavbar;