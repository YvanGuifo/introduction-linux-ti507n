---
title: Lab2 - File system and permissions
---

# Lab2 - File system and permissions

!!! info "General instructions"
    - In all exercises, the `$ ` chain at the beginning of the line represents the command prompt and should not be typed.
    - For now, each time you open a terminal, you are prompted to enter the following command, (followed, as always, by the enter key) for pedagogical reasons:

            $ PS1='$ '


## Exercise 1 : Permission associated to a file

1. Create an empty directory and empty file (those later should be on the same level). Use the `ls` command, and the `-l` and `-d` options on each of these two new files to determine the permissions you (respectively your group and others) have on these files. How do you recognize a directory?
2. This is the result of the command `ls -ld` on a certain directory (for the purpose of the exercise we just have reported the first and the last field of the result of  `ls -ld`). 
```bash
drwxr-xr-x a
dr-xr--r-- b
-rw-r--r-- c.txt
--w--w-r-- d.c
-rwxr-xr-x op
```
Can you guess which of those files are directories? Then for all of the files provide the associated permissions (read, write, execute) for the owner, the group and others, and their octal representation.
3. Give the octal representation and the symbolic representation of the permission associated to the command `ls`, your home folder, and the file `/usr/include/stdio.h` and the root folder. Which user and which group is associated for each of these files?

## Exercise 2 : Change permissions `chmod`

1. Try out the listed command below, and try to figure out how the `chmod` command works (with the symbolic representation).
```bash
$ touch f; ls -l f
$ chmod a= f; ls -l f
$ chmod o+rw f; ls -l f
$ chmod u=o f; ls -l f
$ chmod o-wx f; ls -l f
$ chmod g+u f; ls -l f
$ chmod a+x,g-w f; ls -l f
```
2. Test the command `chmod 644 f; ls -l f`.
3. Using the two ways usage of `chmod` (octal and symbolic), change the permissions of the file `f` to the following:
    - execute for all, read and write only for the owner.
    - read and execute for all, nobody can write.
    - all permissions for all, no write for others.
    - read and write for owner, execute for group and none for others.

## Exercise 3 : Normal files permissions

1. Create two files f and g, and enter (for example with a text editor) some words in each of them.
2. For you owner, remove the read permission in the file f and the write permission in g.
3. Try the `cat` command on f and g.
4. Try to modify g with a text editor.
5. Try out the commands `cp f h` and `cp g h`. See the content of h and the associated permissions to the file h.
6. The command `echo 'hello' >>f` writes the string "hello" at the end of the file f (more details in another Lab). Test it, then give back the read permissions on f and look at the content of f with cat.
7. Try to remove the file g with `rm g` (type n to refuse). Finally, try the command `rm -f g`.

## Exercise 4 : Permission for directories

!!! note "What is a directory"
    A directory is a table of file names associated with an index called an *inode number* that allows you to know the information (contained in the inode) concerning this file (size, permissions, timestamp, where to find the contents of the file, ...).

In a directory, the permissions are not associated to the files but to the directory itself. The permissions associated to a directory are:

- the read permission allows to list the content of the directory (with the `ls` command for example).
- the write permission allows to modify the content of the directory (create or delete files).
- the execute permission allows to open the directory (with the `cd` command for example).

1. Create a directory `rep` and two normal files a and b inside this directory.
2. Remove all permissions on the directory `rep` and try the following commands:
```bash
$ cd rep
$ ls rep
$ cat rep/a
$ touch rep/c
$ rm rep/a
```
3. Give back the read permission on the directory `rep` and try the same commands as the question above. What is the difference?
4. Try the same commands but remove the read permission on `rep` and give it back the write permission. What is the difference?
5. Now with only the execute permission on `rep`, try the following commands:
```bash
$ cd rep
$ ls rep
$ echo "toto" >> rep/a
$ cat rep/c
$ ls -l rep/a
$ touch rep/c
$ rm rep/a
```
6. With the set of permission `-wx` on `rep` try to:
   - create a file d in `rep`
   - rename the file b
   - remove all the permission associated to the file d
   - delete the file d

## Exercise 5 : `umask`
1. In a terminal type the command `umask` and take note of the result.
2. Create a directory `rep`  and a file `f` at the same level as `rep`. Display the permissions associated to `rep` and `f` with the command `ls -ld rep f`. Convert these permissions into octal representation and note them. Finally, remove `rep` and `f`.
3. Change the value of the mask with the command
```bash
$ umask 240
```
then redo the previous question.
4. Change the value of the mask with the command
```bash
$ umask 121
```
then redo the question 2.
5. Change the value of the mask with the command
```bash
$ umask 666
```
then redo the question 2.
6. From all the previous questions, can you deduce how the umask value works on the permissions associated to directories and files that you create ?
7. Give the umask its initial value.