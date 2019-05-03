<?php
class Vente{
	private $idVente;
	private $idOrganisme;
	private $dateEstimee;
	private $remise;

	public function __construct($valeurs){
		if(!empty($valeurs)){
			$this->affecte($valeurs);
		}
	}

	public function affecte($valeurs){
		foreach($valeurs as $attribut => $valeur){

			switch($attribut){
				case 'idvente' :
					$this->setIdVente($valeur);
					break;

				case 'idorganisme' :
					$this->setIdOrganisme($valeur);
					break;

				case 'dateestimee' :
					$this->setDateEstimee($valeur);
					break;

				case 'remise' :
					$this->setRemise($valeur);
					break;

			}
		}
	}

	public function getIdVente(){
		return $this->idVente;
	}

	public function setIdVente($id){
		$this->idVente = $id;
	}

	public function getIdOrganisme(){
		return $this->idOrganisme;
	}

	public function setIdOrganisme($idOrganisme){
		$this->idOrganisme = $idOrganisme;
	}

	public function getCodePostal(){
		return $this->codePostal;
	}

	public function setCodePostal($codePostal){
		$this->codePostal = $codePostal;
	}

	public function getDateEstimee(){
		return $this->dateEstimee;
	}

	public function getDateEstimee($date){
		$this->dateEstimee = $date;
	}

  public function getRemise(){
		return $this->remise;
	}

	public function getRemise($remise){
		$this->remise = $remise;
	}
}
?>
