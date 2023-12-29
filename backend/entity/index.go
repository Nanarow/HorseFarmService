package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase(dbName string) {
	database, err := gorm.Open(sqlite.Open(dbName+".db"), &gorm.Config{})
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
		&Precede{},
		&Health{},
		&Plan{},
	)
	db = database
}
