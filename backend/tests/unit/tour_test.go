package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestTourValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test invalid email`, func(t *testing.T) {
		tour := entity.TourRegistration{
			Date:         time.Now().AddDate(0, 0, 1),
			Email:        "u1-u.com",
			Name:         "my tour",
			Participants: 10,
			PlanID:       2,
			TourTypeID:   2,
			UserID:       2,
		}

		ok, err := govalidator.ValidateStruct(tour)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Invalid email"))

	})
	t.Run(`test past date`, func(t *testing.T) {
		tour := entity.TourRegistration{
			Date:         time.Now().Add(time.Duration(-1) * time.Hour),
			Email:        "u1@u.com",
			Name:         "my tour",
			Participants: 10,
			PlanID:       2,
			TourTypeID:   2,
			UserID:       2,
		}

		ok, err := govalidator.ValidateStruct(tour)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Date must be in the future"))
	})

	t.Run(`test plan not exist`, func(t *testing.T) {
		tour := entity.TourRegistration{
			Date:         time.Now().AddDate(0, 0, 1),
			Email:        "u1@u.com",
			Name:         "my tour",
			Participants: 10,
			PlanID:       8,
			TourTypeID:   2,
			UserID:       2,
		}

		ok, err := govalidator.ValidateStruct(tour)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Plan does not exist"))

	})
}
