$(function(){
  init();
});

function init(){

  var json = JSON.parse(sessionStorage.UserObject)
  $.each(json.societe.livraisonAdresses,function(index,value){
    var option = document.createElement("option");
    option.value = "RUE "+value.rueNom+", "+value.codePostal+" "+value.ville;
    option.innerText = "RUE "+value.rueNom+", "+value.codePostal+" "+value.ville;
    $("select").append(option);
  })
}
