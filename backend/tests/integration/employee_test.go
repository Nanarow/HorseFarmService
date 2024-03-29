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

func TestCreateEmployee(t *testing.T) {
	router := GetTestRouter()
	router.POST("/employees", controllers.CreateEmployee)

	t.Run(`Create Employee Successfully`, func(t *testing.T) {

		employee := entity.Employee{
			FirstName:  "employee",
			LastName:   "emp",
			Email:      "emp@emp.com",
			Password:   "12345678",
			DayOfBirth: time.Now().AddDate(-1, 0, 0),
			Phone:      "0924506272",
			PrecedeID:  1,
			PositionID: 201,
			GenderID:   1,
		}
		employeeJSON, _ := json.Marshal(employee)
		request, _ := http.NewRequest("POST", "/employees", bytes.NewBuffer(employeeJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
		// add additional assertions to check if the employee is created successfully
	})
	t.Run(`create employee fail`, func(t *testing.T) {

		employee := entity.Employee{
			FirstName: "employee",
			Email:     "emp@emp.com",
		}
		employeeJSON, _ := json.Marshal(employee)
		request, _ := http.NewRequest("POST", "/employees", bytes.NewBuffer(employeeJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, http.StatusBadRequest, response.Code)
		assert.Equal(t, "DayOfBirth is required;Password is required;Phone is required;Position is required", respJson.Error)
	})
}
