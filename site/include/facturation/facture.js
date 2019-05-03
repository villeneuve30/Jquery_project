$(function(){
    initFacture();
    recupererInfosFacture();
});

function initFacture() {
    $("body").append('<div id="infosClient">');
    $("body").append('<table id="table_produits"><thead><tr></tr></thead><tbody></tbody></table>');
    let enteteTable = $('#table_produits>thead>tr');
    enteteTable.append($('<th />', {text : 'Libelle'}));
    enteteTable.append($('<th />', {text : 'Prix Unitaire'}));
    enteteTable.append($('<th />', {text : 'Quantité'}));
    enteteTable.append($('<th />', {text : 'Prix Total'}));
}

function recupererInfosFacture() {
    $.ajax({
        url: '../fichiers d_échange/commandes.json',
        dataType: 'JSON',
        success: function(data){
            for (let i = 0; i < data.length; i++) {
                chargerDonneesFactures(data[i]);
            }
        },
        error:function(data){
            console.log("err");
        }
    });
}

function chargerDonneesFactures(facture) {
    if (facture.id == getQueryVariable('idFacture')) {
        $("#infosClient").append("<p>Date de livraison : " + facture.date + "</p>");
        $("#infosClient").append("<p>Nom client : " + facture.client.raisonSociale + "</p>");
        $("#infosClient").append("<p>Adresses de livraison : " + extraireAdressesClient(facture.adresseLivraison) + "</p>");
        infosProduits = extraireInformationsCommande(facture.lignes);
        let montantTotal = 0;
        let corpsTable = $('#table_produits>tbody');
        for (let i = 0; i < infosProduits.nbProduits; i++) {
            let row = $('<tr />');
            row.append($('<td />', {text: infosProduits.libelles[i]}));
            row.append($('<td />', {text: infosProduits.prixVente[i]}));
            row.append($('<td />', {text: infosProduits.quantite[i]}));
            row.append($('<td />', {text: infosProduits.prixTotal[i]}));
            montantTotal += Number.parseFloat(infosProduits.prixTotal[i]);
            corpsTable.append(row);
        }
        $("body").append('<p>Montant Total: ' + montantTotal.toFixed(2) + '</p>');
    }
}

function extraireAdressesClient(adresseLivraison) {
    let finalString = "";
    finalString = finalString.concat(adresseLivraison.rueNumero, " ");
    if (adresseLivraison.rueNumeroComplement != null) { finalString.concat(adresseLivraison.rueNumeroComplement.libelleCourt, " "); }
    finalString = finalString.concat(adresseLivraison.rueType.libelle, " ");
    finalString = finalString.concat(adresseLivraison.rueNom, ", ");
    finalString = finalString.concat(adresseLivraison.codePostal, ", ");
    finalString = finalString.concat(adresseLivraison.ville);
    console.log(finalString);
    return finalString;
}

function extraireInformationsCommande(lignesCommande) {
    let infosProduits = {};
    let libelles = [];
    let prixVente = [];
    let quantite = [];
    let prixTotal = [];
    let i;
    for (i = 0; i < lignesCommande.length; i++) {
        libelles.push(lignesCommande[i].produit.libelle);
        prixVente.push(lignesCommande[i].produit.prixVente);
        quantite.push(lignesCommande[i].quantite);
        prixTotal.push((lignesCommande[i].produit.prixVente * lignesCommande[i].quantite).toFixed(2));
    }
    infosProduits.libelles = libelles;
    infosProduits.prixVente = prixVente;
    infosProduits.quantite = quantite;
    infosProduits.prixTotal = prixTotal;
    infosProduits.nbProduits = i;
    return infosProduits;
}

/* Source: https://css-tricks.com/snippets/javascript/get-url-variables/ */
function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}