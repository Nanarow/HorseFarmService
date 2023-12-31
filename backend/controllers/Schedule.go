package controllers

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

func GetAllSchedules(c *gin.Context) {
	var schedules []entity.Schedule

	if err := entity.DB().Preload(clause.Associations).Find(&schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": schedules})
}

func GetSchedule(c *gin.Context) {
	var schedule entity.Schedule
	id := c.Param("id")

	if err := entity.DB().Preload(clause.Associations).First(&schedule, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": schedule})
}

func CreateSchedule(c *gin.Context) {
	var schedule entity.Schedule

	if err := c.ShouldBindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "create schedule successfully"})
}

func DeleteSchedule(c *gin.Context) {
	// create variable for store data as type of Schedule
	var schedule entity.Schedule

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	if rows := entity.DB().Unscoped().Delete(&schedule, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "delete schedule successfully"})
}
