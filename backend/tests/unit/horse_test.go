package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"

	"github.com/sut66/team16/backend/entity"
)

func TestHorseValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test Date must be in the future`, func(t *testing.T) {
		horse := entity.Horse{
			Name:       "gigi",
			Age:        2,
			Date:       time.Now().AddDate(-1, 0, 0), //ผิด
			Image:      "", 
			EmployeeID: 1,
			BleedID:    5,
			SexID:      2,
			StableID:   1,
		}

		ok, err := govalidator.ValidateStruct(horse)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Date must be in the future"))
	})

	t.Run(`test Bleed does not exist`, func(t *testing.T) {
		horse := entity.Horse{
			Name:       "gigi",
			Age:        2,
			Date:       time.Now().AddDate(0, 0, 1), 
			Image:      "", 
			EmployeeID: 1,
			BleedID:    10, //ผิด
			SexID:      2,
			StableID:   1,
		}

		ok, err := govalidator.ValidateStruct(horse)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Bleed does not exist"))
	})

	t.Run(`test Age must be at least 0`, func(t *testing.T) {
		horse := entity.Horse{
			Name:       "gigi",
			Age:        -5, //ผิด
			Date:       time.Now().AddDate(0, 0, 1), 
			Image:      "", 
			EmployeeID: 1,
			BleedID:    5, 
			SexID:      2,
			StableID:   1,
		}

		ok, err := govalidator.ValidateStruct(horse)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Age must be at least 0"))
	})
}