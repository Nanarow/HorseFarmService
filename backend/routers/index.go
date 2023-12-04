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
	InitBasicApi[*entity.TourType](route, "/tour/types")
	InitBasicApi[*entity.TourRegistration](route, "/tours")
	InitBasicApi[*entity.Enrollment](route, "/enrollments")
	InitBasicApi[*entity.Support](route, "/supports")
	InitBasicApi[*entity.Bleed](route, "/bleeds")
	InitBasicApi[*entity.Sex](route, "/sexes")
	InitBasicApi[*entity.Location](route, "/locations")
	InitBasicApi[*entity.Stable](route, "/stables")
	InitBasicApi[*entity.Employee](route, "/employees")
	InitBasicApi[*entity.Plan](route, "/plans")
}
