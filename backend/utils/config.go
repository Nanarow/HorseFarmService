package utils

import "os"

type Config struct {
	SECRET_KEY string
	PORT       string
	ORIGIN     string
}

func GetConfig() Config {
	return Config{
		SECRET_KEY: getEnv("SECRET_KEY", "secret8985"),
		PORT:       getEnv("PORT", "8985"),
		ORIGIN:     getEnv("ORIGIN", "http://localhost:5173"),
	}
}

func getEnv(key, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}
	return value
}
