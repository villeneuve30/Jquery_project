/*
*Fonction se lançant lorsque la page est prête
*Rôle :
*Déclanche les fonctions : init, afficherCategories et attacherEvent
*/
$(document).ready(function(){
    init();
    afficherCategories();
    attacherEvent();
});

/*
*Fonction lancée en première au lancement de la page
*Rôle :
*créer tous les éléments nécéssaires
*Attribut les id et les classes
*Determine la hierachie du DOM
*/
function init(){

    let divCategorie = $('<div>');
    divCategorie.attr('id',"categoriesDiv");

    let labelCategorie = $('<div>');
    labelCategorie.attr('id',"labelCategorie");
    labelCategorie.append("Catégories : ");

    divCategorie.append(labelCategorie);

    let selectCategorie = $('<select>');
    selectCategorie.attr('id',"categories");
    selectCategorie.on("change",attacherEvent);

    labelCategorie.append(selectCategorie);

    $("#stock").append(divCategorie);

    let divProduits = $('<div>');
    divProduits.attr('id',"produitsDiv");

    let	tableProduits = $('<table>');
    tableProduits.attr('id',"tableauProduit");


    let trProduits = $('<tr>');
    trProduits.attr('id',"trProduits");
    trProduits.append("<th> ID </th><th> Libellé </th><th> Référence </th><th> Image </th><th> Prix de vente </th> <th> prix d'achat </th><th> Quantité </th>");

    tableProduits.append(trProduits);

    divProduits.append(tableProduits);

    $("#stock").append(divProduits);
}
/*
*Fonction ajoutant les options "catégorie" au select des catégories
*Rôle :
*Parcours le fichiers json en récupérant toutes les catégories et les ajoute au select
*/
function afficherCategories(){
    $.ajax({
        url:'/Cooperative/site/json/categorieProduit.json',
        datatype : 'json',
        success : function(data){
            $.each(data, function(i,object) {
                $('#categories').append("<option value="+object.id+">"+object.libelle+"</option");
            });
        }
    })
}
/*
*Fonction affichant un tableau de produit selon leur catégories
*Rôle :
*à l'aide d'une fonction ajax nous récupérons les données du fichier json voulu
*on ajoute au tableau "tableauProduit" une ligne par produit avec leur caractéristiques associées
*/
function afficherTableau(){
    $.ajax({
        url:'/Cooperative/site/json/produits.json',
        datatype : 'json',
        type : 'POST',
        success : function(data){
            $.each(data,function(i,object){
                if(object.categorie.id == $("#categories").val()){
                    if(object.image != "" && object.image != null){
                        $("#tableauProduit").append("<tr class='infoCategorie'><td class=idProduit>"+object.id+"</td><td>"+object.libelle+"</td><td>"+object.reference+"</td><td><img class='imageProduit' src='"+object.image+"' alt='image' /></td><td>"+object.prixVente+"</td><td>"+object.prixAchat+"</td><td><p><input type=number min=0 class=inputStock value="+object.selfStock+" disabled/></p><button class=boutonValider>Valider</button></td><td><button class=boutonModifier>Modifier</button></td></tr>");
                    } else {
                        $("#tableauProduit").append("<tr class='infoCategorie'><td class=idProduit>"+object.id+"</td><td>"+object.libelle+"</td><td>"+object.reference+"</td><td>Aucune image</td><td>"+object.prixVente+"</td><td>"+object.prixAchat+"</td><td><p><input type=number min=0 class=inputStock value="+object.selfStock+" disabled/></p><button class=boutonValider>Valider</button></td><td><button class=boutonModifier>Modifier</button></td></tr>");
                    }
                }
            });
            if($("#tableauProduit tr").length == 1){
                $("#tableauProduit").hide();
            }else{
                $("#tableauProduit").show();
            }
            $("#tableauProduit").find('.boutonValider').hide();
            $("#tableauProduit").find('.boutonModifier').on("click",activerModification);
            $("#tableauProduit").find('.boutonValider').on("click",validerModification);
            $("#tableauProduit").find('.inputStock').on('keypress',verif);
        }
    });
}

/*
*Fonction activée lors du lancement de la page et lors de chaque changement de catégories de produit (select)
*Rôle :
*Efface le tableau précédent
*Appelle la fonction afficherTableau
*/
function attacherEvent(){
    $("#tableauProduit tr:gt(0)").remove();
    afficherTableau();
}
/*
*Fonction activée lors du clique sur bouton "valider"
*Rôle :
*Appel une méthode ajax de type POST pour entrer la nouvelle valeur dans le fichier json à l'aide d'un fichier server php
*Variables :
*id : id du produit à modifier dans le fichier json
*stock : nouvelle valeur à insérer dans le fichier json
*/
function validerModification(){
    let id = $(this).closest('tr').find('.idProduit').text();
    let stock = $(this).closest('tr').find('.inputStock').val();
    let nomFonction = "changerStock";

    $.ajax({
        url:'/Cooperative/site/include/planification/server/fonctionStock.php',
        type:'POST',
        data : 'fonction='+nomFonction+'&id='+id+'&nouveauStock='+stock,
        success: function(code_html,statut){
            //alert("success");
        },
        error : function(resultat, statut, erreur){
            //alert("error");
        },
        complete : function(resultat, statut){
            //alert("complete");
        }
    });

    $(this).closest('tr').find('.boutonModifier').show();
    $("#tableauProduit").find('.boutonValider').hide();
    $(this).closest('tr').find('.inputStock').attr('disabled',"true");
}

/*
*Fonction activée lors du clique sur le bouton "Modifier"
*Rôle :
*active le input sur la colonne 'stock',
*cache le bouton modifier,
*affiche bouton valider pour valider le stock entré
*/
function activerModification(){
    $(this).closest('tr').find('.boutonValider').show();
    $(this).closest('tr').find('.inputStock').removeAttr('disabled');
    $(this).hide();
}

/*
*Fonction activée lors de chaque changement de l'input du 'stock'
*Rôle :
*Empeche l'utilisateur de rentrer autre chose que des nombres entiers dans le input
*Retourne true si le caractères est autorisé à être écrit
*Retourn false si le caractère n'est pas autorisé à être écrit
*/
function verif(evt) {
    var keyCode = evt.which ? evt.which : evt.keyCode;
    var accept = '0123456789'; // Ici on choisi les caractères autorisés à être écrit
    if (accept.indexOf(String.fromCharCode(keyCode)) >= 0) {
        return true;
    } else {
        return false;
    }
}
