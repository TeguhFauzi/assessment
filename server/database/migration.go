package database

import (
	"fmt"
	"students/models"
	"students/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(

		&models.Student{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
