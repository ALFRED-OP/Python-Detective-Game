import sys
import subprocess
import json
import tempfile
import os
import signal

# Configuration
TIMEOUT_SECONDS = 2.0

def run_code(code):
    try:
        # Create a temporary file to hold the code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as tmp:
            tmp.write(code)
            tmp_path = tmp.name

        # Execute the code in a subprocess with limitations
        # Note: This is a basic soft sandbox. 
        # Production would require Docker/capabilities dropping.
        
        # We start the subprocess
        start_data = {
            "stdout": "",
            "stderr": "",
            "error": None,
            "timeout": False
        }

        try:
            # check=True will allow us to catch non-zero exits if we wanted, 
            # but we want to capture stderr so we don't force check=True immediately 
            # unless we want to catch the error.
            # Using run() is good.
            result = subprocess.run(
                [sys.executable, tmp_path],
                capture_output=True,
                text=True,
                timeout=TIMEOUT_SECONDS
            )
            
            start_data["stdout"] = result.stdout
            start_data["stderr"] = result.stderr
            
            # If return code is non-zero, it might be a runtime error
            if result.returncode != 0:
                 start_data["error"] = "Runtime Error"

        except subprocess.TimeoutExpired:
            start_data["timeout"] = True
            start_data["stderr"] += "\nExecution timed out."
            start_data["error"] = "Timeout"

        except Exception as e:
            start_data["error"] = str(e)

        finally:
            # Cleanup
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        
        return start_data

    except Exception as e:
        return {"error": f"System Error: {str(e)}"}

if __name__ == "__main__":
    # Expect code from stdin
    try:
        input_data = sys.stdin.read()
        if not input_data:
            print(json.dumps({"error": "No code provided"}))
            sys.exit(1)
            
        # Parse JSON input if we want structured input, 
        # but for now let's assume the stdin IS the code string or a JSON wrapper.
        # Let's support a JSON wrapper for extensibility.
        try:
            payload = json.loads(input_data)
            code_to_run = payload.get("code", "")
        except json.JSONDecodeError:
            # Fallback: Treat stdin as raw code
            code_to_run = input_data

        if not code_to_run.strip():
             print(json.dumps({"error": "Empty code"}))
             sys.exit(0)

        result = run_code(code_to_run)
        print(json.dumps(result))

    except Exception as main_e:
        print(json.dumps({"error": f"Runner Error: {str(main_e)}"}))
