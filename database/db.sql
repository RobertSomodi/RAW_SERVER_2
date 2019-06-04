CREATE DATABASE  IF NOT EXISTS `licenta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `licenta`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: licenta
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authentications`
--

DROP TABLE IF EXISTS `authentications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `authentications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentications`
--

LOCK TABLES `authentications` WRITE;
/*!40000 ALTER TABLE `authentications` DISABLE KEYS */;
INSERT INTO `authentications` VALUES (1,'superadmin','$2b$10$LlsaRtwKAHMewiYaBpU2LOwIyLg8k8ShGnph/9XGLvTUwpesUKoI6'),(11,'RSomodi','$2b$10$fUcl7TyhZNxIQtHftj/qeegx/pbVU8E3xxO7pNWP7X6D.2hRxEPgi'),(17,'CSamara','$2b$10$ZratQFYVj5r5pm.pDsS2M.9BlJicm5nyoit3yzNeHViaK3iQl.cmy'),(18,'MBendeac','$2b$10$D86zIGpJevc8VYBQBcKBwOHJh8rMt1rETyxl2YbPk9KOgn27/h6li');
/*!40000 ALTER TABLE `authentications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'department1'),(2,'department2');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departmentteammaps`
--

DROP TABLE IF EXISTS `departmentteammaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `departmentteammaps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeDepartmentMapId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storeDepartmentMapId_idx` (`storeDepartmentMapId`),
  KEY `teamId_idx` (`teamId`),
  CONSTRAINT `storeDepartmentMapId` FOREIGN KEY (`storeDepartmentMapId`) REFERENCES `storedepartmentmaps` (`id`),
  CONSTRAINT `teamId` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentteammaps`
--

LOCK TABLES `departmentteammaps` WRITE;
/*!40000 ALTER TABLE `departmentteammaps` DISABLE KEYS */;
INSERT INTO `departmentteammaps` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `departmentteammaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Director'),(2,'Manager Raion'),(3,'Manager');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `shiftId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL,
  `checkin` int(11) DEFAULT NULL,
  `checkout` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `scheduleDepartmentId_idx` (`departmentId`),
  KEY `scheduleStoreId_idx` (`storeId`),
  KEY `scheduleTeamId_idx` (`teamId`),
  KEY `scheduleShiftId_idx` (`shiftId`),
  KEY `scheduleUserId_idx` (`userId`),
  CONSTRAINT `scheduleDepartmentId` FOREIGN KEY (`departmentId`) REFERENCES `storedepartmentmaps` (`id`),
  CONSTRAINT `scheduleShiftId` FOREIGN KEY (`shiftId`) REFERENCES `shifts` (`id`),
  CONSTRAINT `scheduleStoreId` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`),
  CONSTRAINT `scheduleTeamId` FOREIGN KEY (`teamId`) REFERENCES `departmentteammaps` (`id`),
  CONSTRAINT `scheduleUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (2,1,1,NULL,1,2,'2018-01-29',5,NULL),(3,1,1,1,2,7,'2018-01-30',-15,30),(4,1,1,1,3,7,'2018-01-28',20,-12),(5,1,1,1,3,7,'2018-01-31',20,0),(6,1,1,1,1,7,'2018-01-02',1,-5),(7,1,1,2,1,8,'2018-01-03',20,-45),(8,1,1,1,2,7,'2018-01-03',NULL,NULL);
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `off` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (1,'Shift 1','#ff0000','false','08:00:00','15:00:00'),(2,'Shift 2','#006400','false','14:00:00','23:00:00'),(3,'Shift 3','#00008B','false','23:00:00','08:00:00');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storedepartmentmaps`
--

DROP TABLE IF EXISTS `storedepartmentmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `storedepartmentmaps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storeId_idx` (`storeId`),
  KEY `departmentId_idx` (`departmentId`),
  CONSTRAINT `departmentId` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`),
  CONSTRAINT `storeId` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storedepartmentmaps`
--

LOCK TABLES `storedepartmentmaps` WRITE;
/*!40000 ALTER TABLE `storedepartmentmaps` DISABLE KEYS */;
INSERT INTO `storedepartmentmaps` VALUES (1,1,1);
/*!40000 ALTER TABLE `storedepartmentmaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Orhideea','Some Random Address'),(2,'Militari','Another Address');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'team1'),(2,'team2'),(3,'team3');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `storeId` int(11) NOT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `teamId` int(11) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `positionId` int(11) NOT NULL,
  `weeklyHours` int(11) NOT NULL,
  `daysOff` int(11) NOT NULL,
  `recoveryHours` int(11) DEFAULT NULL,
  `authId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authId_idx` (`authId`),
  KEY `storeId_idx` (`storeId`),
  KEY `departmentId_idx` (`departmentId`),
  KEY `teamId_idx` (`teamId`),
  KEY `roleId_idx` (`roleId`),
  KEY `positionId_idx` (`positionId`),
  KEY `userAuthId_idx` (`authId`),
  KEY `userDepartmentId_idx` (`departmentId`),
  KEY `userTeamId_idx` (`teamId`),
  KEY `userRoleId_idx` (`roleId`),
  KEY `userPositionId_idx` (`positionId`),
  KEY `userStoreId_idx` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Robert','Somodi',1,1,1,1,1,60,24,0,11),(7,'Catalin','Samara',1,1,1,1,1,25,34,NULL,17),(8,'Mihai','Bendeac',1,1,2,1,2,50,34,NULL,18);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-04  7:56:12
