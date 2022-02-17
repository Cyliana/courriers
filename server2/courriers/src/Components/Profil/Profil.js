import React from "react";
import { useState, useEffect } from "react";
import FieldInput from "../FieldInput/FieldInput";
import Navbar from "../Navbar/Navbar";

function Profil() 
{
	const [data, setData] = useState([]);

	const [mdp, setMdp] = useState("");

	let user = sessionStorage.getItem("uid")

	const updateMdp = (e) => 
	{
		setMdp(e.target.value);
		console.log("updateMdp");
	}

	useEffect(() => 
	{
		let myHeaders = new Headers();
		let uid = sessionStorage.getItem("uid");
		let user = "https://amandat.promo-73.codeur.online/courriers/server1/api/utilisateur/" + uid;


		console.log(uid);

		let myInit = 
		{
			method: "GET",
			headers: myHeaders,
			mode: "cors",
			cache: "default",
		};

		fetch(user, myInit)
			.then((response) => 
			{
				return response.json();
			})
			.then((data) => 
			{
				setData(data[0]);
			});
	},[]);

	//console.log(data);

	const handleSubmit = (e) => 
	{
		e.preventDefault();
		let dataToSend = new FormData(document.getElementById("formulaire"));
		//let dataToSend = new FormData();
		//dataToSend.append("test", "ok");
		
		let courrier = 'https://amandat.promo-73.codeur.online/courriers/server1/api/utilisateur/modifier/' + user;

		//console.log(dataToSend);

		const serialize_form = form => JSON.stringify(
			Array.from(dataToSend.entries())
				.reduce((m, [key, value]) => Object.assign(m, { [key]: value }), {})
		);

		const json = serialize_form(this);
		fetch(courrier, { method: 'PUT', body: json, headers: { 'content-type': 'application/json' } })
			.then(function (response) {
				response.text().then(function (txt) { console.log("Response:" + txt); });
			})
			.then(()=>{
				window.location.href="https://amandat.promo-73.codeur.online/courriers/server2/courriers/liste"

			})
		console.log(dataToSend);
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<h1>Mon Profil</h1>
				<form id="formulaire" onSubmit={handleSubmit}>
					{data[0] !== undefined && (
						<>
							<FieldInput
								id="identifiant"
								label="Votre identifiant"
								type="text"
								value={data[1]}
							/>
							<FieldInput
								id="titre"
								label="titre"
								type="select"
								value={data[4]}
							/>
							<FieldInput
								id="prenom"
								label="Votre prénom"
								type="text"
								value={data[6]}
							/>
							<FieldInput
								id="nom"
								label="Votre nom"
								type="text"
								value={data[5]}
							/>
							<FieldInput
								id="adresse"
								label="Votre adresse"
								type="text"
								value={data[9]}
							/>
							<FieldInput
								id="code_postal"
								label="Code postal"
								type="text"
								value={data[10]}
							/>
							<FieldInput
								id="localite"
								label="Votre ville"
								type="text"
								value={data[11]}
							/>
							<FieldInput
								id="telephone"
								label="Votre numéro de téléphone"
								type="text"
								value={data[7]}
							/>
							<FieldInput
								id="email"
								label="Votre email"
								type="email"
								value={data[8]}
							/>
							<FieldInput
								id="mot_de_passe"
								label="Votre nouveau mot de passe (optionnel)"
								type="password"
								value={mdp}
								onChange={updateMdp}
							/>
							{document.getElementById("mot_de_passe") != null &&
								document.getElementById("mot_de_passe").value !== "" && (
									<>
										<FieldInput
											id="confirmation_mot_de_passe"
											label="Confirmez votre nouveau de passe"
											type="password"
											value={""}
										/>
										<FieldInput
											id="ancien_mot_de_passe"
											label="Votre ancien mot de passe"
											type="password"
											value={""}
										/>
									</>
								)}
							<input type="submit" value="Enregistrer" />
						</>
					)}
				</form>
			</div>
		</>
	);
}

export default Profil;
