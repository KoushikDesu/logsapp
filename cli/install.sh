#!/usr/bin/env bash
# ==========================================================
# LogsApp / RoyalChat - Linux CLI Tool Installer
# Works with or without root/sudo (Supports College Lab PCs,
# Shared Linux Servers, Raspberry Pi, Ubuntu, Debian, Arch, etc.)
# ==========================================================

set -e

echo "🚀 Installing LogsApp Linux CLI tool..."

# Check for python3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required. Please install python3 first."
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_CLI="$SCRIPT_DIR/logsapp-cli.py"

# If running via remote curl, download script to temporary file
if [ ! -f "$SOURCE_CLI" ]; then
    SERVER_URL="${LOGSAPP_SERVER:-http://localhost:5000}"
    TMP_SRC=$(mktemp)
    curl -fsSL "$SERVER_URL/api/cli/logsapp-cli.py" -o "$TMP_SRC" || {
        echo "❌ Could not download CLI script from $SERVER_URL"
        exit 1
    }
    SOURCE_CLI="$TMP_SRC"
fi

# Detect install directory based on user permissions (No sudo required for college labs!)
if [ -w "/usr/local/bin" ]; then
    INSTALL_DIR="/usr/local/bin"
elif [ -n "$SUDO_USER" ] || [ "$(id -u)" -eq 0 ]; then
    INSTALL_DIR="/usr/local/bin"
else
    # User-level installation for college/shared accounts
    INSTALL_DIR="$HOME/.local/bin"
    mkdir -p "$INSTALL_DIR"
    
    # Ensure ~/.local/bin is in PATH in ~/.bashrc or ~/.zshrc
    if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
        if [ -f "$HOME/.zshrc" ]; then
            echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
        fi
        export PATH="$HOME/.local/bin:$PATH"
        echo "💡 Added $INSTALL_DIR to your PATH"
    fi
fi

TARGET_FILE="$INSTALL_DIR/logsapp"

cp "$SOURCE_CLI" "$TARGET_FILE"
chmod +x "$TARGET_FILE"

echo "✅ LogsApp CLI installed successfully to $TARGET_FILE!"
echo ""
echo "👉 Quick Start Commands (College / Lab Ready):"
echo "   logsapp login                         # Login with Username or 7-Digit Royal ID"
echo "   logsapp chats                         # List your active conversations"
echo "   logsapp pull @friend                  # Download all shared files into current folder"
echo "   logsapp get <QUICK_CODE>              # Download specific file via 6-digit QuickCode"
echo "   logsapp push-dir ./my_project @friend # Zip and upload entire project folder (up to 1GB)"
echo "   logsapp history @friend               # Read chat messages and code logs"
echo ""
