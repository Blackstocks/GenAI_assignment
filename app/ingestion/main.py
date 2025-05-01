import subprocess
import os
import sys
from pathlib import Path

# Utility function to run a Python script using the current interpreter
def run_script(script_name):
    try:
        print(f"Running {script_name}...")
        # Build the full path to the script relative to this file's directory
        script_path = os.path.join(os.path.dirname(__file__), script_name)
        # Run the script using the same Python interpreter as the current process
        subprocess.run([sys.executable, script_path], check=True)
        print(f"{script_name} completed successfully.\n")
    except subprocess.CalledProcessError as e:
        # Print error if the script fails
        print(f"Error running {script_name}: {e}")

# Main execution function
def main():
    # Set the working directory to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Execute the two pipeline scripts sequentially
    run_script("scraper.py")    # Scrapes restaurant/menu data
    run_script("processor.py")  # Processes and stores scraped data

# If this script is run directly (not imported), call main()
if __name__ == "__main__":
    main()
