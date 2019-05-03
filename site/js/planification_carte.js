/*
* Fonction permettant d'initialiser une carte
*/
function initialiserMap(latitude, longitude, zoom) {

  carte = L.map('map').setView([latitude, longitude], zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 20
  }).addTo(carte);
}

/*
* Fonction permettant d'ajouter une liste de marqueurs grâce à une liste d'adresses fournies
*/
function ajouterListeMarqueurs(adresses){

  for (index in adresses) {
	   var marker = L.marker([adresses[index].latitude, adresses[index].longitude]).addTo(carte);
	   // Nous ajoutons la popup.
	   marker.bindPopup(adresses[index].denomination);
  }
}

/*
* Fonction permet de générer un itinéraire en fonction d'une liste d'adresses
* WARNING : A utiliser avec prudence : calcul de l'itinéraire grâce à un serveur de démonstration -> Limiter le nombre d'appels
*/
function ajouterRoute(adresses){
  listePoints = [];
  for(adresse in adresses){
    listePoints.push(new L.latLng([adresses[adresse].latitude, adresses[adresse].longitude]));
  }

  L.Routing.control({
    waypoints: listePoints,
  }).addTo(carte);
}

function obtenirCoordonneesParAdresse(adresse){

  const req = new XMLHttpRequest();
  req.open('GET', 'http://nominatim.openstreetmap.org/search?format=json&q='+adresse+'&limit=1', false);
  req.send(null);

  if (req.status === 200) {
    var json = JSON.parse(req.response);
    var adresseComplete = json[0];
    var adresseFormatee = { "latitude": adresseComplete.lat, "longitude": adresseComplete.lon, "denomination": adresse }
    return adresseFormatee;

  } else {
    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
    return false;
  }
}

window.onload = function(){

  /*
  * ========= Récupération de la liste des adresses  ==========
  */
  var listeAdresses = liste;

  /*
  * ================ Initialisation de la carte ================
  */
  var latitude = 45.833619;
  var longitude = 1.261105;
  var zoom = 11;

  var carte = null;
  var listeAdressesCompletes = [];

  initialiserMap(latitude, longitude, zoom);

  /*
  * ================ Récupérer les coordonnées ================
  */
  for (index in listeAdresses) {
    adresseComplete = obtenirCoordonneesParAdresse(listeAdresses[index]);
    listeAdressesCompletes.push(adresseComplete);
  }

  /*
  * ============= Afficher les éléments sur la carte ==============
  */
  //ajouterRoute(listeAdressesCompletes);
  ajouterListeMarqueurs(listeAdressesCompletes);


};
