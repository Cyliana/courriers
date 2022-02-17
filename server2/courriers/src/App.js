import './App.css';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import Window from './Components/Window/Window';

import Connection from './Components/Connection/Connection';
import Profil from './Components/Profil/Profil';
import Inscription from './Components/Inscription/Inscription';

import CourriersListe from './Components/Courriers/Liste/CourriersListe';
import CourrierFormulaire from './Components/Courriers/Formulaire/CourrierFormulaire';
import CourrierAjouter from './Components/Courriers/Ajouter/CourrierAjouter';
import CourrierSupprimer from './Components/Courriers/Supprimer/CourrierSupprimer';

import DestinatairesListe from './Components/Destinataires/Liste/DestinatairesListe';
import DestinataireFormulaire from './Components/Destinataires/Formulaire/DestinataireFormulaire';
import DestinatairesAjouter from './Components/Destinataires/Ajouter/DestinataireAjouter';
import DestinatairesSupprimer from './Components/Destinataires/Supprimer/DestinatairesSupprimer';

function App() {
	return (
		<div className="App">
			<Router basename='/courriers/server2/'>
				<Routes>
					<Route
						path="/" element={<Window id="windowConnection" title="Connexion" x="100px" y="100px" w="640px" h="480px" main={<Connection destination="./courriers/liste" />} status="Tout est OK." />}
					/>
					<Route
						path="/courriers/liste" element={<CourriersListe id={sessionStorage.getItem('uid')} />}
					/>
					<Route
						path="/courrier/modifier/:id" element={<CourrierFormulaire />}
					/>
					<Route
						path="/courrier/ajouter/" element={<CourrierAjouter />}
					/>
					<Route
						path="/courrier/supprimer/:id" element={<CourrierSupprimer />}
					/>



					<Route
						path="/destinataires/liste" element={<DestinatairesListe />}
					/>
					<Route
						path="/destinataires/ajouter" element={<DestinatairesAjouter />}
					/>
					<Route
						path="/destinataires/supprimer/:id" element={<DestinatairesSupprimer />}
					/>
					<Route
						path="/destinataires/modifier/:id" element={<DestinataireFormulaire />}
					/>



					<Route
						path="/utilisateur/:id" element={<Profil />}
					/>
					<Route
						path="/utilisateur/ajouter" element={<Inscription />}
					/>
				</Routes>
			</Router>

		</div>
	);
}

export default App;

