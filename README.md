# Python Detective Game – Murder Mystery Programming Lab

## 🕵️ Project Overview
**Python Detective Game** is an advanced educational puzzle game where players step into the shoes of a cyber-detective. Inspired by the *SQL Murder Mystery*, this game reimagines the concept for **Python programming**. Players must solve noir-themed murder mysteries by analyzing code evidence, predicting outputs, fixing bugs, and writing logic to uncover clues and catch the killer.

This is **NOT** a tutorial site. It is a logic-driven investigation lab designed to test deep understanding of Python mechanics, from basic variables to advanced algorithms.

## 🚀 Core Features
- **30 Unique Murder Mysteries**: Each case acts as a standalone coding puzzle wrapped in a detective narrative.
- **Full Python Syllabus**: Progression from Variables -> Loops -> Functions -> Recursion -> Algorithms.
- **Cyber-Noir Aesthetic**: A dark, immersive UI built with React and TailwindCSS.
- **Real-time Code Execution**: Secure PHP-based execution engine to run and validate suspect code.
- **Gamification**: XP system, Ranks (Rookie -> Master Detective), Leaderboards, and Achievements.

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: ReactJS (Vite)
- **Styling**: TailwindCSS (Custom Noir Palette: Neon Purple/Green on Dark Slate)
- **State Management**: React Context API
- **Code Editor**: Monaco Editor (VS Code core)
- **HTTP Client**: Axios

### Backend (Server)
- **Language**: PHP 8.0+
- **Architecture**: REST API (Clean MVC structure)
- **Database**: MySQL (Relational Schema)
- **Execution Engine**: PHP `exec()` with timeout and input sanitization (Simulated Sandbox)

## 📂 Folder Structure
```
Python-Detective-Game/
├── api/                  # PHP Backend API
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers (Auth, Game Logic)
│   ├── models/           # Data access layer
│   └── public/           # API Entry point (index.php)
├── client/               # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable UI elements (EvidenceBoard, CodeEditor)
│   │   └── pages/        # Game pages (Dashboard, CaseView)
├── sql/                  # Database Schema & Seeds
└── README.md             # Integration Manual
```

## 🎮 How to Play
1. **Login**: Create a detective profile.
2. **Select a Case**: Start from *Case 001: The Variable Victim* and unlock harder cases.
3. **Investigate**:
    - Read the **Crime Scene Report**.
    - Examine **Suspect Profiles**.
    - Analyze the **Code Evidence** (e.g., a broken script found on the victim's laptop).
4. **Solve**:
    - Fix the code, predict the output, or write a script to filter the suspect list.
    - Submit your solution to the **Execution Engine**.
5. **Verdict**: If your code output matches the killer's signature, you solve the case and earn XP.

## 💾 Installation & Setup

### Prerequisites
- **PHP 8.0+** (Added to system PATH)
- **MySQL** (XAMPP recommended)
- **Node.js & npm**
- **Python 3.x** (Available in system PATH)

### ⚡ Quick Start (Windows)
We've provided automated scripts to get you running quickly:

1. **Setup**: Double-click `INSTALL_ALL.bat`. This installs all frontend and backend dependencies.
2. **Database**: 
   - Ensure MySQL is running.
   - Create a database named `python_detective`.
   - Import `sql/schema.sql` and the seed files in `sql/`.
3. **Run Backend**: Double-click `RUN_BACKEND.bat`. (Leaves terminal open)
4. **Run Frontend**: Double-click `RUN_FRONTEND.bat`. (Leaves terminal open)
5. **Play**: Open `http://localhost:5173`.

### 🛠️ Manual Configuration (Alternative)

#### 1. Database Setup
1. Create a MySQL database named `python_detective`.
2. Import `sql/schema.sql` to create tables.
3. Import the seed files in `sql/` to populate cases.

#### 2. Backend Setup
1. Navigate to `/api`.
2. Configure `config/database.php` with your credentials.
3. Start the PHP server: `php -S localhost:8000 -t public`.

#### 3. Frontend Setup
1. Navigate to `/client`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.


## 🛡️ Security & Sandboxing
The executing engine runs Python code in a controlled subprocess.
- **Timeouts**: Logic runs for max 2 seconds to prevent infinite loops.
- **Restrictions**: `os`, `sys`, and file I/O modules are blocked in the test environment to prevent system access.
- **Production Note**: For a live public version, we recommend wrapping the execution in a **Docker** container.

## 🏆 Scoring System
- **Base XP**: Points based on difficulty (Easy: 100, Medium: 250, Hard: 500).
- **Streak Bonus**: +10% per consecutive solved case.
- **First Try Bonus**: +50 XP for solving without errors.

## 🔮 Future Improvements
- **Multiplayer Mode**: Co-op investigations.
- **Story Editor**: Community-created cases.
- **Visual Debugger**: Step-through execution visualization.

---
*Created for Advanced Level Project - Python Detective Game*
