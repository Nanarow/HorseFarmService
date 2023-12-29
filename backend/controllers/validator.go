package controllers

import (
	"regexp"
	"strconv"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/sut66/team16/backend/entity"
)

func init() {
	RegisValidators()
}

func RegisValidators() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, c interface{}) bool {
		return i.(time.Time).Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, c interface{}) bool {
		return i.(time.Time).After(time.Now())
	})

	govalidator.ParamTagMap["eq"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input == int_param
	}

	govalidator.ParamTagMap["ne"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input != int_param
	}

	govalidator.ParamTagMap["gte"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input >= int_param
	}

	govalidator.ParamTagMap["lte"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input <= int_param
	}

	govalidator.ParamTagMap["lt"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input < int_param
	}

	govalidator.ParamTagMap["gt"] = func(str string, params ...string) bool {
		int_param, _ := strconv.Atoi(params[0])
		int_input, _ := strconv.Atoi(str)
		return int_input > int_param
	}

	govalidator.ParamTagMap["refer"] = func(str string, params ...string) bool {
		table_name := params[0]
		var count int64 = 0
		entity.DB().Table(table_name).Where("ID = ?", str).Count(&count)
		return count != 0
	}

	govalidator.ParamTagRegexMap["eq"] = regexp.MustCompile(`eq=(\d+)`)
	govalidator.ParamTagRegexMap["ne"] = regexp.MustCompile(`ne=(\d+)`)
	govalidator.ParamTagRegexMap["gte"] = regexp.MustCompile(`gte=(\d+)`)
	govalidator.ParamTagRegexMap["lte"] = regexp.MustCompile(`lte=(\d+)`)
	govalidator.ParamTagRegexMap["lt"] = regexp.MustCompile(`lt=(\d+)`)
	govalidator.ParamTagRegexMap["gt"] = regexp.MustCompile(`gt=(\d+)`)

	govalidator.ParamTagRegexMap["refer"] = regexp.MustCompile(`refer=(\D+)`)
}

// import (
// 	"encoding/base64"
// 	"time"

// 	"github.com/golodash/galidator"
// )

// func DefaultMessages() galidator.Messages {
// 	return galidator.Messages{
// 		"required": "$field is required",
// 		"email":    "invalid email",
// 		"future":   "$value must be in the future",
// 		"base64":   "$value must be base64 encoded",
// 		"range":    "$value is not in range",
// 		"min":      "$value must be at least $min",
// 		"max":      "$value must be at most $max",
// 		"minLen":   "$value must be at least $minLen characters",
// 		"maxLen":   "$value must be at most $maxLen characters",
// 	}
// }
// func cus(param interface{}) func(value interface{}) bool {
// 	return func(value interface{}) bool {
// 		// Implement your custom validation logic with the parameter here
// 		// For example, check if the value is greater than the parameter
// 		return value.(int) > param.(int)
// 	}
// }
// func DefaultValidator() galidator.Validators {
// 	return galidator.Validators{
// 		"future": func(i interface{}) bool {
// 			return i.(time.Time).After(time.Now())
// 		},
// 		"base64": func(i interface{}) bool {
// 			_, err := base64.StdEncoding.DecodeString(i.(string))
// 			return err == nil
// 		},
// 		"gte": cus(10),
// 	}
// }

// var g = galidator.New().CustomMessages(DefaultMessages()).CustomValidators(DefaultValidator())
