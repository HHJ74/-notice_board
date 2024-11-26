-- 로그인 권한 관리 

-- 1. 어플리케이션용 단일 사용자 Role 생성 (로그인 가능)
CREATE ROLE app_user LOGIN PASSWORD 'secure_password';

-- 2. app_user에게 public 스키마 내 모든 테이블에 대한 SELECT, INSERT, UPDATE 권한 부여
-- SELECT: 데이터를 읽을 수 있는 권한
-- INSERT: 데이터를 추가할 수 있는 권한
-- UPDATE: 데이터를 수정할 수 있는 권한
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;

-- 3. 이후 생성될 테이블에 대해서도 동일한 권한을 자동으로 부여
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO app_user;

-- (선택 사항) 데이터베이스 자체에 접근할 수 있는 CONNECT 권한 부여
GRANT CONNECT ON DATABASE postgres TO app_user;

-- 비로그인 권한 관리

-- 1. 로그인할 수 없는 그룹 Role 생성
-- 이 Role은 사용자에게 공통 권한을 부여하기 위해 사용되며, 직접 로그인은 불가능합니다.
CREATE ROLE developers NOLOGIN;

-- 2. 'developers' 그룹에 특정 테이블에 대한 권한 부여
-- developers Role에게 'projects' 테이블의 SELECT(읽기) 및 INSERT(쓰기) 권한을 부여합니다.
GRANT SELECT, INSERT ON TABLE projects TO developers;

-- 3. 로그인 가능한 사용자 Role 생성
-- 'alice'라는 이름의 사용자를 생성하며, 이 사용자는 데이터베이스에 로그인할 수 있습니다.
-- 비밀번호는 'password'로 설정되며, 실제 환경에서는 강력한 비밀번호를 사용해야 합니다.
CREATE ROLE alice LOGIN PASSWORD 'password';

-- 4. 'developers' 그룹 Role을 'alice' 사용자에게 할당
-- alice는 developers 그룹에 속하게 되며, 그룹의 모든 권한을 상속받습니다.
GRANT developers TO alice;

------------------------------------------------------------------------------------------


-- 1. 슈퍼유저 계정은 기존 postgres 계정만 사용.

-- 2. 개발자 계정 생성 및 권한 부여
CREATE ROLE developer WITH LOGIN PASSWORD 'dev_password';
GRANT CREATE, CONNECT ON DATABASE postgres TO developer;
GRANT USAGE ON SCHEMA public TO developer;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO developer;

-- 3. 애플리케이션 계정 생성 및 최소 권한 부여
CREATE ROLE app_user WITH LOGIN PASSWORD 'app_password';
GRANT CONNECT ON DATABASE postgres TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON TABLE users, posts TO app_user;

-- 4. 새로운 테이블에 자동 권한 적용
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO developer;



