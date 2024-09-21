---
title: TP4 - Filtres textuels, redirections et tubes
---

# TP4 - Filtres textuels, redirection et tubes

!!! info "Instructions"

    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` (si elle est disponible) pour savoir ce qu'elle fait.
    - N'hésitez pas à reconsulter les anciens TP pour vous aider.


## Canaux standards et redirections

!!! tip "Redirection de la sortie standard"

    La plupart des commandes que nous avons étudiées écrivent leur résultat sur le terminal. Par exemple `ls, echo, cat,...`. On dit que ces commandes écrivent sur la *sortie standard* (qui est *connectée* au terminal) 
    
    Il est possible de *rediriger* la sortie standard vers un fichier en utilisant le caractère `>`. Par exemple :
    ```bash
    $ ls ~ # affiche le contenu du répertoire personnel sur la sortie standard
    $ ls ~ > list_files.txt # redirige la sortie standard vers le fichier list_files
    ```

    !!! warning "Attention"
        La redirection de la sortie standard va créer le fichier `list_files.txt` s'il n'existe pas.

        La redirection écrase le contenu d'un fichier existant. Si on veut ajouter le résultat à la fin du fichier, on utilise le caractère `>>`.

---
###  Exercice 1 : Redirection de la sortie standard

1. Testez les commandes suivantes et observez leur résultats.
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
2. Rappeler ce que fait la commande `cat` (man `cat`) puis à partir des résultats des commandes précédentes:

    - Quelle est la différence entre `>` et `>>` ?
    - Quelle est la différence entre `1>` et `>` ?
    - Quelle est la différence entre `1>>` et `>>` ?

3. Placez-vous dans votre répertoire personnel et exécutez la commande suivante :
    ```bash
    $ ls > list_files.txt; cat list_files.txt
    ```
    - Que fait cette commande ?
    - Pouvez-vous expliquer pourquoi la chaîne `list_files.txt` apparaît dans le fichier `list_files.txt` ?

### Exercice 2 : Compter les entêtes (1)

1. En vous aidant de la redirection de la sortie standard, créer un fichier `include_files.txt` qui liste tous les fichiers du répertoire `/usr/include` dont le nom se termine par `.h`.
2. Compter le nombre de fichiers `.h` dans le répertoire `/usr/include` (indice : `wc`).
3. Enfin ajouter la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include` à la fin du fichier `include_files.txt`.

### Exercice 3 : Redirection de l'erreur standard

1. Dans un répertoire `dir` créer un fichier `file-1.txt` dont le contenu est `Hello world !`.
2. Créer ensuite une copie de `file-1.txt` nommée `file-2.txt`. Retirez toutes les permissions de lecture sur `file-2.txt`.
3. Tapez ensuite la commande suivante et notez les résultats (on va avoir des erreur !) :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt
    ```
4. Quelles commande a réussi ? et quelles commandes ont échoué et pourquoi ?
5. Faites ensuite une redirection de la sortie standard de la commande précédente vers un fichier `result.txt`. Observez le ce qui est affiché sur le terminal, et observer le contenu du fichier `result.txt`.
6. Tapez ensuite la commande suivante et notez les résultats :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt 1> result.txt 2> error.txt
    ```
7. Observez les contenus de `result.txt` et `error.txt`. Que contiennent-ils ? À votre avis que signifie `1>` et `2>` ? Tirez-en une conclusion sur la différence entre la sortie standard et l'erreur standard.

---

!!! tip "Redirection de l'entrée standard"

    Certaines commandes *lisent* des informations sur le terminal. Par exemple `tr, read,...`. On dit que ces commandes lisent sur l'entrée standard (qui est aussi *connectée* au terminal).

    Mais beaucoup de commandes lisent également sue le terminal si aucun nom de fichier leur est donné en argument. Par exemple `cat, grep, sort,...`.

    Il est possible de rediriger l'entrée standard d'une commande vers un fichier en utilisant le caractère `<`. Par exemple :
    ```bash
    $ cat < fichier.txt
    ```
    Cette commande affiche le contenu du fichier `fichier.txt` sur la sortie standard. On dit que le fichier `fichier.txt` est *connecté* à l'entrée standard de la commande `cat`.

    !!! warning "Attention"
        Il faut que le fichier `fichier.txt` existe et qu'on ait la permission `read` sinon la commande `cat` va échouer.
