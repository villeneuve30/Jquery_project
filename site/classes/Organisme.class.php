<?php
class Organisme {
	private $idOrganisme;
	private $nom;
	private $mail;
	private $tel;
	private $password;

	public function __construct($valeurs){
		if(!empty($valeurs)){
			$this->affecte($valeurs);
		}
	}

	public function affecte($valeurs){
		foreach($valeurs as $attribut => $valeur){

			switch($attribut){
				case 'idorganisme' :
					$this->setIdOrganisme($valeur);
					break;

				case 'nom' :
					$this->setNom($valeur);
					break;

				case 'mail' :
					$this->setMail($valeur);
					break;

				case 'tel' :
					$this->setTel($valeur);
					break;

				case 'password' :
					$this->setPassword($valeur);
					break;

			}
		}
	}

	public function getIdOrganisme(){
		return $this->idOrganisme;
	}

	public function setIdOrganisme($idOrganisme){
		$this->idOrganisme = $idOrganisme;
	}

	public function getNom(){
		return $this->nom;
	}

	public function setNom($nom){
		$this->nom = $nom;
	}

	public function getMail(){
		return $this->mail;
	}

	public function setMail($mail){
		$this->mail = $mail;
	}

	public function getTel(){
		return $this->tel;
	}

	public function setTel($tel){
		$this->tel = $tel;
	}

	public function getPassword(){
		return $this->password;
	}

	public function setPassword($password){
		$this->password = $password;
	}
}
?>
