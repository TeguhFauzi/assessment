package models

type Student struct {
	ID        int    `json:"id"`
	Name      string `json:"name" form:"name" gorm:"type: varchar(255)"`
	Math      int    `json:"math" form:"math" gorm:"type: int"`
	Science   int    `json:"science" form:"science" gorm:"type: int"`
	English   int    `json:"english" form:"english" gorm:"type: int" `
	Softskill int    `json:"soft_skill" form:"soft_skill" gorm:"type: int"`
}

type StudentResponse struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	Name      string `json:"name" form:"name" gorm:"type: varchar(255)"`
	Math      int    `json:"math" form:"math" gorm:"type: int"`
	Science   int    `json:"science" form:"science" gorm:"type: int"`
	English   int    `json:"english" form:"english" gorm:"type: int"`
	Softskill int    `json:"soft_skill" form:"soft_skill" gorm:"type: int"`
}

// type FilmInCategory struct {
// 	ID            int              `json:"id"`
// 	Title         string           `json:"title"`
// 	Thumbnailfilm string           `json:"thumbnailfilm"`
// 	Year          string           `json:"year"`
// 	Category      CategoryResponse `json:"category"`
// 	CategoryID    int              `json:"-"`
// 	Description   string           `json:"description"`
// 	LinkFilm      string           `json:"linkfilm"`
// }

func (StudentResponse) TableName() string {
	return "students"
}

// func (FilmInCategory) TableName() string {
// 	return "films"
// }
