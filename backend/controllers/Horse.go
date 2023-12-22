package controllers

import (
	"net/http"
	"strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

// GET /horses
func GetAllHorse(c *gin.Context) {
	// create variable for store data as type of Horse array
	var horses []entity.Horse

	// get data form database and check error
	if err := entity.DB().Joins("Stable").Joins("Bleed").Joins("Sex").Joins("Employee").Omit("EmployeeID", "StableID", "BleedID", "SexID").Find(&horses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//response data
	c.JSON(http.StatusOK, gin.H{"data": horses})
}

// unused
// GET /horses/:id
// func GetHorse(c *gin.Context) {
// 	// create variable for store data as type of Horse
// 	var horse entity.Horse

// 	//get id from url
// 	id := c.Param("eid")

// 	// get data form database and check error
// 	if err := entity.DB().preload(clause.Associations).First(&horse, id).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	//response data
// 	c.JSON(http.StatusOK, gin.H{"data": horse})
// }

// POST /horses
func CreateHorse(c *gin.Context) {
	// create variable for store data as type of horse
	var horse entity.Horse

	// get data from body and check error
	if err := c.ShouldBindJSON(&horse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(horse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&horse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "horse successfully"})
}

func UpdateHorse(c *gin.Context) {
	// create variable for store data as type of horse
	var horse entity.Horse
	//get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&horse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	// if _, err := govalidator.ValidateStruct(horse); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// create data in database and check error
	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	horse.ID = uint(idUint)

	// update data in database and check error
	if err := entity.DB().Save(&horse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your horse successfully"})

}

// DELETE /horses/:id
func DeleteHorse(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var horse entity.Horse

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&horse, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your horse successfully"})

}

// GET /horses/bleeds
func GetAllBleeds(c *gin.Context) {
	// create variable for store data as type of TourType array
	var bleeds []entity.Bleed

	// get data form database and check error
	if err := entity.DB().Find(&bleeds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": bleeds})
}

// GET /horses/sexs
func GetAllSexes(c *gin.Context) {
	// create variable for store data as type of Plan array
	var sexes []entity.Sex

	// get data form database and check error
	if err := entity.DB().Find(&sexes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": sexes})
}
