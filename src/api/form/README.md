
/*
    > EXPECTED < 
     1. 개발자 폼 양식예시 
 {
    "form" :[
		      {
             "position" : "Developer",
             "question_num" : "1",
             "type" : "Short_Answer",
             "description" : {
                  "placeholder" : "가장 좋아하는 포켓몬은?",
                  "options" : " "
             }
		      },
             {
             "position" : "Developer",
             "question_num" : "2",
             "type" : "Long_answer",
             "description" : {
                  "placeholder" : "태일이와 아구몬의 관계에 관하여 논하시오[300자]",
                  "options" : " "
             }
             },
             {
             "position" : "Developer",
             "question_num" : "1",
             "type" : "Selector",
             "description" : {
                  "placeholder" : "회식때 가장 선호하는  메뉴는?",
                  "options" : [
                        { "num" : "0", "value" : "훠궈"},
                        { "num" : "1", "value" : "삼겹살"} ,
                        { "num" : "2", "value" : "갈비"},
                        { "num" : "3", "value" : "연어"},
                        { "num" : "4", "value" : "참이슬"}
                  ]
             }
             }
    ] 
}

/    > EXPECTED < 
     1. 디자이너 폼 양식예시 
    { 
        elem : [
            {
             position : Designer,
             question_num : 1,
             type : "Short_Answer",
             description : {
                  placeholder : "가장 좋아하는 디지몬은?",
                  options : null,
             },
            {
             position : Designer,
             question_num : 2,
             type : "Long_answer",
             description : {
                  placeholder : "협업 경험에 관하여 쓰시오[300자]",
                  options : null,
             },
            {
             position : Designer,
             question_num : 3,
             type : "Selector",
             description : {
                  placeholder : "회식때 가장 선호하는  메뉴는?",
                  options : [
                        { num : 0, value : "훠궈"},
                        { num : 1, value : "삼겹살"} ,
                        { num : 3, value : "갈비"},
                        { num : 4, value : "연어"},
                        { num : 4, value : "참이슬"},
                  ],
             },
             {
             position : Designer,
             question_num : 4,
             type : "UpLoad",
             description : {
                  placeholder : "포트폴리오를 올리세요",
             },

            },
]        
    }
  
{
    "form" :[
		      {
             "position" : "Developer",
             "question_num" : "1",
             "type" : "Short_Answer",
             "description" :  "가장 좋아하는 포켓몬은?",
			 "options" : {
			 	"id" : "1"
			 }
            },
             {
             "position" : "Developer",
             "question_num" : "2",
             "type" : "Long_answer",
             "description" :  "태일이와 아구몬의 관계에 관하여 논하시오[300자]",
			 "options" : " "
             
             }
    ] 
}