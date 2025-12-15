
CREATE TABLE common_code
(
    common_code_id VARCHAR2(50) PRIMARY KEY,
    reference_code VARCHAR2(50),
    use_yn         CHAR(1) DEFAULT 1 NOT NULL,
    description    VARCHAR2(50)
);


CREATE TABLE menu
(
    menu_id     VARCHAR2(50) PRIMARY KEY,
    name        VARCHAR2(50)      NOT NULL,
    depth       CHAR(1) DEFAULT 1 NOT NULL,
    reference   VARCHAR2(50),
    menu_order  NUMBER(2),
    create_date DATE    DEFAULT SYSDATE,
    create_id   VARCHAR2(50)      NOT NULL,
    update_date DATE    DEFAULT SYSDATE,
    update_id   VARCHAR2(50)
);

CREATE TABLE menu_authority
(
    menu_authority_id VARCHAR2(50) PRIMARY KEY,
    menu_id           VARCHAR2(50) NOT NULL,
    create_date       DATE DEFAULT SYSDATE,
    create_id         VARCHAR2(50) NOT NULL,
    update_date       DATE DEFAULT SYSDATE,
    update_id         VARCHAR2(50)
);

CREATE TABLE user_type_menu_authority
(
    common_code_id    VARCHAR2(50) NOT NULl,
    menu_authority_id VARCHAR2(50) NOT NULL,
    create_date       DATE DEFAULT SYSDATE,
    create_id         VARCHAR2(50) NOT NULL
);