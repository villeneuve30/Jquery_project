<?php
include_once '../../../classes/ProduitManager.class.php';

$chemin = "../../../json/produits.json";
$produitManager = new ProduitManager($chemin);
echo $_GET['fonction'];
switch($_POST['fonction']){
    case 'changerStock':
    $produitManager->setStock($_POST['id'],$_POST['nouveauStock']);
    break;
}
?>
