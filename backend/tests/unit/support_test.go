package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"github.com/sut66/team16/backend/entity"
)

func TestSupportValidation(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run(`test date must before tomorrow`, func(t *testing.T) {
		support := entity.Support{
			Name: "ooo",
			Description: "ppp",
			Date:     time.Now().Add(time.Duration(48) * time.Hour), //ผิดตรงนี้
		}

		ok, err := govalidator.ValidateStruct(support)

		g.Expect(ok).NotTo(gomega.BeTrue())
		g.Expect(err).NotTo(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Date must before tomorrow"))
	})

}
