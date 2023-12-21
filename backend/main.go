package main

import (
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/routers"
)

const PORT = "8985"

func main() {
	entity.SetupDatabase()
	route := routers.SetUpRouter()

	// init Routes
	routers.InitRouter(route)

	// Run the server
	route.Run("localhost:" + PORT)
}
