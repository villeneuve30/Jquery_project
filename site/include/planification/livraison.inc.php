<?php
$pdo = new Mypdo();
$livraisonManager = new LivraisonManager($pdo);
$adresseManager = new AdresseManager($pdo);

$listeAdresses = $livraisonManager->obtenirLesAdressesLivraisonsParIdLivreur(1);

foreach ($listeAdresses as $adresse) {
  $listeAdressesChaines[] = $adresse->getAdresse().", ".$adresse->getCodePostal()." ".$adresse->getVille();
}
?>

<h1>Livraison</h1>

<div id="livraisons">
  <div id="map" class="map">

  </div>
</div>

<script type="text/javascript">
var liste = [];
<?php
foreach ($listeAdressesChaines as $adresse) {?>
  liste.push("<?php echo $adresse ?>");
<?php
}
?>

</script>
<script type="text/javascript" src="js/planification_carte.js"></script>
