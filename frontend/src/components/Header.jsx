import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <h1>Zoolab Cloud</h1>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
