<div id="texte">
<?php

if (!empty($_GET["page"])){
	$page=$_GET["page"];}
	else
	{$page=0;
	}
switch ($page) {

case 0:
	// inclure ici la page accueil photo
	include_once('index.php');
	break;

case 1:
	include_once('./include/pages/connexion.inc.php');

  break;

case 100:
	include_once('commande/afficherCommandeProduit.inc.php');
  break;

case 101:
	include_once('commande/compteUtilisateur.inc.php');
  break;

case 102:
	include_once('./include/pages/inscription.inc.php');
  break;

case 2:
	include_once('commande/catalogue.inc.php');
  break;

case 3:
	include_once('commande/listeLivraison.inc.php');
  break;

case 4:
include_once('commande/consultercomande.inc.php');
  break;

case 5:
include_once('commande/finalisationCommande.inc.php');
  break;

case 6:

  break;

case 7:

  break;

case 8:

  break;

case 9:

  break;

case 10:

  break;

case 11:
	include_once('planification/collecte.inc.php');
  break;

case 12:
	include_once('planification/livraison.inc.php');
  break;

case 13:
	include_once('planification/livreur.inc.php');
  break;

case 14:
	include_once('planification/stock.inc.php');
  break;

case 20:
    include_once('facturation/listeClients.inc.php');
    break;

case 21:
    include_once('facturation/listeFactures.inc.php');
    break;

case 22:
    include_once('facturation/facture.inc.php');
    break;
case 29:
    include_once('facturation/retribution.inc.php');
    break;
default : 	include_once('index.php');
}

?>
</div>
