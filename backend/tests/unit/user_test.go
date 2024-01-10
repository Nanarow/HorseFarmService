package tests

import (
	"testing"

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
			Age:             12,
			Email:           "user.com", // ผิด
			Password:        "12345678",
			Phone:           "0456825731",
			ExperiencePoint: 1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Invalid email address"))
	})

	t.Run(`test required phone number`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			Age:             12,
			Email:           "user@mail.com",
			Password:        "12345678",
			Phone:           "", // ผิด
			ExperiencePoint: 1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Phone number is required"))
	})

	t.Run(`test password must be at least 8 character`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			Age:             12,
			Email:           "user@mail.com",
			Password:        "1234", // ผิด
			Phone:           "0456825731", 
			ExperiencePoint: 1,
			GenderID:        1,
			RidingLevelID:   1,
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Password must be at least 8 characters"))
	})
}
