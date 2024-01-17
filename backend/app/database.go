package app

import (
	"github.com/zulfianfreza/test-sharing-vision-backend/entity"
	"github.com/zulfianfreza/test-sharing-vision-backend/helper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {

	// maxRetries := 30
	// retryInterval := 1 * time.Second

	// var db *gorm.DB
	// var err error

	// for i := 0; i < maxRetries; i++ {
	// 	db, err = gorm.Open(mysql.Open("julian:julian@tcp(db:3306)/tsv?charset=utf8&parseTime=True&loc=Local"))

	// 	if err == nil {
	// 		break
	// 	}

	// 	log.Printf("Failed to connect to MySQL: %v. Retrying in %v...", err, retryInterval)
	// 	time.Sleep(retryInterval)
	// }

	// helper.PanicIfError(errors.New("unable to connect to mysql after multiple retries"))

	db, err := gorm.Open(mysql.Open("root:5C22HGD5FBC1Gc4B6fFfGgAcHaA-h5dA@(viaduct.proxy.rlwy.net:58293)/railway?parseTime=true"))
	helper.PanicIfError(err)

	db.AutoMigrate(&entity.Post{})

	return db
}
