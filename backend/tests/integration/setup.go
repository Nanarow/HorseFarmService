package tests

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/routers"
)

type Response struct {
	Data  interface{} `json:"data"`
	Error string      `json:"error"`
}

func GetTestRouter() *gin.Engine {
	os.Remove("TestDB.db")
	entity.SetupDatabase("TestDB")
	entity.SetupData(entity.DB())
	return routers.SetUpRouter()
}
