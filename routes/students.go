package routes

import (
	"students/handlers"
	"students/pkg/mysql"
	"students/repositories"

	"github.com/labstack/echo/v4"
)

func StudentRoutes(e *echo.Group) {
	studentRepository := repositories.RepositoryStudent(mysql.DB)
	h := handlers.HandlerStudent(studentRepository)

	e.GET("/student/:id", h.GetStudent)
	e.GET("/students", h.FindStudent)
	e.POST("/student", h.CreateStudent)
	e.PATCH("/student/:id", h.UpdateStudent)
	e.DELETE("/student/:id", h.DeleteStudent)
}
