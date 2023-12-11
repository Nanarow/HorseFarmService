package middlewares

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/utils"
)

// role base access control for middleware

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT ,PATCH ,DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func Authorization() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, payload, err := utils.ValidateJWT("token", c)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		var user entity.User
		err = entity.DB().Where("email = ?", payload["email"].(string)).First(&user).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		access := Roles[""]
		if !VerifyAccessRights(access, c) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Access Denied"})
			return
		}
		c.Next()
	}
}

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, _, err1 := utils.ValidateJWT("token", c)
		_, _, err2 := utils.ValidateJWT("a_token", c)
		_, _, err3 := utils.ValidateJWT("e_token", c)
		if err1 != nil && err2 != nil && err3 != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		c.Next()
	}
}

func VerifyAccessRights(access AccessControl, c *gin.Context) bool {
	if access.Deny {
		if access.AllMethod || contains(access.Methods, c.Request.Method) {
			return false
		}

		if access.AllPath || contains(access.Paths, c.FullPath()) {
			return false
		}
	} else {
		if !access.AllMethod && !contains(access.Methods, c.Request.Method) {
			return false
		}

		if !access.AllPath && !contains(access.Paths, c.FullPath()) {
			return false
		}
	}
	return true
}

func contains(slice []string, str string) bool {
	return slices.Contains[[]string](slice, str)
}
