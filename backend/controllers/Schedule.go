package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

func GetAllSchedules(c *gin.Context) {
	var schedules []entity.Course

	if err := entity.DB().Preload(clause.Associations).Find(&schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": schedules})
}

func GetSchedule(c *gin.Context) {
	var schedule entity.Course
	id := c.Param("id")

	if err := entity.DB().Preload(clause.Associations).First(&schedule, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": schedule})
}

func CreateSchedule(c *gin.Context) {
	var schedule entity.Schedule

	if err := entity.DB().Create(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "schedule successfully"})
}

func GetAllLocations(c *gin.Context) {
	var locations []entity.Course

	if err := entity.DB().Preload(clause.Associations).Find(&locations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": locations})
}