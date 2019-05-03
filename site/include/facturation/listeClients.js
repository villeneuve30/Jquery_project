$(function () {
    initListeClients();
    chargerJsonListeClients();
});

function initListeClients() {
    let catalogue_table = $('<table id="table_clients"><thead><tr></tr></thead><tbody></tbody></table>');
    $("#zoneTableClients").append(catalogue_table);

    let enteteTable = $('#table_clients>thead>tr');
    enteteTable.append($('<th />', {text: 'ID'}));
    enteteTable.append($('<th />', {text: 'Raison Sociale'}));
    enteteTable.append($('<th />', {text: 'Ville'}));
    enteteTable.append($('<th />', {text: 'Code Postal'}));
    enteteTable.append($('<th />', {text: 'Commandes'}));
}

function chargerJsonListeClients() {
    $.ajax({
        url: '../fichiers d_échange/clients.json',
        dataType: 'JSON',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                chargerDonneesClient(data[i]);
            }
        },
        error: function (data) {
            console.log("err");
        }
    });
}

function chargerDonneesClient(client) {
    let corpsTable = $('#table_clients>tbody');
    let row = $('<tr />');
    row.append($('<td />', {text: client.id}));
    row.append($('<td />', {text: client.raisonSociale}));
    row.append($('<td />', {text: client.livraisonAdresses[0].ville}));
    row.append($('<td />', {text: client.livraisonAdresses[0].codePostal}));
    row.append($('<a />', {href: 'index.php?page=21&idClient=' + client.id, text: 'Voir'}).wrap($('<td />')));
    corpsTable.append(row);
}