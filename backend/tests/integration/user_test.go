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

func TestCreateUser(t *testing.T) {
	router := GetTestRouter()
	router.POST("/users", controllers.CreateUser)

	t.Run(`created user success`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			DateOfBirth:     time.Now().AddDate(-1, 0, 0),
			Phone:           "0924506272",
			Email:           "user@mail.com",
			Password:        "12345678",
			ExperiencePoint: 50,
			RidingLevelID:   1,
			GenderID:        1,
		}
		userJSON, _ := json.Marshal(user)
		request, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(userJSON))
		request.Header.Set("Content-Type", "application/json")

		// Act
		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		// Assert
		assert.Equal(t, http.StatusCreated, response.Code)
		// add additional assertions to check if the user registration is created successfully
		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "", respJson.Error)
	})

	t.Run(`create user fail`, func(t *testing.T) {
		user := entity.User{
			Email:     "u1@u.com",
			FirstName: "my user",
		}
		userJSON, _ := json.Marshal(user)
		request, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(userJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusBadRequest, response.Code)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "DateOfBirth is required;Experience point is required;Password is required;Phone number is required", respJson.Error)

	})
}
