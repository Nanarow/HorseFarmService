package controllers

import (
	"encoding/json"
	"net/http"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func responseOK(data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func isError(err error, c *gin.Context, message ...string) bool {
	if err != nil {
		msg := err.Error()
		if len(message) > 0 {
			msg = strings.Join(message, "")
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": msg})
		return true
	}
	return false
}

func addQuery(c *gin.Context, db *gorm.DB) *gorm.DB {
	for k, v := range c.Request.URL.Query() {
		if len(v) > 1 {
			db = db.Where(k+" IN ?", v)
		} else {
			db = db.Where(k+" = ?", v[0])
		}
	}
	return db
}

func OmitEmpty(obj interface{}) map[string]interface{} {
	// Convert the object to a JSON string
	data, _ := json.Marshal(obj)

	// Convert the JSON string to a map
	var jsonMap map[string]interface{}
	json.Unmarshal(data, &jsonMap)

	// Create a new map to store non-empty values
	omitEmptyMap := Parse(jsonMap).(map[string]interface{})
	return omitEmptyMap
}
func Parse(input interface{}) interface{} {
	switch value := input.(type) {
	case map[string]interface{}:
		return parseMap(value)
	case []interface{}:
		return parseSlice(value)
	default:
		return value
	}
}

func parseMap(input map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	for key, value := range input {
		parsedValue := Parse(value)
		if !isEmpty(parsedValue) {
			result[key] = parsedValue
		}
	}
	return result
}

func parseSlice(input []interface{}) []interface{} {
	result := make([]interface{}, 0)
	for _, value := range input {
		parsedValue := Parse(value)
		if !isEmpty(parsedValue) {
			result = append(result, parsedValue)
		}
	}
	return result
}

// func parse2(input interface{}) interface{} {
// 	switch in := input.(type) {
// 	case map[string]interface{}:
// 		result := make(map[string]interface{})
// 		for key, value := range in {
// 			parsedValue := parse(value)
// 			if !isEmpty(parsedValue) {
// 				result[key] = parsedValue
// 			}
// 		}
// 		return result
// 	case []interface{}:
// 		result := make([]interface{}, 0)
// 		for _, value := range in {
// 			parsedValue := parse(value)
// 			if !isEmpty(parsedValue) {
// 				result = append(result, parsedValue)
// 			}
// 		}
// 		return result
// 	default:
// 		return input
// 	}
// }

func isEmpty(value interface{}) bool {
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Array, reflect.String:
		return v.Len() == 0
	case reflect.Bool:
		return !v.Bool()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return v.Uint() == 0
	case reflect.Float32, reflect.Float64:
		return v.Float() == 0
	case reflect.Interface, reflect.Ptr:
		return v.IsNil()
	case reflect.Map, reflect.Slice:
		if v.IsNil() {
			return true
		}
		return v.Len() == 0
	default:
		return value == nil
	}
}
