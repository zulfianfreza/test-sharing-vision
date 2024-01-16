package repository

import "github.com/zulfianfreza/test-sharing-vision-backend/entity"

type PostRepository interface {
	FindAll(page, pageSize int, status string) ([]entity.Post, int, error)
	FindById(postId int) (entity.Post, error)
	Save(post entity.Post) (entity.Post, error)
	Update(post entity.Post) (entity.Post, error)
	Delete(post entity.Post) error
}
