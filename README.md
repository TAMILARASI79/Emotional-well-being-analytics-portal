# Emotional Well-Being Analytics Portal

## 📌 Project Overview
The Emotional Well-Being Analytics Portal is a web-based application designed to help users track and analyze their daily emotional states. The system allows users to log mood entries and view analytics such as average mood, total entries, and mood trends over time.

This project is developed as part of the Web Development Phase 1 evaluation.

---

## 🚀 Features
- Daily mood logging
- Emotion type selection
- Mood score tracking (1–5 scale)
- Dashboard with analytics
- Mood trend visualization
- Local data storage using JSON

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js (HTTP module)

**Data Storage**
- Local JSON file (file-based storage)

---

## 🏗️ System Architecture

Client-Server Architecture:

User  
↓  
Frontend (HTML, CSS, JS)  
↓  
Node.js Server  
↓  
JSON Data Storage  

The frontend communicates with the Node.js backend using HTTP requests (GET and POST). The backend processes and stores data in a JSON file.

---

## 🗄️ Data Structure

Example emotion entry:

```json
{
  "id": 1,
  "mood_score": 4,
  "emotion_type": "Happy",
  "note": "Had a productive day",
  "created_at": "2026-02-12"
}


