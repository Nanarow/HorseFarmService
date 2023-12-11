package utils

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("secret8985")

func ValidateJWT(token_name string, c *gin.Context) (*jwt.Token, jwt.MapClaims, error) {
	tokenCookie, err := c.Cookie(token_name)
	if err != nil {
		return nil, nil, fmt.Errorf("please login first")
	}

	token, err := jwt.Parse(tokenCookie, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, nil, fmt.Errorf("invalid token")
	}

	if float64(time.Now().Unix()) > claims["exp"].(float64) {
		return nil, nil, fmt.Errorf("token expired")
	}

	return token, claims, nil
}

func GenerateJWT(token_name string, c *gin.Context, email string, hour int) error {
	expiration := time.Now().Add(time.Hour * time.Duration(hour) * 30).Unix()
	claims := jwt.MapClaims{
		"email": email,
		"exp":   expiration,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return err
	}
	c.SetCookie(token_name, tokenString, 3600*hour*30, "", "", true, true)
	return nil
}
