<?php
class LivraisonManager{
	private $db;

	public function __construct($db){
		$this->db = $db;
	}

  public function obtenirLesLivraisonsParIdLivreur($idLivreur){
    $sql = 'SELECT idlivraison, idvente, idlivreur, idFacture FROM livraison WHERE idlivreur = :id';

		$requete = $this->db->prepare($sql);
		$requete->bindValue(':id', $idLivreur);
		$requete->execute();

		while($livraison = $requete->fetch(PDO::FETCH_OBJ)){
			$listeLivraisons[] = new Livraison($livraison);
		}

		$requete->closeCursor();

		if(isset($listeLivraisons)){
			return $listeLivraisons;
		}

		return false;
  }

	public function obtenirLesAdressesLivraisonsParIdLivreur($idLivreur){
		$sql = 'SELECT a.idadresse, a.adresse, a.codepostal, a.ville, a.idorganisme FROM adresse a
		INNER JOIN organisme o ON(o.idorganisme = a.idorganisme)
		INNER JOIN ventes v ON(v.idorganisme = o.idorganisme)
		INNER JOIN livraison l ON(l.idvente = v.idvente)
		INNER JOIN livreur li ON(li.idlivreur = l.idlivreur)
		WHERE li.idlivreur = :idLivreur';

		$requete = $this->db->prepare($sql);
		$requete->bindValue(':idLivreur', $idLivreur);
		$requete->execute();

		while($adresse = $requete->fetch(PDO::FETCH_OBJ)){
			$listeAdresses[] = new Adresse($adresse);
		}

		$requete->closeCursor();

		if(isset($listeAdresses)){
			return $listeAdresses;
		}

		return false;
	}
}
?>
