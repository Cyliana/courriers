import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useFormik } from 'formik';
import Navbar from '../../Navbar/Navbar';

const Destinatairesajouter = () => {

    const formik = useFormik({
        initialValues: {

            titre: '',
            nom: '',
            prenom: '',
            fonction: '',
            denomination: '',
            adresse: '',
            code_postal: '',
            localite: '',
            telephone: '',
            email: '',
            commentaire: ''
        },

        onSubmit:()=>
        {
            console.log('onSubmit');

            let myHeaders = new Headers();
            let form = new FormData(document.getElementById('formulaire'));

            let myInit = 
            {
              method: "POST",
              headers: myHeaders,
              mode: "cors",
              body: form,
              cache: "default",
            };
          
            let id = sessionStorage.getItem("uid");

            fetch("https://amandat.promo-73.codeur.online/courriers/server1/api/destinataire/ajouter/"+ id, myInit)
            .then((response) => {
                //return response.json();

                window.location.href = "https://amandat.promo-73.codeur.online/courriers/server2/destinataires/liste";
              })
        }
    });

    return (
    <div>
        <Navbar />
        <h2>Ajout d'un destinataire</h2>
            <form id="formulaire" onSubmit={formik.handleSubmit}>
            <label htmlFor="titre">Civilité</label>
            <input
                id="titre"
                name="titre"
                type="select"
                onChange={formik.handleChange}
                value={formik.values.titre}
            />
            <label htmlFor="nom">Nom</label>
            <input
                id="nom"
                name="nom"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nom}
            />
            <label htmlFor="prenom">Prénom</label>
            <input
                id="prenom"
                name="prenom"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.prenom}
            />
            <label htmlFor="fonction">Fonction</label>
            <input
                id="fonction"
                name="fonction"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fonction}
            />
            <label htmlFor="denomination">Dénomination</label>
            <input
                id="denomination"
                name="denomination"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.denomination}
            />
            <label htmlFor="adresse">Adresse</label>
            <textarea
                id="adresse"
                name="adresse"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.adresse}
            />
            <label htmlFor="code_postal">Code Postal</label>
            <input
                id="code_postal"
                name="code_postal"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.code_postal}
            />
            <label htmlFor="localite">Localité</label>
            <input
                id="localite"
                name="localite"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.localite}
            />
            <label htmlFor="telphone">Téléphone</label>
            <input
                id="telephone"
                name="telephone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.telephone}
            />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="commentaire">Commentaire</label>
            <textarea
                id="commentaire"
                name="commentaire"
                type="textArea"
                onChange={formik.handleChange}
                value={formik.values.commentaire}
            />
            <button type="submit">Enregistrer</button>    
        </form> 
    </div>
    );
}

export default Destinatairesajouter;
