---
title: Lab 1 - First commands
hide:
    - path
---

# Lab 1 — First commands

!!! objectifs "Learning objectives (revised Bloom's taxonomy)"
    By the end of this lab, you will be able to:

    - **[Understand]** what a shell command is, and distinguish between internal / external commands, aliases, and functions.
    - **[Apply]** navigate through the Linux file system tree (`pwd`, `cd`, `ls`).
    - **[Apply]** create, move, copy, rename, and delete files and directories (`mkdir`, `touch`, `mv`, `cp`, `rm`, `rmdir`).
    - **[Apply]** use essential terminal keyboard shortcuts (<kbd>↑</kbd>, <kbd>Ctrl-L</kbd>, <kbd>Ctrl-U</kbd>, <kbd>Ctrl-D</kbd>, <kbd>Tab</kbd>).
    - **[Apply]** access online help (`man`, `help`) and read a SYNOPSIS.
    - **[Analyze]** distinguish between absolute and relative paths, and predict the result of a command using wildcards (`*`, `?`, `[]`).
    - **[Evaluate]** choose the appropriate command and option for a given need.

    > **Reference**: Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy*. Longman. ISBN 978-0801319037.

!!! tip "Prerequisites"
    - Preliminary reading completed ([preliminary-reading](./preliminary-reading.md)).
    - Debian 12 distribution installed ([installation d’une distribution Linux](./installation-linux.md)) **or** active MarioNum session ([Intro-MarioNum](./Intro-MarioNum.md)).
    - Terminal open and `$` prompt visible.

!!! info "Instructions"
    - In all exercises, the `$ ` string at the beginning of a line represents the command prompt and **must not** be typed.
    - Each time you open a new terminal, for pedagogical purposes, type:
      ```bash
      $ PS1='$ '
      ```

!!! warning "About the lab answers"

    Before starting, create a file named **`resultat_commande_TP1_LastnameFirstnameStudent.txt`**.
    You will progressively record the results of the commands you execute in this file.

    > **Creating the file**

    1. Right-click in your working directory
    2. Create a document → Empty file
    3. Name it: `resultat_commande_TP1_LastnameFirstnameStudent.txt`

    > **Important notes:**
    >> - <span style="color:blue"> Your instructor must be able to view this file at any time to assess your progress. </span>

    >> - <span style="color:red"> Save this results file **locally** before the end of the session. </span>
    >>> **Procedure for saving locally**:
        1. Click on the **clipboard** (to the left of the virtual machine Desktop).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Select the content and copy it.
        3. Paste it into a new file on your host machine.

!!! tip "Exercise difficulty scale"
    > 📚 = Easy · 📚📚 = Medium · 📚📚📚 = Hard
    >
    > Exercises **1 to 7** constitute the **core curriculum**, required for all students.
    > Exercises **8, 9, 10** are **supplementary exercises** (⭐).

