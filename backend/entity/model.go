package entity

import "time"

type LoginPayload struct {
	Email    string
	Password string
}

type User struct {
	BaseModel
	FirstName string
	LastName  string
	Email     string
	Password  string
	Phone     string
	Profile   string
	Age       int

	RoleID uint
	Role   Role `gorm:"foreignKey:RoleID"`

	GenderID uint
	Gender   Gender `gorm:"foreignKey:GenderID"`

	RidingLevelID uint
	RidingLevel   RidingLevel `gorm:"foreignKey:RidingLevelID"`

	Supports          []Support
	TourRegistrations []TourRegistration
	Enrollments       []Enrollment
}

// user.gender.name
type Role struct {
	BaseModel
	Name  string
	Users []User
}

type RidingLevel struct {
	BaseModel
	Name        string
	Description string
	Users       []User
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
	EmployeeID   uint
	ScheduleID   uint
	Horses       []*Horse `gorm:"many2many:horse_courses;"`
}

type Schedule struct {
	BaseModel
	Date        time.Time
	StartTime   time.Time
	Description string
	LocationID  uint
	Courses     []Course
}

type Location struct {
	BaseModel
	Name        string
	Description string
	Schedules   []Schedule
}
type Horse struct {
	BaseModel
	Name       string
	Age        string
	Date       time.Time
	Image      string
	EmployeeID uint
	BleedID    uint
	SexID      uint
	StableID   uint
	Courses    []*Course `gorm:"many2many:horse_courses;"`
	Healths    []Health
}

type Stable struct {
	BaseModel
	Maintenance time.Time
	Cleaning    time.Time
	Temperature int
	Humidity    int
	Description string
	Horses      []Horse
}

type Bleed struct {
	BaseModel
	Name        string
	Description string
	Horses      []Horse
}

type Sex struct {
	BaseModel
	Name   string
	Horses []Horse
}

type TourType struct {
	BaseModel
	Name              string
	MinParticipant    int
	MaxParticipant    int
	Description       string
	TourRegistrations []TourRegistration
}

type TourRegistration struct {
	BaseModel
	UserID       uint
	TourTypeID   uint
	TourType     TourType `gorm:"foreignKey:TourTypeID"`
	Schedule     uint
	Participants int
	Name         string
	Date         time.Time
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
	AddressID  uint
	FirstName  string
	LastName   string
	Email      string
	Password   string
	DayOfBirth time.Time
	Phone      string
	Healths    []Health
	Horses     []Horse
	Courses    []Course
	Foods      []Food
}

type Position struct {
	BaseModel
	Name        string
	Salary      int
	Description string
	Employees   []Employee
}

type Gender struct {
	BaseModel
	Name      string
	Employees []Employee
	Users     []User
}
type Address struct {
	BaseModel
	Local     string
	Locality  string
	District  string
	Province  string
	ZipCode   string
	Employees []Employee
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
	Remark     string
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
}
