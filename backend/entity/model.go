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
	Name         string     `gorm:"default:Course"`
	Duration     int        `valid:"required~Duration is required"`
	Participants int        `valid:"required~Participants is required,gte=15~Participants must be at least 15"`
	Description  string     `valid:"required~Description is required"`
	Experience   float64    `valid:"required~Experience is required"`
	EmployeeID   uint       `json:",omitempty" valid:"required~Employee is required,refer=employees~Employee does not exist"`
	Employee     Employee   `gorm:"foreignKey:EmployeeID"`
	LocationID   uint       `json:",omitempty" valid:"required~Location is required,refer=locations~Location does not exist"`
	Location     Location   `gorm:"foreignKey:LocationID"`
	Schedules    []Schedule `json:",omitempty"`
	Horses       []*Horse   `gorm:"many2many:horse_courses;"`
}

type Schedule struct {
	BaseModel
	Date        time.Time
	StartTime   time.Time
	Description string
	CourseID    uint
	Course      Course `gorm:"foreignKey:CourseID"`
}

type Location struct {
	BaseModel
	Name        string
	Description string
	Course      []Course `json:"-"`
}
type Horse struct {
	BaseModel
	Name       string	 `gorm:"default:Horse" `
	Age        int		 `valid:"required~Age is required,gte=0~Age must be at least 0 "`
	Date       time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Image      string    `gorm:"default:Horse" `

	EmployeeID uint      `json:",omitempty"`
	Employee   Employee  `gorm:"foreignKey:EmployeeID" valid:"-"`

	BleedID    uint      `json:",omitempty"`
	Bleed      Bleed     `gorm:"foreignKey:BleedID" valid:"-"`

	SexID      uint      `json:",omitempty"`
	Sex        Sex       `gorm:"foreignKey:SexID" valid:"-"`

	StableID   uint      `json:",omitempty"`
	Stable     Stable    `gorm:"foreignKey:StableID" valid:"-"`

	Courses    []*Course `gorm:"many2many:horse_courses;" json:"-"`
	Healths    []Health  `json:",omitempty"`
}

type Stable struct {
	BaseModel
	Maintenance time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Cleaning    time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Temperature int 
	Humidity    int
	Description string  `valid:"required~Description is required,minstringlength(4)~Description must be at least 4"`
	Horses      []Horse `json:"-"`
}

type Bleed struct {
	BaseModel
	Name        string	`gorm:"default:Bleed" `
	Description string  `json:",omitempty"`
	Horses      []Horse `json:"-"`
}

type Sex struct {
	BaseModel
	Name   string  `gorm:"default:Sex" `
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

	PlanID uint `json:",omitempty" valid:"required~Plan is required,refer=plans~Plan does not exist"`
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
	Phone      string    `valid:"required~Phone is required,stringlength(10|10)~Phone must be at 10 characters"`

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
