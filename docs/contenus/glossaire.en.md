---
title: Glossary
---

# Technical Glossary

!!! tip "Usage"
    Use <kbd>Ctrl+F</kbd> to quickly search for a term. Each definition links back to the lab where the concept is covered.

---

## A

Alias
:   A user-defined shortcut that replaces a long or frequent command. Example: `alias ll='ls -la'`. Aliases are defined in the current shell or in `~/.bashrc` to make them persistent.
:   → See [Lab 3](./tp3.md)

Argument
:   A word passed to a command after its name. For example, in `cp file.txt copy.txt`, both filenames are arguments to the `cp` command.
:   → See [Lab 1](./tp1.md)

## B

Bash
:   **B**ourne **A**gain **Sh**ell. The default command interpreter on most Linux distributions. It is a superset of the original Bourne shell (`sh`), with additional features like history and auto-completion.
:   → See [Preliminary reading](./preliminary-reading.md)

Built-in command
:   A command executed directly by the shell without launching a separate process. Examples: `cd`, `echo`, `export`, `alias`. Identified with `type command`.
:   → See [Lab 1](./tp1.md)

## C

Compilation
:   The process of transforming source code (e.g., C) into a binary executable file. On Linux, `gcc` (GNU Compiler Collection) is typically used.
:   → See [Lab 3](./tp3.md)

Core dump
:   A memory image file of a process at the time of its abnormal termination. Produced notably by the `SIGQUIT` signal (3). Useful for post-mortem debugging.
:   → See [Lab 4](./tp4.md)

## D

Daemon
:   A process that runs in the background without an associated terminal, providing a system service. Examples: `sshd` (SSH), `cron` (scheduled tasks), `systemd` (init). The name comes from Greek mythology (an intermediary spirit).
:   → See [Lab 4](./tp4.md)

Distribution
:   A coherent package consisting of the Linux kernel, GNU tools, a package manager, and additional software. Examples: Debian, Ubuntu, Fedora, Arch Linux.
:   → See [Preliminary reading](./preliminary-reading.md)

## E

EOF (End Of File)
:   End-of-file marker. At the terminal, it is produced with <kbd>Ctrl+D</kbd>. It tells the program there is no more data to read from standard input.
:   → See [Lab 1](./tp1.md)

External command
:   A program stored on disk and executed in a child process. The shell locates it via `$PATH`. Examples: `ls`, `grep`, `gcc`.
:   → See [Lab 1](./tp1.md)

## F

File descriptor (fd)
:   A positive integer used by the kernel to identify an open file for a process. The first three are reserved: 0 (stdin), 1 (stdout), 2 (stderr).
:   → See [Lab 4](./tp4.md)

File tree
:   The hierarchical structure of the Linux file system, organized as a tree from the root `/`. Each node is a directory that can contain files or other directories.
:   → See [Lab 1](./tp1.md)

## G

GCC
:   **G**NU **C**ompiler **C**ollection. A free compiler for C, C++, and other languages. Basic command: `gcc -o program source.c`.
:   → See [Lab 3](./tp3.md)

Globbing
:   The expansion of wildcards (`*`, `?`, `[...]`) by the shell to match filenames. Globbing is performed by the shell **before** the command is executed.
:   → See [Lab 1](./tp1.md)

GNU
:   **G**NU's **N**ot **U**nix. A project launched by Richard Stallman in 1983 to create a completely free operating system. GNU tools (bash, coreutils, gcc…) combined with the Linux kernel form GNU/Linux.
:   → See [Preliminary reading](./preliminary-reading.md)

GRUB
:   **GR**and **U**nified **B**ootloader. A boot loader that allows choosing the operating system at startup.
:   → See [Installation](./installation-wsl.md)

## H

Hard link
:   A directory entry that points directly to a file's inode. Multiple hard links can point to the same inode. The file is only deleted when the last link is removed. Created with `ln`.
:   → See [Lab 2](./tp2.md)

Hidden file
:   A file whose name starts with a dot (`.`). Not displayed by `ls` unless the `-a` option is used. Common conventions: `.bashrc`, `.profile`, `.ssh/`.
:   → See [Lab 1](./tp1.md)

## I

Inode
:   A file system data structure that stores a file's metadata: permissions, owner, size, dates, data block locations. Each file has a unique inode number (visible with `ls -i`). The filename is **not** stored in the inode but in the directory.
:   → See [Lab 2](./tp2.md)

## J

Job
:   A task managed by the shell. A job can be in the foreground or background. Managed with `jobs`, `fg`, `bg`, and <kbd>Ctrl+Z</kbd>.
:   → See [Lab 4](./tp4.md)

## K

Kernel
:   The core of the operating system. The Linux kernel manages memory, processes, hardware drivers, and system calls. Created by Linus Torvalds in 1991.
:   → See [Preliminary reading](./preliminary-reading.md)

## L

Man page
:   A manual page accessible with the `man` command. Standard documentation for Unix/Linux commands, organized in sections (1 = user commands, 5 = file formats, 8 = administration…).
:   → See [Lab 1](./tp1.md)

## O

Option
:   A modifier for a command's behavior, usually preceded by `-` (short form) or `--` (long form). Example: `ls -l` (short), `ls --all` (long).
:   → See [Lab 1](./tp1.md)

## P

