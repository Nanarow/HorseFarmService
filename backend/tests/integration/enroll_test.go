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
	"github.com/sut66/team16/backend/routers"
)

func TestCreateEnrollment(t *testing.T) {

	entity.SetupDatabase("TestDB")
	router := routers.SetUpRouter()
	router.POST("/enrollments", controllers.CreateEnrollment)
	entity.DB().Create(&entity.Schedule{
		BaseModel: entity.BaseModel{ID: 2},
	})

	t.Run(`created enrollment success`, func(t *testing.T) {
		enroll := entity.Enrollment{
			UserID:     2,
			ScheduleID: 2,
		}
		jsonBody, _ := json.Marshal(enroll)
		request, _ := http.NewRequest("POST", "/enrollments", bytes.NewBuffer(jsonBody))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
	})
	t.Run(`create enrollment fail`, func(t *testing.T) {
		enroll := entity.Enrollment{
			UserID:     2,
			ScheduleID: 8,
		}
		jsonBody, _ := json.Marshal(enroll)
		request, _ := http.NewRequest("POST", "/enrollments", bytes.NewBuffer(jsonBody))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		var respJson resp
		json.Unmarshal(data, &respJson)
		// Assert
		assert.Equal(t, http.StatusBadRequest, response.Code)
		assert.Equal(t, "Schedule does not exist", respJson.Error)

	})
}
