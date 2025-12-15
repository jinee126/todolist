-- ============================================
-- Todo List Application - Database Schema
-- Database: Oracle 12c
-- ============================================

-- ============================================
-- 시퀀스 생성
-- ============================================
CREATE SEQUENCE todos_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE SEQUENCE common_code_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE SEQUENCE menu_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE SEQUENCE user_info_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- ============================================
-- todos 테이블 생성
-- ============================================
CREATE TABLE todos (
                       id NUMBER(19) PRIMARY KEY,
                       title VARCHAR2(500) NOT NULL,
                       completed NUMBER(1) DEFAULT 0 NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                       CONSTRAINT chk_completed CHECK (completed IN (0, 1))
);

-- ============================================
-- 인덱스 생성
-- ============================================
-- 완료 상태로 필터링할 때 성능 향상
CREATE INDEX idx_todos_completed ON todos(completed);

-- 생성일시로 정렬할 때 성능 향상
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- ============================================
-- 트리거 생성 (Auto Increment + Updated At)
-- ============================================
CREATE OR REPLACE TRIGGER todos_bi
BEFORE INSERT ON todos
FOR EACH ROW
BEGIN
    -- ID 자동 생성
    IF :NEW.id IS NULL THEN
SELECT todos_seq.NEXTVAL INTO :NEW.id FROM dual;
END IF;

    -- 생성일시 자동 설정
    IF :NEW.created_at IS NULL THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
END IF;

    -- 수정일시 자동 설정
    IF :NEW.updated_at IS NULL THEN
        :NEW.updated_at := CURRENT_TIMESTAMP;
END IF;
END;
/

CREATE OR REPLACE TRIGGER todos_bu
BEFORE UPDATE ON todos
                  FOR EACH ROW
BEGIN
    -- 수정일시 자동 업데이트
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

-- ============================================
-- 테이블 코멘트
-- ============================================
COMMENT ON TABLE todos IS 'Todo 항목을 저장하는 테이블';
COMMENT ON COLUMN todos.id IS 'Todo 고유 ID (Primary Key)';
COMMENT ON COLUMN todos.title IS 'Todo 제목';
COMMENT ON COLUMN todos.completed IS '완료 여부 (0: 미완료, 1: 완료)';
COMMENT ON COLUMN todos.created_at IS '생성 일시';
COMMENT ON COLUMN todos.updated_at IS '수정 일시';

-- ============================================
-- 샘플 데이터
-- ============================================
INSERT INTO todos (title, completed) VALUES ('Spring Boot 프로젝트 설정', 1);



CREATE TABLE user_info
(
    user_info_seq number,
    user_info_id   VARCHAR2(50) PRIMARY KEY,
    user_info_password  VARCHAR2(255) NOT NULL,
    user_info_type VARCHAR2(50)  NOT NULL
);


-- ============================================
-- 공통코드 테이블
-- ============================================
CREATE TABLE common_code
(
    common_code_seq number ,
    code_id VARCHAR2(50) ,
    code_nm    VARCHAR2(50),
    upper_code VARCHAR2(50),
    code_use_yn         CHAR(1) DEFAULT 1 NOT NULL,
    code_order VARCHAR2(10)
);

COMMENT ON COLUMN common_code.code_id IS '코드id';
COMMENT ON COLUMN common_code.upper_code IS '상위코드';
COMMENT ON COLUMN common_code.code_use_yn IS '사용여부 (0: 미사용, 1: 사용)';
COMMENT ON COLUMN common_code.code_nm IS '코드명';
COMMENT ON COLUMN common_code.code_seq IS '순서';

CREATE TABLE menu (
      menu_seq number,
      parent_menu_seq VARCHAR2(50),
      name         VARCHAR2(100) NOT NULL,
      depth        NUMBER(1) DEFAULT 1 NOT NULL,
      menu_url     VARCHAR2(500),
      menu_order   NUMBER(3) NOT NULL,
      icon_class   VARCHAR2(50),
      description  VARCHAR2(200),          -- 메뉴 설명
      use_yn       CHAR(1) DEFAULT 'Y' NOT NULL,
      create_date  DATE DEFAULT SYSDATE,
      create_id    VARCHAR2(50) NOT NULL,
      update_date  DATE DEFAULT SYSDATE,
      update_id    VARCHAR2(50)
);

COMMENT ON TABLE menu IS '메뉴 관리';
COMMENT ON COLUMN menu.menu_seq IS '메뉴 순번(PK)';
COMMENT ON COLUMN menu.parent_menu_seq IS '상위 메뉴 순번';
COMMENT ON COLUMN menu.name IS '메뉴명';
COMMENT ON COLUMN menu.depth IS '메뉴 깊이(1~3)';
COMMENT ON COLUMN menu.menu_url IS '메뉴 URL';
COMMENT ON COLUMN menu.menu_order IS '메뉴 순서';
COMMENT ON COLUMN menu.icon_class IS '아이콘 클래스';
COMMENT ON COLUMN menu.description IS '메뉴 설명';
COMMENT ON COLUMN menu.use_yn IS '사용 여부';

--생성전
CREATE SEQUENCE menu_auth_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- MENU_AUTH 테이블
CREATE TABLE menu_auth (
   menu_auth_seq   NUMBER PRIMARY KEY,
   menu_seq        NUMBER NOT NULL,
   auth_code       VARCHAR2(50) NOT NULL,
   create_date     DATE DEFAULT SYSDATE,
   create_id       VARCHAR2(50) NOT NULL,
);

COMMENT ON TABLE menu_auth IS '메뉴 권한 관리';
COMMENT ON COLUMN menu_auth.menu_auth_seq IS '메뉴권한 순번(PK)';
COMMENT ON COLUMN menu_auth.menu_seq IS '메뉴 순번(FK)';
COMMENT ON COLUMN menu_auth.auth_code IS '권한 코드(공통코드)';