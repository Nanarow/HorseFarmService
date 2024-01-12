package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func TestHorseValidation(t *testing.T) {
	entity.SetupDatabase("TestDB")
	entity.SetupData(entity.DB())
	controllers.RegisValidators()
	g := gomega.NewGomegaWithT(t)

	t.Run(`test past date`, func(t *testing.T) {
		horse := entity.Horse{
			Name:    "gigi",
			Age:     2,
			Date:        time.Now().Add(-time.Duration(1) * time.Hour), //ผิดตรงนี้
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
	
}
