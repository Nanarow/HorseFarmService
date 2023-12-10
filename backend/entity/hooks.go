package entity

import (
	"strconv"

	"github.com/sut66/team16/backend/utils"
	"gorm.io/gorm"
)

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	// hash password
	hashPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashPassword
	return
}

func (u *Employee) BeforeCreate(tx *gorm.DB) (err error) {
	// hash password
	hashPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashPassword
	return
}

func (t *TourRegistration) AfterCreate(tx *gorm.DB) (err error) {
	// set default tour name
	t.Name = "Tour " + strconv.Itoa(int(t.ID))
	return
}
