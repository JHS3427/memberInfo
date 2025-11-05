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
    type	varchar(10)	not null
);

desc marker;
select * from marker;
select mid, lat, lng, type from marker;

-- 여러개 insert
insert into marker(mname, lat, lng, type) values("춘천 공지천", 37.8733, 127.7127, "coord"),
												 ("창녕 우포늪", 35.5539, 128.4161, "coord"),
												 ("가평 호명산", 37.721,  127.408,  "coord"),
												 ("속초 영랑호", 38.2163, 128.6025, "coord"),
												 ("부산 삼락생태공원", 35.1745, 128.9740, "coord"),                                         
												 ("화천 파로호 산소 100리길", 38.1579, 127.6912, "coord"),
												 ("파주 DMZ", 37.9501, 126.6790, "coord"),
												 ("남양주 북한강", 37.6325, 127.2002, "coord"),
												 ("강릉 경포호 산소길", 37.8021, 128.9148, "coord"),
												 ("인천 신시모도", 37.4686, 126.4517, "coord"),
												 ("인천 아라뱃길", 37.6112, 126.7079, "coord"),
												 ("시흥 그린웨이", 37.3938, 126.8025, "coord"),
												 ("서울 한강 잠실지구", 37.5110, 127.0994, "coord"),
												 ("양평 남한강", 37.5192, 127.5276, "coord"),
												 ("세종 호수공원", 36.4801, 127.2892, "coord"),
												 ("옥천 향수 100리길", 36.3030, 127.6950, "coord"),
												 ("군산 선유도", 35.9574, 126.5424, "coord"),
                                                 ("부안 변산반도", 35.7070, 126.5640, "coord"),
												 ("곡성 섬진강", 35.2815, 127.2810, "coord"),
												 ("경주 역사탐방 자건거길", 35.8569, 129.2249, "coord"),
												 ("울산 태화강", 35.5569, 129.3204, "coord"),
												 ("통영 삼칭이길", 34.8087, 128.4338, "coord"),
												 ("제주 우도", 33.5105, 126.9470, "coord");
                                          
-- mysql에서 json, csv, excel... 데이터 파일을 업로드 하는 경로
show variables like 'secure_file_priv';


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