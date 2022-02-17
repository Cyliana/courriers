import React from 'react';
import { useState, useEffect } from 'react';
import FieldInput from '../../FieldInput/FieldInput';
import TextArea from '../../TextArea/TextArea';
import { useParams } from "react-router-dom"
import Select from '../../Select/Select';
import Navbar from '../../Navbar/Navbar'

const CourrierFormulaire = () => {
    const [records, setRecords] = useState([]);
    const [liste_destinataires, setListe_destinataires] = useState([]);

    let myHeaders = new Headers();
    let { id } = useParams();

    let myInit =
    {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    let user = sessionStorage.getItem("uid");
    useEffect(() => {
        fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/courrier/' + user + '/' + id, myInit)
            .then(response => {
                return response.json();
            })
            .then(records => {
                console.log(records);
                setRecords(records[0])
            })

        fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/destinataires/liste/' + user, { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' })
            .then(response => {
                return response.json();
            })
            .then(destinataires => {
                console.log(destinataires);
                let liste_desti = [];

                destinataires.map((desti) => {
                    liste_desti.push([desti.id, desti.nom + " " + desti.prenom + "(" + desti.denomination + ")"]);
                })
                setListe_destinataires(liste_desti);

                console.log(liste_desti);
            })

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        //let dataToSend = new FormData(document.getElementById("formulaire"));
        let dataToSend = new FormData();
        dataToSend.append("test", "ok");

        let courrier = 'https://amandat.promo-73.codeur.online/courriers/server1/api/courrier/modifier/' + user + '/' + id;


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
                window.location.href = "https://amandat.promo-73.codeur.online/courriers/server2/courriers/liste"

            })

        console.log(dataToSend);
    }

    return (


        <div>
            <Navbar />
            <div className="container">
                <h2>Modification du courrier</h2>
                <form className="col-md-6"id="formulaire" onSubmit={handleSubmit}>
                    {records[0] !== undefined &&
                        <>
                            <Select
                                id='destinataire_id'
                                title="destinataire"
                                options={liste_destinataires}
                                label='Destinataire du courrier'
                                selected={records[1]} />
                            <FieldInput
                                id='objet'
                                label='Objet'
                                type='text'
                                value={records[3]} />
                            <FieldInput
                                id='date_modification'
                                label='Date de modification'
                                type='date'
                                value={records[6]} />
                            <FieldInput
                                id='date_envoi'
                                label="Date d'envoi"
                                type='date'
                                value={records[7]} />
                            <Select
                                id='status'
                                label='Status du courrier'
                                type='select'
                                options={[["Brouillon", "Brouillon"], ["Selectionné", "Selectionné"], ["Envoyé", "Envoyé"], ["Supprimé", "Supprimé"]]}
                                selected={records[13]}
                            />
                            <TextArea
                                id='paragraphe1'
                                label='Ma présentation'
                                value={records[9]}
                            />
                            <TextArea
                                id='paragraphe2'
                                label='Paragraphe entreprise'
                                value={records[10]}
                            />
                            <TextArea
                                id='paragraphe3'
                                label='Perspective commune'
                                value={records[11]}
                            />
                            <TextArea
                                id='paragraphe4'
                                label='Conclusion'
                                value={records[12]}
                            />
                        </>
                    }
                    <input type="submit" value="Envoyer" />

                </form>
            </div>
        </div>

    );
}

export default CourrierFormulaire;