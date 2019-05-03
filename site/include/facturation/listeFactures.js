$(function(){
    initListeFactures();
    chargerJsonListeFactures();
});

function initListeFactures() {
    let catalogue_table = $('<table id="table_factures"><thead><tr></tr></thead><tbody></tbody></table>');
    $("#zoneTableFactures").append(catalogue_table);

    let enteteTable = $('#table_factures>thead>tr');
    enteteTable.append($('<th />', {text : 'ID'}));
    enteteTable.append($('<th />', {text : 'Date de Commande'}));
    enteteTable.append($('<th />', {text : 'Date de Livraison'}));
    enteteTable.append($('<th />', {text : 'Facture'}));
}

function chargerJsonListeFactures() {
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
    let idClient = getQueryVariable('idClient');
    let corpsTable = $('#table_factures>tbody');
    let row = $('<tr />');
    if (facture.client.id == idClient) {
        row.append($('<td />', {text: facture.id}));
        row.append($('<td />', {text: facture.date}));
        row.append($('<td />', {text: facture.dateLivraison}));
        row.append($('<a />', {href: 'index.php?page=22&idFacture=' + facture.id, text: 'Imprimer'}).wrap($('<td />')));
        corpsTable.append(row);
    }
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