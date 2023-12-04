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
		&Precede{},
		&Health{},
		&Plan{},
	)
	db = database
	SetupData(db)

}

func SetupData(db *gorm.DB) {
	roles := []Role{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "admin",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "user",
		},
	}
	for _, role := range roles {
		db.Create(&role)
	}
	// // users
	users := []User{
		{
			BaseModel: BaseModel{ID: 1},
			Email:     "admin@admin.com",
			Password:  "admin",
			RoleID:    1,
		}, {
			BaseModel: BaseModel{ID: 2},
			Email:     "user@user.com",
			Password:  "user",
			RoleID:    2,
		},
		{
			BaseModel: BaseModel{ID: 3},
			Email:     "user2@user.com",
			Password:  "user",
			RoleID:    2,
		},
		{
			BaseModel: BaseModel{ID: 4},
			Email:     "user3@user.com",
			Password:  "user",
			RoleID:    2,
		},
	}
	for _, user := range users {
		db.Create(&user)
	}
	// roles

	// position
	positions := []Position{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "pos1",
			Salary:    10000,
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "pos2",
			Salary:    5000,
		},
	}
	for _, position := range positions {
		db.Create(&position)
	}

	// employee
	employees := []Employee{
		{
			BaseModel:  BaseModel{ID: 1},
			Email:      "emp1@emp.com",
			Password:   "emp",
			PositionID: 1,
		},
		{
			BaseModel:  BaseModel{ID: 1},
			Email:      "emp2@emp.com",
			Password:   "emp",
			PositionID: 2,
		},
	}
	for _, employee := range employees {
		db.Create(&employee)
	}

}
