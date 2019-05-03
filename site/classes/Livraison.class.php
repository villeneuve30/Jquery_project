<?php
class Livraison{
	private $idLivraison;
	private $idVente;
	private $idLivreur;
	private $idFacture;

	public function __construct($valeurs){
		if(!empty($valeurs)){
			$this->affecte($valeurs);
		}
	}

	public function affecte($valeurs){
		foreach($valeurs as $attribut => $valeur){

			switch($attribut){
				case 'idlivraison' :
					$this->setIdLivraison($valeur);
					break;

				case 'idvente' :
					$this->setIdVente($valeur);
					break;

				case 'idlivreur' :
					$this->setIdLivreur($valeur);
					break;

				case 'idfacture' :
					$this->setIdFacture($valeur);
					break;

        case 'idorganisme' :
					$this->setIdOrganisme($valeur);
					break;
			}
		}
	}

	public function getIdLivraison(){
		return $this->idLivraison;
	}

	public function setIdLivraison($id){
		$this->idLivraison = $id;
	}

	public function getIdVente(){
		return $this->idVente;
	}

	public function setIdVente($idVente){
		$this->idVente = $idVente;
	}

	public function getIdLivreur(){
		return $this->idLivreur;
	}

	public function setIdLivreur($idLivreur){
		$this->idLivreur = $idLivreur;
	}

	public function getIdFacture(){
		return $this->idFacture;
	}

	public function setIdFacture($idFacture){
		$this->idFacture = $idFacture;
	}
}
?>
