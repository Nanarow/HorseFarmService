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
		{
			BaseModel:   BaseModel{ID: 5},
			EmployeeID:  5, 
		},
		{
			BaseModel:   BaseModel{ID: 6},
			EmployeeID:  6, 
		},
		{
			BaseModel:   BaseModel{ID: 7},
			EmployeeID:  7, 
		},
		{
			BaseModel:   BaseModel{ID: 8},
			EmployeeID:  8, 
		},
	}
	db.Create(&stable)

}
