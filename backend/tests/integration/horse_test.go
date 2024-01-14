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

func TestCreateHorse(t *testing.T) {
	router := GetTestRouter()
	router.POST("/horses", controllers.CreateHorse)

	t.Run(`Create Horse Success`, func(t *testing.T) {

		horse := entity.Horse{
			Name:       "gigi",
			Age:        2,
			Date:       time.Now().AddDate(0, 0, 1),
			Image:      "",
			EmployeeID: 1,
			BleedID:    5,
			SexID:      2,
			StableID:   1,
		}
		horseJSON, _ := json.Marshal(horse)
		request, _ := http.NewRequest("POST", "/horses", bytes.NewBuffer(horseJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)

	})

	t.Run(`create horse fail`, func(t *testing.T) {

		horse := entity.Horse{
			Name: "gigi",
			Date: time.Now().AddDate(0, 0, 1),
		}
		horseJSON, _ := json.Marshal(horse)
		request, _ := http.NewRequest("POST", "/horses", bytes.NewBuffer(horseJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, http.StatusBadRequest, response.Code)
		assert.Equal(t, "Age is required;Bleed is required", respJson.Error)
	})
}
