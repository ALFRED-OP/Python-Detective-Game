# Python Detective Game - Project Structure

## Project Overview

Python Detective Game is an educational cyber-noir mystery platform that teaches Python programming through detective case solving. The application features a React frontend, PHP REST API backend, and Python code execution sandbox.

---

## Technology Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **Monaco Editor** - Code editor
- **Axios** - HTTP client

### Backend
- **PHP 8.0+** - Server-side logic
- **MySQL** - Database
- **Python 3.x** - Code execution sandbox

### Infrastructure
- **CloudPanel** - Server management
- **Nginx** - Web server
- **Cloudflare** - CDN and DDoS protection

---

## Directory Structure

```
Python-Detective-Game/
|
+-- api/                          [Backend - PHP REST API]
|   +-- config/
|   |   +-- database.php          # PDO MySQL connection
|   |
|   +-- controllers/
|   |   +-- AuthController.php    # Login, register, logout
|   |   +-- CaseController.php    # Case CRUD operations
|   |   +-- SubmissionController.php  # Code submission handling
|   |
|   +-- models/
|   |   +-- User.php             # User data model
|   |   +-- CaseModel.php        # Case data model
|   |   +-- SubmissionModel.php  # Submission tracking
|   |
|   +-- utils/
|   |   +-- cors.php             # CORS headers utility
|   |
|   +-- public/
|   |   +-- index.php            # API entry point
|   |   +-- .htaccess            # Apache rewrite rules
|   |
|   +-- package.json             # Node dependencies
|   +-- node_modules/            # Installed packages
|
+-- client/                       [Frontend - React SPA]
|   +-- src/
|   |   +-- main.jsx             # React entry point
|   |   +-- App.jsx              # Main app component
|   |   +-- index.css            # Tailwind global styles
|   |   |
|   |   +-- components/
|   |   |   +-- Navbar.jsx       # Navigation component
|   |   |   +-- CodeEditor.jsx   # Monaco editor wrapper
|   |   |   +-- EvidenceBoard.jsx  # Case evidence display
|   |   |   |
|   |   |   +-- common/
|   |   |   |   +-- Layout.jsx     # Main layout wrapper
|   |   |   |   +-- GlassPanel.jsx  # Glassmorphism panel
|   |   |   |   +-- CyberButton.jsx # Styled button
|   |   |   |   +-- GlassCard.jsx  # Card component
|   |   |   |
|   |   |   +-- dashboard/
|   |   |   |   +-- CaseCard.jsx   # Case list item
|   |   |   |   +-- DashboardScene.jsx  # 3D background
|   |   |   |
|   |   |   +-- case/
|   |   |   |   +-- TerminalOutput.jsx  # Execution output
|   |   |   |
|   |   |   +-- landing/
|   |   |       +-- HeroCanvas.jsx  # 3D landing effect
|   |   |
|   |   +-- pages/
|   |   |   +-- Landing.jsx       # Landing page
|   |   |   +-- Login.jsx         # Login page
|   |   |   +-- Register.jsx       # Registration page
|   |   |   +-- Dashboard.jsx      # Main dashboard
|   |   |   +-- CaseView.jsx       # Individual case view
|   |   |   +-- Leaderboard.jsx    # Global rankings
|   |   |
|   |   +-- context/
|   |   |   +-- AuthContext.jsx   # Auth state management
|   |   |
|   |   +-- lib/
|   |       +-- api.js            # Axios API client
|   |
|   +-- public/
|   |   +-- vite.svg             # Vite logo
|   |
|   +-- package.json             # React dependencies
|   +-- vite.config.js           # Vite configuration
|
+-- engine/                       [Code Sandbox]
|   +-- runner.py                # Python code executor
|
+-- sql/                          [Database]
|   +-- schema.sql               # Database schema
|   +-- seeds_01_10.sql         # Cases 1-10
|   +-- seeds_11_20.sql         # Cases 11-20
|   +-- seeds_21_30.sql         # Cases 21-30
|
+-- docs/
|   +-- architecture_and_design.md  # Technical documentation
|
+-- maintenance/
|   +-- check_users.php          # Admin maintenance
|
+-- CloudPanelSetup.me           # Deployment guide
+-- CloudPanelSetup.md           # Alternative deployment
+-- DEPLOY_TO_XAMPP.md          # Local development
+-- README.md                   # Project readme
+-- INSTALL_ALL.bat             # Windows setup
+-- RUN_FRONTEND.bat            # Windows frontend
+-- RUN_BACKEND.bat             # Windows backend
|
+-- .git/                        # Version control
```

---

## Detailed Component Descriptions

### api/ - Backend Layer

The PHP REST API handles all server-side operations including authentication, case management, and code execution.

| File/Folder | Purpose |
|-------------|---------|
| `config/database.php` | PDO MySQL connection with error handling |
| `controllers/AuthController.php` | User authentication (register, login, logout) |
| `controllers/CaseController.php` | CRUD operations for detective cases |
| `controllers/SubmissionController.php` | Handles code submissions and validation |
| `models/User.php` | User model with password hashing |
| `models/CaseModel.php` | Case data retrieval |
| `models/SubmissionModel.php` | Submission tracking and XP management |
| `utils/cors.php` | Cross-origin resource sharing headers |
| `public/index.php` | API entry point routing all requests |
| `public/.htaccess` | URL rewriting for clean API endpoints |

### client/ - Frontend Layer

The React SPA provides the immersive detective interface with 3D elements, animations, and code editing capabilities.

