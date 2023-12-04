package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("TestDB.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Role{},
		&RidingLevel{},
		&Support{},
		&Course{},
		&Schedule{},
		&Location{},
		&Horse{},
		&Stable{},
		&Bleed{},
		&Sex{},
		&Gender{},
		&Position{},
		&TourType{},
		&TourRegistration{},
		&Enrollment{},
		&Food{},
		&Employee{},
		&Address{},
		&Health{},
		&Plan{},
	)
	db = database
	// users := []User{
	// 	{
	// 		FirstName: "admin",
	// 		LastName:  "admin",
	// 		Email:     "admin",
	// 		Password:  "admin",
	// 		Phone:     "admin",
	// 		RoleID:    1,
	// 		GenderID:  1,
	// 	}, {
	// 		FirstName: "user",
	// 		LastName:  "user",
	// 		Email:     "user",
	// 		Password:  "user",
	// 		Phone:     "user",
	// 		RoleID:    2,
	// 		GenderID:  1,
	// 	},
	// }
	// for _, user := range users {
	// 	db.Create(user)
	// }
}
