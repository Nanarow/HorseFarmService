package entity

import (
	"github.com/sut66/team16/backend/utils"
	"gorm.io/gorm"
)

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
	admin := User{
		BaseModel: BaseModel{ID: 1},
		Email:     utils.GetConfig().ADMIN_EMAIL,
		Password:  utils.GetConfig().ADMIN_PASS,
		RoleID:    100,
	}
	db.Create(&admin)

	// position
	positions := []Position{
		{
			BaseModel: BaseModel{ID: 201},
			Name:      "Horse Veterinary",
			Salary: 45000,
		},
		{
			BaseModel: BaseModel{ID: 202},
			Name:      "Horse Groomer",
			Salary: 20000,
		},
		{
			BaseModel: BaseModel{ID: 203},
			Name:      "Horse Info Manager",
			Salary: 32000,
		},
		{
			BaseModel: BaseModel{ID: 204},
			Name:      "Food Quality Inspector",
			Salary: 30000,
		},
		{
			BaseModel: BaseModel{ID: 205},
			Name:      "Stable Quality Inspector",
			Salary: 25000,
		},
	}
	db.Create(&positions)

	// employee
	employees := []Employee{
		{
			BaseModel:  BaseModel{ID: 1},
			FirstName:  "Veterinary",
			LastName:   "Veterinary",
			Email:      "veter@veter.com",
			Password:   "veter",
			PositionID: 201,
			PrecedeID: 2,
			GenderID: 2,
			Phone: "0988888888",
		},
		{
			BaseModel:  BaseModel{ID: 2},
			FirstName:  "Groomer",
			LastName:   "Groomer",
			Email:      "groom@groom.com",
			Password:   "groom",
			PositionID: 202,
			PrecedeID: 1,
			GenderID: 1,
			Phone: "0999999999",
		},
		{
			BaseModel:  BaseModel{ID: 3},
			FirstName:  "Info",
			LastName:   "Info",
			Email:      "info@info.com",
			Password:   "info",
			PositionID: 203,
			PrecedeID: 3,
			GenderID: 2,
			Phone: "0955555555",
		},
		{
			BaseModel:  BaseModel{ID: 4},
			FirstName:  "FoodQ",
			LastName:   "FoodQ",
			Email:      "food@food.com",
			Password:   "food",
			PositionID: 204,
			PrecedeID: 2,
			GenderID: 2,
			Phone: "0900000000",
		},
		{
			BaseModel:  BaseModel{ID: 5},
			FirstName:  "StableQ",
			LastName:   "StableQ",
			Email:      "stable@stable.com",
			Password:   "stable",
			PositionID: 205,
			PrecedeID: 1,
			GenderID: 1,
			Phone: "0922222222",
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

	stable := []Stable{
		{
			BaseModel:   BaseModel{ID: 1},
			EmployeeID:  1, 
		},
		{
			BaseModel:   BaseModel{ID: 2},
			EmployeeID:  2, 
		},
		{
			BaseModel:   BaseModel{ID: 3},
			EmployeeID:  3, 
		},
		{
			BaseModel:   BaseModel{ID: 4},
			EmployeeID:  4, 
		},
	
	}
	db.Create(&stable)

}
