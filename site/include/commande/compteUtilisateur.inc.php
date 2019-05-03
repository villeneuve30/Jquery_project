<script>

if(sessionStorage.User=="Admin" && sessionStorage.UserId=="0"){
  $('#texte').append("<p> bojour utilisateur ROOT </p>");
  $('#texte').append("<p> Identifiant : root </p>");
  $('#texte').append("<p> Adresse : 10 rue des roots</p>");
  $('#texte').append("<p> mail : rot@root.com</p>");
}else{

  if(sessionStorage.UserConges!=null){
    $('#texte').append("<p> utilisateur : "+sessionStorage.User+"</p>");
    $('#texte').append("<p> Identifiant : "+sessionStorage.UserId+" </p>");
    $('#texte').append("<p> Nom : "+sessionStorage.UserNom+" </p>");

  }else{
    $('#texte').append("<p> utilisateur : "+sessionStorage.User+"</p>");
    $('#texte').append("<p> Identifiant : "+sessionStorage.UserId+" </p>");
    $('#texte').append("<p> adresse de facturation : "+sessionStorage.UserFactAddr+" </p>");
  }

}



</script>
