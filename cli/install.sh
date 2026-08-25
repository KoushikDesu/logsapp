#!/usr/bin/env bash
# ==========================================================
# LogsApp / RoyalChat - Linux CLI Tool Installer
# ==========================================================

set -e

echo "👑 Installing LogsApp Linux CLI companion tool..."

INSTALL_DIR="/usr/local/bin"
TARGET_FILE="$INSTALL_DIR/logsapp"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_CLI="$SCRIPT_DIR/logsapp-cli.py"

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required. Please install python3 first."
    exit 1
fi

if [ -f "$SOURCE_CLI" ]; then
    if [ -w "$INSTALL_DIR" ]; then
        cp "$SOURCE_CLI" "$TARGET_FILE"
        chmod +x "$TARGET_FILE"
    else
        echo "🔑 Requesting root permissions to copy to $INSTALL_DIR..."
        sudo cp "$SOURCE_CLI" "$TARGET_FILE"
        sudo chmod +x "$TARGET_FILE"
    fi
else
    echo "❌ Source script not found at $SOURCE_CLI"
    exit 1
fi

echo "✅ LogsApp CLI successfully installed to $TARGET_FILE!"
echo ""
echo "🚀 Try running:"
echo "   logsapp login"
echo "   logsapp chats"
echo "   logsapp get <QUICK_CODE>"
