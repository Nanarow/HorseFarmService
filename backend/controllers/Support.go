package controllers

import (
	"net/http"
	// "strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

func GetAllSupport(c *gin.Context) {
	// create variable for store data as type of supports array
	var supports []entity.Support

	// get data form database and check error
	if err := entity.DB().Find(&supports).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(supports)})
}

func GetSupport(c *gin.Context) {
	// create variable for store data as type of
	var support entity.Support
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).First(&support, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": support})
}

func CreateSupport(c *gin.Context) {
	// create variable for store data as type of Support
	var supports entity.Support

	// get data from body and check error
	if err := c.ShouldBindJSON(&supports); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(supports); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&supports).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "Give support successfully"})
}
