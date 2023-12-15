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

	authRouter := route.Group("/")
	initRequiredAuth(authRouter)

}
func initRequiredAuth(route *gin.RouterGroup) {
	// route.Use(middlewares.Authentication())
	// route.Use(middlewares.Authorization())

	// InitBasicApi[*entity.Food](route, "/foods") complete
	// InitBasicApi[*entity.User](route, "/users") complete
	// InitBasicApi[*entity.Role](route, "/roles") unused
	// InitBasicApi[*entity.RidingLevel](route, "/riding/levels") complete
	// InitBasicApi[*entity.Course](route, "/courses") complete
	// InitBasicApi[*entity.Schedule](route, "/schedules") complete
	// InitBasicApi[*entity.Health](route, "/healths") complete
	// InitBasicApi[*entity.Horse](route, "/horses") complete
	// InitBasicApi[*entity.Gender](route, "/gender") complete
	// InitBasicApi[*entity.Position](route, "/positions") complete
	// InitBasicApi[*entity.Plan](route, "/plans") complete
	// InitBasicApi[*entity.TourType](route, "/tour/types") complete
	// InitBasicApi[*entity.TourRegistration](route, "/tours") complete
	// InitBasicApi[*entity.Enrollment](route, "/enrollments") complete
	InitBasicApi[*entity.Support](route, "/supports")
	// InitBasicApi[*entity.Bleed](route, "/bleeds") complete
	// InitBasicApi[*entity.Sex](route, "/sexes") complete
	// InitBasicApi[*entity.Location](route, "/locations")
	InitBasicApi[*entity.Stable](route, "/stables") 
	// InitBasicApi[*entity.Employee](route, "/employees") complete
	// InitBasicApi[*entity.Precede](route, "/precedes") complete

	// tour registration system
	route.GET("/tours/user/:id", controllers.GetAllToursOfUser)
	route.POST("/tours", controllers.CreateTour)
	route.PUT("/tours/:id", controllers.UpdateTour)
	route.DELETE("/tours/:id", controllers.DeleteTour)

	route.GET("tours/types", controllers.GetAllTourTypes)
	route.GET("tours/plans", controllers.GetAllPlans)

	// prepare for enrollment system
	// route.GET("/enrollments/user/:id", controllers.GetAllEnrollmentsOfUser)
	// route.POST("/enrollments", controllers.CreateEnrollment)

	// User account management
	route.GET("/users", controllers.GetAllUser)
	route.POST("/users", controllers.CreateUser)
	route.PUT("/users/:id", controllers.UpdateUser)
	route.DELETE("/users/:id", controllers.DeleteUser)

	route.GET("/users/genders", controllers.GetAllGenders)
	route.GET("/riding/levels", controllers.GetAllRidingLevels)

	// horse info management system
	route.GET("/horses", controllers.GetAllHorse)
	route.POST("/horses", controllers.CreateHorse)
	route.PUT("/horses", controllers.UpdateHorse)
	route.DELETE("/horses/:id", controllers.DeleteHorse)

	route.GET("horses/bleeds", controllers.GetAllBleeds)
	route.GET("horses/sexes", controllers.GetAllSexes)

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

	route.GET("/courses", controllers.GetAllCourses)
	route.POST("/courses", controllers.CreateCourse)
	route.PUT("/courses/:id", controllers.UpdateCourse)

	route.GET("/schedules", controllers.GetAllSchedules)
	route.POST("/schedules", controllers.CreateSchedule)
	route.GET("/schedules/locations", controllers.GetAllLocations)

	route.POST("/foods", controllers.CreateFood)
	route.PUT("/foods/:id", controllers.UpdateFood)
	route.DELETE("/foods/:id", controllers.DeleteFood)

	// stable managemnet system
	// route.POST("/stables", controllers.CreateHorse)
	// route.PUT("/stables/:id", controllers.UpdateHorse)
}
