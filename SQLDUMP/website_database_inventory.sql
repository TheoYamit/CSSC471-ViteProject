-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: website_database
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `ProductID` varchar(256) NOT NULL,
  `Category` varchar(256) NOT NULL,
  `Size` varchar(50) NOT NULL,
  `Stock` int NOT NULL,
  PRIMARY KEY (`ProductID`,`Size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('08TLHJ9','Clothing','L',10),('08TLHJ9','Clothing','M',20),('08TLHJ9','Clothing','S',20),('08TLHJ9','Clothing','XL',20),('08TLHJ9','Clothing','XXL',20),('12IEI22','Clothing','L',10),('12IEI22','Clothing','M',10),('12IEI22','Clothing','S',0),('12IEI22','Clothing','XL',10),('12IEI22','Clothing','XXL',10),('1BPHD0W','Clothing','L',10),('1BPHD0W','Clothing','M',10),('1BPHD0W','Clothing','S',10),('1BPHD0W','Clothing','XL',10),('1BPHD0W','Clothing','XXL',10),('2GMVG5F','Shoes','10',20),('2GMVG5F','Shoes','10.5',20),('2GMVG5F','Shoes','11',20),('2GMVG5F','Shoes','11.5',20),('2GMVG5F','Shoes','12',19),('2GMVG5F','Shoes','12.5',20),('2GMVG5F','Shoes','13',20),('2GMVG5F','Shoes','8',20),('2GMVG5F','Shoes','8.5',20),('2GMVG5F','Shoes','9',20),('2GMVG5F','Shoes','9.5',20),('45DT52F','Shoes','10',20),('45DT52F','Shoes','10.5',19),('45DT52F','Shoes','11',20),('45DT52F','Shoes','11.5',20),('45DT52F','Shoes','12',20),('45DT52F','Shoes','12.5',20),('45DT52F','Shoes','13',20),('45DT52F','Shoes','8',20),('45DT52F','Shoes','8.5',20),('45DT52F','Shoes','9',20),('45DT52F','Shoes','9.5',20),('4QN968D','Beauty Products','Regular',15),('56LCEGW','Shoes','10',20),('56LCEGW','Shoes','10.5',20),('56LCEGW','Shoes','11',20),('56LCEGW','Shoes','11.5',20),('56LCEGW','Shoes','12',20),('56LCEGW','Shoes','12.5',20),('56LCEGW','Shoes','13',20),('56LCEGW','Shoes','8',20),('56LCEGW','Shoes','8.5',20),('56LCEGW','Shoes','9',20),('56LCEGW','Shoes','9.5',20),('7D6GWW7','Beauty Products','Regular',20),('9OZLPE5','Clothing','L',30),('9OZLPE5','Clothing','M',30),('9OZLPE5','Clothing','S',30),('9OZLPE5','Clothing','XL',30),('9OZLPE5','Clothing','XXL',30),('AQ3I19L','Beauty Products','Regular',90),('B132K9K','Beauty Products','Regular',8),('C1RJ2Y7','Clothing','L',30),('C1RJ2Y7','Clothing','M',30),('C1RJ2Y7','Clothing','S',30),('C1RJ2Y7','Clothing','XL',30),('C1RJ2Y7','Clothing','XXL',30),('D2I323K','Shoes','10',7),('D2I323K','Shoes','10.5',15),('D2I323K','Shoes','11',3),('D2I323K','Shoes','11.5',19),('D2I323K','Shoes','12',20),('D2I323K','Shoes','12.5',13),('D2I323K','Shoes','13',12),('D2I323K','Shoes','8',10),('D2I323K','Shoes','8.5',12),('D2I323K','Shoes','9',8),('D2I323K','Shoes','9.5',5),('DF3832B','Beauty Products','Regular',50),('DKJI129','Clothing','L',20),('DKJI129','Clothing','M',20),('DKJI129','Clothing','S',20),('DKJI129','Clothing','XL',20),('DKJI129','Clothing','XXL',19),('DKW2002','Clothing','L',20),('DKW2002','Clothing','M',20),('DKW2002','Clothing','S',20),('DKW2002','Clothing','XL',20),('DKW2002','Clothing','XXL',20),('EQ092EO','Clothing','L',30),('EQ092EO','Clothing','M',30),('EQ092EO','Clothing','S',30),('EQ092EO','Clothing','XL',30),('EQ092EO','Clothing','XXL',30),('ESW4B3E','Clothing','L',20),('ESW4B3E','Clothing','M',10),('ESW4B3E','Clothing','S',20),('ESW4B3E','Clothing','XL',20),('ESW4B3E','Clothing','XXL',15),('ET7EXWB','Beauty Products','Regular',50),('G39KG92','Clothing','L',13),('G39KG92','Clothing','M',10),('G39KG92','Clothing','S',10),('G39KG92','Clothing','XL',5),('G39KG92','Clothing','XXL',4),('GK2139L','Shoes','10',10),('GK2139L','Shoes','10.5',10),('GK2139L','Shoes','11',10),('GK2139L','Shoes','11.5',10),('GK2139L','Shoes','12',10),('GK2139L','Shoes','12.5',10),('GK2139L','Shoes','13',10),('GK2139L','Shoes','8',10),('GK2139L','Shoes','8.5',10),('GK2139L','Shoes','9',10),('GK2139L','Shoes','9.5',10),('GLQM209','Shoes','10',5),('GLQM209','Shoes','10.5',10),('GLQM209','Shoes','11',10),('GLQM209','Shoes','11.5',10),('GLQM209','Shoes','12',10),('GLQM209','Shoes','12.5',8),('GLQM209','Shoes','13',13),('GLQM209','Shoes','8',12),('GLQM209','Shoes','8.5',12),('GLQM209','Shoes','9',12),('GLQM209','Shoes','9.5',12),('H23K9LK','Beauty Products','Regular',5),('H59NEU1','Beauty Products','Regular',20),('I29DK22','Clothing','L',8),('I29DK22','Clothing','M',10),('I29DK22','Clothing','S',5),('I29DK22','Clothing','XL',18),('I29DK22','Clothing','XXL',15),('I944U4Y','Beauty Products','Regular',10),('IC78LIE','Clothing','L',20),('IC78LIE','Clothing','M',20),('IC78LIE','Clothing','S',20),('IC78LIE','Clothing','XL',20),('IC78LIE','Clothing','XXL',20),('JR3L2L2','Shoes','10',9),('JR3L2L2','Shoes','10.5',9),('JR3L2L2','Shoes','11',10),('JR3L2L2','Shoes','11.5',10),('JR3L2L2','Shoes','12',10),('JR3L2L2','Shoes','12.5',10),('JR3L2L2','Shoes','13',10),('JR3L2L2','Shoes','8',8),('JR3L2L2','Shoes','8.5',7),('JR3L2L2','Shoes','9',8),('JR3L2L2','Shoes','9.5',8),('KDW1298','Clothing','L',15),('KDW1298','Clothing','M',15),('KDW1298','Clothing','S',15),('KDW1298','Clothing','XL',15),('KDW1298','Clothing','XXL',15),('KLE12L1','Clothing','L',15),('KLE12L1','Clothing','M',20),('KLE12L1','Clothing','S',20),('KLE12L1','Clothing','XL',15),('KLE12L1','Clothing','XXL',15),('LM1WZT4','Clothing','L',20),('LM1WZT4','Clothing','M',20),('LM1WZT4','Clothing','S',20),('LM1WZT4','Clothing','XL',20),('LM1WZT4','Clothing','XXL',20),('LNBSCVD','Shoes','10',20),('LNBSCVD','Shoes','10.5',20),('LNBSCVD','Shoes','11',20),('LNBSCVD','Shoes','11.5',20),('LNBSCVD','Shoes','12',20),('LNBSCVD','Shoes','12.5',20),('LNBSCVD','Shoes','13',20),('LNBSCVD','Shoes','8',20),('LNBSCVD','Shoes','8.5',20),('LNBSCVD','Shoes','9',20),('LNBSCVD','Shoes','9.5',20),('MQNOVCT','Shoes','10',20),('MQNOVCT','Shoes','10.5',20),('MQNOVCT','Shoes','11',20),('MQNOVCT','Shoes','11.5',20),('MQNOVCT','Shoes','12',20),('MQNOVCT','Shoes','12.5',20),('MQNOVCT','Shoes','13',20),('MQNOVCT','Shoes','8',20),('MQNOVCT','Shoes','8.5',20),('MQNOVCT','Shoes','9',20),('MQNOVCT','Shoes','9.5',20),('MZKN3N8','Shoes','10',30),('MZKN3N8','Shoes','10.5',30),('MZKN3N8','Shoes','11',30),('MZKN3N8','Shoes','11.5',30),('MZKN3N8','Shoes','12',30),('MZKN3N8','Shoes','12.5',30),('MZKN3N8','Shoes','13',30),('MZKN3N8','Shoes','8',30),('MZKN3N8','Shoes','8.5',30),('MZKN3N8','Shoes','9',30),('MZKN3N8','Shoes','9.5',30),('NNGB0SR','Beauty Products','Regular',50),('OM0F9B8','Beauty Products','Regular',50),('Q0XOHTD','Beauty Products','Regular',50),('QWE12KL','Shoes','10',10),('QWE12KL','Shoes','10.5',10),('QWE12KL','Shoes','11',10),('QWE12KL','Shoes','11.5',10),('QWE12KL','Shoes','12',10),('QWE12KL','Shoes','12.5',10),('QWE12KL','Shoes','13',10),('QWE12KL','Shoes','8',10),('QWE12KL','Shoes','8.5',10),('QWE12KL','Shoes','9',10),('QWE12KL','Shoes','9.5',10),('W2KE097','Clothing','L',20),('W2KE097','Clothing','M',20),('W2KE097','Clothing','S',20),('W2KE097','Clothing','XL',20),('W2KE097','Clothing','XXL',20),('YH3A0IK','Shoes','10',20),('YH3A0IK','Shoes','10.5',20),('YH3A0IK','Shoes','11',20),('YH3A0IK','Shoes','11.5',20),('YH3A0IK','Shoes','12',20),('YH3A0IK','Shoes','12.5',20),('YH3A0IK','Shoes','13',20),('YH3A0IK','Shoes','8',20),('YH3A0IK','Shoes','8.5',20),('YH3A0IK','Shoes','9',20),('YH3A0IK','Shoes','9.5',20),('ZES7OCY','Beauty Products','Regular',50);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 13:37:09
