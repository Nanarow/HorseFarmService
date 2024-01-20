package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func TestCreateStable(t *testing.T) {
	router := GetTestRouter()
	router.POST("/stables", controllers.CreateStable)

	t.Run(`Create stable Success`, func(t *testing.T) {

		stable := entity.Stable{
			Maintenance: time.Now(),
			Cleaning:    time.Now(),
			Temperature: 26,
			Humidity:    36,
			Description: "",
			EmployeeID:  1,
		}
		stableJSON, _ := json.Marshal(stable)
		request, _ := http.NewRequest("POST", "/stables", bytes.NewBuffer(stableJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)

		// add additional assertions to check if the employee is created successfully

	})

	t.Run(`create stable Fail`, func(t *testing.T) {

		stable := entity.Stable{
			Cleaning:    time.Now().AddDate(0, 0, -1),
			Temperature: 26,
		}
		stableJSON, _ := json.Marshal(stable)
		request, _ := http.NewRequest("POST", "/stables", bytes.NewBuffer(stableJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, http.StatusBadRequest, response.Code)
		assert.Equal(t, "Cleaning must be in the current;Humidity is required;Maintenance is required", respJson.Error)
	})
}
