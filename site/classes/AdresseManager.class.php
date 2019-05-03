<?php
class AdresseManager{
	private $db;

	public function __construct($db){
		$this->db = $db;
	}

  public function obtenirAdresseParId($idAdresse){
    $sql = 'SELECT idadresse, adresse, codepostal, ville, idorganisme FROM adresse WHERE idadresse = :id';

		$requete = $this->db->prepare($sql);
		$requete->bindValue(':id', $idAdresse);
		$requete->execute();

		$resultat = $requete->fetch(PDO::FETCH_OBJ);

		$requete->closeCursor();

		$adresse = new Adresse($resultat);
		return $adresse;
  }


}
?>
