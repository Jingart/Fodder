/*
MySQL Data Transfer
Source Host: 192.168.0.102
Source Database: foodonomix
Target Host: 192.168.0.102
Target Database: foodonomix
Date: 24.10.2015 13:38:17
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for itembrand
-- ----------------------------
DROP TABLE IF EXISTS `itembrand`;
CREATE TABLE `itembrand` (
  `brandid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`brandid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for itemprice
-- ----------------------------
DROP TABLE IF EXISTS `itemprice`;
CREATE TABLE `itemprice` (
  `priceid` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) DEFAULT NULL,
  `price_kg` int(11) DEFAULT NULL,
  PRIMARY KEY (`priceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for itemtype
-- ----------------------------
DROP TABLE IF EXISTS `itemtype`;
CREATE TABLE `itemtype` (
  `itemtypeid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  PRIMARY KEY (`itemtypeid`),
  KEY `brandid` (`brandid`),
  CONSTRAINT `itemtype_ibfk_1` FOREIGN KEY (`brandid`) REFERENCES `itembrand` (`brandid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shoplocation
-- ----------------------------
DROP TABLE IF EXISTS `shoplocation`;
CREATE TABLE `shoplocation` (
  `shoplocationid` int(11) NOT NULL AUTO_INCREMENT,
  `shopid` int(11) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  PRIMARY KEY (`shoplocationid`),
  KEY `shoplocation_ibfk_1` (`shopid`),
  CONSTRAINT `shoplocation_ibfk_1` FOREIGN KEY (`shopid`) REFERENCES `shops` (`shopid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shoppinglist
-- ----------------------------
DROP TABLE IF EXISTS `shoppinglist`;
CREATE TABLE `shoppinglist` (
  `shoppinglistid` int(11) NOT NULL AUTO_INCREMENT,
  `listdate` datetime DEFAULT NULL,
  `listuser` varchar(100) DEFAULT NULL,
  `shopid` int(11) DEFAULT NULL,
  `shoplocationid` int(11) DEFAULT NULL,
  PRIMARY KEY (`shoppinglistid`),
  KEY `shopid` (`shopid`),
  KEY `shoppinglist_ibfk_2` (`shoplocationid`),
  CONSTRAINT `shoppinglist_ibfk_1` FOREIGN KEY (`shopid`) REFERENCES `shops` (`shopid`),
  CONSTRAINT `shoppinglist_ibfk_2` FOREIGN KEY (`shoplocationid`) REFERENCES `shoplocation` (`shoplocationid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shoppinglistitems
-- ----------------------------
DROP TABLE IF EXISTS `shoppinglistitems`;
CREATE TABLE `shoppinglistitems` (
  `shoppinglistitemid` int(11) NOT NULL AUTO_INCREMENT,
  `shoppinglistid` int(11) DEFAULT NULL,
  `brandid` int(10) DEFAULT NULL,
  `itemtypeid` int(11) DEFAULT NULL,
  `price` decimal(11,2) unsigned zerofill DEFAULT NULL,
  `pricekg` decimal(11,2) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`shoppinglistitemid`),
  KEY `shoppinglistid` (`shoppinglistid`),
  KEY `itemtypeid` (`itemtypeid`),
  KEY `priceid` (`price`),
  KEY `shoppinglistitems_ibfk_4` (`brandid`),
  CONSTRAINT `shoppinglistitems_ibfk_1` FOREIGN KEY (`shoppinglistid`) REFERENCES `shoppinglist` (`shoppinglistid`),
  CONSTRAINT `shoppinglistitems_ibfk_2` FOREIGN KEY (`itemtypeid`) REFERENCES `itemtype` (`itemtypeid`),
  CONSTRAINT `shoppinglistitems_ibfk_4` FOREIGN KEY (`brandid`) REFERENCES `itembrand` (`brandid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shops
-- ----------------------------
DROP TABLE IF EXISTS `shops`;
CREATE TABLE `shops` (
  `shopid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  PRIMARY KEY (`shopid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `itembrand` VALUES ('1', 'Aass');
INSERT INTO `itembrand` VALUES ('2', 'Maarud');
INSERT INTO `itembrand` VALUES ('3', 'Gilde');
INSERT INTO `itembrand` VALUES ('4', 'Toro');
INSERT INTO `itembrand` VALUES ('5', 'X-tra');
INSERT INTO `itembrand` VALUES ('6', 'Coop');
INSERT INTO `itemtype` VALUES ('1', 'Pils', '1');
INSERT INTO `itemtype` VALUES ('2', 'IPA', '1');
INSERT INTO `itemtype` VALUES ('3', 'Fatøl', '1');
INSERT INTO `itemtype` VALUES ('4', 'Kjøttkaker', '3');
INSERT INTO `itemtype` VALUES ('5', 'Grillpølse', '3');
INSERT INTO `itemtype` VALUES ('6', 'Familieskinke', '3');
INSERT INTO `itemtype` VALUES ('7', 'Leverpostei', '3');
INSERT INTO `itemtype` VALUES ('8', 'Kjøttpølse', '3');
INSERT INTO `itemtype` VALUES ('9', 'Ertestuing', '4');
INSERT INTO `itemtype` VALUES ('10', 'Pizzafyll Tomat og løk', '4');
INSERT INTO `itemtype` VALUES ('11', 'Appelsinjuice', '6');
INSERT INTO `itemtype` VALUES ('12', 'Eplejuice', '6');
INSERT INTO `itemtype` VALUES ('13', 'Eplejuice', '5');
INSERT INTO `itemtype` VALUES ('14', 'Chillinøtter', '2');
INSERT INTO `shoplocation` VALUES ('1', '1', 'Brueland', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('2', '1', 'Madla', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('3', '2', 'Madla', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('4', '3', 'Hinna', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('5', '3', 'Bogafjell', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('6', '4', 'Sandnes', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('7', '4', 'Forus', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('8', '5', 'Gandal', '2015-10-18', '00:00:00');
INSERT INTO `shoplocation` VALUES ('9', '5', 'Håbafjell', '2015-10-18', '00:00:00');
INSERT INTO `shops` VALUES ('1', 'Coop Mega', '2015-10-18', '00:00:00');
INSERT INTO `shops` VALUES ('2', 'Kiwi', '2015-10-18', '00:00:00');
INSERT INTO `shops` VALUES ('3', 'Meny', '2015-10-18', '00:00:00');
INSERT INTO `shops` VALUES ('4', 'Coop Extra', '2015-10-18', '00:00:00');
INSERT INTO `shops` VALUES ('5', 'Rema1000', '2015-10-18', '00:00:00');
