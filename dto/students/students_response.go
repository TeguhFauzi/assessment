package studentdto

type StudentResponse struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	Name      string `json:"name" form:"name" gorm:"type: varchar(255)"`
	Math      int    `json:"math" form:"math" gorm:"type: int"`
	Science   int    `json:"science" form:"science" gorm:"type: int"`
	English   int    `json:"english" form:"english" gorm:"type: int" `
	Softskill int    `json:"soft_skill" form:"soft_skill" gorm:"type: int"`
}
