package controller

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	"github.com/zulfianfreza/test-sharing-vision-backend/helper"
	"github.com/zulfianfreza/test-sharing-vision-backend/model/request"
	"github.com/zulfianfreza/test-sharing-vision-backend/model/response"
	"github.com/zulfianfreza/test-sharing-vision-backend/service"
)

type PostControllerImpl struct {
	PostService service.PostService
}

func NewPostController(postService service.PostService) PostController {
	return &PostControllerImpl{PostService: postService}
}

func (controller *PostControllerImpl) FindAll(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	queryParams := r.URL.Query()

	page, _ := strconv.Atoi(queryParams.Get("page"))
	pageSize, _ := strconv.Atoi(queryParams.Get("page_size"))
	status := queryParams.Get("status")

	if page <= 0 {
		page = 1
	}

	if pageSize <= 0 {
		pageSize = 10
	}

	if status == "" {
		status = "publish"
	}

	posts, totalPages := controller.PostService.FindAll(page, pageSize, status)

	response := response.PaginateResponse{
		Code:       http.StatusOK,
		Status:     "OK",
		Data:       posts,
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}

	helper.WriteToResponseBody(w, response)

}
func (controller *PostControllerImpl) Create(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	postCreateRequest := request.PostCreateRequest{}

	helper.ReadFromRequestBody(r, &postCreateRequest)

	newPost := controller.PostService.Create(postCreateRequest)

	response := response.BaseResponse{
		Code:   http.StatusCreated,
		Status: "CREATED",
		Data:   newPost,
	}

	helper.WriteToResponseBody(w, response)
}
func (controller *PostControllerImpl) Update(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	postId := params.ByName("postId")
	id, err := strconv.Atoi(postId)
	helper.PanicIfError(err)

	postUpdateRequest := request.PostUpdateRequest{}
	helper.ReadFromRequestBody(r, &postUpdateRequest)

	postUpdateRequest.ID = id

	updatedPost := controller.PostService.Update(postUpdateRequest)

	response := response.BaseResponse{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   updatedPost,
	}

	helper.WriteToResponseBody(w, response)
}
func (controller *PostControllerImpl) Delete(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	postId := params.ByName("postId")
	id, err := strconv.Atoi(postId)
	helper.PanicIfError(err)

	controller.PostService.Delete(id)

	response := response.BaseResponse{
		Code:   http.StatusOK,
		Status: "OK",
	}

	helper.WriteToResponseBody(w, response)

}
func (controller *PostControllerImpl) FindById(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	postId := params.ByName("postId")
	id, err := strconv.Atoi(postId)
	helper.PanicIfError(err)

	post := controller.PostService.FindById(id)

	response := response.BaseResponse{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   post,
	}

	helper.WriteToResponseBody(w, response)
}
