const { Pool } = require("pg"); 
// PostgreSQL과 통신하기 위해 사용하는 공식 클라이언트 라이브러리.
// Pool은 PostgreSQL 연결 풀(Connection Pool)을 생성하고 관리하는 데 사용
// 연결 풀은 애플리케이션이 데이터베이스에 여러 개의 클라이언트 연결을 효율적으로 관리
// 연결을 요청할 때마다 새 연결을 생성하지 않고, 기존의 연결을 재사용하여 성능을 최적화

require("dotenv").config(); // .env에 저장된것을 불러옴

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool; // pool만 내보냄
