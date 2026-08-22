---
title: Lab 3 - Working Environment and C Compiler
---

# Lab 3 — Working environment and C compiler

!!! objectifs "Learning objectives (revised Bloom's taxonomy)"
    By the end of this lab, you will be able to:

    - **[Understand]** the concept of a **shell variable** and the **expansion** mechanism (`$var`, `${var}`).
    - **[Apply]** identify and inhibit the shell's **special characters** (`\`, `'`, `"`).
    - **[Apply]** use **brace expansion** (`{a,b,c}`, `{1..10}`) to efficiently generate sets of strings.
    - **[Apply]** use **command substitution** `$(...)` to dynamically capture the output of a command.
    - **[Apply]** compile a C program with `gcc`, break down the stages, perform **separate compilation** (`-c`) and **linking**.
    - **[Analyze]** interpret compiler **errors** and **warnings**.
    - **[Evaluate]** choose the quoting strategy (`'`, `"`, `\`) based on the content to protect.

    > **Reference**: Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman. ISBN 978-0801319037.

!!! tip "Prerequisites"
    - **Lab 1 and Lab 2 completed**: navigation, permissions, `chmod`, wildcards.
    - Debian 12 distribution or active MarioNum session.
    - `gcc` compiler available:
      ```bash
      $ gcc --version
      ```
      Otherwise: `sudo apt update && sudo apt install build-essential`.

!!! info "Instructions"
    - The `$` at the beginning of a command represents the prompt and should not be typed.
    - For each new command, consult `man` or `--help`.

!!! warning "About the lab answers"

    Before you begin, create a file named **`resultat_commande_TP3_NomPrenomEtudiant.txt`**.
    You will progressively record the command results in it.

    > **Creating the file**

    1. Right-click in your working directory
    2. Create a document → Empty file
    3. Name it: `resultat_commande_TP3_NomPrenomEtudiant.txt`

    > **Please note:**
    >> - <span style="color:blue"> Your instructor must be able to view this file at any time. </span>

    >> - <span style="color:red"> Save this file **locally** before the end of the session. </span>
    >>> **Local backup procedure**:
        1. Click on the **clipboard** (to the left of the VM Desktop).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Select the content and copy.
        3. Paste on your host machine.

!!! tip "Exercise difficulty scale"
    > 📚 = Easy · 📚📚 = Medium · 📚📚📚 = Hard
    >
    > Exercises **1 to 7** form the **core curriculum**, required for everyone.
    > Exercises **8, 9, 10** are **supplementary exercises** (⭐).

!!! info "Alignment with assessments (Biggs, 1996)"
    The 📚 and 📚📚 exercises prepare for the **CC S38** and the **graded lab S40**.
    The 📚📚📚 exercises prepare for the **DE S42 (MCQ)** through their analysis and justification dimension.

    > **Reference**: Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education*, 32(3), 347–364. DOI: [10.1007/BF00138871](https://doi.org/10.1007/BF00138871).

---

## 1. Shell variables

!!! tip "Definition and expansion"
    A shell **variable** associates a name with a character string. **Expansion** is the replacement of `$name` by its value.

    Example: the variable `PS1` contains the prompt. When you type `PS1='$ '`, you assign the string `$<space>` to `PS1`. The shell then expands `$PS1` to display the prompt.

    Shell variables are **environment variables**: they are accessible to all processes launched by the shell.

    - `env` or `printenv`: lists the environment variables.
    - `set`: also lists internal shell variables.

### Exercise 1 — Shell variables 📚

1. Type:
   ```bash
   $ nom_fich=hello.c       # (i)
   $ echo nom_fich
   $ echo $nom_fich         # (ii)
   $ echo ${nom_fich}       # (iii)
   $ touch $nom_fich
   $ echo $nom_fichpp       # (iv)
   $ echo ${nom_fich}pp     # (v)
   $ rm ${nom_fich}
   ```

    1. **Assignment**: no spaces around `=`. The shell creates the variable `nom_fich` with the value `hello.c`.
    2. The `$` triggers **expansion**: the shell replaces `$nom_fich` with its value (`hello.c`) before executing `echo`.
    3. `${nom_fich}` is equivalent to `$nom_fich` — the braces explicitly delimit the variable name.
    4. The shell looks for a variable named `nom_fichpp` (which doesn't exist) → empty string.
    5. The braces `{}` allow **separating** the variable name from the text that follows: `${nom_fich}` + `pp` = `hello.cpp`.

2. Recall what `echo` does. What is the purpose of `$` before a variable name?
3. What happens if you try to display a variable that does not exist?
4. What happens if you put a space between the variable name and `=`? And between `=` and the value?
5. Test and comment:
   ```bash
   $ sujet=Alice verbe=aime cod=piscine
   $ phrase="$sujet $verbe la $cod."
   $ echo $phrase
   $ sujet=Bob verbe=mange cod=salade
   $ echo $phrase
   $ echo "$sujet $verbe la $cod."
   ```

---

## 2. Special characters and inhibition

!!! tip "Shell special characters"
    Certain characters have a **special meaning** for the shell (they are called *special*). Conversely, a character that only has its *literal* meaning is ordinary.

    Main special characters:

    - `; <newline> | &`: command terminators. `|` = *pipe*, `&` = background.
    - `< >`: redirections.
    - `( )`: grouping / subshell.
    - `$`: variable expansion, command substitution, arithmetic.
    - `` ` ``: command substitution (old syntax).
    - `<space> <tab>`: separators.
    - `\ ' "`: **inhibition** characters — give them their literal meaning.

    Other special characters (in certain contexts):

    - `* ? [ ]`: pathname expansion.
    - `#`: comment.
    - `~`: tilde expansion.
    - `=`: variable assignment.
    - `%`: job control.

### Exercise 2 — The backslash `\` 📚

1. Test:
   ```bash
   $ echo a b
   $ echo a\ \ \ b
   $ touch fichier\ vide
   $ rm fichier vide
   $ rm fichier\ vide
   $ echo 3$canadiens
   $ echo 3\$canadiens
   $ echo ; echo *
   $ echo \; echo \*
   $ echo "salut"
   $ echo \"salut\"
   $ echo 'salut'
   $ echo \'salut\'
   $ echo \
   $ echo \\
   ```
2. Answer:

       - What does `\` do before a character other than `<newline>`?
   - What is the purpose of the `\<newline>` sequence?
   - How do you get a literal `\`? How do you display `\\` with `echo`?

### Exercise 3 — The single quote `'` 📚📚

!!! info "Note"
    The `-i` option of `rm` asks for confirmation before deletion.

1. Test:
   ```bash
   $ touch 'ceci est un horrible nom de fichier'
   $ rm -i ceci est un horrible nom de fichier
   $ rm -i 'ceci est un horrible nom de fichier'
   $ touch p; echo le caractère * est-il spécial ? et ?
   $ echo 'le caractère * est-il spécial ? et ?'
   $ echo 'en fait, même la fin de ligne
   est un caractère normal entre
   apostrophes'
   ```
2. Answer:

       - Which characters are special **inside single quotes**?
       - How do you include a single quote within a single-quoted string?

### Exercise 4 — The double quote `"` 📚📚

1. Test and compare with Exercise 3:
   ```bash
   $ x=coucou
   $ echo "$x"
   $ echo '$x'
   $ echo "le prix est de 30$"
   $ echo "il a dit \"salut\""
   $ echo "aujourd'hui"
   ```
2. Answer:

       - Which characters **remain special** inside double quotes?
       - What happens if you put `\` before `$`, `"`, `\` inside double quotes?
       - When would you use `'...'` rather than `"..."`?

---

## 3. Brace expansion

!!! tip "Brace expansion"
    **Brace expansion** is a shell mechanism that generates strings from a pattern.

    - `{a,b,c}` generates the strings `a`, `b`, `c`.
    - `{1..5}` generates `1 2 3 4 5`.
    - `{a..e}` generates `a b c d e`.
    - Combinable with text: `file_{1..3}.txt` → `file_1.txt file_2.txt file_3.txt`.

    Note: unlike the wildcards `*`, `?`, `[]`, brace expansion **does not depend** on existing files — it generates strings even if no file matches.

### Exercise 5 — Brace expansion 📚📚

1. Test and comment:
   ```bash
   $ echo a{b,c,d}e
   $ echo {1..10}
   $ echo {a..e}{1..3}
   $ mkdir -p projet/{src,tests,docs}
   $ ls -R projet
   $ touch fichier_{01..05}.txt
   $ ls fichier_*
   ```
2. Use brace expansion to create, **in a single command**, the following directory tree in your home directory:
   ```
   ~/labo/
   ├── donnees/
   │   ├── brutes/
   │   └── nettoyees/
   ├── scripts/
   └── resultats/
   ```
3. **Question**: what is the fundamental difference between `{a,b,c}` and `[abc]` from the shell's perspective?

---

## 4. Command substitution

!!! tip "Command substitution"
    **Command substitution** inserts the **output of a command** into a command line. Two syntaxes exist:

    - **Modern**: `$(command)` — recommended, easy nesting.
    - **Old**: `` `command` `` — discouraged, ambiguous nesting.

### Exercise 6 — Simple substitution 📚

1. Test:
   ```bash
   $ date
   $ echo date
   $ echo $(date)
   $ aujourdhui=$(date)
   $ echo $aujourdhui
   $ echo "Nous sommes le $(date)"
   ```
2. What does `echo $(date)` do? What is the role of `$` before `(`?
3. Test and comment:
   ```bash
   $ prefix="Nous sommes le"
   $ echo $prefix $(date)
   $ echo $prefix $aujourdhui
   $ echo ${prefix} ${aujourdhui}
   $ phrase=${prefix} ${aujourdhui}
   $ phrase="${prefix} ${aujourdhui}"
   $ echo $phrase
   $ echo "$phrase"
   ```
4. What is the role of double quotes in command substitution?
5. What is the difference between `$(...)` and `${...}`?

---

## 5. Compiling a C program

??? saviezvous "Dennis Ritchie, the C language, and 'Hello, World!'"
    The **C language** was created by **Dennis Ritchie** at Bell Labs between 1969 and 1973, initially to rewrite the Unix kernel (which was in PDP-7 assembly). The famous `"Hello, World!"` program first appeared in the book *The C Programming Language* (1978) by **Brian Kernighan** and Dennis Ritchie — nicknamed the **K&R**, it remains one of the most influential computer science books. Remarkable fact: Unix, the C language, and a good part of the tools you use in this lab (the shell, `cat`, `ls`…) were all born in the same hallway of Building 2 at Bell Labs in Murray Hill, New Jersey.

    > Kernighan, B. W. & Ritchie, D. M. (1978). *The C Programming Language*. Prentice Hall. ISBN 978-0131101630.

!!! tip "The GCC compiler"
    `gcc` (*GNU Compiler Collection*) is the standard C compiler on Linux. Compiling a C program breaks down into **four stages**:

    | Stage | Tool | Input → Output | `gcc` option |
    |---|---|---|---|
    | 1. Preprocessor | `cpp` | `.c` → expanded text | `-E` |
    | 2. Compilation | `gcc` | expanded text → assembly `.s` | `-S` |
    | 3. Assembly | `as` | `.s` → object `.o` | `-c` |
    | 4. Linking | `ld` | `.o` → executable | *(default)* |

    Useful options:

    - `-o <name>`: names the output executable (otherwise `a.out`).
    - `-Wall`: enables most common warnings.
    - `-Wextra`: enables additional warnings.
    - `-Werror`: turns warnings into errors.

    > **Reference**: *GCC User Manual*, Free Software Foundation. <https://gcc.gnu.org/onlinedocs/>

### Exercise 7 — Compilation, errors and warnings 📚📚📚

1. Create `hello.c`:
   ```c
   #include <stdio.h>

   int main(void)
   {
       printf("Hello world !\n");
       return 0;
   }
   ```
2. Navigate to the directory containing `hello.c` and compile with `gcc hello.c`. A file `a.out` is created. Run it with `./a.out`.

    !!! Warning "Warning"

            - If `a.out` already existed, it is **overwritten** without warning.
            - Use `-o` to choose a different name: `gcc hello.c -o hello`.

3. Download this archive: [hello.tar.gz](../assets/files/hello.tar.gz).
4. Extract it and navigate to the `hello` directory:
   ```bash
   $ tar -xvf hello.tar.gz # (i)
   ```

    1. `-x` = e**x**tract, `-v` = **v**erbose (displays extracted files), `-f` = archive **f**ile to process. Option order is flexible.

5. Compile the project:
   ```bash
   $ gcc main.c hello.c -o run # (i)
   ```

    1. `gcc` compiles **multiple** source files into a single executable. `-o run` names the executable `run` instead of the default `a.out`.
    Run it with `./run`.

6. Delete the file `run`. Modify `hello.c` to deliberately introduce an error: remove the **closing brace** of the `void hello()` function. Recompile. What do you notice?
7. Put the brace back and add a `return 1;` in the definition of the `hello` function (which is `void`). Recompile. What do you notice?
8. Now recompile with `-Wall -Wextra`. What do you see?
9. **Conclude** on the difference between **errors** and **warnings**, and on the professional value of the `-Wall -Wextra -Werror` options.

!!! info "This exercise is representative of a typical **DE S42 (MCQ)** item."

---

## Summary — What you should be able to do

!!! success "Quick self-assessment (core curriculum)"
    Before leaving the session, verify that you can:

    - [ ] Create, expand, and use a shell variable.
    - [ ] Identify and inhibit the shell's special characters (`\`, `'`, `"`).
    - [ ] Compare `'...'` and `"..."` and choose the correct quoting.
    - [ ] Generate strings with brace expansion (`{a,b,c}`, `{1..N}`).
    - [ ] Use command substitution `$(...)`.
    - [ ] Compile a C program with `gcc`, break down the 4 stages, perform separate compilation.
    - [ ] Distinguish between errors and warnings and interpret `gcc` messages.

    If an item is not checked, **go back to the corresponding exercise** before Lab 4.

---

## ⭐ Supplementary exercises

!!! star "Who are exercises 8, 9, 10 for?"
    Finished exercises 1 to 7? Lab 3 introduced **C compilation** — these starred exercises deepen it towards **systems programming**. You will discover separate compilation, standard file descriptors, and reimplement in C what the shell does when you type `command > file`.

    **System calls used**: `open`, `read`, `write`, `close`, `perror`, `dup`, `dup2`.

    The targeted taxonomic levels are **[Analyze]**, **[Evaluate]**, and **[Create]** (revised Bloom).

    These exercises are **optional** and **not graded**.

### Exercise 8 — Separate compilation and linking 📚📚📚 ⭐

!!! tip "Separate compilation"
    For a multi-file project, it is more efficient to compile each source into an **object** file (`.o`), then perform linking **only once**.

    - `-c` tells `gcc` to stop at the object file (no linking).
    - Without `-o`, `gcc -c foo.c` produces `foo.o`.
    - Linking is then done with: `gcc a.o b.o -o run`.

1. In the `hello` directory from Exercise 7, create `bye.c` and `bye.h` **using brace expansion**:
   - `bye.h`:
     ```c
     #ifndef BYE_H
     #define BYE_H

     void bye();

     #endif
     ```
   - `bye.c`:
     ```c
     #include <stdio.h>
     #include "bye.h"

     void bye()
     {
         printf("I'm done, bye !\n");
     }
     ```
2. **Still using brace expansion**, compile `hello.c` and `bye.c` into `hello.o` and `bye.o`. Verify that no errors are raised.
3. Modify `main.c` to include `bye.h` and call `bye()`:
   ```c
   #include <stdio.h>
   #include "hello.h"
   #include "bye.h"

   int main()
   {
       hello();
       bye();
       return 0;
   }
   ```
4. Compile `main.c` into `main.o`.
5. Using pathname expansion `*`, link all your `.o` files to create `run`. Run it.

### Exercise 9 — Mastering standard descriptors ⭐

Every Unix process starts with **three open file descriptors**:

| Number | Name | Role |
|---|---|---|
| `0` | `STDIN_FILENO` | standard input |
| `1` | `STDOUT_FILENO` | standard output |
| `2` | `STDERR_FILENO` | standard error |

1. Create `std-fd.c`:
   ```c
   #include <unistd.h>    /* write, STDOUT_FILENO, STDERR_FILENO */
   #include <string.h>    /* strlen */

   int main(void) {
       const char *msg_out = "Message normal sur stdout.\n";
       const char *msg_err = "Message d'erreur sur stderr.\n";

       write(STDOUT_FILENO, msg_out, strlen(msg_out));
       write(STDERR_FILENO, msg_err, strlen(msg_err));

       return 0;
   }
   ```
2. Compile: `gcc -Wall -o std-fd std-fd.c`.
3. Test:
   ```bash
   $ ./std-fd                      # les deux à l'écran
   $ ./std-fd > sortie.txt         # stderr reste à l'écran ; stdout dans sortie.txt
   $ ./std-fd 2> erreur.txt        # stdout reste à l'écran ; stderr dans erreur.txt
   $ ./std-fd > out.txt 2> err.txt # les deux redirigés
   ```
4. Verify the contents.
5. **Question**: why distinguish between `stdout` and `stderr`? Give a use case.

### Exercise 10 — Reimplementing `>` in C with `dup2()` ⭐

When you type `./hello > sortie.txt`, the shell internally:

1. Opens `sortie.txt` for writing (obtaining, for example, descriptor `3`).
2. **Redirects** `STDOUT_FILENO` (descriptor 1) to this new descriptor via `dup2(3, 1)`.
3. Closes descriptor 3 (now redundant).
4. Executes `./hello`. Everything going to `stdout` now goes into `sortie.txt`.

1. Read `man 2 dup`. Note the signatures of `dup` and `dup2`.
2. Create `myredirect.c`:
   ```c
   #include <fcntl.h>
   #include <unistd.h>
   #include <stdio.h>

   int main(int argc, char **argv) {
       if (argc != 2) {
           fprintf(stderr, "Usage: %s <fichier-sortie>\n", argv[0]);
           return 1;
       }

       int fd = open(argv[1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
       if (fd < 0) { perror("open"); return 1; }

       if (dup2(fd, STDOUT_FILENO) < 0) {
           perror("dup2"); close(fd); return 1;
       }
       close(fd);

       /* À partir d'ici, printf écrit dans le fichier */
       printf("Ligne 1 redirigée.\n");
       printf("Ligne 2 redirigée.\n");
       printf("Ligne 3 redirigée.\n");

       return 0;
   }
   ```
3. Compile and run:
   ```bash
   $ gcc -Wall -o myredirect myredirect.c
   $ ./myredirect captures.txt
   $ cat captures.txt
   ```
   The three lines should be in `captures.txt` — **nothing** in the terminal.
4. **Analysis questions**:

       - Why is `close(fd)` called immediately after `dup2`?
       - What would happen if you reversed the arguments: `dup2(STDOUT_FILENO, fd)`?
       - Modify the program to redirect **`stderr`** instead of `stdout`. Which line do you change?

!!! info "Looking ahead to Lab 4"
    You have just reimplemented the exact mechanism the shell uses for `command > file`. In **Lab 4** you will see how the shell leverages this mechanism via `fork` + `dup2` + `exec`, as well as the signals that interrupt a process.

    > **Reference**: Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203, chapter 5 (File I/O: Further Details), §5.4 *Duplicating File Descriptors*.

---

## Further reading (recommended)

- *GCC User Manual*: <https://gcc.gnu.org/onlinedocs/>
- Kernighan, B. W., & Ritchie, D. M. (1988). *The C Programming Language*, 2nd ed. Prentice Hall. ISBN 978-0131103627.
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203.
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O'Reilly. ISBN 978-0596009656.
- Stevens, W. R., & Rago, S. A. (2013). *Advanced Programming in the UNIX Environment*, 3rd ed. Addison-Wesley. ISBN 978-0321637734.
