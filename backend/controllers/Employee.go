package controllers

import (
	"net/http"
	"strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

//this is Employee controller



func GetAllEmployee(c *gin.Context) {
	// create variable for store data as type of Employee array
	var employees []entity.Employee

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": employees})
}



func GetEmployee(c *gin.Context) {
	// create variable for store data as type of Employee
	var employee entity.Employee
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Preload(clause.Associations).First(&employee, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

func CreateEmployee(c *gin.Context) {
	// create variable for store data as type of Employee
	var employee entity.Employee

	// get data from body and check error
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data
	c.JSON(http.StatusCreated, gin.H{"data": "Create Employee  Successfully"})
}

func UpdateEmployee(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var employee entity.Employee
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// convert id to uint and check error
	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	employee.ID = uint(idUint)

	// update data in database and check error
	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "Updated your Employee successfully"})
}

func DeleteEmployee(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var employee entity.Employee

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&employee, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "Delete Employee Successfully"})
}

// GET /employee/position
func GetAllPosition(c *gin.Context) {
	// create variable for store data as type of Position array
	var positions []entity.Position

	// get data form database and check error
	if err := entity.DB().Find(&positions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": positions})
}

// GET /employee/gender
func GetAllGender(c *gin.Context) {
	// create variable for store data as type of Gender array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

// GET /employee/precede
func GetAllPrecede(c *gin.Context) {
	// create variable for store data as type of Precede array
	var precedes []entity.Precede

	// get data form database and check error
	if err := entity.DB().Find(&precedes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": precedes})
}

// commit from 131b04201fd0b2d21363d877a0ebc0f06192ba27