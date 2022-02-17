import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useFormik } from 'formik';
import Select from '../../Select/Select';
import Navbar from '../../Navbar/Navbar';

const DestinataireFormulaire = () => {
    const [records, setRecords] = useState([]);

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

        onSubmit: values => {
            let courrier = 'https://amandat.promo-73.codeur.online/courriers/server1/api/destinataire/modifier/' + user + '/' + id;

            const serialize_form = form => JSON.stringify(
                Array.from(new FormData(document.getElementById("formulaire")).entries())
                    .reduce((m, [key, value]) => Object.assign(m, { [key]: value }), {})
            );

            const json = serialize_form(this);
            fetch(courrier, { method: 'PUT', body: json, headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    response.text().then(function (txt) { console.log("Response:" + txt); });
                })
                .then(() => {
                    window.location.href = "https://amandat.promo-73.codeur.online/courriers/server2/destinataires/liste"

                })
        }
    });

    let { id } = useParams();
    let user = sessionStorage.getItem("uid");

    useEffect(() => {
        let myHeaders = new Headers();
        let myInit =
        {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/destinataire/' + user + '/' + id, myInit)
            .then(response => {
                return response.json();
            })

            .then(records => {
                console.log(records[0]);
                setRecords(records[0])
                formik.setFieldValue("titre", records[0][2])
                formik.setFieldValue("nom", records[0][3])
                formik.setFieldValue("prenom", records[0][4])
                formik.setFieldValue("fonction", records[0][5])
                formik.setFieldValue("denomination", records[0][6])
                formik.setFieldValue("adresse", records[0][7])
                formik.setFieldValue("code_postal", records[0][8])
                formik.setFieldValue("localite", records[0][9])
                formik.setFieldValue("telephone", records[0][10])
                formik.setFieldValue("email", records[0][11])
                formik.setFieldValue("commentaire", records[0][12])

            })

    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Modification d'un destinataire</h2>
                <form id="formulaire" onSubmit={formik.handleSubmit}>
                    {records[0] !== undefined &&
                        <>
                        <Select
                            id='titre'
                            label='Titre'
                            type='select'
                            options= {[["M.","Monsieur"], ["Mme","Madame"], ["Melle","Mademoiselle"],]}
                            selected = ""
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
                        <input type="submit" value="Envoyer"/>
                        </>
                    }
                </form>
            </div>
        </div> 
    );
}

export default DestinataireFormulaire