# Python-Detective-Game
Inspired by the SQL Murder Mystery Game, but redesigned for the Python programming language with deeper logic, debugging, and reasoning challenges.

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Build the image
docker build -t detective-game .

# Run the game
docker run -it detective-game
```

### Option 2: Local Installation

```bash
# Create and activate virtual environment
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the game
python detective_game.py
```

## 🎮 How to Play

### The Setup

**Crime:** A murder has occurred in the city!
**Objective:** Use your Python skills to investigate the crime scene, interview witnesses, and identify the murderer.

### Gameplay

1.  **Start the game:**
    ```bash
    python detective_game.py
    ```

2.  **Examine the crime scene:**
The game will present you with clues and evidence.

3.  **Investigate:**
    Use the `investigate` command to examine different locations:
    ```
    investigate [location]
    ```
    Example:
    ```
    investigate library
    ```

4.  **Interview witnesses:**
    Talk to witnesses to gather information:
    ```
    interview [witness_name]
    ```
    Example:
    ```
    interview librarian
    ```

5.  **Accuse the murderer:**
    Once you've gathered enough evidence, make your accusation:
    ```
    accuse [murderer_name]
    ```
    Example:
    ```
    accuse Professor Plum
    ```

### Commands

| Command | Description |
|---------|-------------|
| `investigate [location]` | Examine a location for clues |
| `interview [witness]` | Talk to a witness |
| `accuse [suspect]` | Make an accusation |
| `help` | Show this help message |
| `quit` | Exit the game |

## 🧩 Features

-   **Interactive CLI:** Engage with the game through a text-based interface
-   **Multiple Locations:** Explore different areas to find clues
-   **Dynamic Storytelling:** Clues and dialogue change based on your investigation
-   **Evidence Tracking:** Keep track of clues you've discovered
-   **Multiple Endings:** Correct and incorrect accusations have different outcomes

## 🛠️ Development

### Project Structure

```
detective_game/
├── data/                  # Game data and evidence
│   ├── locations.json
│   ├── witnesses.json
│   └── clues.json
├── src/
│   ├── game.py            # Main game logic
│   ├── clues.py           # Clue management
│   ├── locations.py       # Location exploration
│   ├── witnesses.py       # Witness interviews
│   └── utils.py           # Utility functions
├── detective_game.py      # Entry point
├── requirements.txt       # Dependencies
└── Dockerfile             # Docker configuration
```

### Adding New Content

To add new locations, witnesses, or clues, simply update the JSON files in the `data/` directory:

1.  **Locations:** Add new locations to `data/locations.json`
2.  **Witnesses:** Add new witnesses to `data/witnesses.json`
3.  **Clues:** Add new clues to `data/clues.json`

The game will automatically load the updated data on next run.

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
python -m unittest discover tests

# Run specific test file
python -m unittest tests/test_clues.py
```

### Integration Tests

```bash
# Test game flow
python -m unittest tests/test_game_flow.py
```

## 🐳 Docker

### Build Options

```bash
# Build with specific tag
docker build -t detective-game:v1 .

# Build with no cache
docker build --no-cache -t detective-game .
```

### Run Options

```bash
# Run with port mapping (if needed)
docker run -p 8080:8080 -it detective-game

# Run in detached mode
docker run -d detective-game
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

## 🙏 Acknowledgments

-   Inspired by the [SQL Murder Mystery Game](https://github.com/KillTheBot/sql-murder-mystery)
-   Built with Python 3.x

---

**Happy Sleuthing! 🕵️‍♂️**

