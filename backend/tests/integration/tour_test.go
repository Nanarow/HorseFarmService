package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/routers"
)

// Successfully create a new tour registration with valid data
func TestCreateTour(t *testing.T) {
	t.Run(`created tour success`, func(t *testing.T) {
		entity.SetupDatabase()
		router := routers.SetUpRouter()
		router.POST("/tours", controllers.CreateTour)

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

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
		// add additional assertions to check if the tour registration is created successfully
	})
}
