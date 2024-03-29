package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/middlewares"
)

func SetupRouter() *gin.Engine {
	return gin.Default()
}

func InitRouter(route *gin.Engine) {

	route.Use(middlewares.CORS())

	route.POST("/logout/:role", controllers.Logout)
	route.POST("/login/:role", controllers.Login)

	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)

}
func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())

	user := middlewares.Authorization(101)
	// user_admin := middlewares.Authorization(101, 100)
	// employee := middlewares.Authorization(200)

	// tour registration system
	route.GET("/tours/user/:id", user, controllers.GetAllToursOfUser)
	route.POST("/tours", user, controllers.CreateTour)
	route.PUT("/tours/:id", user, controllers.UpdateTour)
	route.DELETE("/tours/:id", user, controllers.DeleteTour)

	route.GET("/tours/types", user, controllers.GetAllTourTypes)
	route.GET("/tours/plans", user, controllers.GetAllPlans)

	// enrollment system
	route.GET("/enrollments/user/:id", user, controllers.GetAllEnrollmentsOfUser)
	route.POST("/enrollments", user, controllers.CreateEnrollment)
	route.GET("/schedules/enrollments", user, controllers.GetAllSchedulesWithEnrollments)

	// User account management
	route.GET("/users", controllers.GetAllUser)
	route.POST("/users", controllers.CreateUser)
	route.PUT("/users/:id", controllers.UpdateUser)
	route.DELETE("/users/:id", controllers.DeleteUser)

	route.GET("/users/genders", controllers.GetAllGenders)
	route.GET("/riding/levels", controllers.GetAllRidingLevels)

	// Support system
	route.GET("/supports", controllers.GetAllSupport)
	route.POST("/supports", controllers.CreateSupport)

	// horse info management system
	route.GET("/horses", controllers.GetAllHorse)
	route.POST("/horses", controllers.CreateHorse)
	route.PUT("/horses/:id", controllers.UpdateHorse)
	route.DELETE("/horses/:id", controllers.DeleteHorse)

	route.GET("/horses/bleeds", controllers.GetAllBleeds)
	route.GET("/horses/sexes", controllers.GetAllSexes)

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

	// course management system
	route.GET("/courses", controllers.GetAllCourses)
	route.POST("/courses", controllers.CreateCourse)
	route.PUT("/courses/:id", controllers.UpdateCourse)
	route.DELETE("/courses/:id", controllers.DeleteCourse)
	route.GET("/courses/locations", controllers.GetAllLocations)

	route.GET("/schedules", controllers.GetAllSchedules)
	route.POST("/schedules", controllers.CreateSchedule)
	route.DELETE("/schedules/:id", controllers.DeleteSchedule)

	// food quantity system
	route.POST("/foods", controllers.CreateFood)

	// stable management system
	route.GET("/stables", controllers.GetAllStable)
	route.POST("stables", controllers.CreateStable)
	route.PUT("/stables/:id", controllers.UpdateStable)
}
