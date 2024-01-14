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
		return truncateToDay(i.(time.Time).Local()).Before(today())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).After(today())
	})

	govalidator.CustomTypeTagMap.Set("before_tomorrow", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).Before(today().AddDate(0, 0, 1))
	})

	govalidator.CustomTypeTagMap.Set("after_yesterday", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).After(today().AddDate(0, 0, -1))
	})

	govalidator.CustomTypeTagMap.Set("today", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).Equal(today())
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

func truncateToDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

func today() time.Time {
	return truncateToDay(time.Now())
}
