---
title: TP4 - Canaux standards et redirections | Processus et tâches | Signaux
---

# TP4 - Canaux standards et redirections | Processus et tâches | Signaux

!!! objectifs "Objectifs pédagogiques"

    À l’issue de ce TP, l’étudiant sera capable de :

    - **Rediriger les flux standards** (entrée, sortie, erreur) d’un programme via les opérateurs `>`, `>>`, `<`, `1>`, `2>`, `0<`
    - **Combiner les redirections** pour manipuler finement les données entrantes/sortantes dans le terminal et les fichiers
    - Utiliser les **tubes (`|`)** pour enchaîner les commandes et automatiser des traitements
    - **Observer et analyser les processus** via les commandes `ps`, `jobs`, `top`, `fg`, `bg`, `kill`, et comprendre la notion de tâche dans un shell
    - Distinguer les **processus en avant-plan et en arrière-plan**, les interrompre temporairement ou définitivement
    - Comprendre la notion de **signal envoyé à un processus**, son rôle, son effet, et les différences entre `SIGINT`, `SIGTERM`, `SIGTSTP`, `SIGCONT`, `SIGKILL`
    - Identifier un **processus à partir de son PID** ou de son identifiant de tâche pour interagir avec lui via `kill`
    -  Connaître les bonnes pratiques pour **terminer proprement ou forcer l’arrêt d’un processus**
    - Développer un petit **programme en C réactif aux signaux** (via `ctrl+C`, `ctrl+Z`, etc.) pour observer en pratique l’effet de ces signaux système


!!! info "Instructions"

    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` (si elle est disponible) pour savoir ce qu'elle fait.
    - N'hésitez pas à reconsulter les anciens TP pour vous aider.

!!! tip "Barème d’interprétation des exercices"

    > 📚 = Facile, 📚📚 = Moyenne, 📚📚📚 = Élevée 


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
###  Exercice 1 : Redirection de la sortie standard 📚

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

### Exercice 2 : Compter les entêtes (1) 📚📚

1. En vous aidant de la redirection de la sortie standard, créer un fichier `include_files.txt` qui liste tous les fichiers du répertoire `/usr/include` dont le nom se termine par `.h`.
2. Compter le nombre de fichiers `.h` dans le répertoire `/usr/include` (indice : `wc`).
3. Enfin ajouter la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include` à la fin du fichier `include_files.txt`.

### Exercice 3 : Redirection de l'erreur standard 📚📚

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

### Exercice 4 : Retour sur la commande `cat` 📚📚

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

### Exercice 5 : Compter les entêtes (2) 📚📚📚

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

### Exercice 6 : Compter les entêtes (promis c'est la dernière fois) 📚📚

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

## Processus et tâches

!!! tip "Processus et tâches"

    Un *processus* est une unité de travail sur un système d'exploitation. Il peut s'agir d'un programme, d'un script, ou d'un service. Chaque programme que vous exécutez représente un ou plusieurs processus.
    Chaque processus est identifié par un numéro unique appelé *PID* (Process IDentifier). 
    
    Linux nous offre plusieurs commandes pour visualiser les processus en cours d'exécution.

    - `ps` permet d'afficher les processus en cours d'exécution. Par défaut, `ps` n'affiche que les processus lancés par l'utilisateur courant. Pour afficher tous les processus, on utilise l'option `-e` (ou `-A`).
    - `top` permet d'afficher les processus en cours d'exécution. Il peut s'utiliser de manière interactive notamment les trier par utilisation du CPU. On peut quitter `top` avec la touche `q`.

    Une *tâche* par contre est une unité de travail du shell. Une tâche peut être un processus, ou un groupe de processus mais il faut qu'il ait été lancé par le shell. Le shell a un système de contrôle de tâches : c'est la capacité à exécuter plusieurs commandes en même temps. On peut lancer une commande en arrière-plan et en avant-plan. 

    La commande `jobs` permet d'afficher les tâches en cours d'exécution.

    !!! warning "En somme"
        Une tâche est un processus, mais un processus n'est pas forcément une tâche.

---


### Exercice 7 - Processus et tâches 📚📚📚

1. Dans cet exercice nous allons simuler l'exécution d'un processus long. Pour cela, nous allons utiliser la commande `sleep` qui permet de mettre en pause l'exécution d'un script pendant un certain temps. Tapez la commande `sleep 10` et observez ce qu'il se passe.

    !!! info "Informations de la commande `ps`"
        
            La commande `ps` retourne la liste des processus en cours d'exécution. Cette liste contient quatre colonnes par défaut.

            - La première colonne correspond au *PID* (Process IDentifier) du processus.
            - La deuxième colonne correspond au *TTY* (TeleTYpewriter) sur lequel le processus est lancé. C'est le type de terminal utilisé pour lancer le processus. Ici `pts/1` (pseudo-terminal slave) signifie que le processus a été lancé dans un pseudo-terminal. Le chiffre renseigné correspond au numéro du terminal (par exemple si vous avez plusieurs instances du terminal ouverts).
            - La troisième colonne correspond au *TIME* (temps) d'exécution du processus.
            - La quatrième colonne correspond à la *CMD* (CoMmanDe) qui a lancé le processus.

