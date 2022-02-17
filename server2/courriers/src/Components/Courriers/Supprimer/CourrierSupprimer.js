import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom"


const CourrierSupprimer = (props) => {
    
    let myHeaders = new Headers();
    console.log("courrier supprimer");
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
            fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/courrier/supprimer/'+ user +'/'+id, myInit)
                .then(response => {
                    return response.json();
                })
                .then(() => 
                {
                    window.location.href="https://amandat.promo-73.codeur.online/courriers/server2/courriers/liste"
                });

    },[]);

    return (

        <div>Suppression OK</div>
    );
}

export default CourrierSupprimer;