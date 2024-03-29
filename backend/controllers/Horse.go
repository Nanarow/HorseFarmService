package controllers

import (
	"net/http"
	"time"

	//"strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

type HorseUpdate struct {
	Name       string `gorm:"default:Horse" valid:"required~Name is required"`
	Date       time.Time
	Image      string `gorm:"type:longtext"`
	Age        int    `valid:"required~Age is required,gte=0~Age must be at least 0"`
	EmployeeID uint   `valid:"required~Employee is required,refer=employees~Employee does not exist"`
	BleedID    uint   `valid:"required~Bleed is required,refer=bleeds~Bleed does not exist"`
	SexID      uint   `valid:"required~Sex is required,refer=sexes~Sex does not exist"`
	StableID   uint   `valid:"required~Stable is required,refer=stables~Stable does not exist"`
}

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
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(horses)})
}

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
	var horse HorseUpdate
	//get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&horse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(horse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("horses").Where("id = ?", id).Updates(horse).Error; err != nil {
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
	c.JSON(http.StatusOK, gin.H{"data": "delete your horse successfully"})

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
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(bleeds)})
}

// GET /horses/sexes
func GetAllSexes(c *gin.Context) {
	// create variable for store data as type of Plan array
	var sexes []entity.Sex

	// get data form database and check error
	if err := entity.DB().Find(&sexes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(sexes)})
}
