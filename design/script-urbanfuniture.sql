
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
  `phone` VARCHAR(25) NULL,
  `dni` VARCHAR(15) NULL,
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


/* Agregando categorias */
INSERT INTO categories (nombre) VALUES ("Mesas");
INSERT INTO categories (nombre) VALUES ("Sillones");
INSERT INTO categories (nombre) VALUES ("Lamparas");
INSERT INTO categories (nombre) VALUES ("Camas");
/* Agregando productos */
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-1.png","10","12500", "Sillon anaranjado de un cuerpo.", "Sillon anaranjado", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-2.png", "0","18500", "Sillon moderno blanco con tapizado rojo.", "Sillon moderno blanco", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-3.png","10","12500", "Sillon anaranjado de un cuerpo.", "Sillon anaranjado", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-4.png","0", "8500", "Mesa redonda hecha de madera y hierro", "Mesa redonda",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-5.png","5", "10000", "Sillon anaranjado de forma hexagonal", "Sillon hexa anaranjado",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-6.png","0", "11500", "Sillon gris con patas de madera", "Sillon gris", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-7.png","25", "19500", "Sillon moderno rojo", "Sillon rojo", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-8.png","0", "10500", "Mesa de luz de madera", "Mesita de madera", 1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-9.png","15","8000","Mesa de madera", "Mesa de madera", 1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-10.png","0","25500","Escritorio negro de oficina", "Escritorio negro", 1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-11.png","35","12000","Mueble con cajones de madera", "Mueble de madera", 1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-12.png","5", "35000", "Juego de sillas y una mesa para la cocina", "Mesa y juego de sillas", 1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-13.png","0","12000","Sillon turquesa cuadrangular", "Sillon turquesa", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-14.png","10","22500","Cama de dos plazas", "Cama de dos plazas",4);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-15.png","0","19250","Sillon de dos cuerpos anaranjado","Sillon naranja",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-16.png","15","13250","Sillon azul", "Sillon azul", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-17.png","0","10250","Sillon azul", "Sillon azul", 2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-18.png","5","7850","Silla naranja", "Silla naranja",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-19.png","0","18550","Sillon azul de 3 cuerpos","Sillon azul",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-20.png","10","11000","Sillon azul", "Sillon azul",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-21.png","0","15550","Mesa oscura", "Mesa oscura",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-22.png","5","12550","Mesa oscura","Mesa oscura",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-23.png","0","15550","Mesa oscura","Mesa oscura",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-24.png","10","18575","Sillon gris","Sillon gris",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-25.png","0","8550","Lampara de madera","Lampara de madera",3);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-26.png","15","7500","Silla de madera","Silla de madera",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-27.png","0","12500","Sillon con reposa piernas","Sillon",2);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-28.png","5","9500","Mesa oscura","Mesa oscura",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-29.png","0","25500","Mesa oscura con vidrio","Mesa con vidrio",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-30.png","5","12550","Par de mesas de madera con superficie de vidrio","Par de mesas",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-31.png","0","10500","Escritorio para oficina","Escritorio blanco",1);
INSERT INTO products (image, discount, price, description, name, categories_idcategories) VALUES ("product-32.png","0","5500","Lampara moderna","Lampara moderna","3");

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;