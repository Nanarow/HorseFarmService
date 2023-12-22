package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

func GetAllCourses(c *gin.Context) {
	var courses []entity.Course

	if err := entity.DB().Preload(clause.Associations).Find(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")

	if err := entity.DB().Preload(clause.Associations).First(&course, id).Error; err != nil {
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
	
	if err := entity.DB().Create(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "course successfully"})
}

func UpdateCourse(c *gin.Context) {
	var course entity.Course
	id := c.Param("id")

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	course.ID = uint(idUint)

	if err := entity.DB().Save(&course).Error; err != nil {
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
	var locations []entity.Course

	if err := entity.DB().Preload(clause.Associations).Find(&locations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": locations})
}