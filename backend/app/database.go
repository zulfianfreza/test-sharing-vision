package app

import (
	"errors"
	"log"
	"time"

	"github.com/zulfianfreza/test-sharing-vision-backend/entity"
	"github.com/zulfianfreza/test-sharing-vision-backend/helper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	dsn := "julian:1i2r3e4a@tcp(database:3306)/test-sharing-vision"

	maxRetries := 30
	retryInterval := 1 * time.Second

	var db *gorm.DB
	var err error

	// Gorm configuration for MySQL connection

	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err == nil {
			break
		}

		log.Printf("Failed to connect to MySQL: %v. Retrying in %v...", err, retryInterval)
		time.Sleep(retryInterval)
	}

	helper.PanicIfError(errors.New("unable to connect to mysql after multiple retries"))

	db.AutoMigrate(&entity.Post{})

	return db
}
