package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/utils"
)

var role_data = map[string]struct {
	ID        uint
	Value     any
	Table     string
	TokenName string
	Hour      int
}{
	"user": {
		ID:        101,
		Value:     &entity.User{},
		Table:     "users",
		TokenName: "utk",
		Hour:      24 * 7,
	},
	"admin": {
		ID:        100,
		Value:     &entity.User{},
		Table:     "users",
		TokenName: "atk",
		Hour:      24,
	},
	"employee": {
		ID:        200,
		Value:     &entity.Employee{},
		Table:     "employees",
		TokenName: "etk",
		Hour:      24,
	},
}

type LoginPayload struct {
	Email    string `binding:"required,email"`
	Password string `binding:"required"`
}

func Logout(c *gin.Context) {
	role := c.Param("role")
	if role != "user" && role != "admin" && role != "employee" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	data := role_data[role]
	c.SetCookie(data.TokenName, "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"data": "you have been logged out"})
}

func Login(c *gin.Context) {
	role := c.Param("role")
	if role != "user" && role != "admin" && role != "employee" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	data := role_data[role]
	// ตัวแปรสำหรับเก็บข้อมูลจาก database
	var temp struct {
		Password string
	}
	var payload LoginPayload
	skip := false
	if err := c.ShouldBindJSON(&payload); err != nil {
		_, jwt_payload, jwt_err := utils.ValidateJWT(data.TokenName, c)
		if jwt_err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unauthorized"})
			return
		}
		skip = true
		payload.Email = jwt_payload["email"].(string)
	}

	query := entity.DB().Table(data.Table).Where("email = ?", payload.Email)
	if role == "user" || role == "admin" {
		query = query.Where("role_id = ?", data.ID)
	}

	if !skip {
		// เลือกเฉพาะ email และ password จากตารางมาตรวจสอบ
		if err := query.Select("password").First(&temp).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// ตรวจสอบว่า password ตรงกันหรือไม่
		if err := utils.VerifyPassword(payload.Password, temp.Password); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "password not match"})
			return
		}
	}

	if err := query.First(data.Value).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !skip {
		if err := utils.GenerateJWT(data.TokenName, c, payload.Email, data.Hour); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "token could not be created"})
			return
		}
	}

	if err := utils.SetActiveJWT(c, data.TokenName, data.Hour); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "token could not be created"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": data.Value})
}
