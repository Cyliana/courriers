class API {
    version() {
        let ajax = new XMLHttpRequest();

        ajax.open('GET', 'https://amandat.promo-73.codeur.online/courriers/server1/api/version', true);

        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
            }
        }

        ajax.send();
    }

    connection(callback) {
        console.log("API.connexion(callback)");

        let identifiant = document.getElementById('identifiant').value;
        let mot_de_passe = document.getElementById('mot_de_passe').value;
        console.log('API.connection("' + identifiant + '", "' + mot_de_passe + '");');

        let ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://' + identifiant + ':' + mot_de_passe + '@courriers.server1/api/connexion', true);

        let token = "Basic " + window.btoa(identifiant + ":" + mot_de_passe);
        ajax.setRequestHeader('Authorization', token);

        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText !== '') {
                    console.log(this.responseText);
                    let user = JSON.parse(this.responseText);
                    if (typeof (user.id) !== 'undefined') {
                        sessionStorage.setItem('UserID', user.id);
                        sessionStorage.setItem('UserName', user.prenom + ' ' + user.nom);
                        console.log(user);
                        callback();
                    }
                    else {
                        alert("Identification échouée.");
                    }
                }
            }
        }
        ajax.send();
        console.log("API.connexion.send()");
    }

    list(user) {
        console.log("api.list")
        user = Object.values(user)[0]

        let ajax = new XMLHttpRequest();

        ajax.open('GET', 'https://amandat.promo-73.codeur.online/courriers/server1/api/courriers/liste/' + user, true);
        //ajax.setRequestHeader('Authorization', token);
        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText !== '') {
                    console.log(this.responseText);
                    return ("yes");
                }
            }
        }
        ajax.send();
    }
}

let api = new API();
api.version();

export default api;