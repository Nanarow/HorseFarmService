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

func TestCreateHealth(t *testing.T) {
	router := GetTestRouter()
	router.POST("/healths", controllers.CreateHealth)

	t.Run(`Create Health Successfully`, func(t *testing.T) {

		health := entity.Health{ //ครบ
			Date:       time.Now().AddDate(0, 0, 1),
			HorseID:    1,
			EmployeeID: 1,
			Vital:      "Pass",
			Tooth:      "Pass",
			Vaccine:    "Pass",
			Parasite:   "Pass",
			Blood:      "Pass",
		}
		healthJSON, _ := json.Marshal(health)
		request, _ := http.NewRequest("POST", "/healths", bytes.NewBuffer(healthJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
		// add additional assertions to check if the employee is created successfully
	})
	t.Run(`create health fail`, func(t *testing.T) {

		health := entity.Health{
			Tooth:      "Pass",
			Vital:      "Pass",
		}
		healthJSON, _ := json.Marshal(health)
		request, _ := http.NewRequest("POST", "/healths", bytes.NewBuffer(healthJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, http.StatusBadRequest, response.Code)
		assert.Equal(t,"Blood is required;Date is required;Parasite is required;Vaccine is required", respJson.Error)
	})
}
