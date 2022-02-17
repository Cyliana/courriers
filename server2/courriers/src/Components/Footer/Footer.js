import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {

    return (
        <footer className='container-fluid'>
            <button><Link to="/courrier/ajouter">Nouveau Courrier</Link></button>
            <button><Link to="/destinataires/ajouter">Nouveau Destinataire</Link></button>
        </footer>
    );
}
export default Footer;
