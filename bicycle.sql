/******************************************************
	bicycle DB 초기 세팅 - 강기종
******************************************************/
-- 0) bicycle DB 생성(show databases; -> DB 목록에 bicycle가 없을 시에 실행)
CREATE DATABASE bicycle CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- 1) 서버 안의 모든 데이터베이스 목록 보기
show databases;
-- 2) 사용할 데이터베이스 선택
use bicycle;
-- 3) 현재 선택된 데이터베이스 확인
select database();
-- 4) 테이블 목록 확인
show tables;

/******************************************************
	챗봇 FAQ 테이블 생성 - 강기종
******************************************************/
CREATE TABLE chatbot_faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(200) NOT NULL,
    question VARCHAR(200),
    answer TEXT NOT NULL,
    link_text VARCHAR(100),
    link_url VARCHAR(255)
);
-- 테이블 생성 되었는지 구조 확인
desc chatbot_faq;
-- 백엔드 실행 후 데이터가 정상적으로 데이터가 들어갔는지 확인
SELECT * FROM chatbot_faq;
-- 데이터 개수 확인
SELECT COUNT(*) FROM chatbot_faq;
-- 전체 데이터 삭제(chat-bot.json 데이터 수정 시)
TRUNCATE TABLE chatbot_faq;

/** 데이터베이스 생성 */
create database bicycle;

/** 데이터베이스 열기 */
use bicycle;
select database();

/** 테이블 목록 확인 */
show tables;

/*********************************************
	     여행지 추천: travel 관련 테이블
*********************************************/

/** 마커 테이블 생성 : marker */
-- 	private String lat;
--  private String lng;
--  private String type;
DROP TABLE marker;
create table marker(
	mid		int				auto_increment primary key,
    mname   varchar(30) not null,
    lat		DECIMAL(9,6),
    lng	    DECIMAL(9,6),
    mlink	varchar(100),
    type	varchar(10)	not null    
);

desc marker;
select * from marker;
select mname, mid, lat, lng, type from marker;

