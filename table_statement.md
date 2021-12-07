###유저 테이블

- 유저 테이블 id (PK) number null x
- 이메일 varchar2(40) null x
- 패스워드 varchar2(100) null x 암호화 대상
- 유저 구분 (선생 or 학생) char(1) null x

###선생님 테이블

- 테이블 id (FK) number null x
- 이름 varchar2(20) null x
- 휴대전화 varchar2(20) null o
- 이메일 varchar2(40) null o
- 유저 테이블 id number(PK) null x
- 학생 테이블 id number null x

###학생 테이블

- 테이블 id (FK) number null x
- 이름 varchar2(20) null x
- 휴대전화 varchar2(20) null o
- 이메일 varchar2(40) null o
- 학생 테이블 id (PK) number null x
- 선생님 테이블 id number null x

###친구 동의 테이블

- 테이블 id number null x
- 친구 id number null x
- 내 id number null x
- 동의 여부 char(1) null o

### to_do list 테이블

- 테이블 id (FK) number null x
- 내용 varchar2(300) null x
- 완료여부 char(1) null o
- 선생님 id number null x
- 학생 id number null x
