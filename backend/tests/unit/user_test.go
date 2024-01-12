package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestUserValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test invalid email`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			DateOfBirth:     time.Now().AddDate(-1, 0, 0),
			Email:           "user.com", // ผิด
			Password:        "12345678",
			Phone:           "0456825731",
			Profile:         "",
			ExperiencePoint: 1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Invalid email address"))
	})

	t.Run(`test experience point must greater or equal to 0`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			DateOfBirth:     time.Now().AddDate(-1, 0, 0),
			Email:           "user@mail.com",
			Password:        "12345678",
			Phone:           "0456825731",
			Profile:         "",
			ExperiencePoint: -1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Experience point must me in range 0-150"))
	})

	t.Run(`test date of birth must be in the past`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			DateOfBirth:     time.Now().Add(time.Duration(1) * time.Hour), //ผิดตรงนี้
			Email:           "user@mail.com",
			Password:        "12345678",
			Phone:           "0456825777",
			ExperiencePoint: 1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("DateOfBirth must be in the past"))
	})

}
