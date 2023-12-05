package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sut66/team16/backend/controllers"
	"github.com/sut66/team16/backend/entity"
)

func InitBasicApi[Type entity.Models](route *gin.RouterGroup, relativePath string) {
	route.GET(relativePath+"/:id", controllers.Get[Type])
	route.GET(relativePath, controllers.GetAll[Type])
	route.POST(relativePath, controllers.Create[Type])
	route.PUT(relativePath+"/:id", controllers.Update[Type])
	route.DELETE(relativePath+"/:id", controllers.Delete[Type])
}

// unused

// type BasicRouter[Type entity.Models] struct {
// 	route        *gin.Engine
// 	relativePath string
// }

// func NewBasicRouter[T entity.Models](route *gin.Engine, relativePath string) *BasicRouter[T] {
// 	return &BasicRouter[T]{
// 		route:        route,
// 		relativePath: relativePath,
// 	}
// }

// func (this *BasicRouter[T]) HandlerPost(handler func(*gin.Context, T)) {
// 	this.route.POST(this.relativePath, func(ctx *gin.Context) {
// 		controllers.HandlerCreate[T](ctx, handler)
// 	})
// }

// func (this *BasicRouter[T]) HandlerPut(handler func(*gin.Context, T, uint)) {
// 	this.route.PUT(this.relativePath+"/:id", func(ctx *gin.Context) {
// 		controllers.HandlerUpdate[T](ctx, handler)
// 	})
// }

// func (this *BasicRouter[T]) GET() {
// 	this.route.GET(this.relativePath+"/:id", controllers.Get[T])
// }

// func (this *BasicRouter[T]) POST() {
// 	this.route.POST(this.relativePath, controllers.Create[T])

// }

// func (this *BasicRouter[T]) PUT() {
// 	this.route.PUT(this.relativePath+"/:id", controllers.Update[T])

// }

// func (this *BasicRouter[T]) DELETE() {
// 	this.route.DELETE(this.relativePath+"/:id", controllers.Delete[T])
// }

// func (this *BasicRouter[T]) GET_ALL() {
// 	this.route.GET(this.relativePath, controllers.GetAll[T])
// }

// // handler basic method e.g. get post put delete etc ...
// func (this *BasicRouter[T]) BasicHandler() {
// 	this.route.GET(this.relativePath+"/:id", controllers.Get[T])
// 	this.route.POST(this.relativePath, controllers.Create[T])
// 	this.route.PUT(this.relativePath+"/:id", controllers.Update[T])
// 	this.route.DELETE(this.relativePath+"/:id", controllers.Delete[T])
// 	this.route.GET(this.relativePath, controllers.GetAll[T])
// }
