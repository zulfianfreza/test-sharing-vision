CREATE TABLE posts
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200),
  content TEXT,
  category VARCHAR(100),
  created_date TIMESTAMP,
  updated_date TIMESTAMP,
  status VARCHAR(100),
  PRIMARY KEY(id)
)ENGINE = InnoDB;