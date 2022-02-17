import React from "react";
import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"


const CourrierSupprimer = (props) => {
    const [records, setRecords] = useState([]);
    let myHeaders = new Headers();
    let {id} = useParams();
    
    let myInit =
    {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'

    };
    let user = sessionStorage.getItem("uid");
    React.useEffect(() => 
    {
            fetch('https://amandat.promo-73.codeur.online/courriers/server1/api/courrier/supprimer/'+ user +'/'+id, myInit)
                .then(response => {
                    return response.json();
                })
                .then(records => 
                {
                    setRecords(records);
                    console.log(records);
                    window.location.href = "https://amandat.promo-73.codeur.online/courriers/server2/courriers/liste";
                })

            },[])

    return (

        <div>{id}</div>
    );
}

export default CourrierSupprimer;