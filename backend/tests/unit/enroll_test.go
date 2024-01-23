package tests

import (
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

// comment for commit
func TestEnrollValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test schedule_id is required`, func(t *testing.T) {
		enroll := entity.Enrollment{
			UserID: 2,
		}

		ok, err := govalidator.ValidateStruct(enroll)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("ScheduleID is required"))

	})
	t.Run(`test schedule does not exist`, func(t *testing.T) {
		enroll := entity.Enrollment{
			UserID:     2,
			ScheduleID: 2,
		}

		ok, err := govalidator.ValidateStruct(enroll)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Schedule does not exist"))
	})

}
