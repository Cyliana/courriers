import React from 'react'
import FieldInput from '../FieldInput/FieldInput'

function Inscription() {

    const handleSubmit =(e)=>{
        e.preventDefault();

        let myHeaders = new Headers();
        let formData = new FormData(document.getElementById('formulaire'));

        let myInit = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        mode: "cors",
        cache: "default"
        };

        
        let user = "https://amandat.promo-73.codeur.online/courriers/server1/api/utilisateur/ajouter";

        fetch(user, myInit)
        .then((response) => {
            console.log(response.json());
            window.location.href="https://amandat.promo-73.codeur.online/courriers/server2/";
        })
    }

    return (
        <>
            <h2>Formulaire d'inscription</h2>
            <form id='formulaire' onSubmit={handleSubmit}>
                <FieldInput
                    id="identifiant"
                    label="Votre identifiant"
                    type="text"
                    value=""
                />
                <select name="titre" id="titre">
                    <option>Veuillez choisir votre titre</option>
                    <option value="M.">Monsieur</option>
                    <option value="Mme.">Madame</option>
                </select>
                <FieldInput
                    id="prenom"
                    label="Votre prénom"
                    type="text"
                    value=""
                />
                <FieldInput
                    id="nom"
                    label="Votre nom"
                    type="text"
                    value=""
                />
                <FieldInput
                    id="adresse"
                    label="Votre adresse"
                    type="text"
                    value= ""
                />
                <FieldInput
                    id="code_postal"
                    label="Code postal"
                    type="text"
                    value= ""
                />
                <FieldInput
                    id="localite"
                    label="Votre ville"
                    type="text"
                    value= ""
                />
                <FieldInput
                    id="telephone"
                    label="Votre numéro de téléphone"
                    type="text"
                    value= ""
                />
                <FieldInput
                    id="email"
                    label="Votre email"
                    type="email"
                    value= ""
                />
                <FieldInput
                    id="mot_de_passe"
                    label="Votre mot de passe"
                    type="password"
                    value= ""
                />
                <input type="submit" value="S'inscrire" />
            </form>
        </>
    )
}

export default Inscription
