package controllers

import (
	"net/http"
	"strconv"

	"github.com/asaskevich/govalidator"
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
// 	if err := entity.DB().Joins("Plan").Joins("TourType").Find(&tours).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

//		// response data
//		c.JSON(http.StatusOK, gin.H{"data": tours})
//	}
//

// GET /tours/user/:id
func GetAllToursOfUser(c *gin.Context) {
	// create variable for store data as type of TourRegistration array
	var tours []entity.TourRegistration

	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Plan").Joins("TourType").Where("user_id = ?", id).Omit("UserID", "PlanID", "TourTypeID").Find(&tours).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": tours})
}

// unused
// GET /tours/:id
// func GetTour(c *gin.Context) {
// 	// create variable for store data as type of TourRegistration
// 	var tour entity.TourRegistration
// 	// get id from url
// 	id := c.Param("id")

// 	// get data form database and check error
// 	if err := entity.DB().Preload(clause.Associations).First(&tour, id).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": tour})
// }

// POST /tours
func CreateTour(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var tour entity.TourRegistration

	// get data from body and check error
	if err := c.ShouldBindJSON(&tour); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(tour); err != nil {
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

// PUT /tours/:id
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

	// validate struct
	if _, err := govalidator.ValidateStruct(tour); err != nil {
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

// DELETE /tours/:id
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

// GET tours/types
func GetAllTourTypes(c *gin.Context) {
	// create variable for store data as type of TourType array
	var tourTypes []entity.TourType

	// get data form database and check error
	if err := entity.DB().Find(&tourTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": tourTypes})
}

// GET /tours/plans
func GetAllPlans(c *gin.Context) {
	// create variable for store data as type of Plan array
	var plans []entity.Plan

	// get data form database and check error
	if err := entity.DB().Find(&plans).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": plans})
}
