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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` varchar(256) NOT NULL,
  `CustomerID` varchar(256) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Address` varchar(256) NOT NULL,
  `Country` varchar(256) NOT NULL,
  `Postal` varchar(25) NOT NULL,
  `DateOfOrder` varchar(256) NOT NULL,
  `PaymentID` varchar(256) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `ExpectedDays` int NOT NULL,
  PRIMARY KEY (`OrderID`),
  UNIQUE KEY `OrderID_UNIQUE` (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('11BR37D15E','Josh Davis','Josh Davis','1210 54 Ave, Calgary, Alberta','Canada','T2O2L2','2024-04-13T20:06:55.351Z','11XD38RF32','Processed',4),('43EQ81M4M7','Theodore24','Theodore Yamit','4123 ave 53 street, Calgary, Alberta','Canada','T4L0L2','2024-04-13T18:53:20.608Z','MZ6W9RXMJ6','Delivered',2),('45CD55826A','David123','David Underwood','123123 Bridge Street, Calgary, Alberta','Canada','T4V090','2024-04-13T02:01:04.965Z','MK31F9N6SI','Shipped',4),('HDIS962824','David123','David Underwood','123123 Bridge Street, Calgary, Alberta','Canada','T4O0X0','2024-04-13T01:57:20.025Z','V6LMN2P448','Processed',4),('Q2MGB1YC74','David123','David Underwood','123123 Bridge Street, Calgary, Alberta','Canada','T4V090','2024-04-13T02:03:19.684Z','9984YX1487','Processed',4);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
