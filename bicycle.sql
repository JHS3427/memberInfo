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
	     여행지 추천: marker 관련 테이블
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

/*********************************************
	     여행지 추천: marker 관련 테이블 (끝)
*********************************************/

/*********************************************
	     여행지 추천: travel 관련 테이블
*********************************************/

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
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_food;
select * from travel_food;
select fname, flike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description from travel_food;

show variables like 'secure_file_priv';

-- json 파일의 travel_food 정보 매핑
insert into travel_food(fname, flike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.fname,
    jt.flike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoods.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 fname   		varchar(30) 	PATH '$.fname', 
			 flike   		DECIMAL(4,1) 	PATH '$.flike',
			 score   		int 			PATH '$.score',
			 evaluation		int			 	PATH '$.evaluation',
             tag           	json 			PATH '$.tag',  
             image1        	varchar(100)	PATH '$.image1',  
             image2        	varchar(100)	PATH '$.image2',  
             image3        	varchar(100)	PATH '$.image3',  
             full_image1   	varchar(100)	PATH '$.fullImage1',  
             full_image2   	varchar(100)	PATH '$.fullImage2',  
             full_image3  	varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_food;

/** 숙소 테이블 생성 : travel_hotel */
DROP TABLE travel_hotel;
create table travel_hotel(
	hid			int				auto_increment primary key,
    hname   	varchar(30) not null,
    hlike		DECIMAL(4,1),
    score	    int,
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_hotel;
select * from travel_hotel;
select hname, hlike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description from travel_hotel;

show variables like 'secure_file_priv';

-- json 파일의 travel_food 정보 매핑
insert into travel_hotel(hname, hlike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.hname,
    jt.hlike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelHotels.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 hname   			varchar(30) 	PATH '$.hname', 
			 hlike   			DECIMAL(4,1) 	PATH '$.hlike',
			 score   			int 			PATH '$.score',
			 evaluation			int 			PATH '$.evaluation',
             tag           		json 			PATH '$.tag',  
             image1        		varchar(100)	PATH '$.image1',  
             image2        		varchar(100)	PATH '$.image2',  
             image3        		varchar(100)	PATH '$.image3',  
             full_image1    	varchar(100)	PATH '$.fullImage1',  
             full_image2    	varchar(100)	PATH '$.fullImage2',  
             full_image3    	varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_hotel;


/** 수리 테이블 생성 : travel_repair */
DROP TABLE travel_repair;
create table travel_repair(
	rid			int				auto_increment primary key,
    rname   	varchar(30) not null,
    `rlike`		DECIMAL(4,1),
    score	    int,
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_repair;
select * from travel_repair;
select rname, `rlike`, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description from travel_repair;

show variables like 'secure_file_priv';

-- json 파일의 travel_food 정보 매핑
insert into travel_repair(rname, `rlike`, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.rname,
    jt.rlike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelRepairs.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 rname   		varchar(30) 	PATH '$.rname', 
			 `rlike`   		DECIMAL(4,1) 	PATH '$.rlike',
			 score   		int 			PATH '$.score',
			 evaluation		int	 			PATH '$.evaluation',
             tag           	json 			PATH '$.tag',  
             image1        	varchar(100)	PATH '$.image1',  
             image2        	varchar(100)	PATH '$.image2',  
             image3        	varchar(100)	PATH '$.image3',  
             full_image1    varchar(100)	PATH '$.fullImage1',  
             full_image2    varchar(100)	PATH '$.fullImage2',  
             full_image3    varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_repair;


/*********************************************
	     여행지 추천: travel 관련 테이블 (끝)
*********************************************/

/***************************************************
	     여행지 추천: travel_food_detail 관련 테이블
****************************************************/
/** 맛집 상세페이지 테이블 생성 : travel_food_detail */
--     private int did;
-- 	   private String fname;
--     private Double flike;
--     private List<String> tag;
--     private String location;
--     private String food;
--     private String address;
--     private String localAddress;
--     private String businessHouers;
--     private String lastOrder;
--     private String phone;
--     private List<String> other;
--     private List<TravelDetailMenu> menu;
--     private String image1;
--     private String image2;
--     private String image3;
--     private List<TravelDetailReview> review;
DROP TABLE travel_food_detail;
create table travel_food_detail(
	did					int				auto_increment primary key,
    fname   			varchar(30) not null,
    flike				DECIMAL(4,1),
    tag	    			json,
    location			varchar(100),
    food				varchar(100), 
    address				varchar(100),
    local_address		varchar(100),
    business_houers		varchar(100),
    last_order			varchar(100),
    phone				varchar(100),
    other				json,
    menu				json,
    image1				varchar(100),
    image2				varchar(100),
    image3				varchar(100),
    review				json
);

desc travel_food_detail;
select * from travel_food_detail;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_food_detail(fname, flike, tag, location, food, address, local_address, business_houers, last_order, phone, other, menu, image1, image2, image3, review)
SELECT
    jt.fname,
    jt.flike,
    jt.tag,
    jt.location,
    jt.food,
    jt.address,
    jt.local_address,
    jt.business_houers,
    jt.last_order,
    jt.phone,
    jt.other,
    jt.menu,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.review
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoodDetails.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        fname            VARCHAR(30) PATH '$.fname',
        flike            DECIMAL(4,1) PATH '$.flike',
        tag              JSON PATH '$.tag',
        location         VARCHAR(100) PATH '$.location',
        food             VARCHAR(100) PATH '$.food',
        address          VARCHAR(100) PATH '$.address',
        local_address    VARCHAR(100) PATH '$.localAddress',
        business_houers  VARCHAR(100) PATH '$.businessHouers',
        last_order       VARCHAR(100) PATH '$.lastOrder',
        phone            VARCHAR(100) PATH '$.phone',
        other            JSON PATH '$.other',
		menu			 JSON PATH '$.menu', 
        image1           VARCHAR(100) PATH '$.image1',
        image2           VARCHAR(100) PATH '$.image2',
        image3           VARCHAR(100) PATH '$.image3',
        review			 JSON PATH '$.review'
    )
) AS jt;

/***************************************************
	     여행지 추천: travel_food_detail 관련 테이블 (끝)
****************************************************/


/*********************************************
	     회원정보 테이블 : userinfo 테이블 
			251110 수정 - 패스워드 길이 문제로 인하여 테이블 삭제 및 생성, 데이터 삽입을 요청드립니다.
*********************************************/
use bicycle;
select database();
show tables;
select * from userinfo;
desc userinfo;

drop table userinfo;

create table userinfo(
	unum 		int				auto_increment primary key,
    uid   		varchar(30) not null,
    upass		varchar(100) not null,
    uname	    varchar(50) not null,
    uage		int not null,
    ugender		varchar(10) not null,
    uaddress	varchar(100) not null,
    uemail	varchar(100) default null,
    uphone	varchar(100) default null
);

insert into userinfo(uid, upass, uname, uage, ugender, uaddress, uemail, uphone)
value (
"test111","$2a$10$D/b6eWYeHIL.LWGOmZcMJewK1sj93Emq58YDCyYL32EdN8X97ept2","asdf","102","남성","아리랑로 6 (동선동4가) 121","111@gmail.com","11111111111"
);
