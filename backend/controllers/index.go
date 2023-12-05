package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/utils"
	"gorm.io/gorm/clause"
)

func HandlerCreate[T entity.Models](c *gin.Context, handler func(*gin.Context, T)) {
	var model T
	err := c.ShouldBindJSON(&model)
	if isError(err, c) {
		return
	}
	handler(c, model)
}

func HandlerUpdate[T entity.Models](c *gin.Context, handler func(*gin.Context, T, uint)) {
	var model T
	id := c.Param("id")
	id_int, err := strconv.Atoi(id)
	if isError(err, c) {
		return
	}
	err = c.ShouldBindJSON(&model)
	if isError(err, c) {
		return
	}
	model.SetID(uint(id_int))
	handler(c, model, uint(id_int))
}

func Get[T entity.Models](c *gin.Context) {
	var model T
	db := entity.DB()
	for k, v := range c.Request.URL.Query() {
		if len(v) < 1 {
			db = db.Where(k+" = ?", v)
		} else {
			db = db.Where(k+" = ?", v[0])
		}
	}
	id := c.Param("id")
	err := db.Preload(clause.Associations).First(&model, id).Error
	if isError(err, c) {
		return
	}
	responseOK(model, c)
}

func GetAll[T entity.Models](c *gin.Context) {
	var models []T
	db := entity.DB()
	for k, v := range c.Request.URL.Query() {
		if len(v) < 1 {
			db = db.Where(k+" = ?", v)
		} else {
			db = db.Where(k+" = ?", v[0])
		}
	}
	err := db.Preload(clause.Associations).Find(&models).Error
	if isError(err, c) {
		return
	}
	responseOK(models, c)
}

func Create[T entity.Models](c *gin.Context) {
	var model T
	err := c.ShouldBindJSON(&model)
	if isError(err, c) {
		return
	}
	err = entity.DB().Create(&model).Error
	if isError(err, c) {
		return
	}
	responseOK(model, c)
}

func Update[T entity.Models](c *gin.Context) {
	var model T
	id := c.Param("id")
	err := entity.DB().First(&model, id).Error
	if isError(err, c) {
		return
	}
	err = c.ShouldBindJSON(&model)
	if isError(err, c) {
		return
	}
	id_int, err := strconv.Atoi(id)
	if isError(err, c) {
		return
	}
	model.SetID(uint(id_int))
	err = entity.DB().Save(&model).Error
	if isError(err, c) {
		return
	}
	responseOK(model, c)
}

func Delete[T entity.Models](c *gin.Context) {
	var model T
	id := c.Param("id")
	err := entity.DB().Clauses(clause.Returning{}).Delete(&model, id).Error
	if isError(err, c) {
		return
	}
	responseOK(model, c)
}

func Login(c *gin.Context) {
	var payload entity.LoginPayload
	var user entity.User
	err := c.ShouldBindJSON(&payload)
	if isError(err, c) {
		return
	}
	err = entity.DB().Where("email = ?", payload.Email).First(&user).Error
	if isError(err, c) {
		return
	}
	err = utils.VerifyPassword(payload.Password, user.Password)
	if isError(err, c, "password not match") {
		return
	}
	err = utils.GenerateJWT(c, user.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(user, c)
}

func AutoLogin(c *gin.Context) {
	var user entity.User
	_, payload, err := utils.ValidateJWT(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	err = entity.DB().Where("email = ?", payload["email"].(string)).First(&user).Error
	if isError(err, c) {
		return
	}
	responseOK(user, c)
}

func AutoLoginEmployee(c *gin.Context) {
	var employee entity.Employee
	_, payload, err := utils.ValidateJWT(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	err = entity.DB().Where("email = ?", payload["email"].(string)).First(&employee).Error
	if isError(err, c) {
		return
	}
	responseOK(employee, c)
}
func LoginEmployee(c *gin.Context) {
	var payload entity.LoginPayload
	var employee entity.Employee
	err := c.ShouldBindJSON(&payload)
	if isError(err, c) {
		return
	}
	err = entity.DB().Where("email = ?", payload.Email).First(&employee).Error
	if isError(err, c) {
		return
	}
	err = utils.VerifyPassword(payload.Password, employee.Password)
	if isError(err, c, "password not match") {
		return
	}
	err = utils.GenerateJWT(c, employee.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(employee, c)
}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	responseOK("you have been logged out", c)
}
