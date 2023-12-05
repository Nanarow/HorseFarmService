package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func responseOK(data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func isError(err error, c *gin.Context, message ...string) bool {
	if err != nil {
		msg := err.Error()
		if len(message) > 0 {
			msg = strings.Join(message, "")
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": msg})
		return true
	}
	return false
}

func addQuery(c *gin.Context, db *gorm.DB) *gorm.DB {
	for k, v := range c.Request.URL.Query() {
		if len(v) > 1 {
			db = db.Where(k+" IN ?", v)
		} else {
			db = db.Where(k+" = ?", v[0])
		}
	}
	return db
}
