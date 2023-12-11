package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
	"github.com/sut66/team16/backend/middlewares"
)

func InitRouter(route *gin.Engine) {

	route.Use(middlewares.CORS())

	route.POST("/login", controllers.Login)
	route.POST("/login/employee", controllers.LoginEmployee)
	route.POST("/login/me", controllers.AutoLogin)
	route.POST("/login/employee/me", controllers.AutoLoginEmployee)
	route.POST("/logout", controllers.Logout)

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
	// InitBasicApi[*entity.Health](route, "/healths") complete
	InitBasicApi[*entity.Horse](route, "/horses")
	// InitBasicApi[*entity.Gender](route, "/gender") complete
	// InitBasicApi[*entity.Position](route, "/positions") complete
	InitBasicApi[*entity.TourType](route, "/tour/types")
	// InitBasicApi[*entity.TourRegistration](route, "/tours") complete
	// InitBasicApi[*entity.Enrollment](route, "/enrollments") complete
	InitBasicApi[*entity.Support](route, "/supports")
	InitBasicApi[*entity.Bleed](route, "/bleeds")
	InitBasicApi[*entity.Sex](route, "/sexes")
	InitBasicApi[*entity.Location](route, "/locations")
	InitBasicApi[*entity.Stable](route, "/stables")
	// InitBasicApi[*entity.Employee](route, "/employees") complete
	InitBasicApi[*entity.Plan](route, "/plans")
	// InitBasicApi[*entity.Precede](route, "/precedes") complete

	// tour registration system
	route.GET("/tours/:id", controllers.GetTour)
	route.GET("/tours/user/:id", controllers.GetAllToursOfUser)
	route.POST("/tours", controllers.CreateTour)
	route.PUT("/tours/:id", controllers.UpdateTour)
	route.DELETE("/tours/:id", controllers.DeleteTour)

	// prepare for enrollment system
	// route.GET("/enrollments/user/:id", controllers.GetAllEnrollmentsOfUser)
	// route.POST("/enrollments", controllers.CreateEnrollment)

	// employee system
	route.GET("/employees/:id", controllers.GetEmployee)
	route.GET("/employees", controllers.GetAllEmployee)
	route.POST("/employees", controllers.CreateEmployee)
	route.PUT("/employees/:id", controllers.UpdateEmployee)
	route.DELETE("/employees/:id", controllers.DeleteEmployee)

	route.GET("/employees/precedes", controllers.GetAllPrecede)
	route.GET("/employees/positions", controllers.GetAllPosition)
	route.GET("/employees/genders", controllers.GetAllGender)

	// health system
	route.POST("/healths", controllers.CreateHealth)

}
