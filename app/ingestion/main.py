import subprocess
import os
import sys
from pathlib import Path

def run_script(script_name):
    try:
        print(f"Running {script_name}...")
        # Use the current Python interpreter and the full path to the script
        script_path = os.path.join(os.path.dirname(__file__), script_name)
        subprocess.run([sys.executable, script_path], check=True)
        print(f"{script_name} completed successfully.\n")
    except subprocess.CalledProcessError as e:
        print(f"Error running {script_name}: {e}")

def main():
    # Change working directory to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    run_script("scraper.py")
    run_script("processor.py")

if __name__ == "__main__":
    main()