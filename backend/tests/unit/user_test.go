package tests

import (
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func TestuserValidation(t *testing.T) {
	entity.SetupDatabase("TestDB")
	entity.SetupData(entity.DB())
	controllers.RegisValidators()
	g := gomega.NewGomegaWithT(t)

	t.Run(`test invalid email`, func(t *testing.T) {
		user := entity.User{
			FirstName:       "userFirstName",
			LastName:        "userLastName",
			Email:           "user.com", // ผิด
			Password:        "1234678",
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
}
