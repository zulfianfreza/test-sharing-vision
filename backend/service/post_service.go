package service

import (
	"github.com/zulfianfreza/test-sharing-vision-backend/entity"
	"github.com/zulfianfreza/test-sharing-vision-backend/model/request"
)

type PostService interface {
	Create(request request.PostCreateRequest) entity.Post
	FindAll(page, pageSize int, status string) ([]entity.Post, int)
	FindById(postId int) entity.Post
	Update(request request.PostUpdateRequest) entity.Post
	Delete(postId int)
}