PATH
:   An environment variable containing the list of directories (separated by `:`) where the shell searches for external commands. Modifiable with `export PATH=$PATH:/new/path`.
:   → See [Lab 2](./tp2.md), [Lab 3](./tp3.md)

Permission
:   An access right associated with a file or directory. Three types: read (`r`), write (`w`), execute (`x`). Three categories: owner (`u`), group (`g`), others (`o`). Modified with `chmod`.
:   → See [Lab 2](./tp2.md)

PID (Process ID)
:   A unique numeric identifier assigned by the kernel to each running process. The `init`/`systemd` process always has PID 1. Visible with `ps` or `top`.
:   → See [Lab 4](./tp4.md)

Pipe
:   An inter-process communication mechanism that connects one command's standard output to the next command's standard input. Syntax: `command1 | command2`.
:   → See [Lab 4](./tp4.md)

Process
:   An instance of a program being executed. Each process has a PID, its own memory space, file descriptors, and a parent process (PPID).
:   → See [Lab 4](./tp4.md)

Prompt
:   The command prompt displayed by the shell to signal it is waiting for input. Typically `$` for a regular user and `#` for root. Customizable via the `$PS1` variable.
:   → See [Lab 1](./tp1.md)

## Q

Quoting (inhibition)
:   A mechanism that prevents the shell from interpreting special characters. Three levels: `\` (one character), `'...'` (everything), `"..."` (everything except `$`, `` ` ``, `\`).
:   → See [Lab 3](./tp3.md)

## R

Redirection
:   A mechanism to redirect a command's input/output streams to files. Syntax: `>` (overwrite), `>>` (append), `<` (read from), `2>` (stderr).
:   → See [Lab 4](./tp4.md)

Root (superuser)
:   The administrator account with full system privileges (UID 0). Commands requiring privileges are run via `sudo`.
:   → See [Preliminary reading](./preliminary-reading.md)

Root (`/`)
:   The top of the Linux file system tree. All files and directories descend from it. Not to be confused with `/root` (the superuser's home directory) or the `root` user.
:   → See [Lab 1](./tp1.md)

## S

Setgid bit
:   A special permission bit (`s` on the group) that, when applied to a directory, forces new files to inherit the directory's group rather than the user's primary group.
:   → See [Lab 2](./tp2.md)

Setuid bit
:   A special permission bit (`s` on the owner) that allows an executable to run with its owner's permissions rather than those of the user who launches it. Example: `/usr/bin/passwd`.
:   → See [Lab 2](./tp2.md)

Shell
:   A command interpreter that interfaces between the user and the kernel. The shell reads commands, interprets them (expansion, substitution, globbing), and executes them. Bash is the default shell on most distributions.
:   → See [Preliminary reading](./preliminary-reading.md)

Signal
:   An asynchronous notification sent to a process to request an action. Examples: `SIGTERM` (15) = graceful termination, `SIGKILL` (9) = forced termination, `SIGINT` (2) = interrupt via <kbd>Ctrl+C</kbd>.
:   → See [Lab 4](./tp4.md)

Stderr
:   Standard error output (file descriptor 2). A dedicated stream for error messages. By default displayed on screen like stdout but separately redirectable with `2>`.
:   → See [Lab 4](./tp4.md)

Stdin
:   Standard input (file descriptor 0). By default, the keyboard. Can be redirected from a file with `<` or fed by a pipe.
:   → See [Lab 4](./tp4.md)

Stdout
:   Standard output (file descriptor 1). By default, the terminal screen. Can be redirected to a file with `>` or `>>`, or connected to a pipe.
:   → See [Lab 4](./tp4.md)

Sticky bit
:   A special permission bit (`t`) applied to shared directories like `/tmp`: only the file's owner (or root) can delete it, even if others have write permission on the directory.
:   → See [Lab 2](./tp2.md)

Substitution (command)
:   A mechanism that executes a command and replaces the expression with its output. Modern syntax: `$(command)`. Old syntax: `` `command` ``.
:   → See [Lab 3](./tp3.md)

Symbolic link (symlink)
:   A special file that contains the path to another file or directory. Similar to a shortcut. Created with `ln -s`. Can point to a non-existent target (broken link).
:   → See [Lab 2](./tp2.md)

## T

Terminal
:   A text-based interface for interacting with the shell. A terminal emulator (GNOME Terminal, xterm, Konsole…) emulates the behavior of a physical terminal.
:   → See [Lab 1](./tp1.md)

## U

Umask
:   A file creation mask that defines which permissions are removed by default when creating a file or directory. Example: `umask 022` removes write permission for group and others.
:   → See [Lab 2](./tp2.md)

## V

Variable (environment)
:   A variable passed to child processes. Defined with `export`. Environment variables configure the behavior of the shell and programs (e.g., `$PATH`, `$HOME`, `$LANG`).
:   → See [Lab 3](./tp3.md)

Variable (shell)
:   A variable local to the current shell, not passed to child processes. Defined by simple assignment: `MY_VAR="value"`. Becomes an environment variable with `export`.
:   → See [Lab 3](./tp3.md)

## W

Wildcard
:   A special character interpreted by the shell to match filenames. `*` = any string, `?` = one character, `[abc]` = one among a, b, c.
:   → See [Lab 1](./tp1.md)
