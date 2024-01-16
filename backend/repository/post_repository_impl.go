package repository

import (
	"github.com/zulfianfreza/test-sharing-vision-backend/entity"
	"github.com/zulfianfreza/test-sharing-vision-backend/exception"
	"gorm.io/gorm"
)

type PostRepositoryImpl struct {
	DB *gorm.DB
}

func NewPostRepository(DB *gorm.DB) PostRepository {
	return &PostRepositoryImpl{DB: DB}
}

func (repository *PostRepositoryImpl) Save(post entity.Post) (entity.Post, error) {
	err := repository.DB.Save(&post).Error

	if err != nil {
		return post, err
	}

	return post, nil
}
func (repository *PostRepositoryImpl) FindAll(page, pageSize int, status string) ([]entity.Post, int, error) {
	posts := []entity.Post{}

	var count int64

	err := repository.DB.Model(&entity.Post{}).Where("status = ?", status).Count(&count).Error

	if err != nil {
		return posts, 0, err
	}

	offset := (page - 1) * pageSize

	err = repository.DB.Limit(pageSize).Offset(offset).Where("status = ?", status).Find(&posts).Error

	if err != nil {
		return posts, 0, err
	}

	totalPages := int(count) / pageSize

	if int(count)%pageSize != 0 {
		totalPages++
	}

	return posts, totalPages, nil
}
func (repository *PostRepositoryImpl) FindById(postId int) (entity.Post, error) {
	post := entity.Post{}
	err := repository.DB.Where("id = ?", postId).Find(&post).Error

	if post.ID == 0 {
		panic(exception.NewNotFoundError("post not found"))
	}

	if err != nil {
		return post, err
	}

	return post, nil
}
func (repository *PostRepositoryImpl) Update(post entity.Post) (entity.Post, error) {
	err := repository.DB.Save(&post).Error

	if err != nil {
		return post, err
	}

	return post, nil
}
func (repository *PostRepositoryImpl) Delete(post entity.Post) error {
	err := repository.DB.Where("id = ?", post.ID).Delete(&post).Error

	if err != nil {
		return err
	}

	return nil
}
