package main

import (
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/routers"
	"github.com/sut66/team16/backend/utils"
)

func main() {
	entity.SetupDatabase("HorseFarmDB")
	entity.SetupData(entity.DB())
	route := routers.SetupRouter()

	// init Routes
	routers.InitRouter(route)

	// Run the server
	route.Run(":" + utils.GetConfig().PORT)
}
