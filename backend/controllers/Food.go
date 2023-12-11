package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"gorm.io/gorm/clause"
)

func CreateFood(c *gin.Context) {
	var food entity.Food

	if err := entity.DB().Create(&food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "food successfully"})
}

func UpdateFood(c *gin.Context) {
	var food entity.Food
	id := c.Param("id")

	if err := c.ShouldBindJSON(&food); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	idUint, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	food.ID = uint(idUint)

	if err := entity.DB().Save(&food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your food successfully"})
}

func DeleteFood(c *gin.Context) {
	var food entity.Food

	id := c.Param("id")

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&food, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "cancel your food successfully"})
}