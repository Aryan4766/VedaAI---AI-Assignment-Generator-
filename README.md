# VedaAI — AI Assessment Creator

An AI-powered assessment generation platform built with scalable real-time architecture, structured LLM pipelines, and a Figma-accurate frontend implementation.

Teachers can create assignments, configure question structures, generate AI-powered question papers, receive real-time generation updates, and export professionally formatted PDFs.

---

##  Live Deployment

| Service | Link |
|---|---|
| Frontend | https://veda-ai-ai-assignment-generator.vercel.app |
| Backend API | https://vedaai-backend-cxvw.onrender.com/api/assignments |

### Demo Flow
Create Assignment → AI Generation → Real-time Processing → PDF Export


---

# Features

* Figma-accurate responsive UI
* Assignment creation workflow
* Structured AI-generated question papers
* Real-time generation updates using WebSockets
* BullMQ + Redis background processing
* MongoDB persistence layer
* PDF export with print-optimized formatting
* Structured JSON validation using Zod
* Graceful fallback mock generation for demos/testing

---

# Tech Stack

| Layer          | Technologies                                                    |
| -------------- | --------------------------------------------------------------- |
| Frontend       | Next.js 14, TypeScript, TailwindCSS, Zustand, Socket.io-client  |
| Backend        | Node.js, Express, TypeScript, MongoDB, Redis, BullMQ, Socket.io |
| AI Layer       | OpenRouter API, Structured JSON generation, Zod validation      |
| Infrastructure | Docker, MongoDB Atlas, Redis                                    |

---

# Architecture

```text
Frontend → Express API → BullMQ Queue → Worker → OpenRouter
                ↓                              ↓
            MongoDB  ←──────────────────  Store paper
                ↓
         Socket.io events → Frontend real-time UI
```

---

# Generation Flow

```text
Teacher creates assignment
        ↓
Assignment saved in MongoDB
        ↓
BullMQ job added to Redis queue
        ↓
Worker processes AI generation
        ↓
OpenRouter returns structured JSON
        ↓
Zod validates schema
        ↓
Generated paper stored in MongoDB
        ↓
Socket.io emits realtime update
        ↓
Frontend updates automatically
        ↓
Teacher reviews & exports PDF
```

---

# Project Structure

```text
frontend/           # Next.js frontend (App Router)
backend/            # Express backend + workers + queues
docker-compose.yml  # Local infrastructure services
```

---

# Pages

| Route                          | Description                           |
| ------------------------------ | ------------------------------------- |
| `/assignments`                 | Assignment dashboard                  |
| `/assignments/create`          | Assignment creation form              |
| `/assignments/[id]/generating` | Real-time generation progress         |
| `/assignments/[id]`            | Generated question paper + PDF export |

---

# Core Functionalities

## Assignment Creation

Teachers can:

* Add assignment title and subject
* Configure question types
* Define number of questions and marks
* Add additional instructions
* Upload optional supporting files

Validation ensures:

* required fields
* valid dates
* positive question counts
* positive marks

---

## AI Question Generation

The system:

* converts user input into structured prompts
* generates sectioned examination papers
* validates AI output using Zod schemas
* prevents rendering raw LLM responses

Generated papers include:

* sections (A, B, etc.)
* question hierarchy
* marks
* difficulty tags
* instructions

---

## Real-Time Updates

Generation progress is handled using:

* BullMQ
* Redis
* Socket.io

Realtime events:

* queued
* processing
* completed
* failed

Frontend updates automatically without refresh.

---

# PDF Export

Question papers can be exported as professionally formatted PDFs using print-optimized A4 rendering.

Features:

* clean academic formatting
* stable page layout
* readable typography
* browser-native PDF generation
* print-safe spacing

---

# API Endpoints

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | `/api/assignments`              | Fetch assignments   |
| POST   | `/api/assignments`              | Create assignment   |
| GET    | `/api/assignments/:id`          | Get assignment      |
| DELETE | `/api/assignments/:id`          | Delete assignment   |
| POST   | `/api/assignments/:id/generate` | Queue AI generation |
| GET    | `/api/assignments/:id/paper`    | Get generated paper |

---

# Environment Variables

## Backend (`backend/.env`)

```env
PORT=4000

MONGODB_URI=

REDIS_URL=redis://localhost:6379

OPENROUTER_API_KEY=

OPENROUTER_MODEL=google/gemini-2.0-flash-001

CLIENT_ORIGIN=http://localhost:3000
```

## Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000

NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone <repo-url>
```

---

## 2. Start Infrastructure

```bash
docker compose up -d
```

This starts:

* Redis
* MongoDB services

---

## 3. Backend Setup

```bash
cd backend

npm install

npm run dev
```

Start worker in a separate terminal:

```bash
npm run worker
```

---

## 4. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Key Engineering Decisions

* Structured JSON generation instead of rendering raw LLM text
* BullMQ + Redis for asynchronous AI processing
* Socket.io for real-time frontend updates
* Zod validation layer for reliable rendering
* Modular frontend component architecture
* Print-optimized academic paper formatting
* Graceful AI fallback generation for demos/testing

---

# Future Improvements

* File-based context extraction from PDFs/images
* Regenerate question paper functionality
* Authentication and multi-user support
* Difficulty balancing system
* Assignment analytics dashboard
* Cloud PDF rendering service
* AI-generated answer explanations

---

# Approach

This project was built with a strong focus on:

* frontend accuracy
* scalable backend architecture
* real-time systems
* structured AI workflows
* production-style engineering practices

The implementation prioritizes maintainability, modularity, and clean user experience while closely matching the provided Figma designs.
