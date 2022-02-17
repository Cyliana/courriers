import "./CourriersListe.css"
import React from "react";
import { useEffect, useState } from "react";
import Liste from "../../Liste/Liste";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const CourriersListe = (props) => {
  const [data, setData] = useState([]);
  const headers = [
    "Id",
    "Dénomination",
    "objet",
    "Date d'envoi",
    "Date de modification",
    "Prénom",
    "Nom",
    "Fonction",
    "Status",
  ];

  useEffect(() => {
    let myHeaders = new Headers();

    let myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    };

    let id = sessionStorage.getItem("uid");
    let fields = [];
    let i = 0;

    let courriers = "https://amandat.promo-73.codeur.online/courriers/server1/api/courriers/liste/" + id;

    fetch(courriers, myInit)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        

        data.forEach((courrier) => {
          fields[i] = [];
          fields[i].push(courrier.id);
          fields[i].push(courrier.denomination);
          fields[i].push(courrier.objet);
          fields[i].push(courrier.date_envoi);
          fields[i].push(courrier.date_modification);
          fields[i].push(courrier.prenom);
          fields[i].push(courrier.nom);
          fields[i].push(courrier.fonction);
          fields[i].push(courrier.status);
          i++;
        });

        setData(fields);
        
        //console.log(fields);
      });
  }, []);


  return (
    <div>
      <Navbar />
      <div className="container">
        <Liste contexte="courrier" titre="Vos courriers" header={headers} data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default CourriersListe;




// <div className="container">
// <div className="row">
//     <div className="col-md-6 col-lg-4 col-xl-3">