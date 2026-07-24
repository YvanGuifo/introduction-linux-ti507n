---
title: FAQ — Common Issues
---

# FAQ — Common Issues and Frequent Errors

!!! tip "How to use this page"
    Use <kbd>Ctrl+F</kbd> to search for the exact error message you're encountering. Each issue comes with its **explanation** and **solution**.

---

## Permission Errors

### `Permission denied`

```
bash: ./my_script.sh: Permission denied
```

**Cause**: the file does not have execute permission (`x`) for your user.

**Solution**:

```bash
$ chmod u+x my_script.sh
$ ./my_script.sh
```

→ See [Lab 2 — Permissions](./tp2.md)

---

### `Permission denied` on a directory

```
bash: cd: /root: Permission denied
```

**Cause**: you don't have traverse permission (`x`) on this directory, or read permission (`r`) to list its contents.

**Solution**: check permissions with `ls -ld /path/to/directory`. If the directory belongs to `root`, use `sudo` (with caution).

→ See [Lab 2 — Directory permissions](./tp2.md)

---

### `Operation not permitted`

```
rm: cannot remove '/etc/hosts': Operation not permitted
```

**Cause**: the file belongs to `root` and you don't have sufficient privileges.

**Solution**: use `sudo` only if you know what you're doing:

```bash
$ sudo rm /etc/hosts   # ⚠️ Dangerous! Do not do this on a system file.
```

!!! danger "Warning"
    `sudo` runs the command with administrator rights. A mistake with `sudo` can render the system unusable. Only use it when necessary and when you understand the command.

---

## Command Errors

### `command not found`

```
bash: gcc: command not found
```

**Possible causes**:

1. **The program is not installed.**
   ```bash
   $ sudo apt update && sudo apt install build-essential   # for gcc
   ```

2. **The program is not in `$PATH`.**
   ```bash
   $ echo $PATH                    # check the listed directories
   $ which my_program              # find its location
   $ type my_program               # distinguish built-in vs external
   ```

3. **Typo in the command name.**
   ```bash
   $ lls                           # ❌ typo
   $ ls                            # ✅ correct
   ```

→ See [Lab 2 — PATH](./tp2.md), [Lab 3 — Variables](./tp3.md)

---

### `No such file or directory`

```
bash: cd: my_folder: No such file or directory
```

**Possible causes**:

1. **The file or directory does not exist.** Check with `ls`.
2. **Wrong path** (relative vs absolute, typo).
   ```bash
   $ pwd                           # where am I?
   $ ls -la                        # what's here?
   ```
3. **Wrong case.** Linux is case-sensitive: `Documents` ≠ `documents`.

---

### `Is a directory`

```
cat: tp_shell: Is a directory
```

**Cause**: you're trying to use a file command on a directory.

**Solution**: use `ls` to list a directory, not `cat`:

```bash
$ ls tp_shell/                     # ✅ list contents
$ cat tp_shell/file.txt            # ✅ display a file inside it
```

---

### `Not a directory`

```
bash: cd: file.txt: Not a directory
```

**Cause**: you're trying to `cd` into a file instead of a directory.

**Solution**: check the type with `ls -l` (first character: `d` = directory, `-` = file).

---

## Shell Errors

### The terminal seems frozen (no prompt)

**Possible causes**:

1. **A command is waiting for input** (e.g., `cat` with no argument reads stdin).
   - **Solution**: press <kbd>Ctrl+D</kbd> (end of file) or <kbd>Ctrl+C</kbd> (interrupt).

2. **A program is running in the foreground** (e.g., `sleep 1000`).
   - **Solution**: <kbd>Ctrl+C</kbd> to stop it, or <kbd>Ctrl+Z</kbd> then `bg` to send it to the background.

3. **You're inside `man` or `less`.**
   - **Solution**: press <kbd>q</kbd> to quit.

→ See [Lab 4 — Processes and signals](./tp4.md)

---

### `Syntax error near unexpected token`

