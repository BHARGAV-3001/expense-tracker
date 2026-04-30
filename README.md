# Expense Tracker

A minimal full-stack Expense Tracker built with React, Node.js, and MongoDB. It allows users to track, filter, sort, and manage their expenses in a simple and reliable way.

---

## 🚀 Features

* Add expense (amount, category, description, date)
* View list of expenses
* Filter by category
* Sort by date (newest/oldest)
* Delete expenses
* View total expenses
* Retry-safe API using idempotency keys

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MongoDB

---

## 🧠 Key Design Decisions

### Money Handling

Amounts are stored as integers (paise) to avoid floating-point precision issues.

### Idempotency

POST `/expenses` uses an **Idempotency-Key** header to prevent duplicate entries during retries (e.g., network failures or repeated clicks).

### Persistence

MongoDB is used for reliable and scalable data storage.

---

## ⚖️ Trade-offs

* No authentication (out of scope)
* No pagination (assumes small dataset)
* Minimal UI styling to focus on correctness and functionality

---

## ⚙️ Setup Instructions

### Backend

cd backend
npm install
node index.js

---

### Frontend

cd frontend
npm install
npm run dev

---

## 🌐 Live Demo

👉 (Add your deployed frontend URL here)

---

## 📌 Notes

This project focuses on **correctness, reliability, and production-like behavior**, especially handling retries and ensuring data consistency.
