package tests

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
)

type Response struct {
	Data  interface{} `json:"data"`
	Error string      `json:"error"`
}

var router *gin.Engine

func GetTestRouter() *gin.Engine {
	return router
}
func init() {
	os.Remove("TestDB.db")
	entity.SetupTestDatabase()
	entity.SetupData(entity.DB())
	gin.SetMode(gin.TestMode)
	router = gin.New()
}