```
bash: syntax error near unexpected token `('
```

**Cause**: the shell is interpreting special characters that you didn't protect.

**Solution**: use quotes or backslashes to inhibit special characters:

```bash
$ echo "Hello (world)"            # ✅ double quotes
$ echo Hello \(world\)            # ✅ backslash
```

→ See [Lab 3 — Quoting](./tp3.md)

---

### The `$` prompt was copy-pasted

```
bash: $: command not found
```

**Cause**: you copied the `$` prompt along with the command from the lab instructions.

**Solution**: the `$` in lab instructions represents the prompt — don't type it. Only type the command that follows:

```bash
$ ls -l          # ❌ if you copy "$ ls -l"
ls -l            # ✅ type only this
```

---

### Unclosed quotes (`>` prompt)

```
$ echo "hello
>
>
```

**Cause**: the shell is waiting for a closing quote (`"` or `'`).

**Solution**: close the missing quote, or cancel with <kbd>Ctrl+C</kbd>:

```bash
$ echo "hello"                     # ✅ quote closed
```

---

## Compilation Errors (Lab 3)

### `undefined reference to 'main'`

```
/usr/bin/ld: undefined reference to `main'
```

**Cause**: your C program has no `main()` function, or you're compiling the wrong file.

**Solution**: verify that `main()` is defined in your source code:

```c
int main(void) {       // ✅ mandatory entry point
    return 0;
}
```

---

### `expected ';' before`

```
hello.c:5:1: error: expected ';' before '}' token
```

**Cause**: a semicolon is missing at the end of a statement.

**Solution**: every C statement ends with `;`. Check the indicated line and the line above it.

---

### `implicit declaration of function`

```
hello.c:4:5: warning: implicit declaration of function 'printf'
```

**Cause**: you're using a function without including its header file.

**Solution**: add the appropriate `#include` at the top of the file:

```c
#include <stdio.h>     // for printf, scanf, etc.
#include <stdlib.h>    // for malloc, exit, etc.
#include <string.h>    // for strlen, strcpy, etc.
```

→ See [Lab 3 — Compilation](./tp3.md)

---

## Redirection and Pipe Errors (Lab 4)

### `ambiguous redirect`

```
bash: file: ambiguous redirect
```

**Cause**: the redirection filename contains unprotected spaces or an undefined variable.

**Solution**:

```bash
$ echo hello > "my file.txt"       # ✅ quotes around the name
$ echo hello > $FILE               # ❌ if $FILE is empty or contains spaces
$ echo hello > "$FILE"             # ✅ always quote variables
```

---

### Output file is empty after `>`

**Cause**: `>` **truncates** the file before writing. If you redirect a file to itself, it's emptied first:

```bash
$ sort file.txt > file.txt         # ❌ file emptied then sorted (result: empty!)
$ sort file.txt > file_sorted.txt  # ✅ use a different file
```

---

### `Broken pipe`

```
$ command1 | command2
bash: command1: Broken pipe
```

**Cause**: `command2` terminated before `command1` finished writing.

**Solution**: this message is often benign (e.g., `cat large_file | head -5`). The result is usually correct despite the message.

→ See [Lab 4 — Pipes](./tp4.md)

---

## Common WSL Issues

### WSL won't start

```
WslRegisterDistribution failed with error: 0x80370102
```

**Cause**: virtualization is not enabled in BIOS/UEFI.

**Solution**: restart the computer, enter BIOS (usually <kbd>F2</kbd>, <kbd>F12</kbd> or <kbd>Del</kbd> at startup) and enable **Intel VT-x** or **AMD-V**.

→ See [WSL Installation](./installation-wsl.md)

---

### No network access from WSL

```
wget: unable to resolve host address
```

**Solution**:

```bash
$ sudo nano /etc/resolv.conf
```

Add or modify the line:

```
nameserver 8.8.8.8
```

---

### Where are Windows files in WSL?

Windows drives are automatically mounted:

```bash
$ cd /mnt/c/Users/YourName/        # access drive C:
$ ls /mnt/d/                        # access drive D: (if present)
```

And from Windows, WSL files are accessible at: `\\wsl$\Debian\home\your_user\`

!!! warning "Watch out for line endings"
    Files created on Windows use `\r\n` (CRLF), those on Linux use `\n` (LF). This can cause errors with shell scripts. Use `dos2unix` to convert:
    ```bash
    $ sudo apt install dos2unix
    $ dos2unix my_script.sh
    ```

---

## Best Practices to Avoid Errors

!!! tip "Good habits to adopt"
    1. **Read the entire error message** — it almost always indicates the cause and the relevant file/line.
    2. **Use `man` and `--help`** before trying an unknown command.
    3. **Use <kbd>Tab</kbd>** for completion — fewer typos.
    4. **Test on an unimportant file** before manipulating real data.
    5. **Don't copy the `$`** from lab instructions.
    6. **Prefer absolute paths** when in doubt about the current directory.
    7. **`sudo` is not the default answer** — first understand why permission was denied.
