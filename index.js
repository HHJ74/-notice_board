// 1. 필요한 모듈 가져오기
const express = require('express'); // 서버 애플리케이션 생성.
const cors = require('cors');
// const pool = require('./database/database'); // PostgreSQL 연결 풀 가져오기
require('dotenv').config(); // 환경 변수 관리


// 2. 서버 초기화
const app = express();
const PORT = process.env.PORT || 8080;

// 3. 미들웨어 설정 (클라이언트의 요청(Request)과 서버의 응답(Response) 사이에 실행되는 함수)
// 빌트인 미들웨어
app.use(express.json()); // JSON 요청 본문 파싱 
app.use(express.static('public')); // 정적 파일(CSS, JS, 이미지 등)을 제공.
// 서드파티 미들웨어
app.use(cors()); // CORS 정책 활성화(서드파티 미들웨어 : 교차 출처 요청 허용)


// 4. 라우터 연결
app.use(require('./routes/authRoutes')); // 라우터 파일 가져오기
app.use(require('./routes/postRoutes'));
app.use(require('./routes/commentRoutes'))


// 5. 기본 라우트 설정 (테스트용)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// 6. 에러 처리
// 잘못된 경로
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// 서버 내부 오류
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 7. 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
