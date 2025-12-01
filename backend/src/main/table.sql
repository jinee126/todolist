-- ============================================
-- Todo List Application - Database Schema
-- Database: Oracle 12c
-- ============================================

-- 기존 테이블이 있으면 삭제 (선택사항)
DROP TABLE todos CASCADE CONSTRAINTS;

-- 시퀀스 삭제 (선택사항)
DROP SEQUENCE todos_seq;

-- ============================================
-- 시퀀스 생성 (Auto Increment 역할)
-- ============================================
CREATE SEQUENCE todos_seq
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
-- 샘플 데이터 삽입 (선택사항)
-- ============================================
INSERT INTO todos (title, completed) VALUES ('Spring Boot 프로젝트 설정', 1);
INSERT INTO todos (title, completed) VALUES ('JPA Entity 작성', 1);
INSERT INTO todos (title, completed) VALUES ('REST API 구현', 1);
INSERT INTO todos (title, completed) VALUES ('Next.js 프론트엔드 개발', 1);
INSERT INTO todos (title, completed) VALUES ('데이터베이스 연동 테스트', 0);
INSERT INTO todos (title, completed) VALUES ('프로젝트 배포', 0);

COMMIT;

-- ============================================
-- 확인 쿼리
-- ============================================
-- 테이블 구조 확인
SELECT * FROM user_tab_columns WHERE table_name = 'TODOS' ORDER BY column_id;

-- 데이터 확인
SELECT * FROM todos ORDER BY created_at DESC;

-- 시퀀스 현재 값 확인
SELECT todos_seq.CURRVAL FROM dual;