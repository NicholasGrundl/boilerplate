# 0. Set Up Developer Virtual Environment

This guide provides instructions for setting up a development environment for the `boilerplate` project using Windows Subsystem for Linux 2 (WSL2) and Miniconda. It includes separate setups for Python and Node.js projects.

## Prerequisites

- Windows Subsystem for Linux 2 (WSL2) installed
- Miniconda installed in your WSL2 environment

If you haven't installed these, please do so before proceeding.

## OS-Level Package Installation

We'll use a custom file to specify required packages and a shell script to install them. This approach allows for easy customization and version control of your development environment setup.

1. Create a file named `required_packages.txt` in your project root:

```bash
touch required_packages.txt
```

2. Add the following content to `required_packages.txt`:

```
build-essential
google-cloud-sdk
make
tesseract-ocr
ffmpeg
libssl-dev
zlib1g-dev
libbz2-dev
libreadline-dev
libsqlite3-dev
wget
curl
llvm
libncurses5-dev
libncursesw5-dev
xz-utils
tk-dev
libffi-dev
liblzma-dev
python-openssl
nodejs
npm
docker.io
kubectl
```

3. Create a shell script named `setup_environment.sh`:

```bash
touch setup_environment.sh
chmod +x setup_environment.sh
```

4. Add the following content to `setup_environment.sh`:

```bash
#!/bin/bash

# Update package lists
sudo apt update

# Install packages from required_packages.txt
while read package; do
  if ! dpkg -s "$package" >/dev/null 2>&1; then
    sudo apt install -y "$package"
  else
    echo "$package is already installed"
  fi
done < required_packages.txt

# Setup Google Cloud SDK repository
if [ ! -f /etc/apt/sources.list.d/google-cloud-sdk.list ]; then
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
  sudo apt update && sudo apt install -y google-cloud-sdk
fi

# Install or update npm packages globally
npm install -g react react-dom create-react-app

# Install Docker (if not already installed)
if ! command -v docker &> /dev/null; then
  sudo apt install -y docker.io
  sudo usermod -aG docker $USER
  echo "Please log out and log back in for Docker permissions to take effect"
fi

# Install kubectl (if not already installed)
if ! command -v kubectl &> /dev/null; then
  sudo apt install -y kubectl
fi

echo "Environment setup complete!"
```

5. Run the script to set up your environment:

```bash
./setup_environment.sh
```

This script will install all necessary packages for React development, GCP deployment, Kubernetes, and Docker.

## Stripped-Down Version for Checking Installed Packages

For cases where you assume the OS is largely set up and you just want to check what packages are installed and available, you can use this stripped-down version:

Create a file named `check_environment.sh`:

```bash
touch check_environment.sh
chmod +x check_environment.sh
```

Add the following content to `check_environment.sh`:

```bash
#!/bin/bash

check_command() {
  if command -v $1 &> /dev/null; then
    echo "$1 is installed"
  else
    echo "$1 is NOT installed"
  fi
}

check_package() {
  if dpkg -s "$1" >/dev/null 2>&1; then
    echo "$1 is installed"
  else
    echo "$1 is NOT installed"
  fi
}

echo "Checking development environment..."

# Check common commands
check_command node
check_command npm
check_command python3
check_command docker
check_command kubectl
check_command gcloud

# Check common packages
check_package build-essential
check_package google-cloud-sdk
check_package tesseract-ocr
check_package ffmpeg

echo "Environment check complete!"
```

Run this script to check your environment:

```bash
./check_environment.sh
```

This script will check for the presence of common commands and packages used in development, GCP deployment, and containerization, without installing anything.

## CLI scripts

Before setting up your project environment, you may need to install some OS-level packages. Open your WSL2 terminal and run the following commands:

```bash
# Update package lists
sudo apt update

# Install basic build tools
sudo apt install -y build-essential

# Install gcloud CLI
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt update && sudo apt install -y google-cloud-sdk

# Install Make
sudo apt install -y make

# Install additional dependencies that might be needed
sudo apt wget curl
```

## Python Project Setup

Follow these steps to set up a Python-based `boilerplate` project:

1. Open your WSL2 terminal.

2. Create and activate a new Conda environment:
   ```bash
   conda create -n boilerplate python=3.9
   conda activate boilerplate
   ```

3. Create a new directory for your project and navigate to it:
   ```bash
   mkdir boilerplate
   cd boilerplate
   ```

4. Create necessary files:
   ```bash
   touch requirements.txt .env .gitignore
   ```

5. Add `.env` to your `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```

6. Install `python-dotenv`:
   ```bash
   pip install python-dotenv
   echo "python-dotenv" >> requirements.txt
   ```

7. Open the `.env` file in your preferred text editor and add your environment variables:
   ```
   API_KEY=your_api_key_here
   DATABASE_URL=your_database_url_here
   ```

8. Create a `config.py` file to load environment variables:
   ```bash
   touch config.py
   ```

9. Add the following content to `config.py`:
   ```python
   from dotenv import load_dotenv
   import os

   load_dotenv()

   API_KEY = os.getenv('API_KEY')
   DATABASE_URL = os.getenv('DATABASE_URL')
   ```

10. Initialize a git repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

Your Python-based `boilerplate` project is now set up and ready for development!

## Node.js Project Setup

Follow these steps to set up a Node.js-based `boilerplate` project:

1. Open your WSL2 terminal.

2. Create and activate a new Conda environment:
   ```bash
   conda create -n boilerplate nodejs=14
   conda activate boilerplate
   ```

3. Create a new directory for your project and navigate to it:
   ```bash
   mkdir boilerplate
   cd boilerplate
   ```

4. Initialize your Node.js project:
   ```bash
   npm init -y
   ```

5. Create necessary files:
   ```bash
   touch .env .gitignore
   ```

6. Add `.env` to your `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```

7. Install `dotenv` to manage environment variables:
   ```bash
   npm install dotenv
   ```

8. Open the `.env` file in your preferred text editor and add your environment variables:
   ```
   API_KEY=your_api_key_here
   DATABASE_URL=your_database_url_here
   ```

9. Create a `config.js` file to load environment variables:
   ```bash
   touch config.js
   ```

10. Add the following content to `config.js`:
    ```javascript
    require('dotenv').config();

    module.exports = {
      apiKey: process.env.API_KEY,
      databaseUrl: process.env.DATABASE_URL,
    };
    ```

11. Initialize a git repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

Your Node.js-based `boilerplate` project is now set up and ready for development!

## Using Environment Variables

For Python projects, you can use environment variables in your code like this:
```python
from config import API_KEY, DATABASE_URL

print(API_KEY)
print(DATABASE_URL)
```

For Node.js projects, you can use environment variables in your code like this:
```javascript
const config = require('./config');

console.log(config.apiKey);
console.log(config.databaseUrl);
```

Remember to never commit your `.env` file to version control, as it contains sensitive information. Always use `.gitignore` to exclude it.
