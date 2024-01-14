package controllers

import (
	"net/http"
	"time"

	// "strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

// this is User update controller
type UserForUpdate struct {
	// RoleID          uint `gorm:"default:101"`
	GenderID        uint ` valid:"required~Gender is required,refer=genders~Gender does not exist"`
	RidingLevelID   uint ` valid:"required~RidingLevel is required,refer=riding_levels~RidingLevel does not exist"`
	FirstName       string
	LastName        string
	DateOfBirth     time.Time `valid:"required~DateOfBirth is required,past~DateOfBirth must be in the past"`
	Email           string    `valid:"required~Email is required,email~Invalid email"`
	Phone           string    `valid:"required~Phone is required,stringlength(10|10)~Phone must be at 10 characters"`
	Profile         string    `gorm:"type:longtext"`
	ExperiencePoint int
}

// GET /user
func GetAllUser(c *gin.Context) {
	// create variable for store data as type of User array
	var users []entity.User

	// get data form database and check error
	if err := entity.DB().Where("role_id = ?", 101).Joins("Gender").Joins("RidingLevel").Omit("Password").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(users)})
}

// GET /users/:id
func GetUser(c *gin.Context) {
	// create variable for store data as type of
	var user entity.User
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).First(&user, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// POST /users
func CreateUser(c *gin.Context) {
	// create variable for store data as type of User
	var user entity.User

	// get data from body and check error
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "create account successfully"})
}

// PUT /users/:id
func UpdateUser(c *gin.Context) {
	// create variable for store data as type of User
	var user UserForUpdate
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// convert id to uint and check error
	// idUint, err := strconv.Atoi(id)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// user.ID = uint(idUint)

	// update data in database and check error
	if err := entity.DB().Table("users").Where("id = ?", id).Updates(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your user successfully"})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	// create variable for store data as type of User
	var user entity.User

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&user, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your tour registration successfully"})
}

// Get Gender
func GetAllGenders(c *gin.Context) {
	// create variable for store data as type of TourType array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(genders)})
}

func GetAllRidingLevels(c *gin.Context) {
	// create variable for store data as type of Riding Level array
	var ridingLevels []entity.RidingLevel

	// get data form database and check error
	if err := entity.DB().Find(&ridingLevels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(ridingLevels)})
}

// // GET tours/types
// func GetAllTourTypes(c *gin.Context) {
// 	// create variable for store data as type of TourType array
// 	var tourTypes []entity.TourType

// 	// get data form database and check error
// 	if err := entity.DB().Find(&tourTypes).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": tourTypes})
// }

// // GET /tours/plans
// func GetAllPlans(c *gin.Context) {
// 	// create variable for store data as type of Plan array
// 	var plans []entity.Plan

// 	// get data form database and check error
// 	if err := entity.DB().Find(&plans).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": plans})
// }