| File/Folder | Purpose |
|-------------|---------|
| `src/main.jsx` | React application bootstrap |
| `src/App.jsx` | Main router and layout configuration |
| `src/components/Navbar.jsx` | Global navigation bar |
| `src/components/CodeEditor.jsx` | Monaco Editor integration for code input |
| `src/components/EvidenceBoard.jsx` | Displays case suspects, hints, and evidence |
| `src/components/common/Layout.jsx` | Page wrapper with theme |
| `src/components/common/GlassPanel.jsx` | Cyberpunk-style glass container |
| `src/components/common/CyberButton.jsx` | Styled action button |
| `src/components/dashboard/CaseCard.jsx` | Individual case display in dashboard |
| `src/components/dashboard/DashboardScene.jsx` | Three.js 3D background |
| `src/components/case/TerminalOutput.jsx` | Shows code execution results |
| `src/components/landing/HeroCanvas.jsx` | 3D landing page effect |
| `src/pages/Landing.jsx` | Marketing landing page |
| `src/pages/Login.jsx` | User login form |
| `src/pages/Register.jsx` | User registration form |
| `src/pages/Dashboard.jsx` | Case listing and progress |
| `src/pages/CaseView.jsx` | Detailed case investigation |
| `src/pages/Leaderboard.jsx` | User rankings by XP |
| `src/context/AuthContext.jsx` | Authentication state provider |
| `src/lib/api.js` | Axios instance with interceptors |
| `src/index.css` | Tailwind directives and custom styles |

### engine/ - Code Sandbox

| File | Purpose |
|------|---------|
| `runner.py` | Secure Python code execution with timeout and blacklist |

### sql/ - Database Layer

| File | Purpose |
|------|---------|
| `schema.sql` | Creates users, cases, submissions, user_progress tables |
| `seeds_01_10.sql` | Beginner cases (Variables, Data Types) |
| `seeds_11_20.sql` | Intermediate cases (Loops, Functions) |
| `seeds_21_30.sql` | Advanced cases (Algorithms, OOP) |

---

## Data Flow

```
User Browser
    |
    v
[Cloudflare CDN]
    |
    v
[Nginx / CloudPanel]
    |
    +-- Static Files (React Build) --> client/dist/
    |
    v
[PHP-FPM] --> api/public/index.php
    |
    +-- /api/auth/* --> AuthController
    +-- /api/cases/* --> CaseController
    +-- /api/submit --> SubmissionController
    |
    v
[MySQL Database]
    |
    v
[Python Sandbox] --> engine/runner.py
```

---

## Database Schema

### users Table
| Column | Type | Purpose |
|--------|------|---------|
| id | INT | Primary key |
| username | VARCHAR(50) | Unique username |
| password_hash | VARCHAR(255) | Bcrypt hash |
| xp | INT | Experience points |
| rank_title | VARCHAR(50) | Detective rank |
| created_at | TIMESTAMP | Registration date |

### cases Table
| Column | Type | Purpose |
|--------|------|---------|
| id | INT | Primary key |
| title | VARCHAR(100) | Case name |
| description | TEXT | Story briefing |
| difficulty | ENUM | Easy/Medium/Hard |
| category | VARCHAR(50) | Topic classification |
| starting_code | TEXT | Broken code snippet |
| expected_output | TEXT | Correct output |
| hint_1 | TEXT | First hint |
| hint_2 | TEXT | Second hint |
| suspects_json | JSON | Suspect profiles |
| evidence_json | JSON | Evidence items |
| xp_reward | INT | XP for solving |

### submissions Table
| Column | Type | Purpose |
|--------|------|---------|
| id | INT | Primary key |
| user_id | INT | Foreign key to users |
| case_id | INT | Foreign key to cases |
| code | TEXT | Submitted code |
| status | ENUM | Passed/Failed/Error |
| output_log | TEXT | Execution output |
| submitted_at | TIMESTAMP | Submission time |

### user_progress Table
| Column | Type | Purpose |
|--------|------|---------|
| user_id | INT | Foreign key |
| case_id | INT | Foreign key |
| completed | BOOLEAN | Completion status |
| best_time | FLOAT | Fastest completion |
| completed_at | TIMESTAMP | First solve time |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create new account |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |

### Cases
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cases | List all cases |
| GET | /api/cases/:id | Get case details |
| GET | /api/cases?user_id=:id | List with completion status |

### Submissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/submit | Execute code and check solution |
| GET | /api/leaderboard | Get top users by XP |

---

## Development Commands

### Local Development
```bash
# Install dependencies
INSTALL_ALL.bat

# Run frontend (port 5173)
RUN_FRONTEND.bat

# Run backend (port 8000)
RUN_BACKEND.bat
```

### Production Build
```bash
# Build React frontend
cd client && npm run build

# Upload to server
# See CloudPanelSetup.me for deployment
```

---

## Security Features

1. **Password Hashing**: Bcrypt encryption
2. **SQL Injection Protection**: PDO prepared statements
3. **XSS Protection**: HTML escaping in views
4. **CORS**: Proper origin headers
5. **Python Sandbox**: Restricted imports, 2s timeout
6. **Rate Limiting**: Prevent brute force attacks

---

## Performance Optimizations

1. **Static Asset Caching**: Nginx cache headers
2. **Gzip Compression**: Reduced transfer size
3. **Code Splitting**: Lazy loaded routes
4. **Database Indexing**: Fast queries
5. **CDN Caching**: Cloudflare edge caching

---

## File Type Summary

| Category | Extensions | Purpose |
|----------|------------|---------|
| Frontend | .jsx, .js, .css | React components and styles |
| Backend | .php | Server-side logic |
| Database | .sql | Schema and seed data |
| Configuration | .json, .js | Package configs |
| Scripts | .bat | Windows automation |
| Documentation | .md | Project docs |
| Code Engine | .py | Python sandbox |

---

*Last Updated: February 2026*
*Project: Python Detective Game v1.0*