---

### Exercice 4 : Retour sur la commande `cat`
1. Revoyez le manuel de la commande `cat` et trouvez comment elle fonctionne lorsque l'on ne lui donne pas de fichier en argument.
2. Testez ensuite la commande suivante:
   ```bash
   $ cat
   hello<newline>
   world<newline>
   C-d # appuyer sur la touche Ctrl et la touche d en même temps
   ```
    Combien d'argument la commande `cat` a-t-elle reçu ? Qu'a-t-elle affiché ? Pourquoi ?

3. Testez ensuite la commande suivante:
   ```bash
   $ cat > catout.txt
   hello<newline>
   world<newline>
   C-d # appuyer sur la touche Ctrl et la touche d en même temps
   ```
    Puis affichez le contenu du fichier `catout.txt`. Que contient-il ? Pourquoi ?
4. Tapez enfin la commande suivante :
    ```bash
    $ cat < catout.txt
    $ cat 0< catout.txt
    ```
    - Combien d'argument la commande `cat` a-t-elle reçu ? Qu'a-t-elle affiché ?
    - Quelle est la différence entre `<` et `0<` ?

### Exercice 5 : Compter les entêtes (2)

Nous allons refaire le même exercice que l'exercice 2 mais cette fois-ci en utilisant la redirection de l'entrée standard.

1. Créer un fichier `include_files.txt` qui liste tous les fichiers du répertoire `/usr/include` dont le nom se termine par `.h`.
2. Tapez ensuite la commande suivante et commentez son résultat:
    ```bash
    $ wc -l < include_files.txt
    ```
3. Entrez ensuite la commande suivante et commentez son résultat:
    ```bash
    $ wc -l < include_files.txt >> include_files.txt
    ```
    et observez la dernière ligne du fichier `include_files.txt`.
