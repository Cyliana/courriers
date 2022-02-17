import'./Connection.css'
import Button from '../Button/Button';
import FieldInput from '../FieldInput/FieldInput';

const Connection = (props) =>
{
    const onSubmit = (e) =>
    {
        let identifiant = document.getElementById("identifiant").value;
        let mdp = document.getElementById("mot_de_passe").value;

        let myHeaders = new Headers();
        let token = "Basic " + window.btoa(identifiant+":"+mdp);
        myHeaders.append('Authorization', token);
        console.log(myHeaders);

        let myInit = 
        { 
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' 
        };
            
        e.preventDefault();
        fetch(`https://amandat.promo-73.codeur.online/courriers/server1/api/connexion`, myInit)
        .then(response => 
        {
            console.log(response);
            return response.json();
        })
        .then(data =>
        {
            if (typeof(data) != "undefined") 
            {
                sessionStorage.setItem('uid', data.id);
                sessionStorage.setItem('username', data.prenom + ' ' + data.nom);
                window.location.href= props.destination;
            }
        }) 
    }
    
    
    return (
        <>
            <form className="connection" onSubmit={onSubmit}>
                <FieldInput label="Identifiant" type='text' id="identifiant" value="" />
                <FieldInput label="Mot de Passe" type='password' id="mot_de_passe" value="" />
                <Button type="submit" value="Valider" />
                <button onClick={()=> window.location.href = 'https://amandat.promo-73.codeur.online/courriers/server2/utilisateur/ajouter' }>S'enregistrer</button>
            </form>
                
        </>);
}

export default Connection;
