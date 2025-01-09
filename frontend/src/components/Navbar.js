import React from "react";  
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/user">User</Link></li>
            </ul>
        </nav>
    )
};

export default Navbar;