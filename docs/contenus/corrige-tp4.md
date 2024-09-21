---
title: TP4 - Canaux standards et redirections | Processus et tâches | Signaux
---

# TP4 - Canaux standards et redirections | Processus et tâches | Signaux

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

    !!! success "Réponses"
        L'idée ici c'est de leur montrer où sont "affiché" le résultat de la commande `echo`.
    
2. Rappeler ce que fait la commande `cat` (man `cat`) puis à partir des résultats des commandes précédentes:

    - Quelle est la différence entre `>` et `>>` ?
    - Quelle est la différence entre `1>` et `>` ?
    - Quelle est la différence entre `1>>` et `>>` ?
    
    !!! success "Réponses"
        * `cat` sans argument va lire l'entrée standard, et va ensuite afficher ce qu'il a lu.

        * `>` écrase le contenu du ficher dans lequel est redirigé la sortie standard, tandis que `>>` va écrire sur la dernière ligne du fichier.
        * `1>` et `>`, `1>>` et `>>` font exactement la même chose. Le chiffre `1` est optionnel, c'est le descripteur de fichier associé à la sortie standard (`stdout` en anglais).

3. Placez-vous dans votre répertoire personnel et exécutez la commande suivante :
    ```bash
    $ ls > list_files.txt; cat list_files.txt
    ```
    - Que fait cette commande ?
        
        !!! success "La commande redirige la sortie standard de `ls` dans `list_files.txt`"
    
    - Pouvez-vous expliquer pourquoi la chaîne `list_files.txt` apparaît dans le fichier `list_files.txt` ?

        !!! success "Ici la chaîne `list_files.txt` apparaît dans le fichier car le fichier est d'abord créé avant l'exécution de la commande `ls`."

### Exercice 2 : Compter les entêtes (1)

1. En vous aidant de la redirection de la sortie standard, créer un fichier `include_files.txt` qui liste tous les fichiers du répertoire `/usr/include` dont le nom se termine par `.h`.

    !!! success "`$ ls /usr/include/*.h > include_files.txt`"

2. Compter le nombre de fichiers `.h` dans le répertoire `/usr/include` (indice : `wc`).

    !!! success "`$ wc -l include_files.txt`"

3. Enfin ajouter la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include` à la fin du fichier `include_files.txt`.

    !!! success "Réponses"
        
        ```bash
        $ echo "Il y a $(wc -l include_files.txt) fichiers .h dans le répertoire /usr/include" >> include_files.txt
        ```
        Il faut passer par la substitution de commande et rediriger la sortie standard de `echo` à la fin du fichier `include_files.txt`.

### Exercice 3 : Redirection de l'erreur standard

1. Dans un répertoire `dir` créer un fichier `file-1.txt` dont le contenu est `Hello world !`.
2. Créer ensuite une copie de `file-1.txt` nommée `file-2.txt`. Retirez toutes les permissions de lecture sur `file-2.txt`.
3. Tapez ensuite la commande suivante et notez les résultats (on va avoir des erreur !) :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt
    ```
4. Quelles commande a réussi ? et quelles commandes ont échoué et pourquoi ?

    !!! success "Réponses"
        - La commande `cat file-1.txt` a réussi.
        - La commande `cat file-2.txt` a échoué car le fichier `file-2.txt` n'a pas la permission `read`.
        - La commande `cat file-3.txt` a échoué car le fichier `file-3.txt` n'existe pas.

5. Faites ensuite une redirection de la sortie standard de la commande précédente vers un fichier `result.txt`. Observez le ce qui est affiché sur le terminal, et observer le contenu du fichier `result.txt`.

    !!! success "Réponses"
        
        ```bash
        $ cat file-1.txt file-2.txt file-3.txt > result.txt
        ```
        
        Les erreurs restent affichés sur le terminal. Il existe un autre canal pour les erreurs : c'est l'erreur standard (*stderr* en anglais).

