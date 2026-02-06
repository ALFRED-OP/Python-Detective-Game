# 🕵️ Python Detective Game
### *The Cyber-Noir Murder Mystery Programming Lab*

[![Status](https://img.shields.io/badge/Status-Active_Investigation-00ff41)](https://github.com/ALFRED-OP/Python-Detective-Game)
[![Tech](https://img.shields.io/badge/Stack-React_|_PHP_|_MySQL-b026ff)](https://github.com/ALFRED-OP/Python-Detective-Game)
[![Security](https://img.shields.io/badge/Sandbox-Python_3.13.7-00f3ff)](https://github.com/ALFRED-OP/Python-Detective-Game)
[![Docs](https://img.shields.io/badge/Documentation-Architecture_&_Design-important)](docs/architecture_and_design.md)

Welcome to the **Python Detective Game**, an immersive investigation experience where code analysis is your primary weapon. Step into the shoes of a cyber-noir detective, analyze corrupted scripts found at crime scenes, and fix logic gaps to catch killers.

---

## 🔍 The Detective's Handbook: How to Play

Solving a case requires more than just code; it requires **deduction**.

### 1. The Investigation (Briefing)
Start by reading the **Crime Scene Report**. Look for keywords like "Time of Death", "Transaction Price", or "Access Logs". These tell you **what** the correct code output should be.

### 2. The Analysis (Suspects)
Check the **Suspect Profiles**. Each suspect has a "Bio" that often hints at their coding style or motive. Some suspects are known for "chaotic variable names" or "skipping loops".

### 3. The Evidence (Code)
Examine the **Code Evidence** tab. This is usually a snippet of Python code found on a victim's device. 
- **Identify the Bug**: Is there a `Type Error`? A `Loop Hole`? Or a missing `return`?
- **Fix the Logic**: Edit the code in the **Cyber-Deck Editor** (the digital workspace on the right).

### 4. The Verdict (Execution)
Press **EXECUTE**.
- The system will run your code in a secure sandbox.
- **Match the Signature**: Your output must *exactly* match the "expected signature".
- **Solved Badges**: Once a case is solved, a high-contrast **SOLVED** badge will appear on your HQ dashboard.
- **Rank Promotion**: Rise from a **Rookie** to a **Master Detective** based on your total XP.

---

## 🚀 Advanced Technical Features

Elevating the investigation experience with professional-grade tools:
- **Dynamic Detective Ranking**: Automated rank promotion system (Rookie → Junior → Specialist → Senior → Master).
- **Code Draft Persistence**: Your code edits are automatically saved to the database. Never lose an investigation.
- **Precise Execution Metrics**: View execution time in milliseconds for every code execution.
- **Visual Progress Tracking**: Real-time status indicators on the Case Files dashboard.

---

## 🔐 Administrative Access: Case Manager

The project includes a professional **Case Archive Manager** for adding new mystery cases without manual SQL:
1.  **Access Hub**: Navigate to `/admin` in your browser.
2.  **Archive Case**: Fill out the Crime Briefing, Starting Code (Evidence), and Expected Output.
3.  **Deploy**: Click "Archive Case File" to instantly add the mystery to the live game.

---

## 💾 Installation & Setup (Developer Guide)

### Prerequisites
- **PHP 8.0+**
- **MySQL** (XAMPP recommended)
- **Node.js & npm**
- **Python 3.x** (Added to your system PATH)

### ⚡ Quick Start (Windows)
1. **Prepare Environment**: Double-click `INSTALL_ALL.bat`. (Wait for completion)
2. **Setup Database**:
   - Create a MySQL database named `python_detective`.
   - Import `sql/schema.sql`.
   - Import all files from the `sql/` folder to populate the 30 cases.
3. **Launch API**: Double-click `RUN_BACKEND.bat`. (Keep terminal open)
4. **Launch UI**: Double-click `RUN_FRONTEND.bat`. (Keep terminal open)
5. **Access Hub**: Open `http://localhost:5173`.

---

## 📂 Project Structure
```text
├── api/                  # PHP REST API (Ranking & Persistence Logic)
├── client/               # ReactJS Frontend (Admin Panel & Dashboard)
├── engine/               # Hardened Python Sandbox (runner.py)
├── sql/                  # Database Schemas & Mystery Seeds
├── maintenance/          # Internal debug & maintenance scripts
├── INSTALL_ALL.bat       # Automatic environment setup
├── RUN_BACKEND.bat       # API & Backend Runner
└── RUN_FRONTEND.bat      # Frontend UI Runner
```

---

## 🛡️ Security & Sandbox Policy
The engine executes user-provided code using a **Soft Sandbox** method:
- **Restricted Imports**: `os`, `sys`, `subprocess`, and `socket` are blocked to prevent system intrusion.
- **Execution Limits**: Each script is terminated after **2.0 seconds** to prevent infinite loops.
- **Memory Safety**: Temporary files are instantly purged after execution.

---

## 🛠️ Troubleshooting
- **Network Error**: Ensure `RUN_BACKEND.bat` is running and your database credentials in `api/config/database.php` are correct.
- **Styling Issues**: Ensure you are using the latest `npm install` (via `INSTALL_ALL.bat`) as we use **Tailwind v4**.
- **Python Not Recognized**: Ensure `python` is in your Windows Environment Variables (PATH).

---
*Created for Advanced Level Project - Python Detective Game*

