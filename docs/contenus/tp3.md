---
title: Lab3 - Working environment
---

# Lab3 - Working environment

!!! info "General instructions"
    - In all exercises, the `$ ` chain at the beginning of the line represents the command prompt and should not be typed.
    - For now, each time you open a terminal, you are prompted to enter the following command, (followed, as always, by the enter key) for pedagogical reasons:

            $ PS1='$ '


## Exercise 1 - Shell variables
1. Type the following command in your terminal:
```bash
$ nom_fich = hello . c
$ echo $nom_fich
$ echo $ { nom_fich }
$ touch $nom_fich
$ echo $nom_fichc
$ echo $ { nom_fich } c
$ rm $ { nom_fich }
```
2. Can you guess the purpose of `echo` command ?
3. What happens when you ask shell to expand a variable that does not exist?
4. What happens if you type a space between the name of the variable and the equal sign? And between the equal sign and the value?
5. Type the following commands and try to comment on the results:
```bash
$ sujet = Alice verbe = aime cod = piscine
$ phrase =" $sujet $verbe la $cod ."
$ echo $phrase
$ sujet = Bob verbe = mange cod = salade
$ echo $phrase
$ echo " $sujet $verbe la $cod ."
```

## Exercise 2 - Special characters inhibiting variable expansion : the backslash
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
2. Assuming the previous experiments (and others to be invented if necessary), answer the following questions:

   - What does the `\` character do to the character (other than `<newline>`) that it precedes?
   - What is the purpose of the string `\<newline>`? 
   - How can you get a literal backslash `\`? How to display `\\` using the `echo` command?