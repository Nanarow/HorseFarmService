package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/utils"
)

func LoginUser(c *gin.Context) {
	var payload entity.LoginPayload
	var user entity.User

	if !bindJSONOrJWT(c, &payload, &user, "token") {
		return

	}

	err := entity.DB().Where("email = ?", payload.Email).First(&user).Error
	if isError(err, c) {
		return
	}

	if user.RoleID == 100 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	err = utils.VerifyPassword(payload.Password, user.Password)
	if isError(err, c, "password not match") {
		return
	}

	err = utils.GenerateJWT("token", c, user.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(user, c)
}
func LoginAdmin(c *gin.Context) {
	var payload entity.LoginPayload
	var user entity.User

	if !bindJSONOrJWT(c, &payload, &user, "a_token") {
		return
	}

	err := entity.DB().Where("email = ?", payload.Email).First(&user).Error
	if isError(err, c) {
		return
	}

	if user.RoleID == 101 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	err = utils.VerifyPassword(payload.Password, user.Password)
	if isError(err, c, "password not match") {
		return
	}
	// for test set to 24 hour
	err = utils.GenerateJWT("a_token", c, user.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(user, c)
}
func LoginEmployee(c *gin.Context) {
	var payload entity.LoginPayload
	var employee entity.Employee

	if !bindJSONOrJWT(c, &payload, &employee, "e_token") {
		return
	}

	err := entity.DB().Where("email = ?", payload.Email).First(&employee).Error
	if isError(err, c) {
		return
	}
	err = utils.VerifyPassword(payload.Password, employee.Password)
	if isError(err, c, "password not match") {
		return
	}
	// for test set to 24 hour
	err = utils.GenerateJWT("e_token", c, employee.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(employee, c)
}

func Logout(c *gin.Context) {
	role := c.Param("role")
	if role == "user" {
		c.SetCookie("token", "", -1, "/", "localhost", false, true)
		responseOK("you have been logged out", c)
		return
	}

	if role == "admin" {
		c.SetCookie("a_token", "", -1, "/", "localhost", false, true)
		responseOK("you have been logged out", c)
		return
	}

	if role == "employee" {
		c.SetCookie("e_token", "", -1, "/", "localhost", false, true)
		responseOK("you have been logged out", c)
		return
	}
}

func bindJSONOrJWT(c *gin.Context, payload any, model any, token_name string) bool {
	if err := c.ShouldBindJSON(payload); err != nil {
		_, payload, err := utils.ValidateJWT(token_name, c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unauthorized"})
			return false
		}
		err = entity.DB().Where("email = ?", payload["email"].(string)).First(model).Error
		if isError(err, c) {
			return false
		}
		responseOK(model, c)
		return false
	}
	return true
}
