package request

type PostUpdateRequest struct {
	ID       int    `validate:"required"`
	Title    string `validate:"required,min=20" json:"title"`
	Content  string `validate:"required,min=200" json:"content"`
	Category string `validate:"required,min=3" json:"category"`
	Status   string `validate:"required" json:"status"`
}
