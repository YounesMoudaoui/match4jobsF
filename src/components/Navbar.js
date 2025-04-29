import React from 'react';
import { Link } from 'react-router-dom';
import web4jobslogo from '../assets/web4jobslogo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Web4Jobs
            </Link>
            <div className="nav-links">
                <Link to="/job-list" className="nav-link">Mes Offres</Link>
                <Link to="/create-job-offer" className="nav-link">Créer une offre</Link>
                <Link to="/profile" className="nav-link">Profil</Link>
            </div>
            <img src={web4jobslogo} alt="Web4Jobs Logo" className="navbar-logo" />
        </nav>
    );
};

export default Navbar; 