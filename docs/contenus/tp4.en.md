---
title: Lab 4 - Standard Channels and Redirections | Processes and Jobs | Signals
---

# Lab 4 — Standard Channels and Redirections, Processes and Jobs, Signals

!!! objectifs "Learning Objectives (Bloom's Revised Taxonomy)"
    Upon completion of this lab, you will be able to:

    - **[Apply]** redirect the standard streams of a command using `>`, `>>`, `<`, `1>`, `2>`, `0<`.
    - **[Apply]** combine multiple commands with pipes (`|`) to automate processing.
    - **[Apply]** observe and control processes with `ps`, `top`, `jobs`, `fg`, `bg`.
    - **[Analyze]** distinguish a **process** from a **job**; distinguish foreground from background.
    - **[Apply]** send signals to a process with `kill` (`SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM`, `SIGKILL`).
    - **[Evaluate]** choose between graceful termination (`SIGTERM`) and forced termination (`SIGKILL`).
    - **[Create]** *(optional — ⭐)* write a C program that reacts to signals and fork a child process.

    > **Reference**: Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman. ISBN 978-0801319037.

!!! tip "Prerequisites"
    - **Lab 1, Lab 2 and Lab 3 completed**: navigation, permissions, shell variables, `gcc` compilation.
    - Debian 12 distribution or active MarioNum session.
    - Minimal C knowledge (compilation with `gcc`, covered in Lab 3).

!!! info "Instructions"
    - The `$` at the beginning of a line represents the prompt — do not type it.
    - For each new command, consult the manual page with `man` or the `--help` option.
    - Do not hesitate to revisit previous labs for help.

!!! warning "About the lab answers"

    Before starting the lab, you must create a file named **`resultat_commande_TP4_LastnameFirstnameStudent.txt`**.
    In this file, you will progressively record the results of the commands executed throughout the exercises.

    > **Creating the file**

    1. Right-click in your working directory
    2. Create a document → Empty file
    3. Name the file: `resultat_commande_TP4_LastnameFirstnameStudent.txt`

    > **Please note:**
    >> - <span style="color:blue"> Your instructor must be able to view this file at any time to assess your progress. </span>

    >> - <span style="color:red"> To keep a copy of your work, make sure to save this results file locally on your machine before the end of the session. </span>
    >>> **Local save procedure**:
        1. Click on the **clipboard** (to the left of your Debian virtual machine Desktop).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Select the content of your results file and copy it.
        3. Paste the copied content into a new file on your machine.

!!! tip "Exercise difficulty scale"
    > 📚 = Easy · 📚📚 = Medium · 📚📚📚 = Advanced
    >
    > Exercises **1 to 7** constitute the **core curriculum**, required for all students.
    > Exercises **8, 9, 10** are **supplementary exercises** (⭐).

