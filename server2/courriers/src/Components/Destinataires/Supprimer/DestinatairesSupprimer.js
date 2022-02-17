import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";


const DestinatairesSupprimer = (props) => {

    let myHeaders = new Headers();
    console.log("destinataire supprimer");
    let {id} = useParams();
    
    let myInit =
    {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'

    };
    let user = sessionStorage.getItem("uid");
    
    useEffect(() => 
    {
        fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/destinataire/supprimer/'+user+ '/' + id, myInit)
            .then(response => {
                return response.json();  
            })
            .then(() => 
            {
                window.location.href="https://amandat.promo-73.codeur.online/courriers/server2/Destinataires/liste";
            });

    },[]);

    return (

        <div>Suppression du destinataire {id} ok </div>
    );
}

export default DestinatairesSupprimer;