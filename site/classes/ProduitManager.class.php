<?php
// indiqué le chemin de votre fichier JSON, il peut s'agir d'une URL

class ProduitManager{
    private $json;
    private $parsed_json;
    private $chemin;

    function __construct($JSON_PATH){
        $this->chemin = $JSON_PATH;
        $json = file_get_contents($this->chemin);
        $this->parsed_json = json_decode($json);
    }
/*
*Fontion permettant de récuperer le stock actuel d'un produit selon son id
*/
    function getStock($id){
        foreach($this->parsed_json as $attribut=>$valeur){
            $this->json[$valeur->id]=$valeur;
        };
        $stock = $this->json[$id]->{'selfStock'};
        return $stock;
    }
/*
*Fontion permettant de modifier le stock actuel d'un produit selon son id et une nouvelle valeur de stock
*/
    function setStock($id,$changement){
        foreach ($this->parsed_json as $attribut=>$valeur) {
            $this->json[$valeur->id]=$valeur;
        }
        $this->json[$id]->{'selfStock'} = $changement;

        $newJson = json_encode($this->json);
        file_put_contents($this->chemin, $newJson);
    }
}
?>
