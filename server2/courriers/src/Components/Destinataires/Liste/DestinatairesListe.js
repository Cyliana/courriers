import React from "react";
import { useState, useEffect } from "react";
import Liste from "../../Liste/Liste";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './DestinatairesListe.css'

const DestinatairesListe = () => {
	const [data, setData] = useState([]);
	const headers = ["id", "Prénom", "Nom", "Fonction", "Dénomination", "Ville"];

	useEffect(() => {
		let myHeaders = new Headers();

		let myInit =
		{
			method: "GET",
			headers: myHeaders,
			mode: "cors",
			cache: "default",
		};

		let id = sessionStorage.getItem("uid");
		let fields = [];
		let i = 0;
		let destinataires = "https://amandat.promo-73.codeur.online/courriers/server1/api/destinataires/liste/" + id;

		fetch(destinataires, myInit)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				data.forEach((destinataire) => {
					fields[i] = [];
					fields[i].push(destinataire.id);
					fields[i].push(destinataire.prenom);
					fields[i].push(destinataire.nom);
					fields[i].push(destinataire.fonction);
					fields[i].push(destinataire.denomination);
					fields[i].push(destinataire.localite);
					i++;
				});

				setData(fields);
			});
	}, []);

	return (
		<div>
			<Navbar />
			<div className="container">
			<Liste titre="Vos destinataires" contexte="destinataires" header={headers} data={data} />
			</div>
			<Footer />
		</div>
	);
};

export default DestinatairesListe;
