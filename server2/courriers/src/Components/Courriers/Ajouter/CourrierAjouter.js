import React from 'react';
import { useState, useEffect } from 'react';
import FieldInput from '../../FieldInput/FieldInput'; 
import TextArea from '../../TextArea/TextArea';
import Select from '../../Select/Select';
import Navbar from '../../Navbar/Navbar';
//import {useParams} from "react-router-dom";


const CourrierAjouter = () => {
    const [liste_destinataires, setListe_destinataires] = useState([]);
    let myHeaders = new Headers();
    //let {id} = useParams();
    console.log("creation courrier");
    
    let user = sessionStorage.getItem("uid");
   
   
    useEffect(() => 
    {
        fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/destinataires/liste/' + user, { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' })
        .then(response => {
            return response.json();
        })
        .then(destinataires => {
            console.log(destinataires);
            let liste_desti = [];
            
            destinataires.map((desti)=> {
                liste_desti.push([desti.id, desti.nom+" "+desti.prenom+"("+desti.denomination+")"]);
            })
            setListe_destinataires(liste_desti);
          
            console.log(liste_desti);
        })

    },[])

    const handleSubmit = (e)=>
    {
        e.preventDefault();
                
        var form = new FormData(document.getElementById('formulaire'));
        let courrier = 'https://amandat.promo-73.codeur.online/courriers/server1/api/courrier/ajouter/'+ user;
        
        fetch(courrier, {method:'POST', body:form})
        .then(function(response){
            response.text().then(function(txt){console.log("Response:"+txt);});
            })
        .then(()=>{
            window.location.href="https://amandat.promo-73.codeur.online/courriers/server2/courriers/liste"

        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Création d'un courrier</h2>
                <form id="formulaire" onSubmit={handleSubmit}>
                
                    <Select
                    id='destinataire_id'
                    title ="destinataire"
                    options= {liste_destinataires}
                    label='Destinataire du courrier'
                    value=""/>
                    <FieldInput
                    id='objet'
                    label='Objet'
                    type='text'
                    value=""/>
                    <FieldInput
                    id='nosref'
                    label='Nos références'
                    type='text'
                    value=""/>
                    <FieldInput
                    id='annonce'
                    label='Annonce'
                    type='text'
                    value=""/>
                    <FieldInput
                    id='vosref'
                    label='Vos références'
                    type='text'
                    value=""/>
                    <Select
                    id='status'
                    label='Status du courrier'
                    type='select'
                    options= {[["1","Brouillon"], ["2","Selectionné"], ["3","Envoyé"], ["4","Supprimé"]]}
                    selected = ""
                    value=""/>
                    <TextArea 
                    id='paragraphe1'
                    label='Ma présentation'
                    value=""
                    />
                    <TextArea 
                    id='paragraphe2'
                    label='Paragraphe entreprise'
                    value=""
                    />
                    <TextArea 
                    id='paragraphe3'
                    label='Perspective commune'
                    value=""
                    />
                    <TextArea 
                    id='paragraphe4'
                    label='Conclusion'
                    value=""
                    />
                <input type="submit" value="Envoyer" />
                            
                </form>
            </div>
        </div>
        
    );
}

export default CourrierAjouter;