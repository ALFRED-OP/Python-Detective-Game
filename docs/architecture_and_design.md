# 📄 Software Requirement Specification (SRS) & Design Document
## Project: Python Detective Game
**Project Category**: Full-Stack Educational Gamification Platform
**Level**: NIELIT A Level Major Project

---

## 1. System Overview
The Python Detective Game is a multi-tier web application designed to teach Python programming through narrative-driven deduction. It employs a **React** frontend for an immersive user experience, a **PHP REST API** for business logic, and a **Python-based Micro-Sandbox** for secure code execution.

---

## 2. Use Case Diagram
Describes the functional requirements from the perspective of the Investigator (User).

```mermaid
graph TD
    Investigator((Investigator))
    Admin((Database Admin))

    subgraph "Python Detective System"
        UC1[Register / Create Profile]
        UC2[Login / Authenticate]
        UC3[Browse Case Files]
        UC4[Investigate Evidence]
        UC5[Write & Execute Python Code]
        UC6[Submit Verdict]
        UC7[View Global Leaderboard]
        UC8[Admin: Archive New Case Files]
        UC9[Persistence: Auto-save Drafts]
        UC10[Rewards: XP & Rank Promotions]
    end

    Investigator --> UC1
    Investigator --> UC2
    Investigator --> UC3
    Investigator --> UC4
    Investigator --> UC5
    Investigator --> UC6
    Investigator --> UC7
    Investigator --> UC9
    Investigator --> UC10
    
    Admin --> UC8
```

---

## 3. System Architecture (Component Diagram)
The system follows a decoupled Client-Server architecture.

```mermaid
graph TD
    subgraph "Client Tier (Frontend)"
        RA[React Application]
        AC[Auth Context]
        AX[Axios Client]
    end

    subgraph "Logic Tier (Backend API)"
        PC[PHP Controller]
        PM[PHP Model]
        CU[CORS/Utility]
    end

    subgraph "Execution Tier (Engine)"
        PR[Python Runner]
    end

    subgraph "Data Tier"
        MD[(MySQL Database)]
    end

    RA --> AX
    AX -- REST/JSON --> PC
    PC --> PM
    PM --> MD
    PC -- proc_open --> PR
```

---

## 4. Class Diagram
Represents the Object-Oriented structure of the Backend API.

```mermaid
classDiagram
    class User {
        +int id
        +string username
        +string password_hash
        +int xp
        +string rank_title
        +create() bool
        +usernameExists() bool
    }

    class CaseModel {
        +getAll(user_id) array
        +getById(id, user_id) array
        +create(data) bool
    }

    class SubmissionModel {
        +create(user_id, case_id, code, status, output, exec_time)
        +saveDraft(user_id, case_id, code) bool
        +updateUserXp(user_id, xp_gain)
        +updateRankTitle(user_id)
        +getLeaderboard() array
        +markCaseCompleted(user_id, case_id, time_taken) bool
    }

    class Database {
        +string host
        +string db_name
        +string username
        +string password
        +getConnection() PDO
    }

    User --> Database : uses
    CaseModel --> Database : uses
    SubmissionModel --> Database : uses
```

---

## 5. Sequence Diagram: Code Submission Flow
Illustrates the chronological interaction between components during a solution attempt.

```mermaid
sequenceDiagram
    participant User as Investigator (UI)
    participant API as PHP Controller
    participant Engine as Python Runner (Sandbox)
    participant DB as MySQL Database

    User->>API: POST /submit (code, case_id)
    API->>DB: Fetch Expected Output for Case
    DB-->>API: Return Expected Output
    API->>API: Start Timer (microtime)
    API->>Engine: Start Subprocess (proc_open)
    Engine->>Engine: Validate Code (is_safe)
    Engine->>Engine: Execute Script (Timeout = 2s)
    Engine-->>API: Return Output (STDOUT/STDERR)
    API->>API: Stop Timer & Calc Execution Time
    API->>API: Compare User Output with Expected
    API->>DB: Save Draft Persistence (saved_code)
    alt Solution Correct
        API->>DB: Update User XP & Recalculate Rank
        API->>DB: Mark Case Solved & Store Best Time
        DB-->>API: Success
    end
    API-->>User: Return Verdict + Execution Time
```

---

## 6. Activity Diagram: Game Logic Loop
Detailed logic flow for resolving a detective case.

```mermaid
stateDiagram-v2
    [*] --> StartCase
    StartCase --> ReadBriefing
    ReadBriefing --> AnalyzeCode
    AnalyzeCode --> EditSolution
    EditSolution --> ExecuteCode
    ExecuteCode --> CheckSafety
    
    state CheckSafety <<choice>>
    CheckSafety --> SecurityViolation : Dangerous Ops
    CheckSafety --> RunScript : Safe
    
    SecurityViolation --> EditSolution : Refactor
    
    RunScript --> CompareOutput
    
    state CompareOutput <<choice>>
    CompareOutput --> CaseSolved : Match
    CompareOutput --> FeedbackFailed : Partial Match / Bug
    
    FeedbackFailed --> AnalyzeCode : Rethink Logic
    CaseSolved --> UpdateXP : Reward
    UpdateXP --> [*]
```

---

## 7. Deployment Diagram
Hardware and software mapping for the production/development environment.

```mermaid
graph TD
    subgraph "User Device"
        WB[Web Browser]
    end

    subgraph "Web Server (XAMPP/NGINX)"
        PHP[PHP 8.0 Interpreter]
        Vite[Vite Dev Server Node.js]
    end

    subgraph "Storage Server"
        DB[(MySQL Instance)]
    end

    subgraph "Sandbox Node"
        Py[Python 3.13 Runtime]
    end

    WB -- HTTP/HTTPS --> Vite
    Vite -- FastCGI --> PHP
    PHP -- TCP/IP 3306 --> DB
    PHP -- Shell Execution --> Py
```

---

## 8. Development & Planning
- **Phase 1: Database Design**: Implementation of `schema.sql` (Users, Cases, Submissions).
- **Phase 2: Backend Development**: Building the PHP REST API with MVC patterns.
- **Phase 3: Sandbox Engineering**: Creating `runner.py` with security restrictions.
- **Phase 4: Frontend Immersive UI**: React + Tailwind v4 + Framer Motion.
- **Phase 5: Content Creation**: Seeding the 30 logical cases.
- **Phase 6: Advanced Overhaul**: Implementing Administrative panel, Persistence, and Precise Execution Metrics.

---

## 9. Technical Specifications: Major Enhancements
### 9.1 Administrative Subsystem
Built using a custom `AdminDashboard` component, allowing dynamic expansion of the mystery archive via RESTful API.

### 9.2 Persistence Layer
Employs a `saved_code` column in the `user_progress` table, ensuring the **Cyber-Noir** immersive experience is preserved across sessions. 

### 9.3 Performance Metric Engine
Utilizes high-resolution PHP `microtime` and automated rank calculation triggers within `SubmissionModel`.

---

*End of Documentation*