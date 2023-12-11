package entity

import "time"

type LoginPayload struct {
	Email    string
	Password string
}

type User struct {
	BaseModel
	FirstName      string
	LastName       string
	Email          string
	Password       string
	Phone          string
	Profile        string
	Age            int
	ExperincePoint int

	RoleID uint
	Role   Role `gorm:"foreignKey:RoleID"`

	GenderID uint
	Gender   Gender `gorm:"foreignKey:GenderID"`

	RidingLevelID uint
	RidingLevel   RidingLevel `gorm:"foreignKey:RidingLevelID"`

	Supports          []Support          `json:"-"`
	TourRegistrations []TourRegistration `gorm:"foreignKey:UserID"`
	Enrollments       []Enrollment       `json:"-"`
}

type Role struct {
	BaseModel
	Name  string
	Users []User `json:"-"`
}

type RidingLevel struct {
	BaseModel
	Name        string
	Description string
	Users       []User `json:"-"`
}

type Support struct {
	BaseModel
	UserID      uint
	Corporate   string
	Description string
	Date        time.Time
	Image       string
}

type Course struct {
	BaseModel
	Name         string		
	Duration     int
	Participants int
	Description  string
	Experience   float32
	EmployeeID   uint
	Employee	 Employee	`gorm:"foreignKey:EmployeeID"`
	Schedules    []Schedule `json:"-"`
	Horses       []*Horse   `gorm:"many2many:horse_courses;"`
}

type Schedule struct {
	BaseModel
	Date        time.Time
	StartTime   time.Time
	Description string
	LocationID  uint
	Location	Location	`gorm:"foreignKey:LocationID"`
	CourseID    uint
	Course		Course		`gorm:"foreignKey:CourseID"`
}

type Location struct {
	BaseModel
	Name        string
	Description string
	Schedules   []Schedule `json:"-"`
}
type Horse struct {
	BaseModel
	Name       string
	Age        int
	Date       time.Time
	Image      string
	EmployeeID uint
	BleedID    uint
	SexID      uint
	StableID   uint
	Courses    []*Course `gorm:"many2many:horse_courses;" json:"-"`
	Healths    []Health  `json:"-"`
}

type Stable struct {
	BaseModel
	Maintenance time.Time
	Cleaning    time.Time
	Temperature int
	Humidity    int
	Description string
	Horses      []Horse `json:"-"`
}

type Bleed struct {
	BaseModel
	Name        string
	Description string
	Horses      []Horse `json:"-"`
}

type Sex struct {
	BaseModel
	Name   string
	Horses []Horse `json:"-"`
}

type TourType struct {
	BaseModel
	Name              string
	MinParticipant    int
	MaxParticipant    int
	Description       string
	TourRegistrations []TourRegistration `json:"-"`
}

type TourRegistration struct {
	BaseModel
	UserID uint

	TourTypeID uint
	TourType   TourType `gorm:"foreignKey:TourTypeID"`

	PlanID uint
	Plan   Plan `gorm:"foreignKey:PlanID"`

	Email        string
	Participants int `json:"omitempty"`
	Date         time.Time
	Name         string
}

type Plan struct {
	BaseModel
	Name              string
	Description       string
	TourRegistrations []TourRegistration `json:"-"`
}

type Enrollment struct {
	BaseModel
	UserID   uint
	CourseID uint
	Date     time.Time
	Remark   string
}

type Employee struct {
	BaseModel
	PositionID uint
	GenderID   uint
	PrecedeID  uint
	FirstName  string
	LastName   string
	Email      string
	Password   string
	DayOfBirth time.Time
	Phone      string
	Healths    []Health `json:"-"`
	Horses     []Horse  `json:"-"`
	Courses    []Course `json:"-"`
	Foods      []Food   `json:"-"`
}

type Position struct {
	BaseModel
	Name        string
	Salary      int
	Description string
	Employees   []Employee `json:"-"`
}

type Gender struct {
	BaseModel
	Name      string
	Employees []Employee `json:"-"`
	Users     []User     `json:"-"`
}
type Precede struct {
	BaseModel
	Name      string
	Employees []Employee `json:"-"`
}

type Health struct {
	BaseModel
	HorseID    uint
	EmployeeID uint
	Vital      string
	Tooth      string
	Vaccine    string
	Parasite   string
	Blood      string
	Date       time.Time
}

type Food struct {
	BaseModel
	Fat          string
	Carbohydrate string
	Protein      string
	Vitamin      string
	Mineral      string
	Forage       string
	Date         time.Time
	EmployeeID   uint
	Employee	 Employee	`gorm:"foreignKey:EmployeeID"`
}
