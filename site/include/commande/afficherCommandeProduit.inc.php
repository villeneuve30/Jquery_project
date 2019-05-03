<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script>

function init(){
let tableau = $('<table>');
tableau.attr('class',"table");
tableau.attr('id',"tableauCommandeClient");

let caption = $("<caption>");
caption.text("Liste des commandes client");
caption.appendTo(tableau);

let thead = $("<thead>");
thead.appendTo(tableau);

let tr = $("<tr>");
tr.appendTo(thead);

let thNumCom = $("<th>");
thNumCom.attr('scope',"col");
thNumCom.text("N° Commande");
thNumCom.appendTo(tr);

let thClient = $("<th>");
thClient.attr('scope',"col");
thClient.text("N° client");
thClient.appendTo(tr);

let thAddrLiv = $("<th>");
thAddrLiv.attr('scope',"col");
thAddrLiv.text("Adresse de livraison");
thAddrLiv.appendTo(tr);

let thDateLiv = $("<th>");
thDateLiv.attr('scope',"col");
thDateLiv.text("Date de livraison");
thDateLiv.appendTo(tr);

let thOptionDetail = $("<th>");
thOptionDetail.attr('scope',"col");
thOptionDetail.text("detail");
thOptionDetail.appendTo(tr);

let tbody = $("<tbody>");
tbody.attr('id',"corpsTableau");
tbody.appendTo(tableau);

$('#texte').append(tableau);

}

function json(){





$.ajax({
  url:'./../fichiers_d_échange/commandes.json',  //chemin d'acces
  dataType:'json',              //type attendu

  success:function(xhr_data){           //exe si ok
    //console.log(xhr_data);
    $.each(xhr_data, function (i,element) {
      let cmdId =element.id;
      let dateLivraisonCmd = element.dateLivraison;
      let userid = element.client['id'];
      let addressLivraison = element.adresseLivraison['rueNumero']+" "
      +element.adresseLivraison['rueType']["libelle"]+" "
      +element.adresseLivraison['rueNom']+" \n"
      +element.adresseLivraison['codePostal']+" "
      +element.adresseLivraison['ville'];





      /*console.log("1 :"+cmdId);
      console.log("2 :"+dateLivraisonCmd);
      console.log("3 :"+userid);
      console.log("4 :"+addressLivraison);*/

      let varAjout = "<tr> <td> "+cmdId+" </td>  <td> "+userid+" </td> <td>"+ addressLivraison+" </td> <td> "+dateAngToFr(dateLivraisonCmd)+" </td>   <td> "+
      "<ul class=\"navigation\"><li class=\"toggleSubMenu\"><span> Detail commande</span> <ul class=\"subMenu\">";

      $.each(element.lignes,function(i,element2){
        let idProduit = element2.id;
        let qtProduit = element2.quantite;
        let nomProduit = element2.produit['libelle'];
        let refProduit = element2.produit['reference'];
          varAjout+="<li><a> Id produit : "+idProduit+" \n Produit : "+nomProduit+" \n Reference : "+refProduit+" \n Quantité : "+qtProduit+"</a></li><br>";
      });



      varAjout+="</ul></li></ul>"+"</td></tr>";

      $('#corpsTableau').append(varAjout);


      });
      $('#corpsTableau').append("<br>");



    // On cache les sous-menus
      // sauf celui qui porte la classe "open_at_load" :
      $(".navigation ul.subMenu:not('.open_at_load')").hide();
      // On sélectionne tous les items de liste portant la classe "toggleSubMenu"

      // et on remplace l'élément span qu'ils contiennent par un lien :
      $(".navigation li.toggleSubMenu span").each( function () {
          // On stocke le contenu du span :
          var TexteSpan = $(this).text();
          $(this).replaceWith('<a href="" title="Afficher le sous-menu">' + TexteSpan + '<\/a>') ;
      } ) ;

      // On modifie l'évènement "click" sur les liens dans les items de liste
      // qui portent la classe "toggleSubMenu" :
      $(".navigation li.toggleSubMenu > a").click( function () {
          // Si le sous-menu était déjà ouvert, on le referme :
          if ($(this).next("ul.subMenu:visible").length != 0) {
              $(this).next("ul.subMenu").slideUp("normal", function () { $(this).parent().removeClass("open") } );
          }
          // Si le sous-menu est caché, on ferme les autres et on l'affiche :
          else {
              $(".navigation ul.subMenu").slideUp("normal", function () { $(this).parent().removeClass("open") });
              $(this).next("ul.subMenu").slideDown("normal", function () { $(this).parent().addClass("open") } );
          }
          // On empêche le navigateur de suivre le lien :
          return false;
      });

    },
    error:function(){
      alert("Impossible de charger les catégories");
    }
  });
}



function dateAngToFr(date){
  let splitStrDateHeure = date.split(" ");
  let dateSplit=splitStrDateHeure[0].split("-");
  let res=dateSplit[2]+"/"+dateSplit[1]+"/"+dateSplit[0]+"  "+splitStrDateHeure[1];

  return res;
}


$(function(){
  init();
  json();

});


</script>
