package tests

import (
	"os"

	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func init() {
	os.Remove("TestDB.db")
	entity.SetupTestDatabase()
	entity.SetupData(entity.DB())
	controllers.RegisValidators()
}
