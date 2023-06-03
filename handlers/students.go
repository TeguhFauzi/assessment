package handlers

import (
	"net/http"
	"strconv"
	dto "students/dto/result"
	studentdto "students/dto/students"
	"students/models"
	"students/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerStudent struct {
	StudentRepository repositories.StudentRepository
}

func HandlerStudent(StudentRepository repositories.StudentRepository) *handlerStudent {
	return &handlerStudent{StudentRepository}
}

func (h *handlerStudent) FindStudent(c echo.Context) error {
	students, err := h.StudentRepository.FindStudents()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Students successfully obtained", Data: students})
}

func (h *handlerStudent) GetStudent(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var students models.Student

	students, err := h.StudentRepository.GetStudent(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Student data successfully obtained", Data: convertResponseStudent(students)})
}

func (h *handlerStudent) CreateStudent(c echo.Context) error {

	math, _ := strconv.Atoi(c.FormValue("math"))
	science, _ := strconv.Atoi(c.FormValue("science"))
	english, _ := strconv.Atoi(c.FormValue("english"))
	softskill, _ := strconv.Atoi(c.FormValue("soft_skill"))

	request := studentdto.StudentRequest{
		Name:      c.FormValue("name"),
		Math:      math,
		Science:   science,
		English:   english,
		Softskill: softskill,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	student := models.Student{
		Name:      request.Name,
		Math:      request.Math,
		Science:   request.Science,
		English:   request.English,
		Softskill: request.Softskill,
	}

	student, err = h.StudentRepository.CreateStudent(student)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	student, _ = h.StudentRepository.GetStudent(student.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Student data created successfully", Data: convertResponseStudent(student)})
}

func (h *handlerStudent) UpdateStudent(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))
	math, _ := strconv.Atoi(c.FormValue("math"))
	science, _ := strconv.Atoi(c.FormValue("science"))
	english, _ := strconv.Atoi(c.FormValue("english"))
	softskill, _ := strconv.Atoi(c.FormValue("soft_skill"))

	request := studentdto.StudentRequest{
		Name:      c.FormValue("name"),
		Math:      math,
		Science:   science,
		English:   english,
		Softskill: softskill,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	student, _ := h.StudentRepository.GetStudent(id)
	// film.ID = request.ID

	if request.Name != "" {
		student.Name = request.Name
	}
	if request.Math != 0 {
		student.Math = request.Math
	}
	if request.Science != 0 {
		student.Science = request.Science
	}
	if request.English != 0 {
		student.English = request.English
	}
	if request.Softskill != 0 {
		student.Softskill = request.Softskill
	}

	data, err := h.StudentRepository.UpdateStudent(student)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Student data updated successfully", Data: convertResponseStudent(data)})
}

func (h *handlerStudent) DeleteStudent(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	student, err := h.StudentRepository.GetStudent(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.StudentRepository.DeleteStudent(student, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Student data deleted successfully", Data: convertResponseStudent(data)})
}

func convertResponseStudent(u models.Student) studentdto.StudentResponse {
	return studentdto.StudentResponse{
		ID:        u.ID,
		Name:      u.Name,
		Math:      u.Math,
		Science:   u.Science,
		English:   u.English,
		Softskill: u.Softskill,
	}
}
