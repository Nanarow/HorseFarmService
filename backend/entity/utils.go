package entity

import (
	"time"

	"gorm.io/gorm"
)

// Models interface should list the common fields
type Models interface {
	GetID() uint
	SetID(uint)
}

// BaseModel provides a basic implementation of the Models interface
type BaseModel struct {
	ID        uint           `gorm:"primarykey"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// type BaseModel struct {
// 	gorm.Model
// }

// GetID returns the ID of the model
func (b *BaseModel) GetID() uint {
	return b.ID
}

// SetID sets the ID of the model
func (b *BaseModel) SetID(id uint) {
	b.ID = id
}
