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
	omitEmptyMap := make(map[string]interface{})

	// Recursively parse the JSON map and omit empty values
	parseMap(jsonMap, omitEmptyMap)

	return omitEmptyMap
}

func parseMap(aMap map[string]interface{}, newMap map[string]interface{}) {
	for key, val := range aMap {
		if isEmpty(val) {
			continue
		}
		switch concreteVal := val.(type) {
		case map[string]interface{}:
			newMapVal := make(map[string]interface{})
			parseMap(concreteVal, newMapVal)
			newMap[key] = newMapVal
		case []interface{}:
			newArrayVal := make([]interface{}, len(concreteVal))
			parseArray(concreteVal, newArrayVal)
			newMap[key] = newArrayVal
		default:
			newMap[key] = concreteVal
		}

	}
}

func parseArray(anArray []interface{}, newArray []interface{}) {
	for i, val := range anArray {
		if isEmpty(val) {
			continue
		}
		switch concreteVal := val.(type) {
		case map[string]interface{}:
			newMapVal := make(map[string]interface{})
			parseMap(concreteVal, newMapVal)
			newArray[i] = newMapVal
		case []interface{}:
			newArrayVal := make([]interface{}, len(concreteVal))
			parseArray(concreteVal, newArrayVal)
			newArray[i] = newArrayVal
		default:
			newArray[i] = concreteVal
		}
	}
}

func isEmpty(value interface{}) bool {
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.String:
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
	case reflect.Map:
		if v.Len() == 0 {
			return true
		}
		for _, k := range v.MapKeys() {
			mv := v.MapIndex(k)
			if !isEmpty(mv.Interface()) {
				return false
			}
		}
		return true
	case reflect.Array, reflect.Slice:
		if v.Len() == 0 {
			return true
		}
		for i := 0; i < v.Len(); i++ {
			av := v.Index(i)
			if !isEmpty(av.Interface()) {
				return false
			}
		}
		return true
	}
	return false
}
