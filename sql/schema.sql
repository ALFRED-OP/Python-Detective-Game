-- Database Schema for Python Detective Game

CREATE DATABASE IF NOT EXISTS python_detective;
USE python_detective;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    xp INT DEFAULT 0,
    rank_title VARCHAR(50) DEFAULT 'Rookie Investigator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases Table
CREATE TABLE IF NOT EXISTS cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL, -- The story/briefing
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., "Variables", "Loops"
    starting_code TEXT NOT NULL, -- The "evidence" code
    expected_output TEXT NOT NULL, -- The solution target
    hidden_test_code TEXT DEFAULT NULL, -- Additional validation code
    hint_1 TEXT,
    hint_2 TEXT,
    suspects_json JSON, -- Array of suspect objects {name, bio}
    evidence_json JSON, -- Array of evidence strings
    xp_reward INT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    case_id INT NOT NULL,
    code TEXT NOT NULL,
    status ENUM('Passed', 'Failed', 'Error') NOT NULL,
    output_log TEXT,
    execution_time FLOAT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- User Progress / Unlocks
CREATE TABLE IF NOT EXISTS user_progress (
    user_id INT NOT NULL,
    case_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    best_time FLOAT,
    completed_at TIMESTAMP,
    PRIMARY KEY (user_id, case_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- Leaderboard (View or Table, keeping it simple as a query for now, but indexing helps)
CREATE INDEX idx_xp ON users(xp DESC);
