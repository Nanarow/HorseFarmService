package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestFoodValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	emp := entity.Employee{
		BaseModel: entity.BaseModel{ID: 1},
	}
	entity.DB().FirstOrCreate(&emp)
	t.Run(`food success`, func(t *testing.T) {
		food := entity.Food{ //ครบ
			Fat:          "20",
			Carbohydrate: "20",
			Protein:      "20",
			Vitamin:      "20",
			Mineral:      "20",
			Forage:       "20",
			Date:         time.Now().Add(time.Duration(1) * time.Hour),
			EmployeeID:   1,
		}

		ok, err := govalidator.ValidateStruct(food)

		g.Expect(ok).To(gomega.BeTrue())
		g.Expect(err).To(gomega.BeNil())
	})

	t.Run(`food unsuccess`, func(t *testing.T) {
		food := entity.Food{ //ไม่ครบ
			Fat:          "20",
			Carbohydrate: "20",
			Protein:      "20",
			Vitamin:      "20",
			Mineral:      "20",
			Forage:       "",
			Date:         time.Now().Add(time.Duration(1) * time.Hour),
			EmployeeID:   1,
		}

		ok, err := govalidator.ValidateStruct(food)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Forage is required"))
	})
}
