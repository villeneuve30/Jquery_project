<?php

class LivreurManager{
    private $db;

    function __construct($db){
        $this->db = $db;
    }

    function getAllLivreurs(){
      $sql = 'SELECT idlivreur,nom,prenom, telephone FROM livreur';
      $req = $this->db->prepare($sql);
      $req->execute();

      while($livreur = $req->fetch(PDO::FETCH_OBJ)){
        $listeLivreur[] = new Livreur($livreur);
      }

      $req->closeCursor();

     if(isset($listeLivreur)){
         return $listeLivreur;

     } else {
       return false;
     }

    }

}
?>
