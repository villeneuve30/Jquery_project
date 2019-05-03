$(function(){
    initRetribution();
    chargerRetribution();
});

function initRetribution() {
    $("body").append('<table id="table_retribution"><thead><tr></tr></thead><tbody></tbody></table>');
}

function chargerRetribution() {
    $.ajax({
        url: '../fichiers d_échange/relations.json',
        dataType: 'JSON',
        success: function (data) {
            chargerDonneesFournisseur(data);
        },
        error: function (data) {
            console.log("err");
        }
    })
}

function chargerDonneesFournisseur(dataRelations) {
    $.ajax({
        url: '../fichiers d_échange/fournisseurs.json',
        dataType: 'JSON',
        success: function (data) {
            chargerDonneesCommandes(dataRelations, data);
        },
        error: function (data) {
            console.log("err");
        }
    })
}

function chargerDonneesCommandes(dataRelations, dataFournisseur) {
    $.ajax({
        url: '../fichiers d_échange/commandes.json',
        dataType: 'JSON',
        success: function (data) {
            chargerDonneesRetribution(dataRelations, dataFournisseur, data);
        },
        error: function (data) {
            console.log("err");
        }
    })
}

function genererEntetesFournisseur(dataFournisseur) {
    let enteteTableRetribution = $("#table_retribution>thead>tr");
    enteteTableRetribution.append($('<th />', {text: ''}));
    enteteTableRetribution.append($('<th />', {text: 'Total'}));
    for (let fournisseurNo = 0; fournisseurNo < dataFournisseur.length; fournisseurNo++) {
        enteteTableRetribution.append($('<th />', {text: dataFournisseur[fournisseurNo].raisonSociale}));
    }
}

function recupererProduitsFournisseur(dataRelations, idFournisseur) {
    let relationNo = 0;
    let tabProduits = null;
    while (relationNo < dataRelations.length && tabProduits === null) {
        if (dataRelations[relationNo].id === idFournisseur) {
            tabProduits = dataRelations[relationNo].produitsLies;
        }
        relationNo++;
    }
    return tabProduits;
}

function calculerMontantFournisseur(dataCommandes, commandeNo, produitsFournisseur) {
    let montantFournisseur = 0;
    for (let ligneNo = 0; ligneNo < dataCommandes[commandeNo].lignes.length; ligneNo++) {
        let dataLigne = dataCommandes[commandeNo].lignes[ligneNo];
        if (produitsFournisseur.includes(dataLigne.produit.id)) {
            montantFournisseur += (dataLigne.produit.prixVente * dataLigne.quantite);
        }
    }
    return montantFournisseur;
}

/*
* Commission: VALEUR TOTALE COMMANDE PAR DÉFAUT
* Valeur cellue = valeur si 100%
* Slide.onValueChange -> montantTotaleCommande - valeur cellule.
* */

function genererSliderCellule(idCommande, idFournisseur, cellule) {
    let nomSlider = "slider_" + idCommande + "_" + idFournisseur;
    let div = $("<div />", {id: nomSlider});
    div.slider({
        create: function (event, ui) {
            $(this).text($(this).slider("value"));
        },

        slide: function (event, ui) {
            $(this).text(ui.value);
        }
    }).appendTo(cellule);
}

function genererCellulesMontantsFournisseurs(dataFournisseur, dataRelations, dataCommandes, commandeNo, ligneCommande) {
    for (let fournisseurNo = 0; fournisseurNo < dataFournisseur.length; fournisseurNo++) {
        let idFournisseur = dataFournisseur[fournisseurNo].id;
        let idCommande = dataCommandes[commandeNo].id;
        let produitsFournisseur = recupererProduitsFournisseur(dataRelations, idFournisseur);
        let montantFournisseur = calculerMontantFournisseur(dataCommandes, commandeNo, produitsFournisseur);
        let cellule = $('<td />', {id: "cellule_" + idCommande + "_" + idFournisseur,
                                   text: montantFournisseur.toFixed(2)});
        genererSliderCellule(idCommande, idFournisseur, cellule);
        ligneCommande.append(cellule);
    }
}

function genererTotalCommande(donneesCommande) {
    let montantTotal = 0;
    for (let ligneNo = 0; ligneNo < donneesCommande.lignes.length ; ligneNo++) {
        let prixVente = donneesCommande.lignes[ligneNo].produit.prixVente;
        let quantite = donneesCommande.lignes[ligneNo].quantite;
        montantTotal += prixVente * quantite;
    }
    return montantTotal.toFixed(2);
}

function chargerDonneesRetribution(dataRelations, dataFournisseur, dataCommandes) {
    genererEntetesFournisseur(dataFournisseur);
    let corpsTableRetribution = $("#table_retribution>tbody");
    for (let commandeNo = 0; commandeNo < dataCommandes.length; commandeNo++) {
        let ligneCommande = $('<tr />');
        ligneCommande.append($('<td />', {text: "Commande " + dataCommandes[commandeNo].id}));
        ligneCommande.append($('<td />', {text: genererTotalCommande(dataCommandes[commandeNo])}));
        genererCellulesMontantsFournisseurs(dataFournisseur, dataRelations, dataCommandes, commandeNo, ligneCommande);
        corpsTableRetribution.append(ligneCommande);
    }
}