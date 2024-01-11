package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestEmployeeValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test invalid email`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName:  "employee",
			LastName:   "emp",
			Email:      "emp-emp.com", //ผิดตรงนี้
			Password:   "12345678",
			DayOfBirth: time.Now().Add(-time.Duration(1) * time.Hour),
			Phone:      "0924506272",
			PrecedeID:  1,
			PositionID: 201,
			GenderID:   1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Invalid email"))

	})
	t.Run(`test future date`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName:  "employee",
			LastName:   "emp",
			Email:      "emp@emp.com",
			Password:   "12345678",
			DayOfBirth: time.Now().Add(time.Duration(1) * time.Hour), //ผิดตรงนี้
			Phone:      "0924506272",
			PrecedeID:  1,
			PositionID: 201,
			GenderID:   1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("DayOfBirth must be in the past"))
	})

	t.Run(`test position not exist`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName:  "employee",
			LastName:   "emp",
			Email:      "emp@emp.com",
			Password:   "12345678",
			DayOfBirth: time.Now().Add(-time.Duration(1) * time.Hour),
			Phone:      "0924506272",
			PrecedeID:  1,
			PositionID: 209, //ผิดตรงนี้
			GenderID:   1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Position does not exist"))

	})
}
