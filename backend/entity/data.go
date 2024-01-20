package entity

import "gorm.io/gorm"

func SetupData(db *gorm.DB) {
	var role []Role
	db.Find(&role, 100)
	if len(role) > 0 {
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
	db.Create(&users)

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
	db.Create(&positions)

	// employee
	employees := []Employee{
		{
			BaseModel:  BaseModel{ID: 1},
			Email:      "emp1@emp.com",
			Password:   "emp",
			PositionID: 201,
			PrecedeID: 2,
			GenderID: 2,
			Phone: "0988888888",
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Email:      "emp2@emp.com",
			Password:   "emp",
			PositionID: 202,
			PrecedeID: 1,
			GenderID: 1,
			Phone: "0999999999",
		},
	}
	db.Create(&employees)

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
	db.Create(&tourTypes)

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
	db.Create(&plans)

	// sex data
	sexes := []Sex{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Mare(เพศเมีย)",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Stallion(เพศผู้)",
		},
	}
	db.Create(&sexes)

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
	db.Create(&bleeds)

	// precedes data
	precedes := []Precede{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Mr.",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Mrs.",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Ms.",
		},
		
	}
	db.Create(&precedes)

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

	db.Create(&genders)

	// location data
	locations := []Location{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "สนาม 1",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "สนาม 2",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "สนาม 3",
		},
	}
	db.Create(&locations)

	ridingLevels := []RidingLevel{
		{
			BaseModel:   BaseModel{ID: 1},
			Name:        "Newbie",
			Description: "Horse riding beginner",
		},
		{
			BaseModel:   BaseModel{ID: 2},
			Name:        "Common",
			Description: "Normal horse riding skill.",
		},
		{
			BaseModel:   BaseModel{ID: 3},
			Name:        "Professional",
			Description: "Expert horse riding skill.",
		},
	}

	db.Create(&ridingLevels)

}
