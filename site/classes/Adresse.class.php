<?php
class Adresse{
	private $idAdresse;
	private $adresse;
	private $codePostal;
	private $ville;
  private $idOrganisme;

	public function __construct($valeurs){
		if(!empty($valeurs)){
			$this->affecte($valeurs);
		}
	}

	public function affecte($valeurs){
		foreach($valeurs as $attribut => $valeur){

			switch($attribut){
				case 'idadresse' :
					$this->setIdAdresse($valeur);
					break;

				case 'adresse' :
					$this->setAdresse($valeur);
					break;

				case 'codepostal' :
					$this->setCodePostal($valeur);
					break;

				case 'ville' :
					$this->setVille($valeur);
					break;

        case 'idorganisme' :
					$this->setIdOrganisme($valeur);
					break;
			}
		}
	}

	public function getIdAdresse(){
		return $this->idAdresse;
	}

	public function setIdAdresse($id){
		$this->idAdresse = $id;
	}

	public function getAdresse(){
		return $this->adresse;
	}

	public function setAdresse($adresse){
		$this->adresse = $adresse;
	}

	public function getCodePostal(){
		return $this->codePostal;
	}

	public function setCodePostal($codePostal){
		$this->codePostal = $codePostal;
	}

	public function getVille(){
		return $this->ville;
	}

	public function setVille($ville){
		$this->ville = $ville;
	}

  public function getIdOrganisme(){
		return $this->idOrganisme;
	}

	public function setIdOrganisme($idOrganisme){
		$this->idOrganisme = $idOrganisme;
	}
}
?>
