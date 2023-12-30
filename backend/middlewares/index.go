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
		c.Writer.Header().Set("Access-Control-Allow-Origin", utils.GetConfig().ORIGIN)
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

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		if _, payload, err := utils.ValidateJWT("token", c); err == nil {
			token_name, _ := payload["active_token"].(string)
			if _, data, err := utils.ValidateJWT(token_name, c); err == nil {
				c.Set("email", data["email"].(string))
				c.Set("active_token", token_name)
				c.Set("authenticated", true)
				c.Next()
				return
			}
		}
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
	}
}

// Authorization / Role based access control
func Authorization(role_ids ...uint) gin.HandlerFunc {
	return func(c *gin.Context) {
		if !c.GetBool("authenticated") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		if len(role_ids) == 0 {
			c.Next()
			return
		}

		role := map[string]uint{
			"atk": 100,
			"utk": 101,
		}
		active_token := c.GetString("active_token")
		email := c.GetString("email")

		if active_token != "etk" {
			if slices.Contains(role_ids, role[active_token]) {
				c.Next()
				return
			}
		} else {
			var emp struct {
				PositionID uint
			}
			if err := entity.DB().Where("email = ?", email).First(&emp).Error; err == nil {
				if slices.Contains(role_ids, emp.PositionID) {
					c.Next()
					return
				}
			}
		}
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Access Denied"})
	}
}
