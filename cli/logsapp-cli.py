#!/usr/bin/env python3
"""
LogsApp / RoyalChat CLI Companion Tool
---------------------------------------
Zero-dependency, standalone Linux & Cross-Platform Terminal Client.
Works on any Linux distro without requiring extra pip packages.

Usage:
  logsapp login
  logsapp whoami
  logsapp chats
  logsapp history <chat_id_or_@username>
  logsapp send <chat_id_or_@username> "Hello world"
  logsapp upload <chat_id_or_@username> <file_path>
  logsapp files [chat_id_or_@username]
  logsapp get <quick_code_or_file_id> [destination_path]
"""

import sys
import os
import json
import argparse
import getpass
import time
import mimetypes
from urllib import request, parse, error
from pathlib import Path

# Safe cross-platform UTF-8 terminal output
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

DEFAULT_SERVER = os.environ.get("LOGSAPP_SERVER", "https://logsapp-2vqv.onrender.com")
SESSION_FILE = Path.home() / ".logsapp_session.json"

# ANSI Colors for Terminal Output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    RESET = '\033[0m'

def print_banner():
    banner = f"""{Colors.CYAN}{Colors.BOLD}
  ==============================================================
   LOGSAPP / ROYALCHAT - High-Speed Terminal Companion (Up to 1GB)
  ==============================================================
{Colors.RESET}"""
    print(banner)

def load_session():
    if SESSION_FILE.exists():
        try:
            with open(SESSION_FILE, 'r') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_session(data):
    try:
        with open(SESSION_FILE, 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"{Colors.RED}Error saving session: {e}{Colors.RESET}")

def get_server_url():
    session = load_session()
    return session.get("server_url", DEFAULT_SERVER)

def make_request(endpoint, method="GET", data=None, token=None, headers=None, stream=False):
    server = get_server_url().rstrip('/')
    url = f"{server}{endpoint}"
    
    req_headers = {
        "User-Agent": "LogsApp-CLI/1.0"
    }
    if token:
        req_headers["Authorization"] = f"Bearer {token}"
    if headers:
        req_headers.update(headers)

    body = None
    if data is not None:
        if isinstance(data, dict):
            body = json.dumps(data).encode('utf-8')
            req_headers["Content-Type"] = "application/json"
        elif isinstance(data, (bytes, bytearray)):
            body = data

    req = request.Request(url, data=body, headers=req_headers, method=method)
    
    try:
        response = request.urlopen(req, timeout=120)
        if stream:
            return response
        content = response.read().decode('utf-8')
        try:
            return json.loads(content)
        except Exception:
            return {"raw": content}
    except error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        try:
            err_json = json.loads(err_body)
            print(f"{Colors.RED}❌ Error ({e.code}): {err_json.get('error', err_body)}{Colors.RESET}")
        except Exception:
            print(f"{Colors.RED}❌ Error ({e.code}): {err_body}{Colors.RESET}")
        return None
    except Exception as e:
        print(f"{Colors.RED}❌ Network error: {e}{Colors.RESET}")
        return None

def cmd_login(args):
    print_banner()
    server = getattr(args, 'server', None)
    if not server:
        try:
            server = input(f"Server URL [{get_server_url()}]: ").strip()
        except Exception:
            server = get_server_url()
    if not server:
        server = get_server_url()
    
    identifier = getattr(args, 'identifier', None)
    if not identifier:
        try:
            identifier = input("Username or RoyalID: ").strip()
        except Exception:
            identifier = ""

    password = getattr(args, 'password', None)
    if not password:
        try:
            if sys.stdin.isatty():
                password = getpass.getpass("Password: ")
            else:
                password = sys.stdin.readline().strip()
        except Exception:
            password = ""

    session = load_session()
    session["server_url"] = server
    save_session(session)

    res = make_request("/api/cli/auth", method="POST", data={"identifier": identifier, "password": password})
    if res and res.get("success"):
        session["token"] = res["token"]
        session["user"] = res["user"]
        save_session(session)
        user = res["user"]
        print(f"\n{Colors.GREEN}{Colors.BOLD}[OK] Logged in successfully!{Colors.RESET}")
        print(f"[User] Display Name: {Colors.BOLD}{user['display_name']}{Colors.RESET}")
        print(f"[RoyalID]            {Colors.YELLOW}{user['royal_id']}{Colors.RESET}")
        print(f"[Storage] Used:      {user['storage_used_mb']} MB / {user['storage_limit_mb']} MB")
    else:
        print(f"{Colors.RED}[ERROR] Login failed. Check your credentials.{Colors.RESET}")

