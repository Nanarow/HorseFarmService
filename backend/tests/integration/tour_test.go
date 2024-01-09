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
	"github.com/sut66/team16/backend/routers"
)

type resp struct {
	Error string `json:"error"`
}
type respSuccess struct {
	Data string `json:"data"`
}

func TestCreateTour(t *testing.T) {

	entity.SetupDatabase("TestDB")
	entity.SetupData(entity.DB())
	router := routers.SetUpRouter()
	router.POST("/tours", controllers.CreateTour)

	t.Run(`created tour success`, func(t *testing.T) {
		tour := entity.TourRegistration{
			Date:         time.Now().Add(time.Duration(1) * time.Hour),
			Email:        "u1@u.com",
			Name:         "my tour",
			Participants: 10,
			PlanID:       2,
			TourTypeID:   2,
			UserID:       2,
		}
		tourJSON, _ := json.Marshal(tour)
		request, _ := http.NewRequest("POST", "/tours", bytes.NewBuffer(tourJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
		// add additional assertions to check if the tour registration is created successfully
		var respJson resp
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "", respJson.Error)
	})

	t.Run(`create tour fail`, func(t *testing.T) {
		tour := entity.TourRegistration{
			Email: "u1@u.com",
			Name:  "my tour",
		}
		tourJSON, _ := json.Marshal(tour)
		request, _ := http.NewRequest("POST", "/tours", bytes.NewBuffer(tourJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusBadRequest, response.Code)

		var respJson resp
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "Date is required;Participants is required;Plan is required", respJson.Error)

	})
}
