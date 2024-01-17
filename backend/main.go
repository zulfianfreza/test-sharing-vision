package main

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"github.com/zulfianfreza/test-sharing-vision-backend/app"
	"github.com/zulfianfreza/test-sharing-vision-backend/controller"
	"github.com/zulfianfreza/test-sharing-vision-backend/exception"
	"github.com/zulfianfreza/test-sharing-vision-backend/helper"
	"github.com/zulfianfreza/test-sharing-vision-backend/repository"
	"github.com/zulfianfreza/test-sharing-vision-backend/service"
)

func main() {
	db := app.NewDB()
	validate := validator.New()
	postRepository := repository.NewPostRepository(db)
	postService := service.NewPostService(postRepository, validate)
	postController := controller.NewPostController(postService)

	router := httprouter.New()

	router.GET("/article", postController.FindAll)
	router.POST("/article", postController.Create)
	router.GET("/article/:postId", postController.FindById)
	router.PATCH("/article/:postId", postController.Update)
	router.DELETE("/article/:postId", postController.Delete)

	router.PanicHandler = exception.ErrorHandler

	handler := cors.New(cors.Options{
		AllowedMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowedOrigins:     []string{"*"},
		AllowCredentials:   true,
		AllowedHeaders:     []string{"Content-Type", "Bearer", "Bearer ", "content-type", "Origin", "Accept"},
		OptionsPassthrough: true,
	}).Handler(router)

	server := http.Server{
		Addr:    "0.0.0.0:8000",
		Handler: handler,
	}

	err := server.ListenAndServe()
	helper.PanicIfError(err)
}
