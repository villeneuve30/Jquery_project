<?php
class Livreur{
	private $idLivreur;
	private $nom;
	private $prenom;
	private $telephone;

	public function __construct($valeurs){
		if(!empty($valeurs)){
			$this->affecte($valeurs);
		}
	}

	public function affecte($valeurs){
		foreach($valeurs as $attribut => $valeur){

			switch($attribut){
				case 'idlivreur' :
					$this->setIdLivreur($valeur);
					break;

				case 'nom' :
					$this->setNom($valeur);
					break;

				case 'prenom' :
					$this->setPrenom($valeur);
					break;

				case 'telephone' :
					$this->setTelephone($valeur);
					break;

			}
		}
	}

	public function getIdLivreur(){
		return $this->idLivreur;
	}

	public function setIdLivreur($id){
		$this->idLivreur = $id;
	}

	public function getNom(){
		return $this->nom;
	}

	public function setNom($nom){
		$this->nom = $nom;
	}

	public function getPrenom(){
		return $this->prenom;
	}

	public function setPrenom($prenom){
		$this->prenom = $prenom;
	}

	public function getTelephone(){
		return $this->telephone;
	}

	public function setTelephone($telephone){
		$this->telephone = $telephone;
	}
}
?>
