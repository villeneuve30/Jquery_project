-- MySQL dump 10.13  Distrib 5.7.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cooperative
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adresse` (
  `idadresse` int(11) NOT NULL AUTO_INCREMENT,
  `adresse` varchar(100) NOT NULL,
  `codepostal` char(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `idorganisme` int(11) NOT NULL,
  PRIMARY KEY (`idadresse`),
  KEY `idorganisme` (`idorganisme`),
  CONSTRAINT `adresse_ibfk_1` FOREIGN KEY (`idorganisme`) REFERENCES `organisme` (`idorganisme`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresse`
--

LOCK TABLES `adresse` WRITE;
/*!40000 ALTER TABLE `adresse` DISABLE KEYS */;
INSERT INTO `adresse` VALUES (1,'9 Rue Henri IV','87000','Limoges',1),(2,'3 Avenue de Verdun','36000','Châteauroux',2),(3,'2 Rue de Rennes','75006','Paris',3);
/*!40000 ALTER TABLE `adresse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collecte`
--

DROP TABLE IF EXISTS `collecte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collecte` (
  `idcollecte` int(11) NOT NULL AUTO_INCREMENT,
  `idreappro` int(11) NOT NULL,
  `idlivreur` int(11) NOT NULL,
  `idretrib` int(11) NOT NULL,
  PRIMARY KEY (`idcollecte`),
  KEY `idreappro` (`idreappro`),
  KEY `idlivreur` (`idlivreur`),
  KEY `idretrib` (`idretrib`),
  CONSTRAINT `collecte_ibfk_1` FOREIGN KEY (`idreappro`) REFERENCES `reapprovisionnement` (`idreappro`),
  CONSTRAINT `collecte_ibfk_2` FOREIGN KEY (`idlivreur`) REFERENCES `livreur` (`idlivreur`),
  CONSTRAINT `collecte_ibfk_3` FOREIGN KEY (`idretrib`) REFERENCES `retribution` (`idretrib`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collecte`
--

LOCK TABLES `collecte` WRITE;
/*!40000 ALTER TABLE `collecte` DISABLE KEYS */;
/*!40000 ALTER TABLE `collecte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_reappro`
--

DROP TABLE IF EXISTS `detail_reappro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_reappro` (
  `idreappro` int(11) NOT NULL,
  `idproduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idreappro`),
  KEY `idproduit` (`idproduit`),
  CONSTRAINT `detail_reappro_ibfk_1` FOREIGN KEY (`idreappro`) REFERENCES `reapprovisionnement` (`idreappro`),
  CONSTRAINT `detail_reappro_ibfk_2` FOREIGN KEY (`idproduit`) REFERENCES `produit` (`idproduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_reappro`
--

LOCK TABLES `detail_reappro` WRITE;
/*!40000 ALTER TABLE `detail_reappro` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_reappro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_ventes`
--

DROP TABLE IF EXISTS `detail_ventes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_ventes` (
  `idvente` int(11) NOT NULL,
  `idproduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `remise` int(11) NOT NULL,
  PRIMARY KEY (`idvente`),
  KEY `idproduit` (`idproduit`),
  CONSTRAINT `detail_ventes_ibfk_1` FOREIGN KEY (`idvente`) REFERENCES `ventes` (`idvente`),
  CONSTRAINT `detail_ventes_ibfk_2` FOREIGN KEY (`idproduit`) REFERENCES `produit` (`idproduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_ventes`
--

LOCK TABLES `detail_ventes` WRITE;
/*!40000 ALTER TABLE `detail_ventes` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_ventes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facture`
--

DROP TABLE IF EXISTS `facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facture` (
  `idfacture` int(11) NOT NULL AUTO_INCREMENT,
  `prix` double(10,2) NOT NULL,
  PRIMARY KEY (`idfacture`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facture`
--

LOCK TABLES `facture` WRITE;
/*!40000 ALTER TABLE `facture` DISABLE KEYS */;
INSERT INTO `facture` VALUES (1,50.00),(2,80.00),(3,35.00);
/*!40000 ALTER TABLE `facture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indisponibilite`
--

DROP TABLE IF EXISTS `indisponibilite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indisponibilite` (
  `idindisponibilite` int(11) NOT NULL AUTO_INCREMENT,
  `idorganisme` int(11) NOT NULL,
  `idlivreur` int(11) NOT NULL,
  PRIMARY KEY (`idindisponibilite`),
  KEY `idorganisme` (`idorganisme`),
  KEY `idlivreur` (`idlivreur`),
  CONSTRAINT `indisponibilite_ibfk_1` FOREIGN KEY (`idorganisme`) REFERENCES `organisme` (`idorganisme`),
  CONSTRAINT `indisponibilite_ibfk_2` FOREIGN KEY (`idlivreur`) REFERENCES `livreur` (`idlivreur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indisponibilite`
--

LOCK TABLES `indisponibilite` WRITE;
/*!40000 ALTER TABLE `indisponibilite` DISABLE KEYS */;
/*!40000 ALTER TABLE `indisponibilite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livraison`
--

DROP TABLE IF EXISTS `livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livraison` (
  `idlivraison` int(11) NOT NULL AUTO_INCREMENT,
  `idvente` int(11) NOT NULL,
  `idlivreur` int(11) NOT NULL,
  `idfacture` int(11) NOT NULL,
  PRIMARY KEY (`idlivraison`),
  KEY `idvente` (`idvente`),
  KEY `idlivreur` (`idlivreur`),
  KEY `idfacture` (`idfacture`),
  CONSTRAINT `livraison_ibfk_1` FOREIGN KEY (`idvente`) REFERENCES `ventes` (`idvente`),
  CONSTRAINT `livraison_ibfk_2` FOREIGN KEY (`idlivreur`) REFERENCES `livreur` (`idlivreur`),
  CONSTRAINT `livraison_ibfk_3` FOREIGN KEY (`idfacture`) REFERENCES `facture` (`idfacture`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livraison`
--

LOCK TABLES `livraison` WRITE;
/*!40000 ALTER TABLE `livraison` DISABLE KEYS */;
INSERT INTO `livraison` VALUES (1,1,1,1),(2,2,1,2),(3,3,1,3);
/*!40000 ALTER TABLE `livraison` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livreur`
--

DROP TABLE IF EXISTS `livreur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livreur` (
  `idlivreur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `telephone` char(10) NOT NULL,
  PRIMARY KEY (`idlivreur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livreur`
--

LOCK TABLES `livreur` WRITE;
/*!40000 ALTER TABLE `livreur` DISABLE KEYS */;
INSERT INTO `livreur` VALUES (1,'LOISEAU','Marc','0125645878'),(2,'LAMIE','Jean','0121458788');
/*!40000 ALTER TABLE `livreur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisme`
--

DROP TABLE IF EXISTS `organisme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisme` (
  `idorganisme` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`idorganisme`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisme`
--

LOCK TABLES `organisme` WRITE;
/*!40000 ALTER TABLE `organisme` DISABLE KEYS */;
INSERT INTO `organisme` VALUES (1,'tech&co','tech@co.fr','0574789658','password'),(2,'WebDev','webDev@outlook.com','0512134568','password'),(3,'FreeDev','freeDev@outlook.com','0541474546','password');
/*!40000 ALTER TABLE `organisme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produit` (
  `idproduit` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) NOT NULL,
  `prix` double(10,2) NOT NULL,
  `quantite` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  PRIMARY KEY (`idproduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reapprovisionnement`
--

DROP TABLE IF EXISTS `reapprovisionnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reapprovisionnement` (
  `idreappro` int(11) NOT NULL AUTO_INCREMENT,
  `idorganisme` int(11) NOT NULL,
  PRIMARY KEY (`idreappro`),
  KEY `idorganisme` (`idorganisme`),
  CONSTRAINT `reapprovisionnement_ibfk_1` FOREIGN KEY (`idorganisme`) REFERENCES `organisme` (`idorganisme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reapprovisionnement`
--

LOCK TABLES `reapprovisionnement` WRITE;
/*!40000 ALTER TABLE `reapprovisionnement` DISABLE KEYS */;
/*!40000 ALTER TABLE `reapprovisionnement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retribution`
--

DROP TABLE IF EXISTS `retribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `retribution` (
  `idretrib` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idretrib`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retribution`
--

LOCK TABLES `retribution` WRITE;
/*!40000 ALTER TABLE `retribution` DISABLE KEYS */;
/*!40000 ALTER TABLE `retribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_fournisseur`
--

DROP TABLE IF EXISTS `stock_fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_fournisseur` (
  `idorganisme` int(11) NOT NULL,
  `idproduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idorganisme`,`idproduit`),
  CONSTRAINT `stock_fournisseur_ibfk_1` FOREIGN KEY (`idorganisme`) REFERENCES `organisme` (`idorganisme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_fournisseur`
--

LOCK TABLES `stock_fournisseur` WRITE;
/*!40000 ALTER TABLE `stock_fournisseur` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventes`
--

DROP TABLE IF EXISTS `ventes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventes` (
  `idvente` int(11) NOT NULL AUTO_INCREMENT,
  `idorganisme` int(11) NOT NULL,
  `dateestimee` date NOT NULL,
  `remise` int(11) NOT NULL,
  PRIMARY KEY (`idvente`),
  KEY `idorganisme` (`idorganisme`),
  CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`idorganisme`) REFERENCES `organisme` (`idorganisme`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventes`
--

LOCK TABLES `ventes` WRITE;
/*!40000 ALTER TABLE `ventes` DISABLE KEYS */;
INSERT INTO `ventes` VALUES (1,1,'2019-03-31',0),(2,2,'2019-03-31',0),(3,3,'2019-03-31',0);
/*!40000 ALTER TABLE `ventes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-20 14:46:03