!!! info "Alignment with assessments (Biggs, 1996)"
    Exercises 📚 and 📚📚 prepare for the **CC S38** and the **graded lab S40**.
    Exercises 📚📚📚 prepare for the **DE S42 (MCQ)** through their analysis and justification dimensions.

    > **Reference**: Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education*, 32(3), 347–364. DOI: [10.1007/BF00138871](https://doi.org/10.1007/BF00138871).

---

## 1. Standard Channels and Redirections

!!! tip "The three standard channels"
    Every Unix process has, from the moment it starts, **three open channels**:

    | Number | Name | Default role |
    |---|---|---|
    | `0` | **stdin** (standard input) | reads from the keyboard |
    | `1` | **stdout** (standard output) | writes to the terminal |
    | `2` | **stderr** (standard error) | writes to the terminal (error messages) |

    The shell allows you to **redirect** these channels to a file (or another channel).

!!! tip "Redirecting standard output"
    `>` redirects `stdout` to a file; `>>` appends to the end of the file.

    ```bash
    $ ls ~ > list_files.txt    # crée ou écrase list_files.txt
    $ ls ~ >> list_files.txt   # ajoute en fin de list_files.txt
    ```

    !!! warning "Warning"
        `>` **overwrites** without asking for confirmation. To preserve existing content, use `>>`.

### Exercise 1 — Redirecting standard output 📚

1. Test the following commands and observe their results:
   ```bash
   $ echo "Est-ce que j'apparais sur le terminal ?"
   $ echo "Ou bien dans le fichier ?" > fichier.txt
   $ cat fichier.txt
   $ echo "Et moi ?" > fichier.txt
   $ cat fichier.txt
   $ echo "Je ne veux pas vider le fichier" >> fichier.txt
   $ cat fichier.txt
   $ echo "Je veux vider le fichier" 1> fichier.txt
   $ cat fichier.txt
   $ echo "Je m'ajoute en fin de ligne" 1>> fichier.txt
   ```
2. Recall what the `cat` command does (`man cat`), then answer:

        - What is the difference between `>` and `>>`?
        - What is the difference between `1>` and `>`?
        - What is the difference between `1>>` and `>>`?
    
3. Navigate to your home directory and run:
   ```bash
   $ ls > list_files.txt; cat list_files.txt
   ```
        - What does this command do?
   - Can you explain why the string `list_files.txt` appears inside the file `list_files.txt`?

---

### Exercise 2 — Redirecting standard error 📚📚

1. In a directory `dir`, create a file `file-1.txt` whose content is `Hello world !`.
2. Create a copy of `file-1.txt` named `file-2.txt`. Remove **all read permissions** from `file-2.txt`.
3. Type the following command and note the results (you will get errors):
   ```bash
   $ cat file-1.txt file-2.txt file-3.txt
   ```
4. Which command succeeded? Which commands failed and why?
5. Redirect the standard output of the previous command to a file `result.txt`. Observe what is displayed on the terminal **and** what is in `result.txt`.
6. Then type:
   ```bash
   $ cat file-1.txt file-2.txt file-3.txt 1> result.txt 2> error.txt
   ```
7. Observe the contents of `result.txt` and `error.txt`. In your opinion, what do `1>` and `2>` mean? Draw a conclusion about the difference between standard output and standard error.

---

!!! tip "Redirecting standard input"
    Some commands *read* from the terminal (`tr`, `read`, etc.). Many others read from the terminal **if no file is given as an argument** (`cat`, `grep`, `sort`...).

    Standard input is redirected with `<`:
    ```bash
    $ cat < fichier.txt
    ```
    The file `fichier.txt` is then *connected* to the standard input of `cat`.

    !!! warning "Warning"
        The file `fichier.txt` must exist and be readable, otherwise the command fails.

### Exercise 3 — Redirecting standard input and revisiting `cat` 📚📚

1. Consult the manual for `cat` and find how it behaves when **no file is given** as an argument.
2. Test:
   ```bash
   $ cat
   hello<Entrée>
   world<Entrée>
   <Ctrl-d>
   ```
   How many arguments did `cat` receive? What did it display? Why?
3. Now test:
   ```bash
   $ cat > catout.txt
   hello<Entrée>
   world<Entrée>
   <Ctrl-d>
   ```
   Display the contents of `catout.txt`. What does it contain? Why?
4. Finally type:
   ```bash
   $ cat < catout.txt
   $ cat 0< catout.txt
   ```
   - How many arguments did `cat` receive? What did it display?
   - What is the difference between `<` and `0<`?

---

## 2. Pipes

!!! tip "Definition"
    A **pipe** connects the standard output of one command to the standard input of another. The `|` character is used.

    For `cmd1 | cmd2`, the standard output of `cmd1` becomes the standard input of `cmd2`. You can chain them:
    ```bash
    $ cmd1 | cmd2 | cmd3
    ```

### Exercise 4 — Counting headers: all in one 📚📚

This exercise consolidates redirections **and** pipes. You will work with the `.h` files in the `/usr/include` directory (C library headers).

1. Using **only an output redirection**, create a file `include_files.txt` listing all `.h` files in `/usr/include`:
   ```bash
   $ ls /usr/include/*.h > include_files.txt
   ```
2. Test the following command and comment:
   ```bash
   $ ls /usr/include/*.h | wc -l
   ```
   Where is the result of `ls` redirected? Where does the standard input of `wc` come from? Where is the result of `wc` displayed?
3. Display on the terminal the sentence
   `Il y a <nombre> fichiers .h dans le répertoire /usr/include`
   using `echo` and **command substitution** `$(...)` (covered in Lab 3, exercise 6).
4. Enter the following command and comment:
   ```bash
   $ wc -l $(ls /usr/include/*.h)
   ```
5. **Analysis question**: why does the result of question 4 differ from that of question 2? *(Hint: does `wc -l` receive the file names or their content?)*
6. **Justification question**: write a command that appends to the **end** of `include_files.txt` the sentence from question 3, using `>>` and command substitution.

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## 3. Processes and Jobs

!!! tip "Processes and Jobs"
    A **process** is a unit of work of the operating system: a program currently being executed. Each process is identified by a **PID** (*Process IDentifier*).

    A **job** is a unit of work of the **shell**: a process (or group of processes) launched from that shell. The shell provides a **job control** system allowing you to run multiple commands simultaneously and switch between foreground and background.

    > A job is a process, but a process is not necessarily a job.

    Main commands:

    - `ps`: lists the current user's processes. Option `-e` (or `-A`): all system processes.
    - `top`: interactive process viewer, sorted notably by CPU usage. Quit with `q`.
    - `jobs`: lists the current shell's jobs. Option `-p`: displays PIDs.
    - `fg %<n>`: brings job `n` to the foreground.
    - `bg %<n>`: resumes job `n` in the background.

!!! tip "Essential keyboard shortcuts"
    - <kbd>Ctrl</kbd>+<kbd>Z</kbd>: suspends the current job (signal `SIGTSTP`).
    - <kbd>Ctrl</kbd>+<kbd>C</kbd>: interrupts the current job (signal `SIGINT`).
    - <kbd>Ctrl</kbd>+<kbd>D</kbd>: sends an end-of-file (EOF) on standard input.

### Exercise 5 — Observing a process with `sleep` 📚📚

1. Run `sleep 10` and observe: does the prompt return immediately?
2. Test the following sequence, noting the output of `ps` each time:
   ```bash
   $ ps
   $ sleep 240
   ```
   While `sleep 240` is running, press <kbd>Ctrl</kbd>+<kbd>Z</kbd>, then:
   ```bash
   $ ps
   $ fg %1
   ```
   Then <kbd>Ctrl</kbd>+<kbd>C</kbd>, then:
   ```bash
   $ ps
   ```
3. **Questions**:

       - What does <kbd>Ctrl</kbd>+<kbd>Z</kbd> do? And <kbd>Ctrl</kbd>+<kbd>C</kbd>?
       - Redo the sequence by typing commands (for example `pwd`, `ls`) **between** `sleep 240` and <kbd>Ctrl</kbd>+<kbd>Z</kbd>. What do you notice?
   - What does `fg %1` do in general?

!!! info "Information about `ps` output"
    By default, `ps` returns four columns:

    - **PID**: unique identifier of the process.
    - **TTY**: associated terminal. `pts/N` designates pseudo-terminal number N.
    - **TIME**: CPU time consumed by the process.
    - **CMD**: command that launched the process.

### Exercise 6 — Foreground, background, switching 📚📚📚

This exercise asks you to write a small C program using the skills from Lab 3.

1. Write a C program `compteur.c` that indefinitely increments a variable `i` and displays its value **on standard output every multiple of 100**. Use `sleep` to slow down execution and observe the output.

    !!! info "Where is `sleep` in C?"
        Type `man 3 sleep` to see the signature of the `sleep` function in the standard library (`<unistd.h>`).

2. Compile with `gcc -Wall -o compteur compteur.c`. Test:
   ```bash
   $ ./compteur
   <Ctrl-z>
   $ jobs
   $ jobs -p          # note le PID
   $ ps
   $ fg %1
   <Ctrl-z>
   $ bg %1
   $ fg %1
   <Ctrl-z>
   $ jobs
   $ fg %1
   <Ctrl-c>
   $ jobs
   ```
3. **Analysis questions**:

       - What methods allow you to place a process in the background? In the foreground?
       - What is the difference between <kbd>Ctrl</kbd>+<kbd>Z</kbd> and <kbd>Ctrl</kbd>+<kbd>C</kbd>?
       - What is the purpose of the `-p` option of `jobs`?
   - What does `bg` do in general?
   - What **job states** did you observe? *(Hint: `Running`, `Stopped`, `Terminated`...)*

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## 4. Sending Signals to a Process

!!! tip "Signals: communicating with processes"
    The shortcuts <kbd>Ctrl</kbd>+<kbd>C</kbd>, <kbd>Ctrl</kbd>+<kbd>Z</kbd>, and the `fg` / `bg` commands, actually send **signals** to the process. A signal is an **asynchronous message** sent to a process to request an action.

    The `kill` command sends a signal to a process identified by its PID (or its job number `%n`).

    Main signals:

    | Signal | Typical origin | Semantics |
    |---|---|---|
    | `SIGINT` (2) | <kbd>Ctrl</kbd>+<kbd>C</kbd> | requests the **interruption** of the process |
    | `SIGTSTP` (20) | <kbd>Ctrl</kbd>+<kbd>Z</kbd> | requests the **suspension** of the process |
    | `SIGCONT` (18) | `fg`, `bg` | requests the **resumption** of a suspended process |
    | `SIGTERM` (15) | `kill` default | requests a **graceful stop** of the process |
    | `SIGKILL` (9) | `kill -9` | **forced stop**, the process **cannot** oppose it |

    Full list: `kill -L`.

    !!! warning "Who can send a signal?"
        You can only send a signal to processes that you own — unless you are `root`.

    !!! warning "`SIGKILL` should be used as a last resort"
        `SIGKILL` does not let the process terminate gracefully (no memory deallocation, no saving of open files). Prefer `SIGTERM`.

    > **Reference**: *POSIX.1-2017, Volume 1: Base Definitions*, Chapter 2 §2.4 *Signal Concepts*, IEEE/Open Group, 2018. <https://pubs.opengroup.org/onlinepubs/9699919799/>

### Exercise 7 — Manipulating signals with `kill` 📚📚📚

1. Type `kill -L` and note the numbers associated with `SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM`, `SIGKILL`.
2. The `&` character at the end of a command launches it in the background. Launch **three** `./compteur` processes in the background:
   ```bash
   $ ./compteur &           # processus 1
   $ ./compteur &           # processus 2
   $ ./compteur &           # processus 3
   $ jobs -p                # note les PID
   ```
3. Manipulate the signals:
   ```bash
   $ kill -SIGTSTP <PID du processus 1>
   $ jobs
   $ kill -SIGINT %2
   $ jobs
   $ jobs                   # une seconde fois pour voir la disparition
   $ kill -SIGCONT %1
   $ jobs
   $ kill -s SIGTERM <PID processus 1>
   $ jobs
   $ kill -9 <PID du processus 3>
   $ jobs
   ```
4. **Questions**:

       - What is the difference between `SIGINT` and `SIGTSTP`? Between `SIGTSTP` and `SIGTERM`?
       - Based on your observations, **how many different syntaxes** of `kill` produce the same effect? List them.
       
5. **Evaluation question** — for each of the following cases, indicate **the most appropriate signal and justify**:

      - (a) a user wants to interrupt a program they just launched in their terminal;
      - (b) an administrator wants to gracefully stop a system service;
      - (c) a process is frozen and no longer responds to any command;
      - (d) a developer wants to temporarily suspend a long computation without losing it;

---

## Summary — What You Should Be Able to Do

!!! success "Quick self-assessment (core curriculum)"
    Before leaving the session, verify that you can:

    - [ ] Redirect `stdout` (`>`, `>>`), `stderr` (`2>`), `stdin` (`<`).
    - [ ] Differentiate between `>` and `>>`, `1>` and `2>`.
    - [ ] Chain commands with pipes `|`.
    - [ ] Observe processes with `ps`, `top`, `jobs`.
    - [ ] Suspend, resume and terminate a job (<kbd>Ctrl</kbd>+<kbd>Z</kbd>, `fg`, `bg`, <kbd>Ctrl</kbd>+<kbd>C</kbd>).
    - [ ] Distinguish between **process** and **job**, **foreground** and **background**.
    - [ ] Send a signal with `kill` using the different syntaxes (`-SIGTERM`, `-s SIGTERM`, `-15`).
    - [ ] Choose between `SIGTERM` (graceful) and `SIGKILL` (forced) depending on the context.

    If an item is not checked, **go back to the corresponding exercise**.

---

## ⭐ Supplementary Exercises

!!! star "Who are exercises 8, 9, 10 for?"
    You have completed exercises 1 to 7? These three exercises close the C programming progression started in Lab 3 and have you write a **mini-shell**.

    **Reminder** of system calls covered in **Lab 3 ⭐**: `open`, `read`, `write`, `close`, `perror`, `dup`, `dup2`.

    **Lab 4 ⭐**: **`signal`**, **`fork`**, **`exec*`**, **`wait`** — the core of Unix multitasking.

    The targeted taxonomic levels are **[Analyze]**, **[Evaluate]** and **[Create]** (Bloom's revised).

    These exercises are **optional** and **not graded**.

### Exercise 8 — Catching a signal in C with `signal()` ⭐

The `signal()` system call allows you to install a **handler** that will be called each time the process receives a given signal.

1. Read the manual page: `man 2 signal`. Note the signature.
2. Create `catch-sigint.c`:
   ```c
   #include <stdio.h>      /* printf */
   #include <signal.h>     /* signal, SIGINT */
   #include <unistd.h>     /* sleep */

   static volatile int compteur_sigint = 0;

   void handler(int sig) {
       compteur_sigint++;
       printf("\n[Signal %d reçu — total : %d]\n", sig, compteur_sigint);
   }

   int main(void) {
       signal(SIGINT, handler);

       printf("PID = %d. Appuyez sur Ctrl-C plusieurs fois...\n", (int)getpid());
       while (compteur_sigint < 3) {
           sleep(1);
       }
       printf("Trois SIGINT reçus, je m'arrête proprement.\n");
       return 0;
   }
   ```
3. Compile: `gcc -Wall -o catch-sigint catch-sigint.c`.
4. Run `./catch-sigint`, then press <kbd>Ctrl</kbd>+<kbd>C</kbd> **3 times**.
5. **Questions**:

    - Why does <kbd>Ctrl</kbd>+<kbd>C</kbd> **no longer interrupt** the program?
   - Try sending `SIGTERM` from another terminal: `kill <PID>`. What happens?
   - Then try `kill -9 <PID>`. What happens? Why?

!!! info "Important note"
    `signal()` has historically variable semantics across systems. In production, `sigaction()` is preferred (see `man 2 sigaction`) as it offers more deterministic behavior.

    > **Reference**: Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. Chapters 20 (Signals: Fundamental Concepts) and 22 (Signals: Advanced Features).

### Exercise 9 — Creating a child process with `fork()` ⭐

`fork()` is the system call that **duplicates** the calling process: upon returning from `fork()`, **two** identical processes execute in parallel. The return value allows you to distinguish them:

> - `> 0` (child's PID) → we are in the **parent**.
> - `== 0` → we are in the **child**.
> - `< 0` → failure.

1. Read: `man 2 fork` then `man 2 wait`.
2. Create `fork-demo.c`:
   ```c
   #include <stdio.h>
   #include <unistd.h>     /* fork, getpid, getppid */
   #include <sys/wait.h>   /* wait */
   #include <stdlib.h>     /* exit */

   int main(void) {
       printf("Avant fork : PID = %d\n", getpid());

       pid_t pid = fork();
       if (pid < 0) {
           perror("fork");
           return 1;
       }

       if (pid == 0) {
           /* --- Code du processus fils --- */
           printf("[FILS]   PID = %d, parent = %d\n",
                  getpid(), getppid());
           sleep(2);
           printf("[FILS]   Je termine.\n");
           exit(0);
       } else {
           /* --- Code du processus parent --- */
           printf("[PARENT] PID = %d, fils créé = %d\n",
                  getpid(), pid);
           int status;
           wait(&status);     /* attend la fin du fils */
           printf("[PARENT] Le fils %d s'est terminé.\n", pid);
       }

       return 0;
   }
   ```
3. Compile and run several times. Observe the PIDs.
4. **Questions**:

    - Why do we see a "Avant fork" message followed by **two** distinct continuations?
    - Why call `wait()` on the parent side? *(What happens to a child whose parent does not call `wait`? Search for "zombie process" in `man 2 wait`.)*
    - Modify the program to create **two children** (two successive `fork()` calls on the parent side). The parent must wait for both children before terminating.

### Exercise 10 — Mini-project: a mini-shell that executes a command ⭐

When you type `ls /tmp` in `bash`, the shell actually does:

1. `fork()` → creates a child process.
2. Child side: `exec*()` → replaces the child's memory image with that of `ls`.
3. Parent side: `wait()` → waits for the child to finish.

You are going to reproduce this mechanism.

1. Create `mysh.c` in `~/ti307/c/`:
   ```c
   #include <stdio.h>
   #include <unistd.h>     /* fork, execvp */
   #include <sys/wait.h>   /* wait */
   #include <stdlib.h>     /* exit */

   int main(int argc, char **argv) {
       if (argc < 2) {
           fprintf(stderr,
                   "Usage: %s <commande> [arguments...]\n", argv[0]);
           return 1;
       }

       pid_t pid = fork();
       if (pid < 0) {
           perror("fork");
           return 1;
       }

       if (pid == 0) {
           /* Fils : remplace son image mémoire */
           execvp(argv[1], &argv[1]);
           /* execvp ne revient que s'il a échoué */
           perror("execvp");
           exit(127);
       } else {
           /* Parent : attend le fils */
           int status;
           waitpid(pid, &status, 0);
           if (WIFEXITED(status)) {
               printf("\n[mysh] Le fils a terminé avec code %d.\n",
                      WEXITSTATUS(status));
           }
       }

       return 0;
   }
   ```
2. Compile: `gcc -Wall -o mysh mysh.c`.
3. Test:
   ```bash
   $ ./mysh ls -l /tmp
   $ ./mysh date
   $ ./mysh echo Hello from mysh
   $ ./mysh /commande/inexistante
   ```
4. **Analysis questions**:

       - Why does `execvp` **never** return if everything goes well?
   - What is the difference between `execv`, `execvp` and `execve`? *(Hint: `man 3 exec`.)*
   - Combine what you have learned: modify `mysh.c` so that the output of the executed command is **redirected** to a file `mysh.out`. *(Hint: before the `exec*`, use `dup2` as in exercise 10 of Lab 3.)*

!!! success "Congratulations"
    You have just implemented the core functionality of a Unix shell: `fork` + `exec` + `wait` + redirection via `dup2`. All these building blocks are what `bash` itself does internally for every command you type.

    > **Reference**: Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. Chapters 24 (Process Creation), 27 (Program Execution), 26 (Monitoring Child Processes).

---

## Further Reading (Recommended)

- *POSIX.1-2017, Base Specifications Issue 7*: <https://pubs.opengroup.org/onlinepubs/9699919799/>
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. *(Canonical reference for ⭐ exercises.)*
- Stevens, W. R., & Rago, S. A. (2013). *Advanced Programming in the UNIX Environment*, 3rd ed. Addison-Wesley. ISBN 978-0321637734.
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O'Reilly. ISBN 978-0596009656.
- Tanenbaum, A. S., & Bos, H. (2014). *Modern Operating Systems*, 4th ed. Pearson. ISBN 978-0133591620. *(Chapter 2 — Processes and Threads.)*
