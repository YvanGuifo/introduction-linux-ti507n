---
title: Lab 2 - File system and permissions
---

# Lab 2 — File system and permissions

!!! objectifs "Learning objectives (revised Bloom's taxonomy)"
    By the end of this lab, you will be able to:

    - **[Understand]** the hierarchical structure of the Linux file system (standard directories, `/etc/passwd`, notion of user and group).
    - **[Apply]** read the permissions of a file or directory (`ls -l`, `ls -ld`) in symbolic and octal notations.
    - **[Apply]** modify permissions with `chmod` (symbolic and octal notations).
    - **[Analyze]** distinguish permissions on files vs. directories (`r`, `w`, `x`).
    - **[Analyze]** understand the role of the `PATH` variable in command resolution.
    - **[Evaluate]** determine the **minimum** permissions required for a given operation.
    - **[Analyze]** understand and manipulate the `umask` mask.

    > **Reference**: Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman. ISBN 978-0801319037.

!!! tip "Prerequisites"
    - **Lab 1 completed**: navigation, file creation/manipulation, use of `man`.
    - Debian 12 distribution installed **or** active MarioNum session.
    - Terminal open and `$` prompt visible.

!!! info "Instructions"
    - The `$` at the beginning of a command represents the prompt and should not be typed.
    - For each new command, consult `man` or `--help`.

!!! warning "About lab answers"

    Before you begin, create a file named **`resultat_commande_TP2_StudentLastnameFirstname.txt`**.
    You will progressively record your command results there.

    > **Creating the file**

    1. Right-click in your working directory
    2. Create a document → Empty file
    3. Name it: `resultat_commande_TP2_StudentLastnameFirstname.txt`

    > **Please note:**
    >> - <span style="color:blue"> Your instructor must be able to view this file at any time. </span>

    >> - <span style="color:red"> Save this file **locally** before the end of the session. </span>
    >>> **Local backup procedure**:
        1. Click on the **clipboard** (to the left of the VM Desktop).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Select the content and copy it.
        3. Paste it on your host machine.

!!! tip "Exercise difficulty scale"
    > 📚 = Easy · 📚📚 = Medium · 📚📚📚 = Advanced
    >
    > Exercises **1 to 7** form the **core curriculum**, required for everyone.
    > Exercises **8, 9, 10** are **supplementary exercises** (⭐).