-- 여러개 insert
insert into marker(mname, lat, lng, mlink, type) values("춘천 공지천", 37.8733, 127.7127, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=a14084d4-e9da-4be4-b17f-faa0077bdc3d", "coord"),
												 ("창녕 우포늪", 35.5539, 128.4161, "https://www.cng.go.kr/tour/upo.web", "coord"),
												 ("가평 호명산", 37.721,  127.408, "https://www.thebike.co.kr/bbs/board.php?bo_table=56&wr_id=163&page=5", "coord"),
												 ("속초 영랑호", 38.2163, 128.6025, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=876c8f68-208f-4c0a-ab5a-77e37f21ad98", "coord"),
												 ("부산 삼락생태공원", 35.1745, 128.9740, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=3cce5d2d-5bc6-46d4-ad77-a36c6288451f", "coord"),                                         
												 ("화천 파로호 산소 100리길", 38.1579, 127.6912, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=1e4f0ef5-b352-4604-b1b8-01b0ec39e011", "coord"),
												 ("파주 DMZ", 37.9501, 126.6790, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=97fc93d4-e259-4a38-bdb1-45bfcb8691ba", "coord"),
												 ("남양주 북한강", 37.6325, 127.2002, "https://www.nyj.go.kr/culture/contents.do?key=249", "coord"),
												 ("강릉 경포호 산소길", 37.8021, 128.9148, "https://hey-route.com/tracking-course/976", "coord"),
												 ("인천 신시모도", 37.4686, 126.4517, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=b0a732a7-bbee-464f-be69-fafa201a07cd", "coord"),
												 ("인천 아라뱃길", 37.6112, 126.7079, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=57d81233-696d-44a8-a751-915ee2fc580d", "coord"),
												 ("시흥 그린웨이", 37.3938, 126.8025, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=328a61e7-9ca7-4bfd-b29e-66891181f3a8", "coord"),
												 ("서울 한강 잠실지구", 37.5110, 127.0994, "https://hangang.seoul.go.kr/www/contents/651.do?mid=444", "coord"),
												 ("양평 남한강", 37.5192, 127.5276, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=b75a4dff-68c3-4099-afae-eb3fd07008dd", "coord"),
												 ("세종 호수공원", 36.4801, 127.2892, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=d25bea6d-fce9-4dea-b98c-76b70932ec01", "coord"),
												 ("옥천 향수 100리길", 36.3030, 127.6950, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=7ea7bc42-72c0-4e8f-abf4-c584a52053da", "coord"),
												 ("군산 선유도", 35.9574, 126.5424, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=bd7f2b9d-82d5-4457-b560-ce0216da591c", "coord"),
                                                 ("부안 변산반도", 35.7070, 126.5640, "https://www.thebike.co.kr/bbs/board.php?bo_table=56&wr_id=82", "coord"),
												 ("곡성 섬진강", 35.2815, 127.2810, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=2bd14c6c-ec5f-4882-bf61-c6eb4efa34c9", "coord"),
												 ("경주 역사탐방 자건거길", 35.8569, 129.2249, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=7de842ce-b9f9-40c8-a5bb-b0dd21b02e25", "coord"),
												 ("울산 태화강", 35.5569, 129.3204, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=48c8cb22-1d62-44b8-be4c-2be2e0c02ebc", "coord"),
												 ("통영 삼칭이길", 34.8087, 128.4338, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=829aace1-0b6f-4a20-a043-7f4d804aec34", "coord"),
												 ("제주 우도", 33.5105, 126.9470, "https://m.blog.naver.com/bl85219/223185587601?isInf=true", "coord");
                                          
-- mysql에서 json, csv, excel... 데이터 파일을 업로드 하는 경로
show variables like 'secure_file_priv';

/** 맛집 테이블 생성 : travel_food */
--  private String fname;
--     private Double flike;
--     private int score;
--     private int evaluation;
--     private List<String> tag;
--     private String image1;
--     private String image2;
--     private String image3;
--     private String fullImage1;
--     private String fullImage2;
--     private String fullImage3;
--     private String description;
DROP TABLE travel_food;
create table travel_food(
	fid			int				auto_increment primary key,
    fname   	varchar(30) not null,
    flike		DECIMAL(4,1),
    score	    int,
    evaluation	varchar(10),
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    fullImage1	varchar(100),
    fullImage2	varchar(100),
    fullImage3	varchar(100),
    description	varchar(300)
);

desc travel_food;
select * from travel_food;
select fname, flike, score, evaluation, tag, image1, image2, image3, fullImage1, fullImage2, fullImage3, description from travel_food;

show variables like 'secure_file_priv';

-- json 파일의 detailinfo 정보 매핑
insert into travel_food(fname, flike, score, evaluation, tag, image1, image2, image3, fullImage1, fullImage2, fullImage3, description)
select 
	jt.fname,
    jt.flike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.fullImage1,
    jt.fullImage2,
    jt.fullImage3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoods.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 fname   		varchar(30) 	PATH '$.fname', 
			 flike   		DECIMAL(4,1) 	PATH '$.flike',
			 score   		int 			PATH '$.score',
			 evaluation		varchar(10) 	PATH '$.evaluation',
             tag           	json 			PATH '$.tag',  
             image1        	varchar(100)	PATH '$.image1',  
             image2        	varchar(100)	PATH '$.image2',  
             image3        	varchar(100)	PATH '$.image3',  
             fullImage1    	varchar(100)	PATH '$.fullImage1',  
             fullImage2    	varchar(100)	PATH '$.fullImage2',  
             fullImage3    	varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_food;




/*********************************************
	     회원정보 테이블 : userinfo 테이블
*********************************************/
use bicycle;
select database();
show tables;
select * from userinfo;
desc userinfo;

create table userinfo(
	unum 		int				auto_increment primary key,
    uid   		varchar(30) not null,
    upass		varchar(30) not null,
    uname	    varchar(50) not null,
    uage		int not null,
    ugender		varchar(10) not null,
    uaddress	varchar(100) not null,
    uemail	varchar(100) default null,
    uphone	varchar(100) default null
);

insert into userinfo(uid, upass, uname, uage, ugender, uaddress, uemail, uphone)
value ("test12345",12345,"테스터2",1001,"여성","서울 강남구 강남대로78길 8 한국빌딩 4F, 404호","abcde@naver.com","010-1234-5678"),
("test1234",1234,"테스터",100,"남성","서울 강남구 강남대로78길 8 한국빌딩 4F, 404호","abcd@naver.com","010-1234-5678");