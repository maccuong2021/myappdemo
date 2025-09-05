## Scoreboard API Module Specification
# Overview

This module handles score updates and retrieval for a live scoreboard on the website. It ensures live updates, user score validation, and prevention of unauthorized score manipulation.

# Software Requirements

- Live Scoreboard: Displays top 10 user scores.
- Score Update: Scores increase when users complete an action.
- API Integration: Frontend calls the backend API after user actions.
- Security: Only authorized actions can increase scores.
- Install Docker Desktop
- Install Sql Server
  docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -v sqlvolume:/var/opt/mssql `
 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker exec -it sql2022 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 123456789@Abc
- Install Resdis cache
  docker pull redis
  docker run -d --name redis-server -p 6379:6379 redis
  docker exec -it redis-server redis-cli
  or run command line 
  docker-compose up -d
- Download from: https://redis.com/redis-enterprise/redis-insight/ view cache
- Install and launch
- Connect to your Redis instance:
- Host: localhost
- Port: 6379

# Execution Flow Diagram

┌────────────────────────────┐
│ 1. User Opens Website      │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 2. Login Form Displayed    │
│ - User enters credentials  │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 3. Server Authenticates    │
│ - AuthController.login()   │
│ - AuthenService.login()    │
│ - Validates credentials    │
│ - Issues JWT               │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 4. Frontend Stores Token   │
│ - In cookie/localStorage   │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 5. User Completes Action   │
│ - e.g., updates score      │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 6. Frontend Dispatches API │
│ Call with Auth Token       │
│ - PUT /api/score           │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ 7. Server Validates Token  │
│ - authMiddleware           │
│ - jwt.verify()             │
└────────────┬───────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ 8. Score Updated in DB           │
│ - ScoreService.updateUserScore() │
└────────────┬─────────────────────┘
             │
             ▼
┌────────────────────────────┐
│ 9. Redis Cache Updated     │
│ - leaderboard ZADD         │
│   key: "leaderboard"       │
│   score: newScore          │
│   member: userId           │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│10. Broadcast Update        │
│ - via WebSocket/SSE        │
│ - Push new leaderboard     │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│11. Frontend Updates UI     │
│ - Scoreboard reflects new  │
│   top 10 scores            │
└────────────────────────────┘

## 🛠️ Tech Stack Suggestions

This module can be implemented using the following technologies:

| Layer         | Suggested Technology                           | Notes                                                              |
|---------------|------------------------------------------------|--------------------------------------------------------------------|
| Backend       | Node.js with Express or NestJS                 | Lightweight and scalable; NestJS offers modularity                 |
| Database      | PostgreSQL or MongoDB or SQL Server            | SQL Server, PostgreSQL for relational data; MongoDB for flexibility|
| Real-time     | WebSocket or Server-Sent Events (SSE)          | Enables live scoreboard updates                                    |
| Authentication| JWT or OAuth2                                  | Secure user verification and token-based access                    |
| Caching       | Redis                                          | Improves leaderboard performance and reduces DB load               |
| Rate Limiting | NGINX or middleware (e.g., express-rate-limit) | Prevents abuse and ensures fair usage                              |
| Logging       | Winston or Bunyan                              | For audit trails and debugging                                     |
| Deployment    | Docker + CI/CD (GitHub Actions, Jenkins)       | Containerized deployment and automated pipelines                   |

👥 Audience
This documentation is intended for backend engineers implementing the API service. It provides endpoint specs, security guidelines, and architectural suggestions.

# API Endpoints

1. Submit Score

URL: /api/score

Method: POST

Headers:

Authorization: Bearer <token>

Body:
{
  "newScore": 10
}

Response:
{
  "score": 87.5
}

Description: Validates the action and updates the user’s score. Only authorized users and valid actions can update the score.

2. Get Top Scores

URL: /api/score/top

Method: GET

Response:
{
  "topScores": [
    {
      "id": 0,
      "name": "string",
      "score": 0
    }
  ]
}

Description: Returns top 10 scores for live leaderboard display.

# Security Considerations
- Verify the authenticity of user actions (e.g., use signed tokens or server-side validation).
- Prevent replay attacks or unauthorized score submission.
- Limit score increments per action to prevent abuse.
- Log score updates for auditing.

# Suggested Improvements
- Add endpoint: GET /api/score/history for user score logs.
- Use WebSocket for real-time leaderboard updates instead of frequent polling.
- Introduce rate limiting to prevent API abuse.
- Implement caching for top scores to reduce database load.
- Include audit logging for suspicious score updates.
- Add admin-only endpoint to reset or adjust scores.
- Implement unit and integration tests for all endpoints.
- Use Redis or similar for leaderboard caching.

# Project structure

📦 src
├── 📁 components
│   ├── 📁 authen
│   │   ├── 📁 controller
│   │   │   └── authenController.ts
│   │   ├── 📁 model
│   │   │   └── user.ts
│   │   └── 📁 service
│   │       └── authenService.ts
│   └── 📁 score
│       ├── 📁 controller
│       │   └── scoreController.ts
│       └── 📁 service
│           └── scoreService.ts
├── 📁 middleware
│   └── authMiddleware.ts
├── 📁 routes
│   ├── authRoutes.ts
│   └── scoreRoutes.ts
├── 📁 utils
│   ├── redisClient.ts
│   ├── dataSource.ts
│   ├── server.ts
│   └── swagger.ts
├── 📄 .env
├── 📄 docker-compose.yml
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tsconfig.json
└── README.md

