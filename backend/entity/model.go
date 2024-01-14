package entity

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID uint `gorm:"primarykey"`

	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type User struct {
	BaseModel
	FirstName       string    `gorm:"default:UserFirstName"`
	LastName        string    `gorm:"default:UserLastName"`
	Email           string    `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Password        string    `valid:"required~Password is required,minstringlength(8)~Password must be at least 8 characters"`
	Phone           string    `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	DateOfBirth     time.Time `valid:"required~DateOfBirth is required,past~DateOfBirth must be in the past"`
	ExperiencePoint int       `valid:"required~Experience point is required,range(0|150)~Experience point must me in range 0-150"`
	Profile         string    `gorm:"type:longtext"`

	RoleID uint `gorm:"default:101"`
	Role   *Role

	GenderID uint
	Gender   *Gender

	RidingLevelID uint
	RidingLevel   *RidingLevel

	Supports          []Support
	TourRegistrations []TourRegistration
	Enrollments       []Enrollment
}

type Role struct {
	BaseModel
	Name string `gorm:"unique"`

	Users []User
}

type RidingLevel struct {
	BaseModel
	Name        string `gorm:"unique"`
	Description string

	Users []User
}

type Support struct {
	BaseModel
	Corporate   string    `valid:"required~Corporate is required"`
	Description string    `valid:"required~Description is required"`
	Date        time.Time `valid:"required~Date is required,before_tomorrow~Date must before tomorrow"`
	Image       string    `gorm:"type:longtext"`

	UserID uint
	User   *User
}

type Course struct {
	BaseModel
	Name         string  `gorm:"unique"`
	Duration     int     `valid:"required~Duration is required"`
	Participants int     `valid:"required~Participants is required,lte=12~Participants not more than 12"`
	Experience   float64 `valid:"required~Experience is required"`
	Description  string

	EmployeeID uint `valid:"required~Employee is required,refer=employees~Employee does not exist"`
	Employee   *Employee

	LocationID uint `valid:"required~Location is required,refer=locations~Location does not exist"`
	Location   *Location

	Schedules []Schedule
	Horses    []*Horse `gorm:"many2many:horse_courses;" `
}

type Schedule struct {
	BaseModel
	Date        time.Time
	StartTime   time.Time
	Description string

	CourseID uint
	Course   *Course

	Enrollments []Enrollment
}

type Location struct {
	BaseModel
	Name        string `gorm:"unique"`
	Description string

	Course []Course
}
type Horse struct {
	BaseModel
	Name  string    `gorm:"default:Horse"`
	Age   int       `valid:"required~Age is required,gte=0~Age must be at least 0"`
	Date  time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Image string    `gorm:"type:longtext"`

	EmployeeID uint
	Employee   *Employee

	BleedID uint ` valid:"required~Bleed is required,refer=bleeds~Bleed does not exist"`
	Bleed   *Bleed

	SexID uint
	Sex   *Sex

	StableID uint
	Stable   *Stable

	Courses []*Course `gorm:"many2many:horse_courses;" json:"-"`
	Healths []Health
}

type Stable struct {
	BaseModel
	Maintenance time.Time `valid:"required~Maintenance is required,past~Maintenance must be in the past"`
	Cleaning    time.Time `valid:"required~Cleaning is required,past~Cleaning must be in the past"`
	Temperature float64   `valid:"required~Temperature is required"`
	Humidity    float64   `valid:"required~Humidity is required"`
	Description string

	EmployeeID uint
	Employee   *Employee

	Horses []Horse
}

type Bleed struct {
	BaseModel
	Name        string `gorm:"unique"`
	Description string

	Horses []Horse
}

type Sex struct {
	BaseModel
	Name string `gorm:"unique"`

	Horses []Horse
}

type TourType struct {
	BaseModel
	Name        string `gorm:"unique"`
	Description string

	TourRegistrations []TourRegistration
}

type TourRegistration struct {
	BaseModel
	UserID uint

	TourTypeID uint
	TourType   *TourType

	PlanID uint `valid:"required~Plan is required,refer=plans~Plan does not exist"`
	Plan   *Plan

	Email        string    `valid:"required~Email is required,email~Invalid email" gorm:"unique"`
	Participants int       `valid:"required~Participants is required,gte=8~Participants must be at least 8 "`
	Date         time.Time `valid:"required~Date is required,future~Date must be in the future"`
	Name         string    `gorm:"default:Tour" `
}

type Plan struct {
	BaseModel
	Name              string
	Description       string
	TourRegistrations []TourRegistration
}

type Enrollment struct {
	BaseModel
	UserID     uint
	ScheduleID uint `valid:"required~ScheduleID is required,refer=schedules~Schedule does not exist"`
	Schedule   *Schedule
}

type Employee struct {
	BaseModel
	FirstName  string    `gorm:"default:Employee" `
	LastName   string    `gorm:"default:Employee" `
	Email      string    `valid:"required~Email is required,email~Invalid email" gorm:"unique"`
	Password   string    `valid:"required~Password is required,minstringlength(4)~Password must be at 4 characters"`
	DayOfBirth time.Time `valid:"required~DayOfBirth is required,past~DayOfBirth must be in the past"`
	Phone      string    `valid:"required~Phone is required,stringlength(10|10)~Phone must be at 10 characters"`

	PositionID uint ` valid:"required~Position is required,refer=positions~Position does not exist"`
	Position   *Position

	GenderID uint
	Gender   *Gender

	PrecedeID uint
	Precede   *Precede

	Healths []Health
	Horses  []Horse
	Courses []Course
	Foods   []Food
}

type Position struct {
	BaseModel
	Name        string `gorm:"unique"`
	Salary      int
	Description string

	Employees []Employee
}

type Gender struct {
	BaseModel
	Name string `gorm:"unique"`

	Employees []Employee
	Users     []User
}
type Precede struct {
	BaseModel
	Name      string `gorm:"unique"`
	Employees []Employee
}

type Health struct {
	BaseModel
	Vital    string    `valid:"required~Vital is required,minstringlength(4)~Vital must be at least 4"`
	Tooth    string    `valid:"required~Tooth is required,minstringlength(4)~Tooth must be at least 4"`
	Vaccine  string    `valid:"required~Vaccine is required,minstringlength(4)~Vaccine must be at least 4"`
	Parasite string    `valid:"required~Parasite is required,minstringlength(4)~Parasite must be at least 4"`
	Blood    string    `valid:"required~Blood is required,minstringlength(4)~Blood must be at least 4"`
	Date     time.Time `valid:"required~Date is required,future~Date must be in the future"`

	HorseID uint
	Horse   *Horse

	EmployeeID uint
	Employee   *Employee
}

type Food struct {
	BaseModel
	Fat          string    `valid:"required~Fat is required"`
	Carbohydrate string    `valid:"required~Carbohydrate is required"`
	Protein      string    `valid:"required~Protein is required"`
	Vitamin      string    `valid:"required~Vitamin is required"`
	Mineral      string    `valid:"required~Mineral is required"`
	Forage       string    `valid:"required~Forage is required"`
	Date         time.Time `valid:"required~Date is required,before_tomorrow~Date must be until today"`

	EmployeeID uint ` valid:"required~Employee is required,refer=employees~Employee does not exist"`
	Employee   *Employee
}
