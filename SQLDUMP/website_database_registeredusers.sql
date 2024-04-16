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
-- Table structure for table `registeredusers`
--

DROP TABLE IF EXISTS `registeredusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registeredusers` (
  `Username` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `First_name` varchar(256) NOT NULL,
  `Last_name` varchar(256) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Address` varchar(256) NOT NULL,
  PRIMARY KEY (`Username`,`Password`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registeredusers`
--

LOCK TABLES `registeredusers` WRITE;
/*!40000 ALTER TABLE `registeredusers` DISABLE KEYS */;
INSERT INTO `registeredusers` VALUES ('Cole10','ColeBridgere10231239','Cole','Bridgers','Cole10Bridgers@hotmail.com','123 White Avenue'),('David123','123456789','David','Underwood','DavidUnderwood@gmail.com','123123 Bridge Street'),('Josh Davis','JoshDavis','Josh','Davis','JoshDavis@gmail.com','1210 54 Ave'),('Logan24','123456','Logan','Levesque','loganlevesque@gmail.com','4320 White Drive Ave'),('Mark123010329','idjeofhu08uou','Mark','Paulo','MarkPaulo@gmail.com','123123 Bridge Street'),('Theodore24','TheoYamit','Theodore','Yamit','tyamit@gmail.com','4123 ave'),('Triton','Triton24','Theodore','Yamit','tyamit123@gmail.com','123 Bridge Street 58 Avenue');
/*!40000 ALTER TABLE `registeredusers` ENABLE KEYS */;
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
