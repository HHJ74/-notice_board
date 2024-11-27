const { Pool } = require("pg"); 
// PostgreSQL과 통신하기 위해 사용하는 공식 클라이언트 라이브러리.
// Pool은 PostgreSQL 연결 풀(Connection Pool)을 생성하고 관리하는 데 사용
// 연결 풀은 애플리케이션이 데이터베이스에 여러 개의 클라이언트 연결을 효율적으로 관리
// 연결을 요청할 때마다 새 연결을 생성하지 않고, 기존의 연결을 재사용하여 성능을 최적화

require("dotenv").config(); // .env에 저장된것을 불러옴

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // ssl: process.env.DATABASE_SSL_MODE === 'require',
  max: parseInt(process.env.DATABASE_POOL_SIZE, 10) || 10, // 연결 풀 크기
});

module.exports = pool;

// import os
// from sqlalchemy import create_engine

// # 환경변수에서 데이터베이스 설정 로드
// DATABASE_URL = f"postgresql://{os.getenv('DATABASE_USER')}:{os.getenv('DATABASE_PASSWORD')}" \
//                f"@{os.getenv('DATABASE_HOST')}:{os.getenv('DATABASE_PORT')}/{os.getenv('DATABASE_NAME')}"

// # 데이터베이스 연결
// engine = create_engine(DATABASE_URL, pool_size=int(os.getenv('DATABASE_POOL_SIZE', 10)))

