---
title: Additional Commands
---

# Additional commands

!!! info "Learning Objectives"

    Upon completion of this lab, the student will be able to:
    
    - Strengthen mastery of redirections and pipes in the shell.
    - Use classic text filters (`grep`, `sort`, `cut`, `uniq`, `tr`, `head`, `tail`, etc.).
    - Chain multiple commands with redirections and pipes.
    - Apply filters on text files by combining options.
    - Efficiently manipulate inputs/outputs in practical scenarios.
    - Deepen the use of `grep` to search within file trees.
    - Learn to extract specific information from system files (`/etc`, `/usr/include`, etc.).


!!! info "Instructions"
    The following exercises are supplementary exercises to practice and discover other uses of pipes and redirections. 

!!! tip "Exercise difficulty scale"

    > 📚 = Easy · 📚📚 = Medium · 📚📚📚 = Advanced

!!! tip "Text filters"
    *Text filters* are commands that read or can read from their standard input and write modified data to their standard output. 

    Here are some of the most common ones:

     - `head`: displays the first lines of its input;
     - `tail`: displays the last lines of its input. With the `-f` option (for follow, to continue displaying the end of the file when it is updated), it is one of system administrators' favorite commands;
     - `grep`: one of the most well-known commands, displays lines matching a string, or more generally a regular expression in its input;
     - `cut`: selects fields or characters from each line of standard input;
     - `sort`: sorts its standard input according to criteria.
     - `tr`: replaces characters in its standard input.
     - `uniq`: removes consecutive identical lines in its standard input.
  
  ---

## 1. Basic text filters

### Exercise 1 — Frere Jacques 📚

1. Create a file `fj` containing these lines:
    ```bash
    Frère Jacques, 
    Frère Jacques,                    
    Dormez-vous,
    Dormez-vous,
    Sonnez les matines,
    Sonnez les matines !
    Ding !
    Ding ! 
    Dong !
    ```
    with the `echo` command (**the `<newline>` character corresponds to the Enter key on your keyboard**):
    ```bash
    $ echo 'Frère Jacques,<newline> 
    > Frère Jacques,<newline>                     
    > Dormez-vous,<newline> 
    > Dormez-vous,<newline> 
    > Sonnez les matines,<newline> 
    > Sonnez les matines !<newline> 
    > Ding !<newline> 
    > Ding !<newline> 
    > Dong !' > fj
    ```

2. Then test the following commands and observe their results:
    ```bash
    $ cat fj 
    $ head fj
    $ tail fj
    $ head -n 2 fj
    $ tail -n 3 fj
    $ grep "Dormez" fj
    $ grep -v "Dormez" fj
    $ grep "dormez" fj
    $ grep -i "dormez" fj
    $ sort fj 
    $ uniq fj
    $ cut -c 1 fj
    $ cut -c 2 fj
    $ cut -c 1-3 fj
    $ cut -d ' ' -f 1 fj
    $ cut -d ' ' -f 1,2 fj
    ```
    - Where are the results displayed?
    - What is the purpose of the `-n` option of `head` and `tail`?
    - What is the purpose of the `-v` option of `grep`? What is the purpose of the `-i` option of `grep`?
    - What is the purpose of the `-c` and `-d` options of `cut`?


### Exercise 2 — Sorting files 📚📚📚

!!! tip "Base name"
    The base name of a file is the file name without its extension. For example, the base name of the file `/usr/include/stdio.h` is `stdio`.

In this exercise, we would like to display on the terminal the base name of the 10 lightest files (in size in bytes) among the `.h` files in the `/usr/include` directory.

Using the commands `wc`, `sort`, `cut`, `head` (or possibly `tail`), and pipe redirections, write a command that displays the base name of the 10 lightest files among the `.h` files in the `/usr/include` directory.

!!! info "Hint"

    - The `-c` option of `wc` gives you the number of bytes in a file.
    - The `-n` option of `sort` allows you to sort the lines of a file in numerical order.
    - The `-d` option of `tr` deletes the characters received as the first argument instead of replacing them.

