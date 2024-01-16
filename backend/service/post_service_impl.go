package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/zulfianfreza/test-sharing-vision-backend/entity"
	"github.com/zulfianfreza/test-sharing-vision-backend/helper"
	"github.com/zulfianfreza/test-sharing-vision-backend/model/request"
	"github.com/zulfianfreza/test-sharing-vision-backend/repository"
)

type PostServiceImpl struct {
	PostRepository repository.PostRepository
	Validate       *validator.Validate
}

func NewPostService(postRepository repository.PostRepository, validate *validator.Validate) PostService {
	return &PostServiceImpl{PostRepository: postRepository, Validate: validate}
}

func (service *PostServiceImpl) Create(request request.PostCreateRequest) entity.Post {
	post := entity.Post{}

	err := service.Validate.Struct(request)

	helper.PanicIfError(err)

	post.Title = request.Title
	post.Content = request.Content
	post.Category = request.Category
	post.Status = request.Status

	newPost, err := service.PostRepository.Save(post)

	helper.PanicIfError(err)

	return newPost
}
func (service *PostServiceImpl) FindAll(page, pageSize int, status string) ([]entity.Post, int) {

	posts, totalPages, err := service.PostRepository.FindAll(page, pageSize, status)

	helper.PanicIfError(err)

	return posts, totalPages

}
func (service *PostServiceImpl) FindById(postId int) entity.Post {
	post, err := service.PostRepository.FindById(postId)

	helper.PanicIfError(err)

	return post
}
func (service *PostServiceImpl) Update(request request.PostUpdateRequest) entity.Post {
	post, err := service.PostRepository.FindById(request.ID)

	helper.PanicIfError(err)

	err = service.Validate.Struct(request)

	helper.PanicIfError(err)

	post.Title = request.Title
	post.Content = request.Content
	post.Category = request.Category
	post.Status = request.Status

	updatedPost, err := service.PostRepository.Update(post)

	helper.PanicIfError(err)

	return updatedPost
}
func (service *PostServiceImpl) Delete(postId int) {
	post := entity.Post{
		ID: postId,
	}

	err := service.PostRepository.Delete(post)

	helper.PanicIfError(err)

}
