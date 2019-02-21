
* get 과 put 모두 Admin 권한이 요구된다.
* score 는 반드시 0보다 크거나 같으며  100보다 작거나 같다.
* score 는 반드시 숫자이다

ㄱ. get:  http://localhost:3000/evaluation?user_id=유저번호
                해당되는 user_id 의 모든 평가를 읽는다.
ㄴ. put : http://localhost:3000/evaluation?user_id=유저번호
                해당되는 user_id 쿼리에 명시된 유저의 현재 인증된 admin 의 평가를 생성/수정한다 

[ DETAILS ]

GET METHOD : 
          

1. 입력데이터
        http://localhost:3000/evaluation?user_id=유저번호

2. 예상되는 결과값
    2-1. 성공시 
            해당 유저에 대한 모든 ADMIN 의 평가를 반환한다
    2-2. 실패시
            오류사유를 반환한다        

 성공결과 : 
[
    {
        "id": 782,
        "score": 3229,
        "comment": "excellent",
        "created_at": "2019-02-21T04:59:47.000Z",
        "updated_at": "2019-02-21T05:28:06.000Z",
        "user_id": 4,
        "user_admin_id": 4
    }
]

PUT METHOD : 

1. 입력데이터

        http://localhost:3000/evaluation?user_id=유저번호

{
        "score": 90,
        "comment" : "훌륭합니다"
}


2. 예상되는 결과값
    2-1. 성공시 
            TRUE 를 반환한다                
    2-2. 실패시
            오류사유를 반환한다        