!!! warning "This output depends on your system"
    The list below was produced on Debian 12 with `build-essential` installed. **The
    contents of `/usr/include` vary with the C library version and the development
    packages present**: your ten names may differ, and that is normal. What is graded
    is the **command line**, not the resulting list.

If you have installed `gcc`, you should get a list close to this one:
```bash
poll
wait
syslog
syscall
lastlog
termio
stab
memory
re_comp
alloca
```
### Exercise 3 — More on `grep` 📚📚

!!! tip "Passing a directory as an argument to `grep`"
    
    - The `-r` option of `grep` allows you to pass a directory as an argument. It tells `grep` to search in all files within that directory.
    - The `-l` option of `grep` displays only the names of files that contain the searched string.

Using `grep` and possibly other commands, find a command line that allows you to:

1. Display the value of `RAND_MAX` (it is a constant from the C standard library). 
2. Display the absolute path of files that contain the string `127.0.0.1` in the files of `/etc`.
3. Display only the file names that contain the string `127.0.0.1` in the files of `/etc`. (hint: there is a command called `rev`).
4. Display the path of the home directory of the user `games`.

---

## ⭐ Supplementary Exercises

!!! star "Who are exercises 4, 5, 6 for?"
    You have completed exercises 1 to 3? These three exercises deepen your knowledge of **text filters** and **pipes** by introducing you to `sed`, `awk` and writing a complete data extraction script.

    The targeted taxonomic levels are **[Analyze]**, **[Evaluate]** and **[Create]** (Bloom's revised).

    These exercises are **optional** and **not graded**.

### Exercise 4 — Transformations with `sed` ⭐

!!! tip "The stream editor `sed`"
    `sed` (*stream editor*) applies transformations line by line on a text stream. The most common syntax is substitution:

    ```bash
    $ sed 's/motif/remplacement/' fichier
    ```

    - `s` = substitution; `g` at the end = replace **all** occurrences on the line.
    - `sed` does not modify the original file (unless using `-i`).

    > **Reference**: Dale Dougherty & Arnold Robbins (1997). *sed & awk*, 2nd ed. O'Reilly. ISBN 978-1565922259.

1. Create a file `utilisateurs.txt`:
   ```bash
   $ cut -d: -f1,3,6 /etc/passwd > utilisateurs.txt
   $ cat utilisateurs.txt
   ```
   This file contains `name:UID:home` for each user.

2. Replace the `:` with spaces for easier reading:
   ```bash
   $ sed 's/:/ /g' utilisateurs.txt
   ```

3. Display only the lines where the UID (2nd field) is greater than or equal to 1000 (human users):
   ```bash
   $ awk -F: '$2 >= 1000' utilisateurs.txt
   ```
   *(Preview of `awk` — detailed in exercise 5.)*

4. Delete lines containing `nologin`:
   ```bash
   $ sed '/nologin/d' /etc/passwd
   ```
   What does the `d` do? How many lines remain compared to the original?

5. **Advanced substitution**: in the file `fj` (exercise 1), replace all occurrences of `Frère` with `Sœur` and redirect the result to `fj2`:
   ```bash
   $ sed 's/Frère/Sœur/g' fj > fj2
   $ cat fj2
   ```

6. **Analysis question**: what is the difference between `sed 's/Dormez/Réveillez/' fj` and `sed 's/Dormez/Réveillez/g' fj`? Test both on the file `fj`.

### Exercise 5 — Structured extraction with `awk` ⭐

!!! tip "The `awk` language"
    `awk` processes structured files **field by field**. It splits each line according to a separator (space by default, `-F` to change) and makes fields accessible via `$1`, `$2`, etc. (`$0` = the entire line).

    ```bash
    $ awk -F: '{ print $1, $3 }' /etc/passwd
    ```

    `awk` can also perform calculations, conditions and loops.

    > **Reference**: Aho, A. V., Kernighan, B. W., & Weinberger, P. J. (1988). *The AWK Programming Language*. Addison-Wesley. ISBN 978-0201079814.

1. Display the username and login shell (fields 1 and 7) from `/etc/passwd`:
   ```bash
   $ awk -F: '{ print $1, $7 }' /etc/passwd
   ```

2. Display only users whose shell is `/bin/bash`:
   ```bash
   $ awk -F: '$7 == "/bin/bash" { print $1 }' /etc/passwd
   ```

3. Count the number of users whose UID (field 3) is greater than or equal to 1000:
   ```bash
   $ awk -F: '$3 >= 1000 { count++ } END { print count }' /etc/passwd
   ```
   What do `count++` and the `END` block do?

4. Display a formatted table of human users (UID >= 1000) with a header:
   ```bash
   $ awk -F: 'BEGIN { printf "%-15s %-6s %s\n", "NOM", "UID", "HOME" }
              $3 >= 1000 { printf "%-15s %-6s %s\n", $1, $3, $6 }' /etc/passwd
   ```

5. **Log analysis**: create a simulated `acces.log` file:
   ```bash
   $ echo "2025-01-15 alice connexion
   2025-01-15 bob connexion
   2025-01-15 alice déconnexion
   2025-01-16 alice connexion
   2025-01-16 charlie connexion
   2025-01-16 bob connexion
   2025-01-16 alice déconnexion" > acces.log
   ```
   With `awk`, count the number of connections per user:
   ```bash
   $ awk '$3 == "connexion" { c[$2]++ } END { for (u in c) print u, c[u] }' acces.log
   ```

6. **Evaluation question**: in which case would you prefer `cut` over `awk`? And vice versa? Give a concrete example for each.

### Exercise 6 — `/etc/passwd` analysis script ⭐

This exercise combines `grep`, `cut`, `sort`, `wc`, `awk` and `sed` in a complete script.

1. Create the script `analyse-passwd.sh`:
   ```bash
   #!/bin/bash
   # Analyse du fichier /etc/passwd — Commandes supplémentaires étoile

   FICHIER="/etc/passwd"

   echo "========================================="
   echo "  ANALYSE DE $FICHIER"
   echo "  Date : $(date)"
   echo "========================================="
   echo ""

   # 1. Nombre total d'utilisateurs
   total=$(wc -l < "$FICHIER")
   echo "1. Nombre total d'utilisateurs : $total"
   echo ""

   # 2. Utilisateurs humains (UID >= 1000)
   echo "2. Utilisateurs humains (UID >= 1000) :"
   awk -F: '$3 >= 1000 { printf "   - %-15s (UID: %s, home: %s)\n", $1, $3, $6 }' "$FICHIER"
   humains=$(awk -F: '$3 >= 1000' "$FICHIER" | wc -l)
   echo "   Total : $humains"
   echo ""

   # 3. Répartition des shells de connexion
   echo "3. Répartition des shells :"
   cut -d: -f7 "$FICHIER" | sort | uniq -c | sort -rn
   echo ""

   # 4. Utilisateurs sans shell de connexion (nologin ou false)
   echo "4. Utilisateurs sans shell interactif :"
   grep -E "nologin|/bin/false" "$FICHIER" | cut -d: -f1 | tr '\n' ','
   echo ""
   echo ""

   # 5. Comptes système (UID < 100)
   systeme=$(awk -F: '$3 < 100' "$FICHIER" | wc -l)
   echo "5. Comptes système (UID < 100) : $systeme"

   echo ""
   echo "========================================="
   echo "  FIN DE L'ANALYSE"
   echo "========================================="
   ```

2. Make it executable and run it:
   ```bash
   $ chmod +x analyse-passwd.sh
   $ ./analyse-passwd.sh
   ```

3. **Improvement 1**: add a section that detects users who have the same shell as `root`. *(Hint: first retrieve root's shell with `grep`, then search for other users with the same shell.)*

4. **Improvement 2**: modify the script so that it accepts a file as an argument (`$1`) instead of always analyzing `/etc/passwd`. If no argument is provided, use `/etc/passwd` by default:
   ```bash
   FICHIER="${1:-/etc/passwd}"
   ```
   What does the `${1:-value}` syntax mean?

5. **Evaluation question**: in section 4 of the script, why is `tr '\n' ','` used? What would happen without this command? Suggest an alternative using `paste`.