2. Ensuite testez les commandes suivantes et commentez les résultats:
    ```bash
    $ ps
    $ sleep 240
    $ C-z # Control + z
    $ ps
    $ fg %1 # fg %<numéro de la tâche>
    $ C-c # Control + c
    $ ps
    ``` 
      
      - À votre avis que fait le raccourci clavier `C-z` ? et le raccourci clavier `C-c` ?
      - Refaites les commandes en tapant des commandes (ou tout autre chose dans le terminal) entre le `sleep 240` et le `C-z`. Que remarquez-vous ?
      - Sans passer par `help fg`, pouvez-vous deviner ce que fait la commande `fg %1` ? et la commande `fg` de manière générale ?
      - Refaites les commandes en notant à chaque fois le PID du processus `sleep 240` dans les sorties de `ps`. Que remarquez-vous ?

3. Ecrire un programme en C qui incrémente indéfiniment une variable `i`, et affiche sa valeur sur la sortie standard à chaque fois que `i` est un multiple de 100. Pensez à utiliser la commande `sleep` pour ralentir l'exécution du programme et voir quelque chose sur le terminal. 

    !!! info "Où est sleep ?"
        Tapez la commande `man 3 sleep` pour voir où se trouve la fonction `sleep` dans la bibliothèque standard de C.

4. Compilez le programme et nommer votre exécutable `compteur`. Puis testez les commandes suivantes et commentez les résultats:
    
    ```bash
    $ ./compteur
    $ C-z
    $ jobs 
    $ jobs -p # Notez le PID 
    $ ps
    $ fg %1
    $ C-z
    $ bg %1
    $ fg %1 # Ne vous inquiétez pas, tapez tout simplement la commande correctement
    $ C-z
    $ jobs
    % fg %1
    $ C-c
    $ jobs
    ```
    
    - Quels procédés permettent de placer un processus en arrière-plan ? et en avant-plan ?
    - Quelle est la différence entre `C-z` et `C-c` ?
    - À quoi sert l'option `-p` de la commande `jobs` ?
    - Sans passer par `help bg`, pouvez-vous deviner ce que fait la commande `bg` de manière générale ?
    - Quels sont les différents états des tâches que vous avez observé ?

---
## Envoyer des signaux à un processus

!!! tip "Communiquer avec les processus"
    Lorsque des processus ont été lancés, nous avons remarqué qu'ils peuvent être arrêtes, redémarrés et tués. Pour cela, nous avons utilisé les commandes `C-z`, `C-c`, `fg` et `bg`. Ces commandes permettent de communiquer avec les processus en cours d'exécution. En réalité, ces dernières envoient ce qu'on appelle des *signaux* aux processus. Un *signal* est un message envoyé à un processus pour lui demander de faire quelque chose. 
    
    La commande qui permet d'envoyer des signaux à un processus est `kill`. Cette commande nécessite le PID du processus à qui envoyer le signal (ou son numéro de tâche si c'en est une). Ainsi `C-z`, `C-c`, `fg` et `bg` font donc appel à la commande `kill` pour envoyer des signaux aux processus.

    Il existe plusieurs signaux, les plus courants sont les suivants:

    - `SIGINT` : signal envoyé par la combinaison de touches `C-c`. Il demande au processus de s'arrêter.
    - `SIGTSTP` : signal envoyé par la combinaison de touches `C-z`. Il demande au processus de se mettre en pause.
    - `SIGCONT` : signal envoyé par les commandes `bg` et `fg`. Il demande au processus de reprendre son exécution.
    - `SIGTERM` : signal envoyé par la commande `kill` par défaut. Il demande au processus de s'arrêter.
    - `SIGKILL` : Il demande au processus de s'arrêter immédiatement et provoque son arrêt brutal, comprenez par là que le processus n'a pas le temps de se terminer correctement. Il est donc déconseillé d'utiliser ce signal.

    La liste exhaustive des signaux est disponible est obtenu avec commande `kill -L`.

    !!! warning "Qui a le droit d'envoyer des signaux à un processus ?"
        Pour pouvoir affecter un processus, vous devez biensur en être le prorpiétaire ou être *root*.

### Exercice 8 - La commande `kill` 📚📚📚
1. Tapez la commande `kill -L` et notez les numéros associés aux signaux `SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM` et `SIGKILL`.

2. On peut utiliser le caractère `&` à la fin de la commande pour directement lancer les tâches en arrière-plan. Lancez alors 3 processus `./compteur` en arrière-plan et testez les commandes suivantes:

    ```bash
    $ ./compteur 1 & # ce sera notre processus 1
    $ ./compteur 2 & # ce sera notre processus 2
    $ ./compteur 3 & # ce sera notre processus 3
    $ jobs -p # notez les PID des processus, mais ils ont dû être affichés à l'écran lors de leur lancement
    $ kill -SIGTSTP <PID du processus 1>
    $ jobs
    $ kill -SIGINT %2
    $ jobs
    $ jobs # oui une deuxième fois
    $ kill -SIGCONT %1
    $ jobs
    $ kill -s SIGTERM <PID processus 1>
    $ jobs
    $ kill -9 <PID du processus 3>
    $ jobs
    $ jobs # pour voir disparaître la tâche [3]
    ```

1. Selon vous quel est la différence entre `SIGINT` et `SIGTSTP` ? et entre `SIGTSTP` et `SIGTERM` ?
2. D'après vos observations sur les résultats de la question 2, de combien de manière différente peut-on utiliser la commande `kill` pour arriver au même résultat ?


