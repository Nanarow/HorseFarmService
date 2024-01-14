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

func TestCreateSupport(t *testing.T) {
	router := GetTestRouter()
	router.POST("/supports", controllers.CreateSupport)

	t.Run(`created support success`, func(t *testing.T) {
		support := entity.Support{
			Date:        time.Now(),
			Corporate:   "popo",
			Description: "my sup",
		}
		userJSON, _ := json.Marshal(support)
		request, _ := http.NewRequest("POST", "/supports", bytes.NewBuffer(userJSON))
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

	t.Run(`create support fail`, func(t *testing.T) {
		support := entity.Support{
			Date: time.Now(),
		}
		userJSON, _ := json.Marshal(support)
		request, _ := http.NewRequest("POST", "/supports", bytes.NewBuffer(userJSON))
		request.Header.Set("Content-Type", "application/json")

		response := httptest.NewRecorder()
		router.ServeHTTP(response, request)
		body := response.Result().Body
		data, _ := io.ReadAll(body)

		assert.Equal(t, http.StatusBadRequest, response.Code)

		var respJson Response
		json.Unmarshal(data, &respJson)
		assert.Equal(t, "Corporate is required;Description is required", respJson.Error)

	})
}
