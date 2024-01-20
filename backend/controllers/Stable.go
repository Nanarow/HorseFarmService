package controllers

import (
	"net/http"
	"strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
)

// GET/stables
func GetAllStable(c *gin.Context) {
	// create variable for store data as type of Horse array
	var stables []entity.Stable

	// get data form database and check error
	if err := entity.DB().Joins("Employee").Find(&stables).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(stables)})
}

// POST/horses
func CreateStable(c *gin.Context) {
	// create variable for store data as type of horse
	var stable entity.Stable

	// get data from body and check error
	if err := c.ShouldBindJSON(&stable); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(stable); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&stable).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "stable successfully"})
}

// PUT/stables/:id
func UpdateStable(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var stable entity.Stable
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&stable); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(stable); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//convert id to uint and check error
	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	stable.ID = uint(idUint)

	// update data in database and check error
	if err := entity.DB().Save(&stable).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your stable successfully"})
}