def cmd_whoami(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Not logged in. Run 'logsapp login' first.{Colors.RESET}")
        return

    res = make_request("/api/auth/me", token=token)
    if res and res.get("user"):
        u = res["user"]
        used_mb = (int(u.get("storage_used_bytes", 0)) / (1024*1024))
        limit_mb = (int(u.get("storage_limit_bytes", 1073741824)) / (1024*1024))
        percent = (used_mb / limit_mb) * 100 if limit_mb > 0 else 0

        print(f"\n{Colors.CYAN}{Colors.BOLD}=== LogsApp User Profile ==={Colors.RESET}")
        print(f"[Name]     {Colors.BOLD}{u['display_name']}{Colors.RESET} (@{u['username']})")
        print(f"[RoyalID]  {Colors.YELLOW}{Colors.BOLD}{u['royal_id']}{Colors.RESET}")
        print(f"[Email]    {u.get('email') or 'Not set'}")
        print(f"[Storage]  {used_mb:.2f} MB / {limit_mb:.2f} MB ({percent:.1f}%)")
        print(f"[Server]   {get_server_url()}")
    else:
        print(f"{Colors.RED}Session expired. Please run 'logsapp login'.{Colors.RESET}")

def cmd_chats(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please run 'logsapp login' first.{Colors.RESET}")
        return

    res = make_request("/api/cli/chats", token=token)
    if not res or not res.get("success"):
        return

    chats = res.get("chats", [])
    if not chats:
        print(f"{Colors.YELLOW}No active conversations. Start chatting on the web app!{Colors.RESET}")
        return

    print(f"\n{Colors.CYAN}{Colors.BOLD}=== Active Conversations ({len(chats)}) ==={Colors.RESET}")
    print(f"{'TYPE':<8} {'CHAT / USER':<30} {'UNREAD':<8} {'STORAGE':<14} {'ID'}")
    print("-" * 80)
    for c in chats:
        ctype = "[Group]" if c["is_group"] else "[1-on-1]"
        name = c["name"][:28]
        unread = f"{Colors.GREEN}{c['unread']} new{Colors.RESET}" if c["unread"] > 0 else "0"
        storage = f"{c['storage_used_mb']} MB"
        print(f"{ctype:<8} {name:<30} {unread:<17} {storage:<14} {Colors.DIM}{c['id']}{Colors.RESET}")
    print("\n>> To view history: logsapp history <chat_id or @username>")

def cmd_history(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    target = args.target.lstrip('@')
    limit = args.limit or 25
    res = make_request(f"/api/cli/history/{parse.quote(target)}?limit={limit}", token=token)
    if not res or not res.get("success"):
        return

    messages = res.get("messages", [])
    print(f"\n{Colors.CYAN}{Colors.BOLD}=== Chat History ({len(messages)} messages) ==={Colors.RESET}")
    for m in messages:
        sender = f"{Colors.BOLD}{m['sender']}{Colors.RESET} ({Colors.YELLOW}{m['royal_id']}{Colors.RESET})"
        timestamp = m['created_at'].replace('T', ' ')[:19]
        if m['type'] in ['file', 'image', 'video', 'audio', 'archive', 'document']:
            code_str = f" [Code: {Colors.CYAN}{m['quick_code']}{Colors.RESET}]" if m.get('quick_code') else ""
            print(f"[{timestamp}] {sender}: {Colors.GREEN}[ATTACHMENT:{m['type'].upper()}] {m['file_name']} ({m['file_size_mb']} MB){code_str}{Colors.RESET}")
            if m['content'] and m['content'] != m['file_name']:
                print(f"       -> {m['content']}")
        else:
            print(f"[{timestamp}] {sender}: {m['content']}")
    print("")

def cmd_send(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    target = args.target.lstrip('@')
    text = args.message

    # Get chatId
    res_history = make_request(f"/api/cli/history/{parse.quote(target)}?limit=1", token=token)
    if not res_history or not res_history.get("chat_id"):
        print(f"{Colors.RED}[ERROR] Could not resolve chat for '{target}'.{Colors.RESET}")
        return
    chat_id = res_history["chat_id"]

    res = make_request(f"/api/messages/{chat_id}", method="POST", data={"content": text}, token=token)
    if res and res.get("message"):
        print(f"{Colors.GREEN}[OK] Message sent successfully!{Colors.RESET}")

def cmd_upload(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    file_path = Path(args.file).resolve()
    if not file_path.exists():
        print(f"{Colors.RED}[ERROR] File not found: {file_path}{Colors.RESET}")
        return

    file_size = file_path.stat().st_size
    if file_size > 1024 * 1024 * 1024:
        print(f"{Colors.RED}[ERROR] File size exceeds 1GB limit ({file_size / (1024*1024):.2f} MB){Colors.RESET}")
        return

    target = args.target.lstrip('@')
    # Resolve Chat ID
    res_history = make_request(f"/api/cli/history/{parse.quote(target)}?limit=1", token=token)
    if not res_history or not res_history.get("chat_id"):
        print(f"{Colors.RED}[ERROR] Could not resolve chat for '{target}'.{Colors.RESET}")
        return
    chat_id = res_history["chat_id"]

    print(f">> Uploading {file_path.name} ({file_size / (1024*1024):.2f} MB) to chat...")

    # Multipart form-data streaming builder
    boundary = f"----LogsAppBoundary{int(time.time()*1000)}"
    mime_type, _ = mimetypes.guess_type(str(file_path))
    mime_type = mime_type or 'application/octet-stream'

    header_data = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="caption"\r\n\r\n'
        f"{args.caption or file_path.name}\r\n"
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{file_path.name}"\r\n'
        f"Content-Type: {mime_type}\r\n\r\n"
    ).encode('utf-8')

    footer_data = f"\r\n--{boundary}--\r\n".encode('utf-8')
    total_size = len(header_data) + file_size + len(footer_data)

    server = get_server_url().rstrip('/')
    url = f"{server}/api/files/upload/{chat_id}"

    # Read and post file
    with open(file_path, 'rb') as f:
        file_bytes = f.read()

    full_body = header_data + file_bytes + footer_data

    headers = {
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        "Content-Length": str(total_size)
    }

    res = make_request(f"/api/files/upload/{chat_id}", method="POST", data=full_body, token=token, headers=headers)
    if res and res.get("message"):
        quick_code = res.get("quickCode", "N/A")
        print(f"\n{Colors.GREEN}{Colors.BOLD}[OK] File uploaded successfully!{Colors.RESET}")
        print(f"[File]       {file_path.name}")
        print(f"[QuickCode]  {Colors.YELLOW}{Colors.BOLD}{quick_code}{Colors.RESET}")
        print(f">> To download anywhere on Linux:")
        print(f"   {Colors.CYAN}logsapp get {quick_code}{Colors.RESET}")
    else:
        print(f"{Colors.RED}[ERROR] Upload failed.{Colors.RESET}")

def cmd_files(args):
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    if args.target:
        target = args.target.lstrip('@')
        res_history = make_request(f"/api/cli/history/{parse.quote(target)}?limit=1", token=token)
        if not res_history or not res_history.get("chat_id"):
            print(f"{Colors.RED}[ERROR] Could not resolve chat for '{target}'.{Colors.RESET}")
            return
        chat_id = res_history["chat_id"]
        endpoint = f"/api/files/chat/{chat_id}"
    else:
        # Search all files
        chats_res = make_request("/api/cli/chats", token=token)
        if not chats_res or not chats_res.get("chats"):
            print("No chats found.")
            return
        first_chat = chats_res["chats"][0]["id"]
        endpoint = f"/api/files/chat/{first_chat}"

    res = make_request(endpoint, token=token)
    if not res or "files" not in res:
        return

    files = res["files"]
    print(f"\n{Colors.CYAN}{Colors.BOLD}=== Shared Files ({len(files)}) ==={Colors.RESET}")
    print(f"{'QUICK CODE':<12} {'FILE NAME':<32} {'SIZE':<10} {'SENDER':<15} {'DATE'}")
    print("-" * 80)
    for f in files:
        code = f.get('quick_code') or 'N/A'
        name = (f.get('file_name') or 'unknown')[:30]
        size_mb = f"{(int(f.get('file_size_bytes', 0))/(1024*1024)):.2f} MB"
        sender = f"@{f.get('sender_username', 'unknown')}"
        date = (f.get('created_at') or '')[:10]
        print(f"{Colors.YELLOW}{code:<12}{Colors.RESET} {name:<32} {size_mb:<10} {sender:<15} {date}")
    print(f"\n>> Download: logsapp get <QUICK_CODE>")

def cmd_download(args):
    import re
    code_or_id = re.sub(r'\x1b\[[0-9;]*m', '', args.code.strip())
    dest = args.output

    server = get_server_url().rstrip('/')
    
    # Check if QuickCode or Message ID
    if code_or_id.upper().startswith("LGS-") or len(code_or_id) <= 10:
        url = f"{server}/api/files/quick/{code_or_id}?download=true"
    else:
        url = f"{server}/api/files/download/{code_or_id}"

    print(f">> Fetching file info for '{code_or_id}'...")

    try:
        req = request.Request(url, headers={"User-Agent": "LogsApp-CLI/1.0"})
        resp = request.urlopen(req, timeout=300)
        
        # Determine filename
        filename = dest
        if not filename:
            cd = resp.headers.get("Content-Disposition", "")
            if "filename=" in cd:
                filename = cd.split("filename=")[-1].strip('"\'; ')
                filename = parse.unquote(filename)
            else:
                filename = f"download_{code_or_id}"

        total_bytes = int(resp.headers.get("Content-Length", 0))
        total_mb = total_bytes / (1024 * 1024) if total_bytes > 0 else 0

        print(f">> Downloading: {Colors.BOLD}{filename}{Colors.RESET} ({total_mb:.2f} MB)")

        chunk_size = 64 * 1024 # 64KB
        downloaded = 0
        start_time = time.time()

        with open(filename, 'wb') as f:
            while True:
                chunk = resp.read(chunk_size)
                if not chunk:
                    break
                f.write(chunk)
                downloaded += len(chunk)
                if total_bytes > 0:
                    percent = (downloaded / total_bytes) * 100
                    bar_len = 30
                    filled = int(bar_len * downloaded // total_bytes)
                    bar = '=' * filled + '-' * (bar_len - filled)
                    elapsed = max(time.time() - start_time, 0.001)
                    speed_mb = (downloaded / (1024*1024)) / elapsed
                    sys.stdout.write(f"\r[{bar}] {percent:.1f}% ({downloaded/(1024*1024):.1f}/{total_mb:.1f} MB) @ {speed_mb:.2f} MB/s ")
                    sys.stdout.flush()

        print(f"\n{Colors.GREEN}{Colors.BOLD}[OK] Saved successfully to: {os.path.abspath(filename)}{Colors.RESET}")
    except error.HTTPError as e:
        print(f"{Colors.RED}[ERROR] Download failed ({e.code}): File not found or expired.{Colors.RESET}")
    except Exception as e:
        print(f"{Colors.RED}[ERROR] Download failed: {e}{Colors.RESET}")

def cmd_pull(args):
    """Download all files from a chat into local destination directory (College Lab friendly)"""
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    target = args.target.lstrip('@')
    dest_dir = Path(args.output or ".").resolve()
    dest_dir.mkdir(parents=True, exist_ok=True)

    res_history = make_request(f"/api/cli/history/{parse.quote(target)}?limit=1", token=token)
    if not res_history or not res_history.get("chat_id"):
        print(f"{Colors.RED}[ERROR] Could not resolve chat for '{target}'.{Colors.RESET}")
        return
    chat_id = res_history["chat_id"]

    res = make_request(f"/api/files/chat/{chat_id}", token=token)
    if not res or "files" not in res:
        print("No files found.")
        return

    files = res["files"]
    print(f"\n{Colors.CYAN}{Colors.BOLD}>> Importing {len(files)} files to {dest_dir}...{Colors.RESET}")

    for idx, f in enumerate(files, 1):
        file_id = f.get("id")
        file_name = f.get("file_name") or f"file_{file_id}"
        target_path = dest_dir / file_name
        print(f"[{idx}/{len(files)}] Fetching {file_name}...")
        
        args_dl = argparse.Namespace(code=file_id, output=str(target_path))
        cmd_download(args_dl)

    print(f"\n{Colors.GREEN}{Colors.BOLD}[OK] All files imported to {dest_dir}!{Colors.RESET}")

def cmd_export(args):
    """Export all chat history & code blocks into a readable text file"""
    session = load_session()
    token = session.get("token")
    if not token:
        print(f"{Colors.YELLOW}Please login first.{Colors.RESET}")
        return

    target = args.target.lstrip('@')
    limit = args.limit or 100
    out_file = args.output or f"chat_export_{target}_{int(time.time())}.txt"

    res = make_request(f"/api/cli/history/{parse.quote(target)}?limit={limit}", token=token)
    if not res or not res.get("success"):
        return

    messages = res.get("messages", [])
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(f"=== LogsApp Chat History Export: {target} ===\n")
        f.write(f"Generated at: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        for m in messages:
            f.write(f"[{m['created_at']}] {m['sender']} (#{m['royal_id']}):\n")
            if m.get('file_name'):
                f.write(f"  [ATTACHMENT] {m['file_name']} (QuickCode: {m.get('quick_code')})\n")
            if m.get('content'):
                f.write(f"  {m['content']}\n")
            f.write("\n")

    print(f"{Colors.GREEN}{Colors.BOLD}[OK] Chat logs exported to: {os.path.abspath(out_file)}{Colors.RESET}")

def cmd_push_dir(args):
    """Zip a folder and upload to chat up to 1GB"""
    import zipfile
    import shutil
    import tempfile

    folder_path = Path(args.folder).resolve()
    if not folder_path.exists() or not folder_path.is_dir():
        print(f"{Colors.RED}[ERROR] Directory not found: {folder_path}{Colors.RESET}")
        return

    zip_name = f"{folder_path.name}_{int(time.time())}.zip"
    tmp_zip = Path(tempfile.gettempdir()) / zip_name

    print(f">> Compressing {folder_path.name} into {zip_name}...")
    with zipfile.ZipFile(tmp_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_f = Path(root) / file
                rel_f = abs_f.relative_to(folder_path)
                zipf.write(abs_f, rel_f)

    print(f">> Compressed ({tmp_zip.stat().st_size / (1024*1024):.2f} MB). Uploading to chat...")
    args_up = argparse.Namespace(target=args.target, file=str(tmp_zip), caption=f"Project Folder: {folder_path.name}")
    cmd_upload(args_up)

    try:
        tmp_zip.unlink()
    except Exception:
        pass

def cmd_get_msg(args):
    """Download single message or attachment using right-clicked transfer code (XFR-XXXX)"""
    session = load_session()
    server = get_server_url().rstrip('/')
    code = args.code.upper().strip()

    print(f"\n{Colors.CYAN}{Colors.BOLD}=== LogsApp Message CLI Downloader ==={Colors.RESET}")
    print(f"Transfer Code: {Colors.YELLOW}{Colors.BOLD}{code}{Colors.RESET}")

    # Check if credentials exist in session or prompt
    token = session.get("token")
    user = session.get("user")

    identifier = None
    password = None

    if not token or not user:
        print(f"\n{Colors.BOLD}🔐 Authentication Required:{Colors.RESET}")
        try:
            identifier = input("Username or RoyalID: ").strip()
            password = getpass.getpass("Password: ")
        except Exception:
            print(f"{Colors.RED}Aborted.{Colors.RESET}")
            return
    else:
        # Prompt password to confirm identity as requested
        identifier = user.get("username") or user.get("royal_id")
        print(f"Logged in as: {Colors.BOLD}@{identifier}{Colors.RESET}")
        try:
            password = getpass.getpass(f"Enter password to confirm download: ")
        except Exception:
            print(f"{Colors.RED}Aborted.{Colors.RESET}")
            return

    print(f"\n>> Verifying transfer permissions...")

    payload = json.dumps({
        "transferCode": code,
        "identifier": identifier,
        "password": password
    }).encode('utf-8')

    req = request.Request(
        f"{server}/api/cli/verify-transfer",
        data=payload,
        headers={"Content-Type": "application/json", "User-Agent": "LogsApp-CLI/1.0"},
        method="POST"
    )

    try:
        resp = request.urlopen(req, timeout=30)
        auth_data = json.loads(resp.read().decode('utf-8'))
    except error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        try:
            err_json = json.loads(err_body)
            print(f"{Colors.RED}❌ Authentication failed ({e.code}): {err_json.get('error', err_body)}{Colors.RESET}")
        except Exception:
            print(f"{Colors.RED}❌ Error ({e.code}): {err_body}{Colors.RESET}")
        return
    except Exception as e:
        print(f"{Colors.RED}❌ Connection error: {e}{Colors.RESET}")
        return

    if not auth_data.get("success"):
        print(f"{Colors.RED}❌ {auth_data.get('error', 'Verification failed')}{Colors.RESET}")
        return

    # Determine Downloads folder
    home_dl = Path.home() / "Downloads"
    if args.output:
        dest_path = Path(args.output).resolve()
        if dest_path.is_dir():
            dest_dir = dest_path
            filename = auth_data.get("fileName") or f"message_{code}.txt"
            target_file = dest_dir / filename
        else:
            target_file = dest_path
    else:
        if home_dl.exists() and home_dl.is_dir():
            dest_dir = home_dl
        else:
            home_dl.mkdir(parents=True, exist_ok=True)
            dest_dir = home_dl
        filename = auth_data.get("fileName") or f"message_{code}.txt"
        target_file = dest_dir / filename

    is_attachment = auth_data.get("isAttachment", False)

    if is_attachment:
        dl_url = f"{server}/api/cli/download-transfer/{code}?token={auth_data['token']}"
        print(f">> Downloading {Colors.BOLD}{target_file.name}{Colors.RESET} to {target_file.parent}...")

        try:
            dl_req = request.Request(dl_url, headers={"User-Agent": "LogsApp-CLI/1.0"})
            dl_resp = request.urlopen(dl_req, timeout=300)
            total_bytes = int(dl_resp.headers.get("Content-Length", 0))
            total_mb = total_bytes / (1024 * 1024) if total_bytes > 0 else 0

            chunk_size = 64 * 1024
            downloaded = 0
            start_time = time.time()

            with open(target_file, 'wb') as f:
                while True:
                    chunk = dl_resp.read(chunk_size)
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_bytes > 0:
                        pct = (downloaded / total_bytes) * 100
                        bar_len = 30
                        filled = int(bar_len * downloaded // total_bytes)
                        bar = '=' * filled + '-' * (bar_len - filled)
                        elapsed = max(time.time() - start_time, 0.001)
                        speed = (downloaded / (1024*1024)) / elapsed
                        sys.stdout.write(f"\r  [{bar}] {pct:.1f}% ({downloaded/(1024*1024):.1f}/{total_mb:.1f} MB) @ {speed:.2f} MB/s ")
                        sys.stdout.flush()

            print(f"\n\n{Colors.GREEN}{Colors.BOLD}🎉 Success! Downloaded to:{Colors.RESET}")
            print(f"   {Colors.CYAN}{os.path.abspath(target_file)}{Colors.RESET}\n")
        except Exception as e:
            print(f"\n{Colors.RED}❌ Download failed: {e}{Colors.RESET}")
    else:
        content = auth_data.get("content", "")
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n{Colors.CYAN}{Colors.BOLD}--- Message Content ---{Colors.RESET}")
        print(content)
        print(f"{Colors.CYAN}{Colors.BOLD}-----------------------{Colors.RESET}\n")
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 Saved message text to:{Colors.RESET}")
        print(f"   {Colors.CYAN}{os.path.abspath(target_file)}{Colors.RESET}\n")

def main():
    parser = argparse.ArgumentParser(description="LogsApp / RoyalChat - Linux Terminal Client")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # login
    p_login = subparsers.add_parser("login", help="Login to LogsApp")
    p_login.add_argument("--identifier", "-u", help="Username or 7-Digit RoyalID")
    p_login.add_argument("--password", "-p", help="Password")
    p_login.add_argument("--server", "-s", help="Server URL")
    
    # whoami
    subparsers.add_parser("whoami", help="Show current user info, 7-digit Royal ID, and storage quota")
    
    # chats
    subparsers.add_parser("chats", help="List active conversations")
    
    # history
    p_hist = subparsers.add_parser("history", help="View messages in a chat")
    p_hist.add_argument("target", help="Chat ID or @username")
    p_hist.add_argument("--limit", type=int, default=30, help="Number of messages to retrieve")

    # send
    p_send = subparsers.add_parser("send", help="Send a text message")
    p_send.add_argument("target", help="Chat ID or @username")
    p_send.add_argument("message", help="Message content")

    # upload
    p_up = subparsers.add_parser("upload", help="Upload a file (up to 1GB) to chat")
    p_up.add_argument("target", help="Chat ID or @username")
    p_up.add_argument("file", help="Local file path to upload")
    p_up.add_argument("--caption", help="Optional file caption")

    # push-dir (Zip and upload folder)
    p_pdir = subparsers.add_parser("push-dir", help="Zip and upload an entire folder (up to 1GB)")
    p_pdir.add_argument("folder", help="Folder path to compress and send")
    p_pdir.add_argument("target", help="Chat ID or @username")

    # pull / import (Download all files from a chat)
    p_pull = subparsers.add_parser("pull", help="Download all shared files in a chat into local folder")
    p_pull.add_argument("target", help="Chat ID or @username")
    p_pull.add_argument("output", nargs="?", default=".", help="Destination folder (default: current directory)")

    # export (Export chat log to text file)
    p_exp = subparsers.add_parser("export", help="Export chat messages and code logs to a text file")
    p_exp.add_argument("target", help="Chat ID or @username")
    p_exp.add_argument("output", nargs="?", help="Output text filename")
    p_exp.add_argument("--limit", type=int, default=100, help="Message count limit")

    # files
    p_files = subparsers.add_parser("files", help="List shared files in chat")
    p_files.add_argument("target", nargs="?", help="Chat ID or @username")

    # get / download
    p_get = subparsers.add_parser("get", help="Download a file using 6-digit QuickCode or File ID")
    p_get.add_argument("code", help="6-digit QuickCode (e.g. LGS-8492) or File ID")
    p_get.add_argument("output", nargs="?", help="Output file path destination")

    # get-msg (Download single message or file using transfer code XFR-XXXX)
    p_gmsg = subparsers.add_parser("get-msg", help="Download a message or attachment using right-clicked Transfer Code (e.g. XFR-8492)")
    p_gmsg.add_argument("code", help="Transfer Code (e.g. XFR-8492)")
    p_gmsg.add_argument("output", nargs="?", help="Optional custom destination path")

    args = parser.parse_args()

    if args.command == "login":
        cmd_login(args)
    elif args.command == "whoami":
        cmd_whoami(args)
    elif args.command == "chats":
        cmd_chats(args)
    elif args.command == "history":
        cmd_history(args)
    elif args.command == "send":
        cmd_send(args)
    elif args.command == "upload":
        cmd_upload(args)
    elif args.command == "push-dir":
        cmd_push_dir(args)
    elif args.command == "pull":
        cmd_pull(args)
    elif args.command == "export":
        cmd_export(args)
    elif args.command == "files":
        cmd_files(args)
    elif args.command == "get":
        cmd_download(args)
    elif args.command == "get-msg":
        cmd_get_msg(args)
    else:
        print_banner()
        parser.print_help()

if __name__ == "__main__":
    main()
