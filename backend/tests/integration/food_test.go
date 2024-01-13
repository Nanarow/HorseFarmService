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

func TestCreateFood(t *testing.T) {
	router := GetTestRouter()
	router.POST("/foods", controllers.CreateFood)

	t.Run(`create food success`, func(t *testing.T) {
		food := entity.Food{
			Fat: "20",
			Carbohydrate: "20", 
			Protein: "20",      
			Vitamin: "20",
			Mineral: "20",
			Forage: "20",       
			Date: time.Now().Add(time.Duration(1) * time.Hour),
			EmployeeID: 1,
		}
		foodJSON, _ := json.Marshal(food)
		request, _ := http.NewRequest("POST", "/foods", bytes.NewBuffer(foodJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusCreated, response.Code)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "", respJson.Error)
	})

	t.Run(`create food fail`, func(t *testing.T) {
		food := entity.Food{
			Fat: "20",
			Carbohydrate: "20", 
		}
		courseJSON, _ := json.Marshal(food)
		request, _ := http.NewRequest("POST", "/foods", bytes.NewBuffer(courseJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusBadRequest, response.Code)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "Protein is required;Vitamin is required;Mineral is required;Forage is required;Date is required;Employee is required", respJson.Error)
	})
}