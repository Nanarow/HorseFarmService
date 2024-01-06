package controllers

// prepare for enrollments

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
)

// this is enrollment controller

func GetAllEnrollmentsOfUser(c *gin.Context) {
	// create variable for store data as type of TourRegistration array
	var enrollments []entity.Enrollment

	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Schedule").Where("user_id = ?", id).Omit("schedule_id").Find(&enrollments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// response data
	c.JSON(http.StatusOK, gin.H{"data": enrollments})
}

func CreateEnrollment(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var enrollment entity.Enrollment

	// get data from body
	if err := c.ShouldBindJSON(&enrollment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(enrollment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&enrollment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusCreated, gin.H{"data": "enrollment successfully"})
}