!!! info "Alignment with assessments (Biggs, 1996)"
    Exercises 📚 and 📚📚 prepare for the **CC S38** and the **graded lab S40**.
    Exercises 📚📚📚 prepare for the **DE S42 (MCQ)** through their analysis and justification dimension.

    > **Reference**: Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education*, 32(3), 347–364. DOI: [10.1007/BF00138871](https://doi.org/10.1007/BF00138871).

---

## 1. Anatomy of a command, keyboard shortcuts

??? saviezvous "Why are Unix commands so short?"
    The creators of Unix, **Ken Thompson** and **Dennis Ritchie** (Bell Labs, 1969–1971), used an ASR-33 teletype as their terminal. This mechanical keyboard was slow and noisy: every keystroke counted. That's why commands became `ls` instead of `list`, `cp` instead of `copy`, `mv` instead of `move`. This brevity, born from a hardware constraint, became a cultural trait of Unix.

    > Ritchie, D. M. & Thompson, K. (1974). The UNIX Time-Sharing System. *Communications of the ACM*, 17(7), 365–375. DOI: [10.1145/361011.361061](https://doi.org/10.1145/361011.361061)

!!! tip "What is a command?"
    A **command** is a sequence of words terminated by <kbd>Enter</kbd>. The first word is the **name** of the command, the others are its **arguments**.

    ```bash
    $ touch file.txt
    ```

    Here, `touch` is the command and `file.txt` is its only argument. Words are separated by one or more spaces; the shell interprets spaces as delimiters, and the *newline* character as the end of the command.

### Exercise 1 — First commands and keyboard shortcuts 📚

1. Try the following commands in a terminal. For each one, describe its purpose in one sentence, indicate its name, its number of arguments, and its arguments. *Example*: the `date` command has no arguments and displays the date and time.
   ```bash
   $ date
   $ cal
   $ cal 3 2022
   $ who
   $ who am i
   $   who  am   i
   $ uname
   $ uname -m -r
   $ uname -mrs
   $ echo Hello, world!
   $ echo       Hello,        world!
   ```

2. Press <kbd>↑</kbd> (or <kbd>Ctrl-P</kbd>) several times until the `who` command appears. Now press <kbd>↓</kbd> (or <kbd>Ctrl-N</kbd>) until you get back to `uname -m -r`, then execute it. Note what these shortcuts do.
3. Press <kbd>Ctrl-L</kbd>. Note what this shortcut does.
4. Without typing the command, display `cal 3 2022`, **without executing it**.
5. Press <kbd>Ctrl-U</kbd>. Note what this shortcut does.
6. Display `uname`, without typing it or executing it, then press <kbd>Ctrl-D</kbd>. What happens?
7. Clear the line with a keyboard shortcut, then press <kbd>Ctrl-D</kbd> again. What happens?
8. Open a new Debian terminal and press <kbd>Ctrl-P</kbd> several times. What do you observe?
9. Close the terminal with a keyboard shortcut.

---

## 2. Directories and files: finding your way

!!! tip "The shell in its environment"
    Each terminal is located **in** a directory: its *current directory* (or *working directory*). Three essential commands:

    - `pwd` (*print working directory*): displays the absolute path of the current directory.
    - `cd <path>` (*change directory*): changes location.
    - `cd` alone → home directory.
    - `cd ..` → parent directory.
    - `cd -` → previous directory.
    - `ls [<path>]`: lists the contents of a directory.

    The `~` character (*tilde*) is a shortcut for the user's home directory.

### Exercise 2 — Finding your way in the file tree 📚📚

1. Open a terminal and type `PS1='$ '`.
2. Enter `pwd` and note what is displayed: this is the absolute path of your *home*.
3. Enter `cd ..` then `pwd`. Repeat until the result stays the same. What happened?
4. Enter `cd` (with no argument), then `pwd`. Comment.
5. Enter `cd /`, then `pwd` and `ls`. What does `ls` do?
6. Enter `cd /usr/include` then `ls`. What does this directory seem to be used for?

    ??? saviezvous "Why is the command called `cat`?"
        The command `cat` is short for **concatenate**. Its primary purpose was not to display a file, but to **concatenate** multiple files end-to-end (`cat file1 file2 > merged`). The common usage `cat file` to *display* a file is actually a special case: concatenation of a single file to standard output. This distinction becomes important in Lab 4 when we cover redirections.

7. Reminders:

    - `cat` *(concatenate)* displays the files given as arguments.
    - `wc` *(word count)* displays the number of lines, words, and characters.

    Display the contents of the file `stdlib.h` and its number of lines.

8. Enter `cd ..`, `pwd` and `ls`.
9. Enter `cd share/man`, then `pwd` and `ls`. What do some of the results refer to?
10. Enter `ls /bin`. Are some of the names familiar?
11. Enter `echo ~`, then `cd ~`. What does the shell do with the `~` character?
12. Represent the directories and files mentioned in this exercise as a tree diagram.

!!! warning "Where is `~` on the keyboard?"
    - Azerty Windows: <kbd>Alt Gr</kbd> + <kbd>2</kbd>
    - Mac: <kbd>Alt</kbd> + <kbd>N</kbd>

---

## 3. Managing directories and files

!!! tip "Absolute and relative paths"
    In Linux, directories are separated by `/` (as opposed to `\` in Windows).

    - **Absolute path**: starts with `/`, valid in any context. E.g.: `/home/debian`.
    - **Relative path**: interpreted from the current directory. E.g.: `./Documents` from `/home/debian` → `/home/debian/Documents`.
    - **`.`** = current directory · **`..`** = parent directory · **`~`** = home directory.

### Exercise 3 — Create, move, copy, delete 📚📚

1.  Navigate to your home directory and list its contents.
2.  Create a directory `tp_shell` with `mkdir`. List the contents of the home directory and of `tp_shell`.
3.  Enter `mkdir abeilles tp_shell/tp1 ~/arbres`. Which arguments are absolute and which are relative?
4.  What does the following command do?
    ```bash
    $ mkdir -p vivant/plante/fleur tp_shell/tp1/exos/ex1/ # (i)
    ```

    1. `-p` (*parents*) creates all missing intermediate directories. Without this option, `mkdir` fails if a parent directory doesn't exist.

    ??? saviezvous "The Tab key: a revolution in human-computer interaction"
        **Tab completion** was introduced in the **C shell** (`csh`) by Bill Joy at UC Berkeley in 1978, then adopted and improved by Bash. Before that, every filename had to be typed in full, letter by letter — a constant source of typos. Today, "smart" completion goes far beyond filenames: it completes command options, SSH hostnames, Git branches, and much more.

        > Joy, W. (1979). *An Introduction to the C Shell*. Computer Science Division, University of California, Berkeley.

5.  Test **tab completion** with the <kbd>Tab</kbd> key:
    ```bash
    $ mkd<Tab> vi<Tab><Tab><Tab>roses
    ```
    Then:
    ```bash
    $ ls a<Tab><Tab>
    ```

6.  Delete empty directories with `rmdir`:
    ```bash
    $ rmdir vivant tp_shell/tp1/exos/ex1
    ```

    **One of the two deletions fails.** Which one, and what exactly does the error
    message say? What does that tell you about `rmdir`?

    Now try to delete the `tp1` subdirectory of `tp_shell` with `rmdir`: this fails
    too. Find out why (`ls -R tp_shell`), then actually delete it — either by working
    up the tree from the bottom, or with `rmdir`'s `-p` option.

    !!! warning "Do not delete `vivant`"
        `vivant` must stay in place: question 8 uses it as a destination.
        Also delete the `tp1` subdirectory of `tp_shell`.

7.  Create empty files with `touch`:
    ```bash
    $ touch ~/arbres/hello.c abeilles/truc.txt bidule
    $ ls ~/arbres abeilles/ .
    ```

8.  Move / rename with `mv`:
    ```bash
    $ mv arbres/hello.c arbres/bonjour.c
    $ mv abeilles arbres vivant/
    $ mv bidule vivant
    $ mv vivant vie
    ```

9.  Copy with `cp`:
    ```bash
    $ cp vie/arbres/bonjour.c salut.c
    $ mkdir copies
    $ cp salut.c vie/abeilles/truc.txt copies
    $ cp -R vie copie_vie # (i)
    ```

    1. `-R` (*recursive*) copies the directory and **all** its contents (subdirectories and files). Without `-R`, `cp` refuses to copy a directory.

    Describe the behavior of `cp` depending on whether its last argument is an existing directory or not, with and without `-R`.

10. Delete with `rm`:
    ```bash
    $ rm vie/bidule
    $ rm -r copies # (i)
    $ rm -R copie_vie
    ```

    1. `-r` (or `-R`, *recursive*) deletes the directory and **all** its contents. Without this option, `rm` refuses to delete a directory.

    Clean up all files and directories created in this exercise.

!!! warning "`rm` is permanent"
    On the Linux command line, **there is no recycle bin**. Before using `rm -r`, check `pwd` and `ls`.

### Exercise 4 — Build a structured directory tree 📚📚📚

Create the following directory tree from your home directory. Only `rapport.txt` and `index.html` are regular files. The directories **Mail**, **Rapport**, and **Web** must be created **in a single** `mkdir` **command**.

```text
~
├── Mail/
├── Rapport/
│   ├── rapport.txt
│   └── Docs/
│       ├── Afaire/
│       └── Fait/
└── Web/
    └── index.html
```

*(Names followed by `/` are directories; `rapport.txt` and `index.html` are regular
files. You can check your work with `ls -R ~`.)*

Use `touch` to create the regular files, then a text editor to give them some content.

From your home directory, execute:

1. Go directly to `~/Rapport/Docs/Afaire`.
2. From there, go to `~/Rapport/Docs/Fait` and copy `rapport.txt` into it (reminder: `.` refers to the current directory).
3. Rename this copy `rapport_copie.txt`.
4. Go back to `~/Rapport`.
5. **Without changing** directory, display the contents of `index.html` with `cat`.
6. **Without changing** directory, list the contents of the `Web` directory.
7. Go back to `~` and delete the entire directory tree from this exercise.

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## 4. Command types and online help

!!! tip "The different types of commands"
    There are several types:

    - **external**: compiled programs or scripts installed on the system;
    - **internal** (*shell builtins*): built into the shell;
    - **shell functions**: defined by the user;
    - **aliases**: shortcuts for commands.

    The `type` command indicates the type. Example:

    ```bash
    $ type type
    type is a shell builtin
    ```

### Exercise 5 — Internal vs external 📚

1. For each command used in the previous exercises (including `type`), use `type` to determine which category it belongs to.
2. Guess in which directories most installed programs are located.

!!! warning "If `man` is not installed (Debian / WSL)"
    Install with:
    ```bash
    $ sudo apt install manpages man-db
    ```

!!! tip "Manual pages"
    `man` provides help for **external** commands. For **internal** commands, use `help`.

    A manual page typically includes:

    - **NAME** — one-line description;
    - **SYNOPSIS** — accepted syntaxes;
    - **DESCRIPTION** — detailed options and arguments;
    - possibly **EXAMPLES**.

### Exercise 6 — Getting help 📚📚

1. Enter `man ls`. What are the `-l` and `-a` options? Quit with <kbd>q</kbd> and test them.
2. Using the manual, explain what the `-f` option of `rm` does and how to delete a file whose name starts with a dash (for example `-f`).
3. Using `help`, display the help pages for the built-in commands `echo` and `type`.
4. Using `man touch`, what is the purpose of `touch` beyond just creating empty files?
5. Using `man man`, find the section that discusses built-in commands. In which section are libraries documented (for example libc)? What is the difference between:
   ```bash
   $ man 1 printf
   $ man 3 printf
   ```

6. In the SYNOPSIS of `mv`, what do the square brackets `[ ]` and the ellipsis `...` mean? Consult `man man` if needed.

---

## 5. Wildcards

!!! tip "Wildcards"
    **Wildcards** represent one or more other characters. They are interpreted by the shell **before** the command is executed — this is **pathname expansion**.

    - `*`: a possibly empty string, **except** if it is the first character of a name beginning with a dot.
    - `?`: any single character.
    - `[...]`: a single character from those listed. Ranges: `[a-z]`, `[0-5]`. Negation: `[^abc]`.

    Full list: see the **Pathname Expansion** section of the `bash` manual (`man bash`).

### Exercise 7 — Wildcards 📚📚📚

1.  Create a directory `tp_joker` in your home. Navigate into it. Create the following **empty** files:
    `annee1  Annee2  annee4  annee45  annee41  annee510  annee_saucisse  annee_banane  bonbon`

2.  Without executing them, predict the result of the following commands, then test:
    ```bash
    $ echo *          # (i)
    $ echo *_*        # (ii)
    $ echo [ab]*      # (iii)
    $ echo [^ab]*     # (iv)
    $ echo c*
    $ echo ??????     # (v)
    ```

     1. `*` matches any string (even empty), except files starting with `.`.
     2. `*_*`: files containing an underscore — `*` on each side matches any prefix/suffix.
     3. `[ab]*`: files starting with `a` **or** `b`. Brackets define a set of possible characters for **one** position.
    4. `[^ab]*`: the `^` **negates** the class — here, files starting with **neither** `a` **nor** `b`.
    5. `?` matches exactly **one** character. Six `?` = files with exactly 6 characters.

3.  Using `ls`, list all files that:

    - end with `5`;
    - start with `annee4`;
    - start with `annee4` and have at most 7 characters;
    - start with `annee` and whose sixth character is **not** a digit;
    - contain the string `ana`;
    - start with `a` **or** `A`;
    - whose second-to-last character is `4` **or** `1`.

4.  List all hidden files (names starting with `.`) in your home directory.
5.  List all files whose name starts with `std` and ends with `.h` in `/usr/include`.

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## Summary — What you should be able to do

!!! success "Quick self-assessment (core curriculum)"
    Before leaving the session, verify that you can:

    - [ ] Identify the name, options, and arguments of a command.
    - [ ] Use the shortcuts <kbd>↑</kbd>, <kbd>Ctrl-L</kbd>, <kbd>Ctrl-U</kbd>, <kbd>Ctrl-D</kbd>, <kbd>Tab</kbd>.
    - [ ] Distinguish between absolute and relative paths.
    - [ ] Create, move, copy, rename, and delete files and directories.
    - [ ] Use `type`, `man`, `help` and read a SYNOPSIS.
    - [ ] Predict the result of a pathname expansion with `*`, `?`, `[]`.

    If any item is unchecked, **go back to the corresponding exercise** before Lab 2.

---

## ⭐ Supplementary exercises

!!! star "Who are exercises 8, 9, 10 for?"
    Finished exercises 1 to 7 before the end of the session? These three exercises **deepen the concepts from Lab 1** by introducing you to advanced searching with `find`, symbolic and hard links, and writing your first shell script.

    The targeted taxonomic levels are **[Analyze]**, **[Evaluate]**, and **[Create]** (revised Bloom).

    These exercises are **optional** and **not graded**.

### Exercise 8 — Advanced searching with `find` ⭐

!!! tip "The `find` command"
    `find` recursively traverses a directory tree and selects files based on **criteria**: name, type, size, modification date, etc. Unlike wildcards (Exercise 7), `find` descends into subdirectories.

    ```bash
    $ find <path> <criteria> [<action>]
    ```

    Consult `man find` for the complete list of criteria.

1. List **all files** (not directories) under `/etc`:
   ```bash
   $ find /etc -type f
   ```
   Estimate how many there are by examining the output.

2. Find all files whose name ends with `.conf` under `/etc`:
   ```bash
   $ find /etc -name "*.conf"
   ```
   Why are the quotes around `"*.conf"` essential?

3. Find all directories under `/usr` whose name contains `bin`.

4. Find files in `/var/log` that were modified **less than 24 hours ago**:
   ```bash
   $ find /var/log -type f -mtime -1
   ```

5. **Combining criteria**: find regular files under `/etc` whose name starts with `host` and that are larger than 100 bytes:
   ```bash
   $ find /etc -type f -name "host*" -size +100c
   ```

6. **Analysis question**: what is the fundamental difference between `ls /etc/*.conf` and `find /etc -name "*.conf"`? Test both and compare the results.

### Exercise 9 — Symbolic links and hard links ⭐

!!! tip "Two types of links in Linux"
    The `ln` command creates **links** to existing files:

    - **Hard link**: `ln file link` — creates a second name for the **same content** on disk. Both names are equivalent; deleting one does not delete the other.
    - **Symbolic link** (*symlink*): `ln -s target link` — creates a special file that **points to** a path. If the target is deleted, the link is "broken".

    Each file has an **inode number** (internal identifier). `ls -i` displays it.

    > **Reference**: Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203, chap. 18 (*Directories and Links*).

1. In `~`, create a directory `tp_liens/` and navigate into it. Create a file `original.txt` containing a few lines (use `echo` or an editor).

2. Create a **hard link**:
   ```bash
   $ ln original.txt lien_physique.txt
   $ ls -li
   ```
   Compare the inode numbers of `original.txt` and `lien_physique.txt`. What do you notice?

3. Modify the contents of `lien_physique.txt` (with `echo "nouvelle ligne" >> lien_physique.txt`). Display `original.txt`. Has the content changed? Why?

4. Create a **symbolic link**:
   ```bash
   $ ln -s original.txt lien_symbo.txt
   $ ls -li
   ```
   Compare the inode numbers. How do they differ from those of the hard link?

5. Observe the difference with `ls -l`:
   ```bash
   $ ls -l lien_physique.txt lien_symbo.txt
   ```
   What does the left column show for the symbolic link? What does the arrow `->` mean?

6. Delete the original file:
   ```bash
   $ rm original.txt
   $ cat lien_physique.txt
   $ cat lien_symbo.txt
   ```
   What happens for each of the two links? Explain the difference.

7. **Analysis question**: try creating a hard link to a directory (`ln tp_liens/ lien_rep`). What happens? Why does Linux forbid this? *(Hint: think about loops in the directory tree.)*

8. Find examples of symbolic links on the system:
   ```bash
   $ ls -l /usr/bin/python*
   $ ls -l /etc/alternatives/
   ```
   Why do Linux distributions use so many symbolic links?

### Exercise 10 — First shell script ⭐

!!! tip "What is a shell script?"
    A **script** is a text file containing a sequence of commands executed by the shell. The first line, the **shebang**, indicates which interpreter to use:

    ```bash
    #!/bin/bash
    ```

    To make a script executable: `chmod +x mon_script.sh`

    > **Reference**: Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O'Reilly. ISBN 978-0596009656, chap. 1-2.

1. In `~`, create a directory `scripts/` and navigate into it.
2. Using an editor (`nano`, `vim`...), create `info-systeme.sh`:
   ```bash
   #!/bin/bash
   # Script d'information système — TP1 étoile

   echo "=== Informations système ==="
   echo "Date et heure  : $(date)"
   echo "Utilisateur    : $(whoami)"
   echo "Machine        : $(hostname)"
   echo "Noyau          : $(uname -r)"
   echo "Répertoire     : $(pwd)"
   echo ""
   echo "=== Contenu du répertoire courant ==="
   ls -la
   echo ""
   echo "=== Espace disque ==="
   df -h /
   ```

3. Make the script executable and run it:
   ```bash
   $ chmod +x info-systeme.sh
   $ ./info-systeme.sh
   ```

4. **Creation exercise**: write a script `creer-arbo.sh` that:
    - Takes one **argument**: the name of a project (e.g. `mon_projet`).
    - Creates the following directory tree:
      ```
      mon_projet/
      ├── src/
      ├── docs/
      ├── tests/
      └── README.txt    (contient "Projet : mon_projet")
      ```
    - Displays a confirmation message.

    5. *Hint*: to access the first argument in a script, use `$1`. To check that an argument was provided:
       ```bash
       if [ -z "$1" ]; then
           echo "Usage : $0 <nom-du-projet>"
           exit 1
       fi
       ```

    6. Test your script:
       ```bash
       $ ./creer-arbo.sh tp_linux
       $ ls -R tp_linux
       $ cat tp_linux/README.txt
       ```

    7. **Evaluation question**: why is it preferable to test `[ -z "$1" ]` rather than letting the script fail silently without an argument?

!!! info "Looking ahead to Lab 2"
    You have just discovered `find`, links (`ln`, `ln -s`), and shell script writing. In **Lab 2**, you will explore **permissions** in depth and understand what `chmod +x`, which you used here, actually means.

---

## Further reading (recommended)

- *Debian Reference*: <https://www.debian.org/doc/manuals/debian-reference/>
- *The Linux Documentation Project*: <https://tldp.org/>
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O'Reilly. ISBN 978-0596009656.
- Shotts, W. (2019). *The Linux Command Line*, 2nd ed. No Starch Press. ISBN 978-1593279523. Available for free: <https://linuxcommand.org/tlcl.php>.
