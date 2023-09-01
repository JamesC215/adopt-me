import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import Logo from '../Logo/Logo';

export default function NavBar({ user, setUser }){
    const history = useNavigate()
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <>
        <nav className='navbar'>
            <span>Welcome, {user.name} </span>
            &nbsp; | &nbsp; 
            <Link to="/orders/new">DONATE</Link>
            &nbsp;&nbsp; <Link to="" onClick={handleLogOut}>Log Out</Link> 
        </nav>
        </>
    );
}



