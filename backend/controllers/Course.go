package controllers

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

type CourseForUpdate struct {
	Name         string  
	Duration     int     `valid:"required~Duration is required"`
	Participants int     `valid:"required~Participants is required,lte=12~Participants not more than 12"`
	Experience   float64 `valid:"required~Experience is required"`
	Description  string
	EmployeeID uint `valid:"required~Employee is required,refer=employees~Employee does not exist"`
	LocationID uint `valid:"required~Location is required,refer=locations~Location does not exist"`
}

func GetAllCourses(c *gin.Context) {
	var courses []entity.Course

	if err := entity.DB().Joins("Employee").Joins("Location").Omit("ScheduleID", "HorseID").Find(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(courses)})
}

func GetCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")

	if err := entity.DB().Joins("Employee").Joins("Location").Omit("ScheduleID", "HorseID").First(&course, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func CreateCourse(c *gin.Context) {
	var course entity.Course

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "course successfully"})
}

func UpdateCourse(c *gin.Context) {
	var course CourseForUpdate
	id := c.Param("id")

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Table("courses").Where("id = ?", id).Updates(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your course successfully"})
}

func DeleteCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&course, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "delete course successfully"})
}

func GetAllLocations(c *gin.Context) {
	var locations []entity.Location

	if err := entity.DB().Find(&locations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": locations})
}
