$(function(){
  init();
  chargeJson();
});

function init(){
  let libelleFiltreCategorie=$("<p>");libelleFiltreCategorie.css("display","inline-block");libelleFiltreCategorie.text("Categorie :");libelleFiltreCategorie.css("display","inline-block");$("#catalogue").append(libelleFiltreCategorie);
  let selectFiltreCategorie=$("<select>");selectFiltreCategorie.attr("id","selectFiltreCategorie");selectFiltreCategorie.on("change",changeFiltre);selectFiltreCategorie.css("display","block");$("#catalogue").append(selectFiltreCategorie);
  remplirFiltreCategorie();
  let libelleFiltrePrixMin=$("<p>");libelleFiltrePrixMin.css("display","inline-block");libelleFiltrePrixMin.text("Prix minimum");$("#catalogue").append(libelleFiltrePrixMin);
  let inputPrixMin=$("<input>");inputPrixMin.on("keypress",verif);inputPrixMin.attr("value","0");inputPrixMin.attr("min","0");inputPrixMin.attr("step","0.01");inputPrixMin.attr("type","number");inputPrixMin.attr("id","inputPrixMin");inputPrixMin.css("width","70px");inputPrixMin.on("change",changeFiltre);$("#catalogue").append(inputPrixMin);
  let libelleFiltrePrixMax=$("<p>");libelleFiltrePrixMax.css("display","inline-block");libelleFiltrePrixMax.text("Prix Maximum");$("#catalogue").append(libelleFiltrePrixMax);
  let inputPrixMax=$("<input>");inputPrixMax.on("keypress",verif);inputPrixMax.attr("value","100");inputPrixMax.attr("min","0");inputPrixMax.attr("step","0.01");inputPrixMax.attr("type","number");inputPrixMax.attr("id","inputPrixMax");inputPrixMax.css("width","70px");inputPrixMax.on("change",changeFiltre);$("#catalogue").append(inputPrixMax);
}
function chargeJson() {
  $.ajax({
    url:'./../fichiers_d_échange/produits.json',
    dataType:'JSON',
    success:function(data){
      console.log(data);
      chargerProduit(data);
    },
    error:function(data){
      console.log("err");
    }
  })
}
function remplirFiltreCategorie() {
  $.ajax({
    url:'./../fichiers_d_échange/categorieProduit.json',
    dataType:'JSON',
    success:function(data){
      let select=$("#selectFiltreCategorie");
      let option;
      option=$("<option>");option.attr("value","all");option.text("Tous");select.append(option);
      for (var variable in data) {
        if (data.hasOwnProperty(variable)) {
          option=$("<option>");option.attr("value",data[variable].id);option.text(data[variable].libelle);select.append(option);
        }
      }
    },
    error:function(data){
      console.log("err");
    }
  })
}


function chargerProduit(data){
  $("#catalogue").css("position","relative");
  let form=$("<form>");form.attr("action","./index.php?page=5");form.attr("method","POST");form.attr("id","formCatalogue");$("#catalogue").append(form);
  let divGlobal=$("<div>");divGlobal.attr("id","divGlobalProduit");divGlobal.css("text-align","center");form.append(divGlobal);
  let div;
  let libelle;
  let divinfo;
  let categorie;
  let prix;
  let image;
  let input;
  appendButton();
  var client = sessionStorage.getItem('UserObject');
  var jsonClient = JSON.parse(client);
  data.forEach(function functionName(produit) {
    div=$("<div>");div.attr("id","produit"+produit.id);div.attr("class","divProduit");div.attr("categorie",produit.categorie.id);div.attr("prix",produit.prixVente);div.css("text-align","left");divGlobal.append(div);
    image=$("<img>");if(produit.image==undefined || produit.image==""){image.attr("src","image/photoVide.png");}else{image.attr("src",produit.image);};image.attr("height","100");image.attr("class","imageProduit");div.append(image);
    divinfo=$("<div>");divinfo.attr("class","divInfoProduit");div.append(divinfo);
    libelle=$("<h3>");libelle.text(produit.libelle);libelle.attr("class","libelleProduit");divinfo.append(libelle);
    categorie=$("<h3>");categorie.text(produit.categorie.libelle);categorie.attr("class","categorieProduit");divinfo.append(categorie);
    prix=$("<p>");prix.text(produit.prixVente+" €");prix.attr("class","prixProduit");divinfo.append(prix);

    if(typeof(jsonClient.societe) != "undefined"){
      if(jsonClient.societe.livraisonAdresses.length == 0){
      }else{
        input=$("<input>");input.on("keypress",verif);input.attr("min","0");input.attr("name",produit.id);input.attr("type","number");input.attr("value","0");input.css("width","50px");divinfo.append(input);
      }
    }
  })
}

function changeFiltre() {
  let categorie=$("#selectFiltreCategorie").val();
  let inputPrixMin=$("#inputPrixMin").val();
  let inputPrixMax=$("#inputPrixMax").val();
  $(".divProduit").each(function functionName(index,produit) {
    if((categorie=="all" || $(produit).attr("categorie")===categorie) && parseFloat($(produit).attr("prix"))>=inputPrixMin && parseFloat($(produit).attr("prix"))<=inputPrixMax){
      $(produit).css("display","inline-block");
    }else{
      $(produit).css("display","none");
    }
  })
}


/*function tri(colonne) {
  let valeurs=$(".catalogue"+colonne);
  let i=0;
  while(i<colonne.length-1){
    if(valeurs[i].text<valeurs[i+1].text){
      valeurs[i]
      i+=1;
    }
  }
}*/

function verif(evt) {
    var keyCode = evt.which ? evt.which : evt.keyCode;
    var accept = '0123456789';
    if (accept.indexOf(String.fromCharCode(keyCode)) >= 0) {
        return true;
    } else {
        return false;
    }
}

function appendButton(){

    var client = sessionStorage.getItem('UserObject');
    var jsonClient = JSON.parse(client);
    if(typeof(jsonClient.societe) != "undefined"){
      if(jsonClient.societe.livraisonAdresses.length == 0){
      }else{
        console.log("test");
        var submit=$("<input>");
        submit.attr("type","submit");
        submit.attr("id","ValiderCommande");
        submit.attr("value","Passer la commande");
        submit.css("height","50px");
        submit.css("border-radius","10px");
        submit.css("background-color","#337ab7");
        submit.css("border-color","#2d6fa8");
        submit.css("position","absolute");
        submit.css("top","0px");
        submit.css("right","0px");
        submit.css("font-weight","bold");
        submit.css("margin","10px 10px 0px 0px");
        $("#formCatalogue").append(submit);
      }
    }
}
