$(function(){
  $("#texte").attr('class',"p-4");
  console.log("js chargé");
  $.getJSON('./../fichiers_d_échange/livraisons.json',function(data){
    console.log(data);
    $.each(data, function(index,dataValue){

      var div = document.createElement("div");
      div.id = "Commande_"+dataValue.id;
      div.className="card m-4 p-2"
      $("#texte").append(div);

      var h = document.createElement("h2");
      h.className="bg-secondary text-center p-2"
      h.innerText = "Livraison n°"+dataValue.id;
      $("#"+div.id).append(h);

      var dateLivraison = dataValue.date;

      var p1 = document.createElement("p");
      p1.innerText = "Date de livraison :"+dateLivraison;
      $("#"+div.id).append(p1);

      var table = document.createElement("table");
      $("#"+div.id).append(table);
      $("#"+div.id+" table").append("<tr><th>Ref.</th><th>Libellé</th><th>Prix unitaire</th><th>Quantité</th><th>Total</th></tr>");

      var option = document.createElement("option");
      option.innerText = "Livraison n°"+dataValue.id;
      option.value = div.id;
      $("select").append(option);


      $.each(dataValue.lignes, function(index,value){

        var tr = document.createElement("tr");
        tr.id = "prod_"+value.id;
        $("#"+div.id+" table").append(tr);

        var produitRef = value.produit.reference;
        var produitLibelle = value.produit.libelle;
        var produitPrixAchat = value.produit.prixAchat;
        var produitQte = value.quantite;

        var thRef = document.createElement("th");
        var thLib = document.createElement("th");
        var thPrix = document.createElement("th");
        var thQte = document.createElement("th");
        var thTot = document.createElement("th");

        thRef.innerText = produitRef;
        thLib.innerText = produitLibelle;
        thPrix.innerText = produitPrixAchat+" €";
        thQte.innerText = produitQte;
        thTot.innerText = (produitQte*produitPrixAchat)+" €";

        $("#prod_"+value.id).append(thRef);
        $("#prod_"+value.id).append(thLib);
        $("#prod_"+value.id).append(thPrix);
        $("#prod_"+value.id).append(thQte);
        $("#prod_"+value.id).append(thTot);

      });
    });
  });

  $("select").change(function(){
    if($("select").val() != "all"){
      $("#texte div").hide();
      $("#"+$("select").val()).show();
    }else{
      $("#texte div").show();
    }
  });

});
