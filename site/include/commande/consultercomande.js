
function init(){
  let titre = $("<h1>");
  let div_cnt_cmde = $("<div>");
  div_cnt_cmde.attr('id',"cnt_cmde");


  let div_detail_une_cmde = $("<div>");
  let p_num_cmde = $("<p>");
  let p_date_fact = $("<p>");
  let p_date_livr = $("<p>");


  titre.text( "Suivre mes commandes" );
  titre.attr('class',"h4 text-center");

  $('#texte').append(titre);
  $('#texte').append(div_cnt_cmde);

  $('#cont-date').append(p_date_fact);


}


function AfficherCommande(idclient){

    $.ajax({
        url:'./../fichiers_d_échange/commandes.json',  //chemin d'acces
        dataType:'json',              //type attendu

        success:function(xhr_data){           //exe si ok
          $.each(xhr_data, function (i,element) {
            if(idclient==element.client.id){
                var titre_lst_cmd=document.createElement("div");
                var div_cnt_info_prod = document.createElement("div");
                var div_cont_prodx= document.createElement("div");
                var date_fact=document.createElement("div");
                var date_livr=document.createElement("div");
                var div_date=document.createElement("div");

                div_date.id="cont-date";
                div_date.className="d-flex justify-content-around ";

                date_fact.innerText="Date facturation "+element.date
                date_livr.innerText="Date livraison "+element.dateLivraison;
                div_cnt_info_prod.id="cnt_info_prod";

                div_cont_prodx.className="commandex";

                titre_lst_cmd.innerText="Liste des produits";
                titre_lst_cmd.className="text-center h4 bg-info p-2"


                $('#cnt_cmde').append(div_date);
                $('#cnt_cmde').append(div_cnt_info_prod);

                $('#cont-date').append(date_livr);
                $('#cont-date').append(date_fact);
                $('#cont-date').append(date_livr);

                $('#cnt_info_prod').append(titre_lst_cmd);
                $('#cnt_info_prod').append(div_cont_prodx);
               //console.log(element);

              $.each(element.lignes, function (i,element) {
                var one_produit=document.createElement("div");
                one_produit.className="cont_one_prod"+i+" card card-body";

                var prod_libelle=document.createElement("div");
                prod_libelle.innerText=element.produit.libelle;

                var prod_prix=document.createElement("div");
                prod_prix.innerText=element.produit.prixAchat+"€";

                console.log(element);
                $('.commandex').append(one_produit);

                $('.cont_one_prod'+i).append(prod_libelle);
                $('.cont_one_prod'+i).append(prod_prix);


                  });
            }
          });

        },
        error:function(){
            alert("Impossible de charger le status de vos commandes")
        }
    });

}

$(function(){
    init();
    AfficherCommande(sessionStorage.UserId);
});
