<?php
  if(EMPTY($_POST["Adresse"])){

    $objet = new ArrayObject(array(),ArrayObject::STD_PROP_LIST);
    $objet->lignes = [];
    $id = 0;
    foreach($_POST as $produit=>$quantite){
      if($quantite!=0){
        $objet->lignes[$id] = new ArrayObject(array(),ArrayObject::STD_PROP_LIST);
        $objet->lignes[$id]->id = $id;
        $objet->lignes[$id]->produit = new ArrayObject(array(),ArrayObject::STD_PROP_LIST);

        $objet->lignes[$id]->produit->id = $produit;
        $objet->lignes[$id]->produit->quantite = $quantite;

        $id++;
      }
    }

    $_SESSION["commande"]=$objet;
    ?>
    <form method="post">
      <label>Sélectionner une adresse</label>
      <select name="Adresse">

      </select>
      <p>Date Livraison: <input  name="date_liv" type="text" id="datepicker"></p>
      <input type="submit" value="Commander">
      <script type="text/javascript">
      $( function() {
          $( "#datepicker" ).datepicker();
        } );
      </script>
    </form>
    <script type="text/javascript" src="include/commande/finalisationCommande.js"></script>
   <?php
  }else{

    $objet = $_SESSION["commande"];

    $objet->adresse = $_POST['Adresse'];
    $objet->date_liv = $_POST['date_liv'];


    $file = fopen("./../fichiers_d_échange/test.json","w");
    fwrite($file,json_encode($objet));

    ?>

    <p>Merci pour votre commande</p>
    <form action="index.php" method="post">
      <input type="submit" value="Retour sur le site">
    </form>

    <?php
  }

?>