4. Nous voudrions enfin que la dernière ligne du fichier `include_files.txt` soit la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include`. Où `<nombre>` est le résultat de `wc -l < include_files.txt`.

    Trouvez une commande qui permet de faire cela en utilisant à la fois la redirection de la sortie standard et de l'entrée standard.

    !!! info "Indice"

        - Pour retirer la dernière ligne, on peut refaire la commande de la première question.
        - Ensuite pensez à la commande `echo` et la subsutitution de commande.

## Les tubes

!!! tip "Tubes"
    Un *tube* (*pipe* en anglais) est un mécanisme qui permet de connecter la sortie standard d'une commande à l'entrée standard d'une autre commande. On utilise le caractère `|` pour créer un tube.

    C'est-à-dire que pour
    ```bash
    $ cmd1 | cmd2
    ```
    La sortie standard de `cmd1` est connectée à l'entrée standard de `cmd2`.
---

### Exercice 6 : Compter les entêtes (promis c'est la dernière fois)

1. Testez la commande suivante et commentez son résultat :
    ```bash
    $ ls /usr/include/*.h | wc -l
    ```
    Où est redirigé le résultat de la commande `ls` ? Où est redirigé l'entrée standard de la commande `wc` ? Où est affiché le résultat de `wc`?
2. Affichez ensuite sur le terminal la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include` en utilisant la commande `echo` et la substitution de commande (indice la commande à utiliser et celle de la question 1).    
3. Enfin, entrez la commande suivante et commentez son résultat :
    ```bash
    wc -l $(ls /usr/include/*.h)
    ```
4. À votre avis pourquoi le résultat de la dernière commande est-il différent de celui de la question 1 ?
---

## Filtre textuels

!!! tip "Qu'est ce que c'est ?"
    Les *filtres textuel* sont des commandes qui lisent ou peuvent lire depuis leur entrée standard et écrivent des données modifiées sur leur sortie standard. 

    En voici quelques-uns parmi les plus courants :

     - `head` : affiche les premières lignes de son entrée ;
     - `tail` : affiche les dernières lignes de son entrée. Avec l’option -f (pour follow, continuer à afficher la fin du fichier quand il est mis à jour) c’est l’une des commandes préférées des administrateurs systèmes ;
     - `grep` : une des commandes les plus connues, affiche des lignes correspondant à une chaîne, ou plus généralement une expression rationnelle dans son entrée ;
     - `cut` : sélectionne des champs ou des caractères dans chaque ligne de l’entrée standard ;
     - `sort` : trie son entrée standard suivant des critères.
     - `tr` : remplace des caractères dans son entrée standard.
     - `uniq` : supprime les lignes consécutives identiques dans son entrée standard.
  
  ---

### Exercice 7 : Frère Jacques

1. Créer un fichier `fj` contenant ces lignes :
    ```bash
    Frère Jaques, 
    Frère Jacques,                    
    Dormez-vous,
    Dormez-vous,
    Sonnez les matines,
    Sonnez les matines !
    Ding !
    Ding ! 
    Dong !
    ```
    avec la commande `echo` (**le caractère `<newline>` correspond à la touche entrée de votre clavier**):
    ```bash
    $ echo 'Frère Jaques,<newline> 
    > Frère Jacques,<newline>                     
    > Dormez-vous,<newline> 
    > Dormez-vous,<newline> 
    > Sonnez les matines,<newline> 
    > Sonnez les matines !<newline> 
    > Ding !<newline> 
    > Ding !<newline> 
    > Dong !' > fj
    ```
2. Testez ensuite les commandes suivantes et observez leur résultats:
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
    - Où sont affichés les résultats ?
    - À quoi servent les options `-n` de `head` et `tail` ? 
    - À quoi sert l'option `-v` de `grep` ? À quoi sert l'option `-i` de `grep` ?
    - À quoi servent les options `-c` et `-d` de `cut` ?

3. Testez ensuite la commande 
    ```bash
    $ tr a-z A-Z fj
    ```
    À votre avis pourquoi la commande échoue ? 
4. Tapez ensuite les commandes suivantes et commentez son résultat :
    ```bash
    $ tr a-z A-Z < fj
    $ tr S D < fj
    $ tail -n 3 fj | tr D B >> fj
    $ cat fj
    ```
    Que pouvez-vous conclure sur la commande `tr` ?

### Exercice 8 : Trier les fichiers

!!! tip "Nom de base"
    Le nom de base d'un fichier est le nom du fichier sans son extension. Par exemple le nom de base du fichier `/usr/include/stdio.h` est `stdio`.

Dans cet exercice, nous voudrions afficher sur le terminal le nom de base des 10 fichiers les plus légers (en taille en octets) parmi les fichier `.h ` du répertoire `/usr/include`.

En utilisant les commandes `wc`, `sort`, `cut`, `head` (ou éventuellement `tail`), et les redirections par tube, écrivez une commande qui affiche le nom de base des 10 fichiers les plus légers parmi les fichiers `.h` du répertoire `/usr/include`.

!!! info "Indication"

    - L'option `-c` de `wc` vous donne le nombre d'octets d'un fichier.
    - L'option `-n` de `sort` vous permet de trier les lignes d'un fichier par ordre numérique.
    - L'option `-d` de `tr` supprime les caractères reçus en premiers argument au lieu de les remplacer.

Si vous avez installé `gcc`, vous devriez avoir :
```bash
pool
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
### Exercice 9 : Plus sur `grep`

!!! tip "Passer un répertoire en argument de `grep`"
    
    - L'option `-r` de `grep` permet de passer un répertoire en argument. Et lui demande de chercher dans tous les fichiers de ce répertoire.
    - L'option `-l` de `grep` permet de n'afficher que le nom des fichiers qui contiennent la chaîne recherchée.

En utilisant `grep` et éventuellement d'autres commandes, trouvez une ligne de commande qui permet de:

1. Afficher la valeur de `RAND_MAX` (c'est une constante de la librairie standard de C). 
2. Afficher le chemin absolu des fichiers qui contiennent de la chaîne `127.0.0.1` dans les fichiers de `/etc`.
3. Afficher uniquement le nom des fichiers qui contiennent de la chaîne `127.0.0.1` dans les fichiers de `/etc`. (indice : il existe une commande qui s'appelle `rev`).
4. Affiche le chemin du répertoire personnel de l'utilisateur `games`.