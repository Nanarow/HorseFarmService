package entity

import "gorm.io/gorm"

func SetupData(db *gorm.DB) {
	var temp []Role
	db.Find(&temp, 100)
	if len(temp) > 0 {
		return
	}
	// roles
	roles := []*Role{
		{
			BaseModel: BaseModel{ID: 100},
			Name:      "admin",
		},
		{
			BaseModel: BaseModel{ID: 101},
			Name:      "user",
		},
	}
	// for _, role := range roles {
	// 	db.Create(&role)
	// }
	db.Create(roles)
	// users
	users := []User{
		{
			BaseModel: BaseModel{ID: 1},
			Email:     "adm@adm.com",
			Password:  "admin",
			RoleID:    100,
		}, {
			BaseModel: BaseModel{ID: 2},
			Email:     "u1@u.com",
			Password:  "user",
			RoleID:    101,
		},
		{
			BaseModel: BaseModel{ID: 3},
			Email:     "u2@u.com",
			Password:  "user",
			RoleID:    101,
		},
		{
			BaseModel: BaseModel{ID: 4},
			Email:     "u3@u.com",
			Password:  "user",
			RoleID:    101,
		},
	}
	for _, user := range users {
		db.Create(&user)
	}

	// position
	positions := []Position{
		{
			BaseModel: BaseModel{ID: 201},
			Name:      "Horse Veterinary",
		},
		{
			BaseModel: BaseModel{ID: 202},
			Name:      "Horse Groomer",
		},
		{
			BaseModel: BaseModel{ID: 203},
			Name:      "Horse Info Manager",
		},
		{
			BaseModel: BaseModel{ID: 204},
			Name:      "Food Quality Inspector",
		},
		{
			BaseModel: BaseModel{ID: 205},
			Name:      "Stable Quality Inspector",
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
			PositionID: 201,
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Email:      "emp2@emp.com",
			Password:   "emp",
			PositionID: 202,
		},
	}
	for _, employee := range employees {
		db.Create(&employee)
	}

	// tour type data
	tourTypes := []TourType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Family tour",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Study tour",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Group tour",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "Private tour",
		},
		{
			BaseModel: BaseModel{ID: 5},
			Name:      "Official tour",
		},
		{
			BaseModel: BaseModel{ID: 6},
			Name:      "Other",
		},
	}
	for _, tourType := range tourTypes {
		db.Create(&tourType)
	}

	// plan data
	plans := []Plan{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Plan A",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Plan B",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Plan C",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "Plan D",
		},
	}
	for _, plan := range plans {
		db.Create(&plan)
	}

	// sex data
	sexs := []Sex{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Mare(เพศเมีย)",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Stallion(เพศผู้)",
		},
	}
	for _, sex := range sexs {
		db.Create(&sex)
	}

	// bleed data
	bleeds := []Bleed{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Arabian Horse",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "American Quarter Horse",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Morgan Horse",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "Paint Horse",
		},
		{
			BaseModel: BaseModel{ID: 5},
			Name:      "Thoroughbred Horse",
		},
		{
			BaseModel: BaseModel{ID: 6},
			Name:      "Thai Horse",
		},
		{
			BaseModel: BaseModel{ID: 7},
			Name:      "Other",
		},
	}
	for _, bleed := range bleeds {
		db.Create(&bleed)
	}

	// precedes data
	precedes := []Precede{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "นาย",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "นางสาว",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "เด็กหญิง",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "เด็กชาย",
		},
	}
	for _, precede := range precedes {
		db.Create(&precede)
	}

	// gender data
	genders := []Gender{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Male",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Female",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Others",
		},
	}
		
	for _, gender := range genders {
		db.Create(&gender)
	}

}