6. Tapez ensuite la commande suivante et notez les résultats :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt 1> result.txt 2> error.txt
    ```
7. Observez les contenus de `result.txt` et `error.txt`. Que contiennent-ils ? À votre avis que signifie `1>` et `2>` ? Tirez-en une conclusion sur la différence entre la sortie standard et l'erreur standard.

    !!! success "Réponses"
        - La sortie standard est redirigée vers `result.txt` et l'erreur standard est redirigée vers le fichier `error.txt`.
        - Le chiffre `2` ici n'est pas optionnel, il faut le marquer pour signifier que l'on redirige l'erreur standard.

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

    !!! success "Réponses"
        `cat` ici n'a pas d'argument. Comme indiqué dans l'exo précédent `cat` sans argument lit sur l'entrée stadard. Elle va donc lire tous les caractères tapé au clavier avant que l'on appuie sur la touche entrée (pour le caractère `<newline>`). Directement après `<newline>`, les caractères lus sont affichés sur le terminal.
    **Vous pouvez leur dire que pour que `cat` arrête de lire, on tape sur `C-D` qui correspond au caractère `EOF` (end of file)**.


3. Testez ensuite la commande suivante:
   ```bash
   $ cat > catout.txt
   hello<newline>
   world<newline>
   C-d # appuyer sur la touche Ctrl et la touche d en même temps
   ```
    Puis affichez le contenu du fichier `catout.txt`. Que contient-il ? Pourquoi ?

    !!! success "Le fichier `catout.txt` va récupérer les résultats de la commande `cat` qui a lu sur l'entrée standard."

4. Tapez enfin la commande suivante :
    ```bash
    $ cat < catout.txt
    $ cat 0< catout.txt
    ```
    - Combien d'argument la commande `cat` a-t-elle reçu ? Qu'a-t-elle affiché ?
    - Quelle est la différence entre `<` et `0<` ?

    !!! success "Réponses"

        1.  Ici aussi la commande `cat` n'a pas d'arguments, et lit donc sur l'entrée standard. Sauf que cette fois-ci, l'entrée standard est redirigé vers le fichier `catout.txt`. En d'autres terme `cat` va lire le contenu de `catout.txt` comme si on les avait tapé au clavier sur le terminal. La commande va donc afficher le contenu de `caout.txt`. 
        2. L'utilisation de `<` et `0<` produisent exactement le même résultat. **`0` est le chiffre correspondant au descripteur de fichier de l'entrée standard, et il est optionnel**.

### Exercice 5 : Compter les entêtes (2)

Nous allons refaire le même exercice que l'exercice 2 mais cette fois-ci en utilisant la redirection de l'entrée standard.

1. Créer un fichier `include_files.txt` qui liste tous les fichiers du répertoire `/usr/include` dont le nom se termine par `.h`.

    !!! success "`$ ls /usr/include/*.h > include_files.txt`"

2. Tapez ensuite la commande suivante et commentez son résultat:
    ```bash
    $ wc -l < include_files.txt
    ```

    !!! success "Réponses"

        - `wc -l` compte le nombre de lignes du ou des fichiers passés en argument. Elle lit également sur l'entrée standard sans argument. Ici, on a une redirection de l'entrée standard. Cette commande va afficher le nombre de lignes du fichier `include_files.txt`.
    
        - `wc -l < include_files.txt` et `wc -l include_files.txt` produisent exactement le même résultat.
  
3. Entrez ensuite la commande suivante et commentez son résultat:
    ```bash
    $ wc -l < include_files.txt >> include_files.txt
    ```
    et observez la dernière ligne du fichier `include_files.txt`.

    !!! success "On a ici une double redirection, redirection de stdin, et redirection de stdout (en mode `append`)."

4. Nous voudrions enfin que la dernière ligne du fichier `include_files.txt` soit la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include`. Où `<nombre>` est le résultat de `wc -l < include_files.txt`.

    Trouvez une commande qui permet de faire cela en utilisant à la fois la redirection de la sortie standard et de l'entrée standard.

    !!! info "Indice"

        - Pour retirer la dernière ligne, on peut refaire la commande de la première question.
        - Ensuite pensez à la commande `echo` et la subsutitution de commande.
    
    !!! success "Réponses"
        
        ```bash
        $ ls /usr/include/*.h > include_files.txt
        $ echo "Il y a $(wc -l include_files.txt) fichiers .h dans le répertoire /usr/include." >> include_files.txt
        ```


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

    !!! success "On a connecté le stdout de la commande `ls` au stdin de la commande `wc`. Vous pouvez faire remarquer que le résultat de la commande `ls` n'est pas affiché dans le terminal, et `wc`n'a pas d'argument. "

2. Affichez ensuite sur le terminal la phrase `Il y a <nombre> fichiers .h dans le répertoire /usr/include` en utilisant la commande `echo` et la substitution de commande (indice la commande à utiliser et celle de la question 1).    

    !!! success "Réponses"
        
        ```bash
        $ echo "Il y a $(ls /usr/include/*.h | wc -l) fichiers .h dans le répertoire /usr/include" 
        ```

3. Enfin, entrez la commande suivante et commentez son résultat :
    ```bash
    wc -l $(ls /usr/include/*.h)
    ```
4. À votre avis pourquoi le résultat de la dernière commande est-il différent de celui de la question 1 ?

    !!! success "Réponses"
        `wc -l $(ls /usr/include/*.h)` affiche le nombre de ligne de **CHACUN** des fichiers affiché par la commande `ls`. Le résultat n'est pas le même que celle de la question 1, car la substitution de commande est efféctuée *avant* l'exécution de la commande `wc`. Elle se comporte donc comme si chaque fichier affiché par le `ls` est donné en argument à `wc`.
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

### Exercice 7 - Processus et tâches

!!! success "Correction globale"

    ### Correction globale
      1. Il est important de leur faire comprendre qu'on peut faire tourner des processus en avant et en arrière plan dans le shell.
          - Les processus en avant plan, bloquent l'interpréteur de commande tant qu'ils ne terminent pas.
          - Ceux qui tournent en arrière plan ne bloquent pas l'interpréteur de commande, qu'il ait terminé ou non.


      2. On peut aussi leur rappeler la distinction entre processus et tâches. Ici tous les processus sont des tâches car nous les lançons dans le shell.


      3. `C-z` et `C-c` permettent d'interagir avec les processus en **avant-plan**. En plus, `C-z` fait directement apparaître le numéro de tâche et le PID du processus sur la sortie standard.

      4. Les commandes `fg` et `bg` sont des commandes internes du shell qui permette de mettre respéctivement en avant et en arrière plan des tâche en leur passant le numéro de la tâche en argument avec `%<numéro tâche>`. Pour un processus arrêté, `fg` et `bg` permet de le relancer, respectivement en avant et arrière plan.

      5. Normalement, il doivent voir `Running`, `Stopped` et `Done` comme états des tâches dans cet exo.


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

### Exercice 8 - La commande `kill`

!!! success "Correction globale"

      1. `kill` peut s'utiliser de 4 façons différentes et fonctionne également avec le numéro de tâche. Par exemple pour `SIGINT` dont le numéro est `2`:
          ```bash
          $ kill -s SIGINT <PID>
          $ kill -SIGINT <PID>
          $ kill -2 <PID>
          $ kill -s INT <PID> # je ne leur ai pas montré cette dernière
          ```
      2. Dans cet exercice `$ kill -SIGINT <PID>` ne marche pas si le processus est en arrière plan c'est pour ça qu'on donne directement à `kill` le numéro de tâche.

      3. On a:
          - `SIGINT` permet d'interrompre puis tuer un processus. Statut dans `jobs`: `Interrupted`.
          - `SIGKILL` arrête de manière brutale un pricessus (aucun incidence dans notre exemple, mais vous pouvez leur expliquer qu'un programme peut allouer différentes ressources, et lui envoyer un `SIGKILL` le force à s'arrêter sans terminer proprement). Statut dans `jobs`: `Killed`.
          - `SIGTERM` interompt et arrête un processus. Statut dans `jobs`: `Terminated`.
          - `SIGTSTP` interompt un processus mais ne le tue pas. Statut dans `jobs`: `Stopped`.
          - `SIGCONT` relance un processus arrêté. Après `SIGCONT` le statut dans `jobs` devient `Running`.


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


