# 🛡️ AI-Based Deepfake Detection System

An AI-powered web application designed to detect manipulated (deepfake) videos using advanced Computer Vision and Deep Learning techniques. The system analyzes uploaded videos, identifies forged content, and generates detailed forensic reports with confidence scores and visual explanations.

---

## 📖 Overview

The rapid advancement of Generative AI has made it easier than ever to create convincing fake videos. This project aims to provide a reliable and user-friendly platform for detecting deepfake videos through a combination of video analysis, audio analysis, and explainable AI techniques.

This project is being developed as a Major Project for the Bachelor of Engineering in Software Engineering.

---

## ✨ Features

- 🔐 User Authentication
- 📤 Video Upload
- 🎥 Frame Extraction
- 😀 Face Detection
- 🧠 AI-Based Deepfake Detection
- 🔊 Audio Tampering Detection
- 📊 Confidence Score Generation
- 🔥 Frame-Level Heatmap Visualization
- 📄 PDF Report Generation
- 📚 Analysis History Dashboard

---

## 🏗️ Project Architecture

```
Frontend (React)
        │
        ▼
Backend (Django REST API)
        │
        ▼
AI Engine (PyTorch)
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
Video Analysis   Audio Analysis
 │               │
 └──────┬────────┘
        ▼
 Fusion Engine
        │
        ▼
 Result Generation
        │
        ▼
 MongoDB Database
```

---

## 📂 Project Structure

```
AI-Deepfake-Detection/
│
├── frontend/
├── backend/
├── ai-engine/
│   ├── datasets/
│   ├── models/
│   ├── preprocessing/
│   ├── training/
│   ├── inference/
│   ├── utils/
│   ├── checkpoints/
│   └── outputs/
│
├── docs/
├── reports/
├── datasets/
├── README.md
└── .gitignore
```

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Django
- Django REST Framework

### Artificial Intelligence
- PyTorch
- OpenCV
- Librosa
- NumPy
- Pandas

### Database
- MongoDB

### Development Tools
- Git
- GitHub
- Visual Studio Code

---

## 🚀 Development Roadmap

### Phase 1
- Project Setup
- Git Repository
- React Frontend
- Django Backend

### Phase 2
- Authentication System
- Video Upload Module

### Phase 3
- Deepfake Detection Model
- Frame Extraction
- Face Detection

### Phase 4
- Audio Analysis
- Multi-modal Fusion

### Phase 5
- Explainable AI
- Report Generation

### Phase 6
- Testing
- Deployment
- Documentation

---

## 📊 Expected Output

- Deepfake Prediction
- Confidence Score
- Fake vs Real Probability
- Suspicious Frame Highlighting
- Downloadable PDF Report

---

## 👥 Team Members

- Ankit Katwal
- Bhupesh Bhatt
- Lalit Nath
- Sunil Giri

---

## 🎯 Project Status

🚧 Currently Under Development

Version: **0.1.0**

---

## 📜 License

This project is developed for educational and research purposes.

---

## 📬 Contact

For suggestions or collaboration, please contact the project team.
