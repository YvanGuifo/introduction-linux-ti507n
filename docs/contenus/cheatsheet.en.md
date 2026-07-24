---
title: Command Cheat Sheet
---

# Linux Command Cheat Sheet

!!! tip "Usage"
    This page gathers all commands covered in the labs. Use <kbd>Ctrl+F</kbd> to quickly search for a command.

---

## Lab 1 — First commands

### Navigation and file tree

| Command | Description | Example |
|---------|-------------|---------|
| `pwd` | Print current directory | `pwd` |
| `cd` | Change directory | `cd /home/user` |
| `cd ..` | Go up one level | `cd ..` |
| `cd ~` | Go to home directory | `cd ~` |
| `cd -` | Go to previous directory | `cd -` |
| `ls` | List directory contents | `ls -la` |
| `ls -l` | Detailed listing (permissions, size…) | `ls -l /etc` |
| `ls -a` | Show hidden files | `ls -a` |
| `ls -R` | Recursive listing | `ls -R /home` |

### File and directory manipulation

| Command | Description | Example |
|---------|-------------|---------|
| `touch` | Create an empty file (or update timestamp) | `touch file.txt` |
| `mkdir` | Create a directory | `mkdir folder` |
| `mkdir -p` | Create directory and parents | `mkdir -p a/b/c` |
| `cp` | Copy a file | `cp source.txt dest.txt` |
| `cp -r` | Copy directory recursively | `cp -r folder/ copy/` |
| `mv` | Move or rename | `mv old.txt new.txt` |
| `rm` | Remove a file | `rm file.txt` |
| `rm -r` | Remove directory recursively | `rm -r folder/` |
| `rm -i` | Remove with confirmation | `rm -i file.txt` |
| `rmdir` | Remove an empty directory | `rmdir folder/` |

### Help and information

| Command | Description | Example |
|---------|-------------|---------|
| `man` | Display command manual | `man ls` |
| `help` | Help for shell built-in commands | `help cd` |
| `type` | Show command type | `type ls` |
| `which` | Locate a command's executable | `which python` |
| `whoami` | Print current username | `whoami` |
| `hostname` | Print machine name | `hostname` |
| `uname -a` | System information | `uname -a` |
| `date` | Print date and time | `date` |
| `cal` | Display calendar | `cal` |

### Displaying content

| Command | Description | Example |
|---------|-------------|---------|
| `cat` | Display file contents | `cat file.txt` |
| `more` | Display page by page | `more file.txt` |
| `less` | Display with navigation (better than `more`) | `less file.txt` |
| `head` | Display first lines | `head -5 file.txt` |
| `tail` | Display last lines | `tail -10 file.txt` |
| `wc` | Count lines, words, characters | `wc -l file.txt` |
| `echo` | Print text | `echo "Hello"` |

### Wildcards (globbing)

| Wildcard | Description | Example |
|----------|-------------|---------|
| `*` | Any string (including empty) | `ls *.txt` |
| `?` | Exactly one character | `ls file?.txt` |
| `[abc]` | One character among a, b, or c | `ls [aA]*.txt` |
| `[a-z]` | One character in range a–z | `ls [0-9]*` |

### Terminal keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| <kbd>Tab</kbd> | Auto-completion |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Command history |
| <kbd>Ctrl+C</kbd> | Interrupt current command |
| <kbd>Ctrl+L</kbd> | Clear screen |
| <kbd>Ctrl+U</kbd> | Clear line before cursor |
| <kbd>Ctrl+D</kbd> | End of input (EOF) / logout |
| <kbd>Ctrl+R</kbd> | Search command history |

---

## Lab 2 — File system and permissions

### Links and inodes

| Command | Description | Example |
|---------|-------------|---------|
| `ln` | Create a hard link | `ln file.txt link` |
| `ln -s` | Create a symbolic link | `ln -s file.txt link` |
| `ls -i` | Show inode numbers | `ls -i` |
| `stat` | Detailed file information | `stat file.txt` |
| `file` | Identify file type | `file image.png` |
| `find` | Search for files | `find / -name "*.conf"` |

### Permissions

| Command | Description | Example |
|---------|-------------|---------|
| `chmod` | Change permissions | `chmod 755 script.sh` |
| `chmod u+x` | Add execute for owner | `chmod u+x script.sh` |
| `chmod go-w` | Remove write for group and others | `chmod go-w file.txt` |
| `chown` | Change owner | `chown user:group file` |
| `chgrp` | Change group | `chgrp staff file` |
| `umask` | Set default permission mask | `umask 022` |

### Permission notation

| Value | Permission | Meaning |
|-------|-----------|---------|
| `r` = 4 | Read | Read contents |
| `w` = 2 | Write | Modify contents |
| `x` = 1 | Execute | Execute (file) / traverse (directory) |
| `755` | `rwxr-xr-x` | Owner: all · Others: read + execute |
| `644` | `rw-r--r--` | Owner: read + write · Others: read |

---

## Lab 3 — Working environment and C Compiler

### Variables and environment

