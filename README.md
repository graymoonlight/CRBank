# CRBank — Crypto Bank

CRBank is a modern bank website application.

## Overview Backend

This repository contains the backend part of the CRBank project, built with NestJS and TypeScript. The backend exposes a REST API for user management, accounts, deposits, withdrawals, and interaction with the TON blockchain using TON SDK and TACT smart contracts.

Currently implemented features:

- User registration, authentication, and password recovery  
- Account management (create and list user accounts)  
- Deposit and withdrawal operations  
- JWT-based authentication and authorization  
- Data validation with class-validator  
- API documentation with Swagger  

Future plans include deeper integration with the TON blockchain and smart contract functionality with TACT.

## Technologies

- **NestJS** — progressive Node.js framework with TypeScript  
- **TypeScript** — typed JavaScript for better reliability  
- **class-validator** — DTO validation  
- **Swagger** — API auto-documentation and testing  
- **JWT** — JSON Web Tokens for secure authorization  
- **Prisma** — ORM for PostgreSQL  
- **PostgreSQL** — relational database  
- **TON SDK** — interaction with the TON blockchain (testnet)  
- **TACT** — smart contract language for TON (in development)  
- **nodemailer** — email sending (password recovery)  
- And more

## Environment Variables

The backend requires the following environment variables to operate correctly:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crbank?schema=public"
PORT=5000
JWT_SECRET=your jwt
JWT_EXPIRES_IN=1h
EMAIL_USER=test@gmail.com
EMAIL_PASSWORD=gmail_app_password
ENCRYPTION_SECRET=your secret
TON_NETWORK=testnet or mainnet
TON_API_KEY=your api key
TON_ENDPOINT=https://testnet-v4.tonhubapi.com
APP_URL=https://your-app.com
TONCONNECT_BRIDGE_URL=https://bridge.tonapi.io/bridge
```

## Getting Started /server

1. Install dependencies

```bash
npm install
```

2. Create a .env file in the project root and add the environment variables listed above.

3. Run the development server

```bash
npm run start:dev
```

4. Access API documentation and test endpoints via Swagger UI

```bash
http://localhost:5000/api
```

## Project Structure

/src/accounts — account creation, deposits, withdrawals

/src/auth — user registration, login, JWT authentication

/src/users — user management

/src/blockchain — integration with TON SDK and TACT smart contracts (work in progress)

/src/common — shared utilities and validation

/src/main.ts — application entry point and configuration

## Roadmap

Full implementation of TON smart contracts using TACT

Integration with frontend and mobile clients

Enhanced KYC and security features

Support for multiple currencies and additional account types

Backend scaling and optimization