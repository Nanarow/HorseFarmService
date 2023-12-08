package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

// this is tour registration controller

// unused

// func GetAllTours(c *gin.Context) {
// 	// create variable for store data as type of TourRegistration array
// 	var tours []entity.TourRegistration

// 	// get data form database and check error
// 	if err := entity.DB().Preload(clause.Associations).Find(&tours).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": tours})
// }

func GetAllToursOfUser(c *gin.Context) {
	// create variable for store data as type of TourRegistration array
	var tours []entity.TourRegistration

	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).Where("user_id = ?", id).Find(&tours).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": tours})
}

func GetTour(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var tour entity.TourRegistration
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).First(&tour, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": tour})
}

func CreateTour(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var tour entity.TourRegistration

	// get data from body and check error
	if err := c.ShouldBindJSON(&tour); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&tour).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "tour registration successfully"})
}

func UpdateTour(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var tour entity.TourRegistration
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&tour); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// convert id to uint and check error
	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	tour.ID = uint(idUint)

	// update data in database and check error
	if err := entity.DB().Save(&tour).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your tour registration successfully"})
}

func DeleteTour(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var tour entity.TourRegistration

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&tour, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your tour registration successfully"})
}