| Command | Description | Example |
|---------|-------------|---------|
| `env` | Display environment variables | `env` |
| `printenv` | Display a specific variable | `printenv HOME` |
| `export` | Set an environment variable | `export MY_VAR="value"` |
| `unset` | Remove a variable | `unset MY_VAR` |
| `set` | Display all variables (shell + env) | `set` |
| `echo $VAR` | Print a variable's value | `echo $PATH` |
| `alias` | Create a command shortcut | `alias ll='ls -la'` |
| `unalias` | Remove an alias | `unalias ll` |
| `source` | Execute script in current shell | `source ~/.bashrc` |

### Important variables

| Variable | Role |
|----------|------|
| `$HOME` | Home directory |
| `$PATH` | Command search directories |
| `$USER` | Username |
| `$SHELL` | Default shell |
| `$PWD` | Current directory |
| `$PS1` | Prompt format |
| `$?` | Exit code of last command |

### Special character inhibition

| Syntax | Effect |
|--------|--------|
| `\` | Escape the next character |
| `'...'` | Inhibit everything (single quotes) |
| `"..."` | Inhibit everything except `$`, `` ` ``, `\` |

### Substitution and expansion

| Syntax | Description | Example |
|--------|-------------|---------|
| `$(cmd)` | Command substitution | `echo $(date)` |
| `` `cmd` `` | Command substitution (old syntax) | `` echo `whoami` `` |
| `{a,b,c}` | Brace expansion | `echo file{1,2,3}.txt` |
| `{1..5}` | Numeric sequence | `mkdir dir{1..5}` |

### C Compilation

| Command | Description | Example |
|---------|-------------|---------|
| `gcc` | Compile a C program | `gcc -o prog main.c` |
| `gcc -Wall` | Compile with all warnings | `gcc -Wall -o prog main.c` |
| `./prog` | Run a compiled program | `./my_program` |

---

## Lab 4 — Redirections, processes and signals

### Redirections

| Syntax | Description | Example |
|--------|-------------|---------|
| `>` | Redirect stdout to file (overwrite) | `ls > list.txt` |
| `>>` | Redirect stdout to file (append) | `echo "end" >> log.txt` |
| `<` | Redirect stdin from file | `wc -l < file.txt` |
| `2>` | Redirect stderr to file | `cmd 2> errors.txt` |
| `2>&1` | Redirect stderr to stdout | `cmd > all.txt 2>&1` |
| `&>` | Redirect both stdout and stderr | `cmd &> all.txt` |
| `/dev/null` | Discard output | `cmd 2>/dev/null` |

### Pipes

| Syntax | Description | Example |
|--------|-------------|---------|
| `\|` | Connect output to next command's input | `ls -l \| grep ".txt"` |
| `tee` | Duplicate output (screen + file) | `ls \| tee list.txt` |

### Text filters

| Command | Description | Example |
|---------|-------------|---------|
| `grep` | Search for a pattern in text | `grep "error" log.txt` |
| `grep -i` | Case-insensitive search | `grep -i "hello" file` |
| `grep -r` | Recursive search | `grep -r "TODO" src/` |
| `grep -n` | Show line numbers | `grep -n "main" prog.c` |
| `sort` | Sort lines | `sort file.txt` |
| `sort -n` | Numeric sort | `sort -n grades.txt` |
| `sort -r` | Reverse sort | `sort -r file.txt` |
| `uniq` | Remove consecutive duplicates | `sort file \| uniq` |
| `cut` | Extract columns | `cut -d: -f1 /etc/passwd` |
| `tr` | Replace or delete characters | `echo "abc" \| tr 'a-z' 'A-Z'` |
| `sed` | Stream editor | `sed 's/old/new/g' file` |
| `awk` | Advanced text processing | `awk '{print $1}' file` |

### Processes

| Command | Description | Example |
|---------|-------------|---------|
| `ps` | List terminal processes | `ps` |
| `ps aux` | List all system processes | `ps aux` |
| `top` | Real-time process monitor | `top` |
| `htop` | Enhanced monitor (if installed) | `htop` |
| `&` | Run command in background | `sleep 60 &` |
| `jobs` | List background jobs | `jobs` |
| `fg` | Bring job to foreground | `fg %1` |
| `bg` | Resume job in background | `bg %1` |
| <kbd>Ctrl+Z</kbd> | Suspend current job | — |

### Signals

| Command | Description | Example |
|---------|-------------|---------|
| `kill` | Send a signal to a process | `kill 1234` |
| `kill -9` | Force kill (SIGKILL) | `kill -9 1234` |
| `kill -l` | List all signals | `kill -l` |
| `killall` | Kill processes by name | `killall firefox` |

### Common signals

| Signal | Number | Default action |
|--------|--------|----------------|
| `SIGHUP` | 1 | Termination (hangup) |
| `SIGINT` | 2 | Interrupt (<kbd>Ctrl+C</kbd>) |
| `SIGQUIT` | 3 | Quit + core dump |
| `SIGKILL` | 9 | Forced termination (cannot be caught) |
| `SIGTERM` | 15 | Graceful termination (default) |
| `SIGSTOP` | 19 | Suspend (cannot be caught) |
| `SIGTSTP` | 20 | Suspend (<kbd>Ctrl+Z</kbd>) |
| `SIGCONT` | 18 | Resume a suspended process |
