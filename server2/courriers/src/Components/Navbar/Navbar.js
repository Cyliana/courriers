import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"


function Navbar() {

    let uid= sessionStorage.getItem("uid");
    let user= sessionStorage.getItem("username");
    return (
        <div className="container-fluid">
            <nav>
                <div className="col-md-2">
                    <NavLink id="liens"
                    to="/destinataires/liste"
                    className={({isActive})=> isActive ? "nav-link disabled" : "nav-link active"}
                    >Liste des destinataires</NavLink>
                </div>
                <div className="col-md-2">
                    <NavLink
                    to="/courriers/liste"
                    className={({isActive})=> isActive ? "nav-link disabled" : "nav-link active"}
                    >Liste des courriers</NavLink>
                </div>
                <div className="col-md-2">
                    <NavLink 
                    to={`/utilisateur/${uid}`}
                    className={({isActive})=> isActive ? "nav-link disabled" : "nav-link active"}
                    >Mon profil</NavLink>
                </div> 
                <div className="col-md-6" id='user'>Bonjour {user} !</div>
            </nav>  
        </div>
    )
}

export default Navbar
