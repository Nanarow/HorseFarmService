package controllers

// prepare for enrollments

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/sut66/team16/backend/entity"
// 	"gorm.io/gorm/clause"
// )

// // this is enrollment controller

// func GetAllEnrollmentsOfUser(c *gin.Context) {
// 	// create variable for store data as type of TourRegistration array
// 	var enrollments []entity.Enrollment

// 	// get id from url
// 	id := c.Param("id")

// 	// get data form database and check error
// 	if err := entity.DB().Preload(clause.Associations).Where("user_id = ?", id).Find(&enrollments).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": enrollments})
// }

// func CreateEnrollment(c *gin.Context) {
// 	// create variable for store data as type of TourRegistration
// 	var enrollment entity.Enrollment

// 	// get data from body
// 	if err := c.ShouldBindJSON(&enrollment); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// create data in database and check error
// 	if err := entity.DB().Create(&enrollment).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": "enrollment successfully"})
// }
