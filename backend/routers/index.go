package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/middlewares"
)

func InitRouter(route *gin.Engine) {

	route.Use(middlewares.CORS())

	route.POST("/login", controllers.LoginUser)
	route.POST("/login/admin", controllers.LoginAdmin)
	route.POST("/login/employee", controllers.LoginEmployee)
	route.POST("/logout/:role", controllers.Logout)

	// example
	// route.GET("/query", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"message": c.Request.URL.Query()})
	// })

	authRouter := route.Group("/")
	initRequiredAuth(authRouter)

}
func initRequiredAuth(route *gin.RouterGroup) {
	// route.Use(middlewares.Authentication())
	// route.Use(middlewares.Authorization())

	InitBasicApi[*entity.Food](route, "/foods")
	InitBasicApi[*entity.User](route, "/users")
	InitBasicApi[*entity.Role](route, "/roles")
	InitBasicApi[*entity.RidingLevel](route, "/riding/levels")
	InitBasicApi[*entity.Course](route, "/courses")
	InitBasicApi[*entity.Schedule](route, "/schedules")
	InitBasicApi[*entity.Health](route, "/healths")
	InitBasicApi[*entity.Horse](route, "/horses")
	InitBasicApi[*entity.Gender](route, "/gender")
	InitBasicApi[*entity.Position](route, "/positions")
	// InitBasicApi[*entity.Plan](route, "/plans") complete
	// InitBasicApi[*entity.TourType](route, "/tour/types") complete
	// InitBasicApi[*entity.TourRegistration](route, "/tours") complete
	// InitBasicApi[*entity.Enrollment](route, "/enrollments") complete
	InitBasicApi[*entity.Support](route, "/supports")
	InitBasicApi[*entity.Bleed](route, "/bleeds")
	InitBasicApi[*entity.Sex](route, "/sexes")
	InitBasicApi[*entity.Location](route, "/locations")
	InitBasicApi[*entity.Stable](route, "/stables")
	InitBasicApi[*entity.Employee](route, "/employees")
	InitBasicApi[*entity.Precede](route, "/precedes")

	// tour registration system
	route.GET("/tours/:id", controllers.GetTour)
	route.GET("/tours/user/:id", controllers.GetAllToursOfUser)
	route.POST("/tours", controllers.CreateTour)
	route.PUT("/tours/:id", controllers.UpdateTour)
	route.DELETE("/tours/:id", controllers.DeleteTour)

	route.GET("tours/types", controllers.GetAllTourTypes)
	route.GET("tours/plans", controllers.GetAllPlans)

	// prepare for enrollment system
	// route.GET("/enrollments/user/:id", controllers.GetAllEnrollmentsOfUser)
	// route.POST("/enrollments", controllers.CreateEnrollment)
}
