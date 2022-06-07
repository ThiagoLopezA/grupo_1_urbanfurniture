-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema urbanfurniture
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema urbanfurniture
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `urbanfurniture` DEFAULT CHARACTER SET utf8 ;
USE `urbanfurniture` ;

-- -----------------------------------------------------
-- Table `urbanfurniture`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `urbanfurniture`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `firts_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `access` TINYINT(2) NULL,
  `phone` SMALLINT(20) NULL,
  `dni` SMALLINT(20) NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `urbanfurniture`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `urbanfurniture`.`locations` (
  `idlocations` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `street_number` TINYINT(10) NOT NULL,
  `floor` TINYINT(10) NULL,
  `apartment` VARCHAR(5) NULL,
  `province` VARCHAR(50) NOT NULL,
  `town` VARCHAR(50) NOT NULL,
  `codigo_postal` VARCHAR(45) NULL,
  `users_idusers` INT NOT NULL,
  PRIMARY KEY (`idlocations`),
  INDEX `fk_locations_users_idx` (`users_idusers` ASC) VISIBLE,
  CONSTRAINT `fk_locations_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `urbanfurniture`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `urbanfurniture`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `urbanfurniture`.`categories` (
  `idcategories` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idcategories`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `urbanfurniture`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `urbanfurniture`.`products` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(45) NULL,
  `discount` FLOAT NOT NULL,
  `price` FLOAT NOT NULL,
  `description` VARCHAR(100) NULL,
  `name` VARCHAR(100) NULL,
  `rating` TINYINT(10) NULL,
  `categories_idcategories` INT NOT NULL,
  PRIMARY KEY (`idproducts`),
  INDEX `fk_products_categories1_idx` (`categories_idcategories` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_idcategories`)
    REFERENCES `urbanfurniture`.`categories` (`idcategories`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `urbanfurniture`.`feedbacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `urbanfurniture`.`feedbacks` (
  `idfeedbacks` INT NOT NULL AUTO_INCREMENT,
  `rating` TINYINT(10) NULL,
  `commentary` VARCHAR(250) NULL,
  `users_idusers` INT NOT NULL,
  `products_idproducts` INT NOT NULL,
  PRIMARY KEY (`idfeedbacks`),
  INDEX `fk_feedbacks_users1_idx` (`users_idusers` ASC) VISIBLE,
  INDEX `fk_feedbacks_products1_idx` (`products_idproducts` ASC) VISIBLE,
  CONSTRAINT `fk_feedbacks_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `urbanfurniture`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedbacks_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `urbanfurniture`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
