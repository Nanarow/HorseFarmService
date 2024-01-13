package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func TestCreateCourseSetting(t *testing.T) {
	router := GetTestRouter()
	router.POST("/courses", controllers.CreateCourse)

	t.Run(`create course success`, func(t *testing.T) {
		course := entity.Course{ 
			Name:			"Level 1",
			Duration:		1,
			Participants:	10, 
			Description:	"",
			Experience:		1,
			EmployeeID:		1,
			LocationID:		1, 
		}
		courseJSON, _ := json.Marshal(course)
		request, _ := http.NewRequest("POST", "/courses", bytes.NewBuffer(courseJSON))
		request.Header.Set("Content-Type", "application/json")
		
		//Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		//Assert
		assert.Equal(t, http.StatusOK, response.Code)
		//add additional assertions to check if the course is create successfully
		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "", respJson.Error)
	})

	t.Run(`create course fail`, func(t *testing.T) {
		course := entity.Course{ 
			Name:			"Level 1",
			Duration:		1,
		}
		courseJSON, _ := json.Marshal(course)
		request, _ := http.NewRequest("POST", "/courses", bytes.NewBuffer(courseJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusBadRequest, response.Code)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "Employee is required;Experience is required;Location is required;Participants is required", respJson.Error)
	})
}