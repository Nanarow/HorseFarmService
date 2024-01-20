package tests

import (
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestCourseSettingValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	emp := entity.Employee{
		BaseModel: entity.BaseModel{ID: 1},
	}
	entity.DB().FirstOrCreate(&emp)
	t.Run(`test participants`, func(t *testing.T) {
		course := entity.Course{
			Name:         "Level 1",
			Duration:     1,
			Participants: 15, //ผิด
			Description:  "",
			Experience:   1,
			EmployeeID:   1,
			LocationID:   1,
		}

		ok, err := govalidator.ValidateStruct(course)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Participants not more than 12"))
	})

	t.Run(`test employee not exist`, func(t *testing.T) {
		course := entity.Course{
			Name:         "Level 1",
			Duration:     1,
			Participants: 10,
			Description:  "",
			Experience:   1,
			EmployeeID:   10, //ผิด
			LocationID:   1,
		}

		ok, err := govalidator.ValidateStruct(course)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Employee does not exist"))
	})

	t.Run(`test location not exist`, func(t *testing.T) {
		course := entity.Course{
			Name:         "Level 1",
			Duration:     1,
			Participants: 10,
			Description:  "",
			Experience:   1,
			EmployeeID:   1,
			LocationID:   10, //ผิด
		}

		ok, err := govalidator.ValidateStruct(course)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Location does not exist"))
	})

	t.Run(`course success`, func(t *testing.T) {
		course := entity.Course{ //ครบ
			Name:         "Level 1",
			Duration:     1,
			Participants: 10,
			Description:  "",
			Experience:   1,
			EmployeeID:   1,
			LocationID:   1,
		}

		ok, err := govalidator.ValidateStruct(course)

		g.Expect(ok).To(gomega.BeTrue())
		g.Expect(err).To(gomega.BeNil())
	})

	t.Run(`course unsuccess`, func(t *testing.T) {
		course := entity.Course{ //ไม่ครบ
			Name:         "Level 1",
			Participants: 10,
			Description:  "",
			Experience:   1,
			EmployeeID:   1,
			LocationID:   1,
		}

		ok, err := govalidator.ValidateStruct(course)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Duration is required"))
	})
}
