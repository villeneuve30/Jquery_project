


<script>


function init(){
  sessionStorage.setItem("tour",0);

  let container = $('<div>');

  let titre = $("<h2>");
  let p1 = $("<p>");
  let p2 = $("<p>");
  let p3 = $("<p>");
  let p4 = $("<p>");
  let p5 = $("<p>");
  let form = $("<form>");
  let inputText1 = $("<input>");
  let inputText2 = $("<input>");
  let inputText3 = $("<input>");
  let inputText4 = $("<input>");
  let selectCategorie = $("<select>");
  let optionLiv = $("<option>");
  let optionEnt = $("<option>");
  let inputTextHide = $("<input>");
  let inputSubmit = $("<button>");
  let inputReset = $("<button>");


  container.attr('class',"container");
  form.attr('class',"form-inline");                                         //formailre d'incription
  form.attr('method',"post");
  form.attr('action',"index.php?page=0");
  form.attr('id',"formulaire")

  titre.text( "Inscription " );
  titre.attr("style",'margin-bottom:50px;font-size:24px;margin-top:50px;')


  //champ de saisie de l'identifiant
  p1.text("Saisir votre identifiant :");
  inputText1.attr('type',"text");
  inputText1.attr('class',"form-control");
  inputText1.attr('placeholder',"Saisir votre identifiant");
  inputText1.attr('name',"id");
  inputText1.attr('id',"id");
  inputText1.attr('style',"margin-top:5px;margin-right:1500px;margin-left:15px;");
  inputText1.appendTo(p1);

  //input invisible pour passe des données vers php
  inputTextHide.attr('type',"text");
  inputTextHide.attr('name',"jsonHide");
  inputTextHide.attr('id',"jsonHide");
  inputTextHide.hide();
  inputTextHide.appendTo(p1);
  p1.attr('class',"form-group");


  // champ de saisie du mot de passe du nouveau utilisateur
  p2.text("Saisir votre mot de passe :");
  inputText2.attr('type',"password");
  inputText2.attr('placeholder',"Saisir votre mot de passe");
  inputText2.attr('class',"form-control");
  inputText2.attr('name',"mdp");
  inputText2.attr('id',"mdp");
  inputText2.attr('style',"margin-top:5px;margin-left:15px;width:250px;");
  inputText2.appendTo(p2);
  p2.attr('style',"margin-top:20px;margin-right:100%;");
  p2.attr('class',"form-group");


  //champ de saisie de l'adresse de livraison
  p3.text("Saisir adresse de livraison :");
  inputText3.attr('type',"text");
  inputText3.attr('placeholder',"Saisir adresse de livraison :");
  inputText3.attr('class',"form-control");
  inputText3.attr('name',"addrLivraison");
  inputText3.attr('id',"addrLivraison");
  inputText3.attr('style',"margin-top:5px;margin-left:15px;width:250px;");
  inputText3.appendTo(p3);
  p3.attr('style',"margin-top:20px;");
  p3.attr('class',"form-group");


  //champ de saisie du nom
  p4.text("Saisir votre nom :");
  inputText4.attr('type',"text");
  inputText4.attr('placeholder',"Saisir votre nom");
  inputText4.attr('class',"form-control");
  inputText4.attr('name',"nom");
  inputText4.attr('id',"nom");
  inputText4.attr('style',"margin-top:5px;margin-left:15px;width:250px;");
  inputText4.appendTo(p4);
  p4.attr('style',"margin-top:20px;margin-right:100%;");
  p4.attr('class',"form-group");



  //selection categorie
  p5.text("Choisir votre catégorie :");

  selectCategorie.attr("class","selecteurCategorie");

  optionEnt.text("Entreprise");
  optionEnt.attr("value","entreprise");
  optionEnt.appendTo(selectCategorie);

  optionLiv.text("Livreur");
  optionLiv.attr("value","livreur");
  optionLiv.appendTo(selectCategorie);

  selectCategorie.appendTo(p5);
  selectCategorie.attr("style","margin-left:20px;")

  p5.attr('style',"margin-top:20px;");
  p5.attr('class',"form-group");


  inputSubmit.html("valider"),
  inputSubmit.attr('class',"btn btn-default");
  inputSubmit.attr('style',"margin-left:150px;margin-top:10px;background-color:#b2b2b266;")
  inputSubmit.on('click',function(){
    console.log("valider");
    var id = inputText1.val();
    var mdp = inputText2.val();
    VerifierCompte(id,mdp);

  });

  titre.appendTo(container);

  p1.appendTo(form);
  p2.appendTo(form);
  p3.appendTo(form);
  p4.appendTo(form);
  p5.appendTo(form);


  form.appendTo(container);
  inputSubmit.appendTo(container);

  $('#texte').append(container);


  $('footer').attr('style',"margin-top:60px;");
}


function VerifierCompte(id,mdp){
  console.log("à ajouter l'inscription du nouvel utilisateur dans le json");
}



$(function(){
  init();
});




</script>
