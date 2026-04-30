# Expense Tracker

A minimal full-stack expense tracker built with React and Node.js.

## Features

* Add expense (amount, category, description, date)
* View list of expenses
* Filter by category
* Sort by date (newest/oldest)
* Delete expenses
* Total expense calculation
* Retry-safe API using idempotency key

## Tech Stack

* Frontend: React (Vite)
* Backend: Node.js, Express
* Database: MongoDB

## Key Design Decisions

### Money Handling

Amounts are stored as integers (paise) to avoid floating point precision issues.

### Idempotency

POST /expenses uses an Idempotency-Key header to prevent duplicate entries during retries.

### Persistence

MongoDB is used for reliable storage.

## Trade-offs

* No authentication
* No pagination
* Minimal UI styling

## Setup Instructions

### Backend

cd backend
npm install
node index.js

### Frontend

cd frontend
npm install
npm run dev

## Live Demo

(Add your deployed URL here)