!!! info "Alignment with assessments (Biggs, 1996)"
    The 📚 and 📚📚 exercises prepare for the **CC S38** and the **graded lab S40**.
    The 📚📚📚 exercises prepare for the **DE S42 (MCQ)** through their analysis and justification dimension.

    > **Reference**: Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education*, 32(3), 347–364. DOI: [10.1007/BF00138871](https://doi.org/10.1007/BF00138871).

---

## 1. Linux file system

!!! tip "A single tree structure"
    The Linux file system is a **hierarchy** starting from the root `/`. All directories are subdirectories of `/`. Unlike Windows, there are no drive letters: disks and partitions are **mounted** within the single tree structure.

    A typical Linux system contains **tens of thousands** of system files. Most are only used by the kernel or services. In practice, what concerns you is found in `/home` (personal files), `/tmp` (temporary files), and `/etc` (configuration).

    | Directory | Description |
    |---|---|
    | `/` | Root of the tree structure |
    | `/bin` | Essential programs for system operation |
    | `/boot` | Files needed for booting |
    | `/dev` | Special files representing devices |
    | `/etc` | System configuration files |
    | `/home` | Users' personal directories |
    | `/lib` | Shared libraries, kernel modules |
    | `/media`, `/mnt` | File system mount points |
    | `/opt` | Additional software |
    | `/proc` | Virtual file system: process information |
    | `/root` | Administrator's personal directory |
    | `/sbin` | System administration programs |
    | `/tmp` | Temporary files |
    | `/usr` | Programs and libraries (`/usr/bin`, `/usr/lib`…) |
    | `/var` | Variable files (logs, mail, databases…) |

    > **Reference**: *Filesystem Hierarchy Standard*, v3.0, The Linux Foundation, 2015. <https://refspecs.linuxfoundation.org/fhs.shtml>

### Exercise 1 — `id` and `/etc/passwd` 📚

1. Enter the following command and note the result:
   ```bash
   $ id
   ```
2. Type the same command with the argument `root`:
   ```bash
   $ id root
   ```
3. Display the contents of `/etc/passwd` using `cat`.
4. Find the lines corresponding to your username and to `root`. What are the differences?
5. Can you deduce what the `/etc/passwd` file is used for?

---

## 2. Permissions associated with files

!!! tip "File protection"
    A Linux system allows multiple users to access files. To protect them, Linux uses a **permissions** system associated with three categories:

    - the **owner** (`u` — *user*): generally the file's creator;
    - the **owning group** (`g` — *group*);
    - **others** (`o` — *others*).

    For a **regular file**:

    - **`r`** (*read*): reading the content;
    - **`w`** (*write*): modifying the content;
    - **`x`** (*execute*): execution (if program or script).

    The `-l` option of `ls` displays metadata:

    ```bash
    $ ls -l fichier
    -rw-r--r-- 1 user group 0 2024-09-09 10:00 fichier
    ```

    The string `-rw-r--r--` is read as:

    - **1st character**: type (`-` regular file, `d` directory, `l` symbolic link…).
    - **characters 2–4**: owner permissions.
    - **characters 5–7**: group permissions.
    - **characters 8–10**: others' permissions.

    Octal ↔ symbolic correspondence:

    | Digit | Letters | Description |
    |---|---|---|
    | 0 | `---` | No permission |
    | 1 | `--x` | Execute |
    | 2 | `-w-` | Write |
    | 3 | `-wx` | Write and execute |
    | 4 | `r--` | Read |
    | 5 | `r-x` | Read and execute |
    | 6 | `rw-` | Read and write |
    | 7 | `rwx` | Read, write, and execute |

### Exercise 2 — Reading permissions 📚

1. Create an empty directory and an empty file, at the same level. Using `ls -l` and `ls -ld`, determine the permissions of the owner, the group, and others. How do you recognize a directory?
2. The following lines show the output of `ls -ld` on different files:
   ```text
   drwxr-xr-x a
   dr-xr--r-- b
   -rw-r--r-- c.txt
   --w--w-r-- d.c
   -rwxr-xr-x op
   ```
   Among these files, which ones are **directories**?
3. For each of the files above, give the permissions in **symbolic** and **octal** representations.
4. Give the symbolic and octal representations of the permissions of `/etc/passwd`, of the `ls` command, and of your home directory.

### Exercise 3 — Modifying permissions with `chmod` 📚📚

1. Test the following commands and try to understand `chmod` in **symbolic** notation:
   ```bash
   $ touch f; ls -l f
   $ chmod a= f; ls -l f
   $ chmod o+rw f; ls -l f
   $ chmod u=o f; ls -l f
   $ chmod o-wx f; ls -l f
   $ chmod g+u f; ls -l f
   $ chmod a+x,g-w f; ls -l f
   ```
2. Test `chmod 644 f; ls -l f`. What does this command do?
3. Using **both notations** (octal and symbolic), modify the permissions of `f` to obtain:
   - execute for all, read and write only for the owner;
   - read and execute for all, no one can write;
   - all permissions for all, no write for others;
   - read and write for the owner, execute for the group, none for others.

### Exercise 4 — Effect of permissions on operations 📚📚

1. In a directory of your choice, create two files `f` and `g`. Enter some text in each using an editor.
2. For yourself (owner):
   - remove the **read** permission on `f`;
   - remove the **write** permission on `g`.
3. Test and note the results:
   ```bash
   $ cat f
   $ cat g
   ```
4. Try to modify `g` with a text editor. What happens?
5. Test:
   ```bash
   $ cp f h
   $ cp g h
   ```
   Then observe the contents of `h` and its permissions.
6. The following command appends the string `toto` to the end of `f` (seen in Lab 4):
   ```bash
   $ echo "toto" >> f
   ```
   Test it, then give yourself back read permission on `f`, and display its contents with `cat`.
7. Test:
   ```bash
   $ rm g
   ```
   **Type `n` to refuse**. Then test:
   ```bash
   $ rm -f g
   ```
   Did the command succeed? What can you conclude?

---

## 3. Permissions associated with directories

!!! tip "What is a directory?"
    A **directory** is a table associating file names with an index number called an **inode**. The inode contains metadata (size, permissions, timestamp, content location).

    For a **directory**, the semantics of permissions differ from those of a file:

    - **`r`**: allows **listing** the contents of the directory.
    - **`w`**: allows **modifying** the contents (creating or deleting files).
    - **`x`**: allows **entering** the directory (with `cd`) and traversing to its files.

    > **Reference**: Bach, M. J. (1986). *The Design of the UNIX Operating System*. Prentice Hall. ISBN 978-0132017992. Chapter 4 (Internal Representation of Files).

### Exercise 5 — Permissions on directories 📚📚📚

1. Create a directory `rep` and two regular files `a` and `b` inside it.
2. Remove **all** permissions on `rep` and try:
   ```bash
   $ cd rep
   $ ls rep
   $ cat rep/a
   $ touch rep/c
   $ rm rep/a
   ```
3. Give back only the `r` permission on `rep` and redo the commands. Note the differences.
4. Same question with only `w` on `rep`. Note the differences.
5. Only `x` on `rep`:
   ```bash
   $ cd rep
   $ ls rep
   $ echo "toto" >> rep/a
   $ cat rep/c
   $ ls -l rep/a
   $ touch rep/c
   $ rm rep/a
   ```
6. With `-wx` on `rep` for all, try to:
   - create a file `d` in `rep`;
   - rename `b`;
   - remove all permissions on `d`;
   - delete `d`.

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## 4. The `PATH`

!!! tip "The `PATH` environment variable"
    When you type a command without a path (for example `ls`), the shell looks for it in a list of directories stored in the **`PATH`** variable. The directories are separated by `:`.

    The order matters: the shell takes the **first** match found.

### Exercise 6 — The `PATH` directories 📚📚📚

!!! warning "Caution — experimentation exercise"
    This exercise is delicate and important. Take your time.

1. In a new terminal:
   ```bash
   $ echo $PATH
   ```
   Observe. In your opinion, what do the elements separated by `:` correspond to?
2. Create a `bin` directory in your home and modify `PATH`:
   ```bash
   $ mkdir -p ~/bin
   $ PATH=~/bin:$PATH
   $ echo $PATH
   ```
   What is the difference compared to the output from question 1?
3. Using `type`, find the absolute paths of `cat` and `rm` and note them.
4. Copy `cat` into `~/bin` renaming it `rm`.
5. Create a file `fic` with a few characters, and two copies `fic2`, `fic3`.
6. Try to delete `fic` using `rm`. What happened?
7. Enter `type rm`.
8. Run:
   ```bash
   $ <absolute path to rm> fic
   ```
   *(replacing `<absolute path to rm>` with the path noted in question 3)*. What happened?
9. Remove the `x` permission on `~/bin/rm` and try to delete `fic2`.
10. Ask the shell to forget cached locations:
    ```bash
    $ hash -r
    $ type rm
    $ rm fic2
    ```
11. Restore the `x` permission on `~/bin/rm` and test:
    ```bash
    $ ~/bin/rm fic3
    $ cd ~/bin
    $ ./rm fic3
    $ <absolute path to rm> rm
    $ rm fic3
    ```
12. **Summary** — answer:
    - What is contained in `PATH`?
    - In which case is a command name searched in the `PATH` directories?
    - If there are multiple matching programs, which one is chosen?

---

## 5. Permissions recap

### Exercise 7 — Hands off the keyboard 📚📚📚

!!! info "Instructions"
    This exercise is done **in writing** — hands off the keyboard.

For each of the following commands, state **which permissions are required** for it to succeed (assume that all directories and files exist, except those we want to create).

```bash
$ cat /usr/include/stdio.h
$ cd /usr/include/
$ ls /usr/include/
$ echo '/* fin */' >> /usr/include/stdio.h
$ rm /usr/include/stdio.h
$ touch /usr/include/ma_bib.h
$ chmod u+w /usr/include/stdio.h
$ /usr/bin/uname
```

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## Summary — What you should be able to do

!!! success "Quick self-assessment (core curriculum)"
    Before leaving the session, verify that you can:

    - [ ] Name the role of the main directories (`/etc`, `/home`, `/usr`, `/var`, `/bin`, `/tmp`).
    - [ ] Interpret `id` and the format of `/etc/passwd`.
    - [ ] Read the 9 permission characters and identify owner / group / others.
    - [ ] Modify permissions with `chmod` in **symbolic** and **octal** notations.
    - [ ] Explain the difference in semantics of `r`, `w`, `x` between **files** and **directories**.
    - [ ] Describe what `PATH` contains and how the shell resolves a command.
    - [ ] Determine the minimum permissions for a given operation.

    If an item is not checked, **go back to the corresponding exercise** before Lab 3.

---

## ⭐ Supplementary exercises

!!! star "Who are exercises 8, 9, 10 for?"
    Have you completed exercises 1 to 7? These three exercises **deepen the permission concepts from Lab 2**: creation mask (`umask`), special permissions (`SUID`, `SGID`, *sticky bit*), and writing a security audit script.

    The targeted taxonomic levels are **[Analyze]**, **[Evaluate]**, and **[Create]** (revised Bloom).

    These exercises are **optional** and **not graded**.

### Exercise 8 — Understanding and manipulating `umask` ⭐

!!! tip "`umask`"
    `umask` defines the permissions **removed by default** from the files and directories you create. The value is octal: it is **subtracted** from the default permissions (666 for files, 777 for directories).

    Example: if `umask` is `022`, a created file will have `644` (= `666 − 022`) and a directory `755` (= `777 − 022`).

1. Type `umask` and note the result.
2. Create a directory `rep` and a file `f` at the same level. Display their permissions with `ls -ld rep f`. Convert to octal and note.
3. Change the mask:
   ```bash
   $ umask 240
   ```
   Redo question 2.
4. Same with:
   ```bash
   $ umask 121
   ```
5. Same with:
   ```bash
   $ umask 666
   ```
6. Can you deduce how `umask` works?
7. Restore the initial value of `umask`.

### Exercise 9 — Special permissions: SUID, SGID, sticky bit ⭐

!!! tip "Beyond the classic 9 bits"
    In addition to `rwxrwxrwx`, Linux defines **three special bits**:

    | Bit | Octal | On a file | On a directory |
    |---|---|---|---|
    | **SUID** (Set User ID) | `4000` | The program runs with the **owner's** privileges | — |
    | **SGID** (Set Group ID) | `2000` | The program runs with the **group's** privileges | Created files inherit the directory's group |
    | **Sticky bit** | `1000` | — | Only the owner of a file can delete it |

    These bits appear in `ls -l` in place of the `x`: `s` (SUID/SGID) and `t` (sticky).

1. Examine the permissions of the `passwd` command:
   ```bash
   $ ls -l $(which passwd)
   ```
   You should see an `s` in place of the owner's `x`. What does this `s` mean?

2. **Analysis question**: why does the `passwd` command need the SUID bit? Which file does it need to modify, and who owns it?
   ```bash
   $ ls -l /etc/shadow
   ```

3. Search for all SUID files on the system:
   ```bash
   $ find / -perm -4000 -type f 2>/dev/null
   ```
   Why do we redirect `stderr` to `/dev/null`? How many SUID files do you find?

4. Examine the `/tmp` directory:
   ```bash
   $ ls -ld /tmp
   ```
   What does the `t` at the end of the permissions mean? Why is it essential for `/tmp`?

5. **Hands-on**: create a `partage/` directory with the sticky bit and test:
   ```bash
   $ mkdir partage
   $ chmod 1777 partage
   $ ls -ld partage
   ```
   Break down `1777`: what does each digit represent?

6. **SGID hands-on** on a directory:
   ```bash
   $ mkdir equipe
   $ chmod 2775 equipe
   $ ls -ld equipe
   ```
   Create a file inside `equipe/`. Which group does it belong to? Compare with a file created in a directory without SGID.

7. **Evaluation question**: an administrator finds a SUID file owned by root in `/tmp`. Why is this a **critical security risk**?

### Exercise 10 — Permissions audit script ⭐

This exercise combines everything you have learned in this lab to write a **security audit** script.

1. Create the script `audit-permissions.sh`:
   ```bash
   #!/bin/bash
   # Audit de permissions — TP2 étoile
   # Vérifie les points de sécurité courants liés aux permissions

   echo "=== AUDIT DE PERMISSIONS ==="
   echo "Date : $(date)"
   echo "Utilisateur : $(whoami)"
   echo ""

   echo "--- 1. Fichiers SUID appartenant à root ---"
   find / -user root -perm -4000 -type f 2>/dev/null | head -20
   echo ""

   echo "--- 2. Fichiers SGID ---"
   find / -perm -2000 -type f 2>/dev/null | head -10
   echo ""

   echo "--- 3. Fichiers accessibles en écriture par tous (world-writable) ---"
   find /home -perm -o=w -type f 2>/dev/null
   echo ""

   echo "--- 4. Répertoires sans sticky bit accessibles en écriture par tous ---"
   find / -perm -o=w ! -perm -1000 -type d 2>/dev/null
   echo ""

   echo "--- 5. Fichiers sans propriétaire ou sans groupe ---"
   find /home -nouser -o -nogroup 2>/dev/null
   echo ""

   echo "=== FIN DE L'AUDIT ==="
   ```

2. Make it executable and run it:
   ```bash
   $ chmod +x audit-permissions.sh
   $ ./audit-permissions.sh
   ```

3. **Analysis question**: for each of the 5 checks, explain in one sentence **why** it is a potential security problem.

4. **Improvement**: add a 6th check that lists files in `/etc` readable by "others" (`o=r`) whose name contains `shadow` or `secret`. *(Hint: combine `find` with `-name`.)*

5. **Evaluation question**: your script uses `head -20` and `head -10` to limit the output. In a real audit context, how would you adapt the script to save the complete results to a log file while displaying a summary on screen? *(Hint: think about the `>>` redirection to write to a log file, and the `tee` command that you will discover in Lab 4.)*

!!! info "Looking ahead to Lab 3"
    In Lab 3 you will discover **C compilation** and environment variables. The bonus exercises in Lab 3 will delve deeper into C system programming — by then you will have all the necessary foundations.

---

## Further reading (recommended)

- *Filesystem Hierarchy Standard* v3.0: <https://refspecs.linuxfoundation.org/fhs.shtml>
- *Debian Reference*: <https://www.debian.org/doc/manuals/debian-reference/>
- Shotts, W. (2019). *The Linux Command Line*, 2nd ed. No Starch Press. ISBN 978-1593279523. Chap. 9 (*Permissions*).
- Garfinkel, S., Spafford, G., & Schwartz, A. (2003). *Practical Unix and Internet Security*, 3rd ed. O'Reilly. ISBN 978-0596003234.
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203, chap. 15 (*File Attributes*).
