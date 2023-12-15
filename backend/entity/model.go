package entity

import (
	"time"
)

type LoginPayload struct {
	Email    string `binding:"required,email"`
	Password string `binding:"required"`
}

type User struct {
	BaseModel
	FirstName       string
	LastName        string
	Email           string
	Password        string
	Phone           string
	Profile         string
	Age             int
	ExperiencePoint int

	RoleID uint `gorm:"default:101"`
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
	Employee     Employee   `gorm:"foreignKey:EmployeeID"`
	Schedules    []Schedule `json:"-"`
	Horses       []*Horse   `gorm:"many2many:horse_courses;"`
}

type Schedule struct {
	BaseModel
	Date        time.Time
	StartTime   time.Time
	Description string
	LocationID  uint
	Location    Location `gorm:"foreignKey:LocationID"`
	CourseID    uint
	Course      Course `gorm:"foreignKey:CourseID"`
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
	Employee   Employee `gorm:"foreignKey:EmployeeID" valid:"-"`
	BleedID    uint
	Bleed      Bleed `gorm:"foreignKey:BleedID" valid:"-"`
	SexID      uint
	Sex        Sex `gorm:"foreignKey:SexID" valid:"-"`
	StableID   uint
	Stable     Stable    `gorm:"foreignKey:StableID" valid:"-"`
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
	Description       string             `json:",omitempty"`
	TourRegistrations []TourRegistration `json:",omitempty"`
}

type TourRegistration struct {
	BaseModel
	UserID uint `json:",omitempty"`

	TourTypeID uint     `json:",omitempty"`
	TourType   TourType `gorm:"foreignKey:TourTypeID"`

	PlanID uint `json:",omitempty"`
	Plan   Plan `gorm:"foreignKey:PlanID"`

	Email        string    `valid:"required~Email is required,email~Invalid email"`
	Participants int       `valid:"required~Participants is required,gte=8~Participants must be at least 8 "`
	Date         time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Name         string    `gorm:"default:Tour" `
}

type Plan struct {
	BaseModel
	Name              string
	Description       string             `json:",omitempty"`
	TourRegistrations []TourRegistration `json:",omitempty"`
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
	PositionID uint     `json:",omitempty"`
	Position   Position `gorm:"foreignKey:PositionID"`

	GenderID uint   `json:",omitempty"`
	Gender   Gender `gorm:"foreignKey:GenderID"`

	PrecedeID uint    `json:",omitempty"`
	Precede   Precede `gorm:"foreignKey:PrecedeID"`

	FirstName  string    `gorm:"default:Employee" `
	LastName   string    `gorm:"default:Employee" `
	Email      string    `valid:"required~Email is required,email~Invalid email"`
	Password   string    `valid:"required~Password is required,minstringlength(4)~Password must be at 4 characters"`
	DayOfBirth time.Time `valid:"required~DayOfBirth is required,past~DayOfBirth must be in the past"`
	Phone      string    `valid:"required~Phone is required,minstringlength(10)~Phone must be at 10 characters"`

	Healths []Health `json:",omitempty"`
	Horses  []Horse  `json:",omitempty"`
	Courses []Course `json:",omitempty"`
	Foods   []Food   `json:",omitempty"`
}

type Position struct {
	BaseModel
	Name        string
	Salary      int
	Description string
	Employees   []Employee `json:",omitempty"`
}

type Gender struct {
	BaseModel
	Name      string
	Employees []Employee `json:",omitempty"`
	Users     []User     `json:",omitempty"`
}
type Precede struct {
	BaseModel
	Name      string
	Employees []Employee `json:",omitempty"`
}

type Health struct {
	BaseModel
	HorseID uint  `json:",omitempty"`
	Horse   Horse `gorm:"foreignKey:HorseID" valid:"-"`

	EmployeeID uint     `json:",omitempty"`
	Employee   Employee `gorm:"foreignKey:EmployeeID" valid:"-"`

	Vital    string    `valid:"required~Vital is required,minstringlength(4)~Vital must be at least 4"`
	Tooth    string    `valid:"required~Tooth is required,minstringlength(4)~Tooth must be at least 4"`
	Vaccine  string    `valid:"required~Vaccine is required,minstringlength(4)~Vaccine must be at least 4"`
	Parasite string    `valid:"required~Parasite is required,minstringlength(4)~Parasite must be at least 4"`
	Blood    string    `valid:"required~Blood is required,minstringlength(4)~Blood must be at least 4"`
	Date     time.Time `valid:"required~Date is required,future~Date must be in the future"`
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
	Employee     Employee `gorm:"foreignKey:EmployeeID"`
}
