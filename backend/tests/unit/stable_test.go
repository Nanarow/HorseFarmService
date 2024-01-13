package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"

	"github.com/sut66/team16/backend/entity"
)

func TestStableValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`stable success`, func(t *testing.T) {
		stable := entity.Stable{
			Maintenance:       	time.Now().AddDate(-1, 0, 0),
			Cleaning:           time.Now().AddDate(-1, 0, 0),
			Temperature:        26,
			Humidity:           36,
			Description:      	"", 
			EmployeeID: 		1,
		}

		ok, err := govalidator.ValidateStruct(stable)

		g.Expect(ok).To(gomega.BeTrue())
		g.Expect(err).To(gomega.BeNil())

	})

	t.Run(`test fail`, func(t *testing.T) {
		stable := entity.Stable{
			Maintenance:       	time.Now().AddDate(0, 0, -1),
			Cleaning:           time.Now().AddDate(0, 0, 1), //ผิด
			Temperature:        26,
			Humidity:       	36,
			Description:      	"", 
			EmployeeID: 		1,
		}

		ok, err := govalidator.ValidateStruct(stable)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Date must be in the past"))
	})

	
}