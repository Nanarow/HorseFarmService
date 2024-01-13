package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestHealthValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`health success`, func(t *testing.T) {
		health := entity.Health{ //ครบ
			Date: time.Now().Add(time.Duration(1) * time.Hour),
			HorseID: "1",
			EmployeeID: "1", 
			Vital: "Pass",      
			Tooth: "Pass",
			Vaccine: "Pass",
			Parasite: "Pass",       
			Blood: "Pass",   
		}

		ok, err := govalidator.ValidateStruct(health)

		g.Expect(ok).To(gomega.BeTrue())
		g.Expect(err).To(gomega.BeNil())
	})

	t.Run(`health unsuccess`, func(t *testing.T) {
		health := entity.Health{ //ไม่ครบ
			Date: time.Now().Add(time.Duration(1) * time.Hour),
			HorseID: "1",
			EmployeeID: "1", 
			Vital: "Pass",      
			Tooth: "Pass",
			Vaccine: "Pass",
			Parasite: "Pass",       
			Blood: "", //ผิดตรงนี้
		}

		ok, err := govalidator.ValidateStruct(health)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Blood is required"))
	})
}