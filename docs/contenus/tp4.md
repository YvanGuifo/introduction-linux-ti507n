---
title: TP4 - Canaux standards et redirections | Processus et tâches | Signaux
---

# TP4 — Canaux standards et redirections, processus et tâches, signaux

!!! objectifs "Objectifs pédagogiques (taxonomie de Bloom révisée)"
    À l’issue de ce TP, vous serez capable de :

    - **[Appliquer]** rediriger les flux standards d’une commande avec `>`, `>>`, `<`, `1>`, `2>`, `0<`.
    - **[Appliquer]** combiner plusieurs commandes avec des tubes (`|`) pour automatiser un traitement.
    - **[Appliquer]** observer et contrôler les processus avec `ps`, `top`, `jobs`, `fg`, `bg`.
    - **[Analyser]** distinguer un **processus** d’une **tâche** ; distinguer avant-plan et arrière-plan.
    - **[Appliquer]** envoyer des signaux à un processus avec `kill` (`SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM`, `SIGKILL`).
    - **[Évaluer]** choisir entre terminaison propre (`SIGTERM`) et terminaison forcée (`SIGKILL`).
    - **[Créer]** écrire un programme C réactif aux signaux, capable de créer un processus fils et d’en attendre la fin (`signal`, `fork`, `wait`/`waitpid`, `execvp`).

    > **Référence** : Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman. ISBN 978-0801319037.

!!! tip "Prérequis"
    - **TP1, TP2 et TP3 terminés** : navigation, permissions, variables shell, compilation `gcc`.
    - Distribution Debian 12 ou session MarioNum active.
    - Connaissances C minimales (compilation avec `gcc`, vue au TP3).

!!! info "Instructions"
    - Le `$` en début de ligne représente le prompt — ne le tapez pas.
    - Pour chaque nouvelle commande, consultez la page de manuel avec `man` ou l’option `--help`.
    - N’hésitez pas à reconsulter les anciens TP pour vous aider.

!!! warning "À propos des réponses du TP"

    Avant de commencer le TP, vous devez créer un fichier nommé **`resultat_commande_TP4_NomPrenomEtudiant.txt`**.
    Dans ce fichier, vous consignerez progressivement les résultats des commandes exécutées au fil des exercices.

    > **Création du fichier**

    1. Clic droit dans votre répertoire de travail
    2. Créer un document → Fichier vide
    3. Nommer le fichier : `resultat_commande_TP4_NomPrenomEtudiant.txt`

    > **Notez bien :**
    >> - <span style="color:blue"> Votre enseignant doit pouvoir consulter ce fichier à tout moment afin d’évaluer votre progression. </span>

    >> - <span style="color:red"> Pour garder une copie de votre travail, veillez à sauvegarder ce fichier résultat en local sur votre machine avant la fin de la séance. </span>
    >>> **Procédure de sauvegarde en local** :
        1. Cliquez sur le **presse-papier** (à gauche du Bureau de votre machine virtuelle Debian).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Sélectionnez le contenu de votre fichier résultat et copiez.
        3. Collez le contenu copié dans un nouveau fichier sur votre machine.

!!! tip "Barème d’interprétation des exercices"
    > 📚 = Facile · 📚📚 = Moyenne · 📚📚📚 = Élevée
    >
    > Les exercices **1 à 7** constituent le **tronc commun**, exigible pour tous.
    > Les exercices **8, 9, 10** (⭐) portent sur la **programmation système en C**.
    > **Depuis 2026‑2027, ils font partie du périmètre évalué** : ils couvrent la
    > partie « Programmation » du syllabus du module.

!!! info "Alignement avec les évaluations (Biggs, 1996)"
    Les exercices 📚 et 📚📚 préparent au **CC S38** et au **TP noté S40**.
    Les exercices 📚📚📚 préparent au **DE S42 (QCM)** par leur dimension d’analyse et de justification.
    Les exercices ⭐ de ce TP préparent au **DE S42** sur la partie **appels système**.

    > **Référence** : Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education*, 32(3), 347–364. DOI : [10.1007/BF00138871](https://doi.org/10.1007/BF00138871).

---

## 1. Canaux standards et redirections

!!! tip "Les trois canaux standards"
    Tout processus Unix dispose, dès son démarrage, de **trois canaux** ouverts :

    | Numéro | Nom | Rôle par défaut |
    |---|---|---|
    | `0` | **stdin** (entrée standard) | lit depuis le clavier |
    | `1` | **stdout** (sortie standard) | écrit sur le terminal |
    | `2` | **stderr** (erreur standard) | écrit sur le terminal (messages d’erreur) |

    Le shell permet de **rediriger** ces canaux vers un fichier (ou un autre canal).

!!! tip "Redirection de la sortie standard"
    `>` redirige `stdout` vers un fichier ; `>>` ajoute en fin de fichier.

    ```bash
    $ ls ~ > list_files.txt    # (i)
    $ ls ~ >> list_files.txt   # (ii)
    ```

    1. `>` redirige `stdout` vers un fichier. Si le fichier existe, il est **écrasé**.
    2. `>>` redirige `stdout` en **ajoutant** en fin de fichier, sans écraser le contenu existant.

    !!! warning "Attention"
        `>` **écrase** sans demander confirmation. Pour préserver le contenu existant, utilisez `>>`.

### Exercice 1 — Redirection de la sortie standard 📚

1. Testez les commandes suivantes et observez leurs résultats :
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

2. Rappelez ce que fait la commande `cat` (`man cat`), puis répondez :
    - Quelle est la différence entre `>` et `>>` ?
    - Quelle est la différence entre `1>` et `>` ?
    - Quelle est la différence entre `1>>` et `>>` ?

3. Placez-vous dans votre répertoire personnel et exécutez :
   ```bash
   $ ls > list_files.txt; cat list_files.txt
   ```
   - Que fait cette commande ?
   - Pouvez-vous expliquer pourquoi la chaîne `list_files.txt` apparaît dans le fichier `list_files.txt` ?

---

### Exercice 2 — Redirection de l’erreur standard 📚📚

1.  Dans un répertoire `dir`, créez un fichier `file-1.txt` dont le contenu est `Hello world !`.
2.  Créez une copie de `file-1.txt` nommée `file-2.txt`. Retirez **toutes les permissions de lecture** sur `file-2.txt`.
3.  Tapez la commande suivante et notez les résultats (vous aurez des erreurs) :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt
    ```

4.  Quelle commande a réussi ? Quelles commandes ont échoué et pourquoi ?
5.  Redirigez la sortie standard de la commande précédente vers un fichier `result.txt`. Observez ce qui est affiché sur le terminal **et** ce qui est dans `result.txt`.
6.  Tapez ensuite :
    ```bash
    $ cat file-1.txt file-2.txt file-3.txt 1> result.txt 2> error.txt # (i)
    ```

    1. `1>` redirige la **sortie standard** (canal 1) vers `result.txt`, `2>` redirige l'**erreur standard** (canal 2) vers `error.txt`. On sépare ainsi les résultats normaux des messages d'erreur.

7.  Observez les contenus de `result.txt` et `error.txt`. À votre avis que signifient `1>` et `2>` ? Tirez-en une conclusion sur la différence entre la sortie standard et l’erreur standard.

---

!!! tip "Redirection de l’entrée standard"
    Certaines commandes *lisent* depuis le terminal (`tr`, `read`, etc.). Beaucoup d’autres lisent depuis le terminal **si aucun fichier ne leur est donné en argument** (`cat`, `grep`, `sort`…).

    On redirige l’entrée standard avec `<` :
    ```bash
    $ cat < fichier.txt
    ```
    Le fichier `fichier.txt` est alors *connecté* à l’entrée standard de `cat`.

    !!! warning "Attention"
        Il faut que `fichier.txt` existe et soit lisible, sinon la commande échoue.

### Exercice 3 — Redirection de l’entrée standard et retour sur `cat` 📚📚

1. Consultez le manuel de `cat` et trouvez comment elle se comporte lorsqu’on **ne lui donne pas** de fichier en argument.
2. Testez :
   ```bash
   $ cat
   hello<Entrée>
   world<Entrée>
   <Ctrl-d>
   ```
   Combien d’arguments `cat` a-t-elle reçus ? Qu’a-t-elle affiché ? Pourquoi ?

3. Testez maintenant :
   ```bash
   $ cat > catout.txt
   hello<Entrée>
   world<Entrée>
   <Ctrl-d>
   ```
   Affichez le contenu de `catout.txt`. Que contient-il ? Pourquoi ?

4. Tapez enfin :
   ```bash
   $ cat < catout.txt
   $ cat 0< catout.txt
   ```
   - Combien d’arguments `cat` a-t-elle reçus ? Qu’a-t-elle affiché ?
   - Quelle est la différence entre `<` et `0<` ?

---

## 2. Les tubes (`pipes`)

??? saviezvous "Le pipe `|` : inventé sur un coin de table en 1973"
    Le concept de **pipe** a été proposé par **Doug McIlroy** (Bell Labs) dès 1964, mais c’est **Ken Thompson** qui l’a implémenté dans Unix en une seule nuit de février 1973. L’idée est d’une élégance rare : plutôt que de créer des programmes monolithiques, on écrit de **petits outils spécialisés** que l’on connecte entre eux. Cette philosophie — *« Do one thing and do it well »* — est devenue le principe fondateur d’Unix et influence encore aujourd’hui l’architecture logicielle (microservices, pipelines CI/CD).

    > McIlroy, M. D., Pinson, E. N. & Tague, B. A. (1978). UNIX Time-Sharing System: Foreword. *The Bell System Technical Journal*, 57(6), 1899–1904. DOI : [10.1002/j.1538-7305.1978.tb02135.x](https://doi.org/10.1002/j.1538-7305.1978.tb02135.x)

!!! tip "Définition"
    Un **tube** (*pipe* en anglais) connecte la sortie standard d’une commande à l’entrée standard d’une autre. On utilise le caractère `|`.

    Pour `cmd1 | cmd2`, la sortie standard de `cmd1` devient l’entrée standard de `cmd2`. On peut enchaîner :
    ```bash
    $ cmd1 | cmd2 | cmd3
    ```

### Exercice 4 — Compter les entêtes : tout en un 📚📚

Cet exercice consolide redirections **et** tubes. Vous travaillerez sur les fichiers `.h` du répertoire `/usr/include` (en-têtes de la bibliothèque C).

1.  Avec **uniquement une redirection de sortie**, créez un fichier `include_files.txt` listant tous les fichiers `.h` de `/usr/include` :
    ```bash
    $ ls /usr/include/*.h > include_files.txt
    ```

2.  Testez la commande suivante et commentez :
    ```bash
    $ ls /usr/include/*.h | wc -l # (i)
    ```

    1. Le `|` (pipe) connecte la sortie de `ls` à l'entrée de `wc`. L'option `-l` de `wc` compte le nombre de **lignes** reçues — ici, le nombre de fichiers `.h`.

    Où est redirigé le résultat de `ls` ? Où va l’entrée standard de `wc` ? Où est affiché le résultat de `wc` ?

3.  Affichez sur le terminal la phrase
    `Il y a <nombre> fichiers .h dans le répertoire /usr/include`
    en utilisant `echo` et la **substitution de commande** `$(...)` (vue au TP3, exercice 6).

4.  Entrez la commande suivante et commentez :
    ```bash
    $ wc -l $(ls /usr/include/*.h)
    ```

5.  **Question d’analyse** : pourquoi le résultat de la question 4 diffère-t-il de celui de la question 2 ? *(Indice : `wc -l` reçoit-il les noms de fichiers ou leur contenu ?)*
6.  **Question de justification** : écrivez une commande qui ajoute en **fin** de `include_files.txt` la phrase de la question 3, en utilisant `>>` et la substitution de commande.

!!! info "Cet exercice est représentatif d’un item type **DE S42 (QCM)**."

---

## 3. Processus et tâches

!!! tip "Processus et tâches"
    Un **processus** est une unité de travail du système d’exploitation : un programme en cours d’exécution. Chaque processus est identifié par un **PID** (*Process IDentifier*).

    Une **tâche** est une unité de travail du **shell** : un processus (ou groupe de processus) lancé depuis ce shell. Le shell offre un système de **contrôle des tâches** (*job control*) permettant d’exécuter plusieurs commandes simultanément et de basculer entre avant-plan et arrière-plan.

    > Une tâche est un processus, mais un processus n’est pas forcément une tâche.

    Principales commandes :

    - `ps` : liste les processus de l’utilisateur courant. Option `-e` (ou `-A`) : tous les processus du système.
    - `top` : afficheur interactif des processus, triés notamment par utilisation CPU. Quittez avec `q`.
    - `jobs` : liste les tâches du shell courant. Option `-p` : affiche les PID.
    - `fg %<n>` : ramène la tâche `n` au premier plan.
    - `bg %<n>` : reprend la tâche `n` en arrière-plan.

!!! tip "Raccourcis clavier essentiels"
    - <kbd>Ctrl</kbd>+<kbd>Z</kbd> : suspend la tâche courante (signal `SIGTSTP`).
    - <kbd>Ctrl</kbd>+<kbd>C</kbd> : interrompt la tâche courante (signal `SIGINT`).
    - <kbd>Ctrl</kbd>+<kbd>D</kbd> : envoie une fin de fichier (EOF) sur l’entrée standard.

### Exercice 5 — Observer un processus avec `sleep` 📚📚

1. Lancez `sleep 10` et observez : le prompt revient-il immédiatement ?
2. Testez la séquence suivante en notant à chaque fois la sortie de `ps` :
   ```bash
   $ ps
   $ sleep 240
   ```
   Pendant que `sleep 240` tourne, appuyez sur <kbd>Ctrl</kbd>+<kbd>Z</kbd>, puis :
   ```bash
   $ ps
   $ fg %1
   ```
   Puis <kbd>Ctrl</kbd>+<kbd>C</kbd>, puis :
   ```bash
   $ ps
   ```

3. **Questions** :

    - Que fait <kbd>Ctrl</kbd>+<kbd>Z</kbd> ? Et <kbd>Ctrl</kbd>+<kbd>C</kbd> ?
    - Refaites la séquence en tapant des commandes (par exemple `pwd`, `ls`) **entre** `sleep 240` et <kbd>Ctrl</kbd>+<kbd>Z</kbd>. Que remarquez-vous ?
    - Que fait `fg %1` de manière générale ?

!!! info "Informations sur la sortie de `ps`"
    Par défaut, `ps` retourne quatre colonnes :

    - **PID** : identifiant unique du processus.
    - **TTY** : terminal associé. `pts/N` désigne un pseudo-terminal n° N.
    - **TIME** : temps CPU consommé par le processus.
    - **CMD** : commande qui a lancé le processus.

### Exercice 6 — Avant-plan, arrière-plan, bascule 📚📚📚

Cet exercice vous demande d’écrire un petit programme C utilisant les acquis du TP3.

1.  Écrivez un programme C `compteur.c` qui incrémente indéfiniment une variable `i` et affiche sa valeur **sur la sortie standard à chaque multiple de 100**. Utilisez `sleep` pour ralentir l’exécution et observer la sortie.

     !!! info "Où est `sleep` en C ?"

         Tapez `man 3 sleep` pour voir la signature de la fonction `sleep` dans la bibliothèque standard (`<unistd.h>`).

2.  Compilez avec `gcc -Wall -o compteur compteur.c`. Testez :
    ```bash
    $ ./compteur
    <Ctrl-z>           # (i)
    $ jobs
    $ jobs -p           # (ii)
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

    1. <kbd>Ctrl+Z</kbd> envoie le signal `SIGTSTP` : le processus est **suspendu** (pas terminé), il reste en mémoire.
    2. `-p` affiche uniquement le **PID** (identifiant numérique) de chaque tâche, utile pour `kill`.

3.  **Questions d’analyse** :

    - Quels procédés permettent de placer un processus en arrière-plan ? En avant-plan ?
    - Quelle est la différence entre <kbd>Ctrl</kbd>+<kbd>Z</kbd> et <kbd>Ctrl</kbd>+<kbd>C</kbd> ?
    - À quoi sert l’option `-p` de `jobs` ?
    - Que fait `bg` de manière générale ?
    - Quels **états** des tâches avez-vous observés ? *(Indice : `Running`, `Stopped`, `Terminated`…)*

!!! info "Cet exercice est représentatif d’un item type **DE S42 (QCM)**."

---

## 4. Envoyer des signaux à un processus

??? saviezvous "L'origine du mot « daemon » et pourquoi SIGKILL est incontournable"
    Le mot **daemon** (démon) vient de la mythologie grecque : un *daimôn* est un esprit intermédiaire qui travaille en arrière-plan, ni dieu ni mortel. En informatique, l'acronyme rétrospectif **D**isk **A**nd **E**xecution **MON**itor est parfois proposé, mais les créateurs d'Unix (notamment Fernando Corbató au MIT, projet CTSS/Multics, ~1963) s'inspiraient bien du concept mythologique. Quant au signal `SIGKILL` (9), il a été conçu **exprès** pour être impossible à intercepter ou ignorer : c'est le noyau qui termine le processus directement, sans lui laisser exécuter de gestionnaire de signal. C'est un choix de conception délibéré — il faut toujours un mécanisme de dernier recours.

    > Corbató, F. J. & Vyssotsky, V. A. (1965). Introduction and overview of the Multics system. *Proceedings AFIPS Fall Joint Computer Conference*, 185–196. DOI : [10.1145/1463891.1463912](https://doi.org/10.1145/1463891.1463912)

!!! tip "Les signaux : communiquer avec les processus"
    Les raccourcis <kbd>Ctrl</kbd>+<kbd>C</kbd>, <kbd>Ctrl</kbd>+<kbd>Z</kbd>, et les commandes `fg` / `bg`, envoient en réalité des **signaux** au processus. Un signal est un **message asynchrone** envoyé à un processus pour lui demander d’agir.

    La commande `kill` envoie un signal à un processus identifié par son PID (ou son numéro de tâche `%n`).

    Principaux signaux :

    | Signal | Origine usuelle | Sémantique |
    |---|---|---|
    | `SIGINT` (2) | <kbd>Ctrl</kbd>+<kbd>C</kbd> | demande l’**interruption** du processus |
    | `SIGTSTP` (20) | <kbd>Ctrl</kbd>+<kbd>Z</kbd> | demande la **suspension** du processus |
    | `SIGCONT` (18) | `fg`, `bg` | demande la **reprise** d’un processus suspendu |
    | `SIGTERM` (15) | `kill` par défaut | demande l’arrêt **propre** du processus |
    | `SIGKILL` (9) | `kill -9` | **arrêt forcé**, le processus **ne peut pas** s’y opposer |

    La liste exhaustive : `kill -L`.

    !!! warning "Qui peut envoyer un signal ?"
        Vous ne pouvez envoyer un signal qu’aux processus dont vous êtes le propriétaire — sauf si vous êtes `root`.

    !!! warning "`SIGKILL` est à utiliser en dernier recours"
        `SIGKILL` ne laisse pas le processus se terminer proprement (pas de libération de mémoire, pas de sauvegarde de fichiers ouverts). Préférez `SIGTERM`.

    > **Référence** : *POSIX.1-2017, Volume 1: Base Definitions*, chapitre 2 §2.4 *Signal Concepts*, IEEE/Open Group, 2018. <https://pubs.opengroup.org/onlinepubs/9699919799/>

### Exercice 7 — Manipuler les signaux avec `kill` 📚📚📚

!!! info "Aide structurée"
    - **Désigner la cible.** `kill` accepte un **PID** (`kill 12345`) ou un **numéro de
      tâche** précédé de `%` (`kill %2`). `jobs -p` donne les PID, `jobs` les numéros
      de tâche.
    - **Désigner le signal.** Trois écritures sont équivalentes :
      `kill -SIGTERM <cible>`, `kill -s SIGTERM <cible>`, `kill -15 <cible>`.
      Sans signal précisé, `kill` envoie `SIGTERM`.
    - **Lire l'effet.** Après chaque `kill`, relancez `jobs` : la colonne d'état passe
      de `Running` à `Stopped` (suspension) puis à `Terminated`/`Killed`. Un processus
      terminé ne disparaît de `jobs` qu'au **deuxième** appel — c'est pour cela que la
      question 3 vous fait taper `jobs` deux fois.
    - **Si vous perdez la main.** `jobs -p | xargs kill -9` termine toutes les tâches
      du terminal courant.

1. Tapez `kill -L` et notez les numéros associés à `SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM`, `SIGKILL`.
2. Le caractère `&` à la fin d’une commande la lance en arrière-plan. Lancez **trois** processus `./compteur` en arrière-plan :
   ```bash
   $ ./compteur &           # processus 1
   $ ./compteur &           # processus 2
   $ ./compteur &           # processus 3
   $ jobs -p                # note les PID
   ```

3. Manipulez les signaux :
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

4. **Questions** :

    - Quelle est la différence entre `SIGINT` et `SIGTSTP` ? Entre `SIGTSTP` et `SIGTERM` ?
    - D’après vos observations, **combien de syntaxes différentes** de `kill` produisent le même effet ? Listez-les.

5. **Question d’évaluation** — pour chacun des cas suivants, indiquez **le signal le plus approprié et justifiez** :

      - (a) un utilisateur veut interrompre un programme qu’il vient de lancer dans son terminal ;
      - (b) un administrateur veut arrêter proprement un service système ;
      - (c) un processus est figé et ne répond plus à aucune commande ;
      - (d) un développeur veut suspendre temporairement un long calcul sans le perdre.

---

## Synthèse — Ce que vous devez savoir faire

!!! success "Auto-évaluation rapide"
    Avant de quitter la séance, vérifiez que vous savez :

    - [ ] Rediriger `stdout` (`>`, `>>`), `stderr` (`2>`), `stdin` (`<`).
    - [ ] Différencier `>` et `>>`, `1>` et `2>`.
    - [ ] Enchaîner des commandes avec des tubes `|`.
    - [ ] Observer les processus avec `ps`, `top`, `jobs`.
    - [ ] Suspendre, reprendre et terminer une tâche (<kbd>Ctrl</kbd>+<kbd>Z</kbd>, `fg`, `bg`, <kbd>Ctrl</kbd>+<kbd>C</kbd>).
    - [ ] Distinguer **processus** et **tâche**, **avant-plan** et **arrière-plan**.
    - [ ] Envoyer un signal avec `kill` en utilisant les différentes syntaxes (`-SIGTERM`, `-s SIGTERM`, `-15`).
    - [ ] Choisir entre `SIGTERM` (propre) et `SIGKILL` (forcé) selon le contexte.

    **Programmation système (⭐ — évalué)** :

    - [ ] Installer un gestionnaire de signal avec `signal()` et expliquer pourquoi `sigaction()` lui est préféré.
    - [ ] Créer un processus fils avec `fork()` et distinguer les deux flots d’exécution par la valeur de retour.
    - [ ] Attendre la fin d’un fils avec `wait()` / `waitpid()` et expliquer ce qu’est un processus zombie.
    - [ ] Remplacer l’image mémoire d’un processus avec `execvp()` et justifier qu’il ne revient pas en cas de succès.

    Si un item n’est pas coché, **revenez sur l’exercice correspondant**.

---

## ⭐ Programmation système

!!! star "Les exercices 8, 9 et 10 font partie du programme"
    Ces trois exercices closent la progression en C amorcée au TP3 et vous font écrire
    un **mini-shell**.

    **Rappel** des appels système travaillés au **TP3 ⭐** : `open`, `read`, `write`,
    `close`, `perror`, `dup`, `dup2`.

    **TP4 ⭐** : **`signal`**, **`fork`**, **`exec*`**, **`wait`** / **`waitpid`** — le
    cœur du multitâche Unix.

    Niveaux taxonomiques visés : **[Analyser]**, **[Évaluer]**, **[Créer]** (Bloom révisé).

    !!! warning "Changement 2026‑2027"
        Ces exercices étaient auparavant présentés comme optionnels. **Ils sont
        désormais évalués** : `fork`, `exec*`, `wait` et les signaux font partie du
        périmètre du **DE S42**.

### Exercice 8 — Capturer un signal en C avec `signal()` ⭐

L’appel système `signal()` permet d’installer un **gestionnaire** (*handler*) qui sera appelé chaque fois que le processus reçoit un signal donné.

1.  Lisez la page de manuel : `man 2 signal`. Notez la signature.

2.  Créez `catch-sigint.c` :

    ```c
    #include <stdio.h>      /* printf */
    #include <signal.h>     /* signal, SIGINT, sig_atomic_t */
    #include <unistd.h>     /* pause, write, getpid, STDERR_FILENO */
    #include <string.h>     /* strlen */

    static volatile sig_atomic_t compteur_sigint = 0;   // (i)

    void handler(int sig) {
        (void)sig;
        compteur_sigint++;
        const char *msg = "\n[SIGINT recu]\n";
        write(STDERR_FILENO, msg, strlen(msg));         // (ii)
    }

    int main(void) {
        signal(SIGINT, handler);

        printf("PID = %d. Appuyez sur Ctrl-C plusieurs fois...\n", (int)getpid());
        while (compteur_sigint < 3) {
            pause();                                     // (iii)
        }
        printf("Trois SIGINT recus (total = %d), je m'arrete proprement.\n",
               (int)compteur_sigint);
        return 0;
    }
    ```

    1.  `volatile sig_atomic_t` est **le seul type** que la norme C garantisse lisible
        et modifiable de façon atomique entre le programme principal et un gestionnaire
        de signal. Un `int` ordinaire n'offre pas cette garantie.
    2.  On écrit avec `write()` et **non** `printf()` : un gestionnaire de signal ne peut
        appeler que des fonctions dites **async-signal-safe**. `printf()` n'en fait pas
        partie — l'appeler depuis un gestionnaire peut corrompre les tampons de la
        `stdio` si le signal arrive au mauvais moment. Liste officielle :
        `man 7 signal-safety`.
    3.  `pause()` endort le processus jusqu'à l'arrivée d'un signal — plus juste qu'un
        `sleep(1)` qui interrogerait périodiquement la variable.

3.  Compilez sans laisser passer le moindre avertissement :

    ```bash
    $ gcc -Wall -Wextra -Wstrict-prototypes -o catch-sigint catch-sigint.c
    ```

4.  Exécutez `./catch-sigint`, puis appuyez **3 fois** sur <kbd>Ctrl</kbd>+<kbd>C</kbd>.

5.  **Questions** :

    - Pourquoi <kbd>Ctrl</kbd>+<kbd>C</kbd> **n'interrompt-il plus** le programme ?
    - Essayez d'envoyer `SIGTERM` depuis un autre terminal : `kill <PID>`. Que se passe-t-il ?
    - Essayez ensuite `kill -9 <PID>`. Que se passe-t-il ? Pourquoi ?

6.  **Question d'analyse** : remplacez `write()` par le `printf()` d'origine dans le
    gestionnaire, puis lancez le programme en maintenant <kbd>Ctrl</kbd>+<kbd>C</kbd>
    enfoncé. Le programme peut se figer ou afficher n'importe quoi. Expliquez pourquoi,
    à partir de `man 7 signal-safety`.

!!! info "Deux réflexes de programmation système à retenir"
    - **`signal()` vs `sigaction()`** : la sémantique de `signal()` a historiquement
      varié d'un Unix à l'autre (réarmement automatique du gestionnaire ou non). En
      production on lui préfère `sigaction()` (`man 2 sigaction`), dont le comportement
      est spécifié sans ambiguïté.
    - **Async-signal-safety** : un gestionnaire ne peut appeler qu'un sous-ensemble
      restreint de fonctions, listé dans `man 7 signal-safety`. `write()` en fait
      partie, `printf()` et `malloc()` **non**. En pratique, un gestionnaire se
      contente de positionner un drapeau `volatile sig_atomic_t` et de rendre la main.

    > **Référence** : Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. Chapitres 20 (Signals: Fundamental Concepts) et 22 (Signals: Advanced Features).

### Exercice 9 — Créer un processus fils avec `fork()` ⭐

`fork()` est l’appel système qui **duplique** le processus appelant : à la sortie de `fork()`, **deux** processus identiques s’exécutent en parallèle. La valeur de retour permet de les distinguer :

- `> 0` (PID du fils) → on est dans le **parent**.
- `== 0` → on est dans le **fils**.
- `< 0` → échec.

1. Lisez : `man 2 fork` puis `man 2 wait`.
2. Créez `fork-demo.c` :
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

3. Compilez et exécutez plusieurs fois. Observez les PID.
4. **Questions** :

    - Pourquoi voit-on un message « Avant fork » suivi de **deux** suites distinctes ?
    - Pourquoi appeler `wait()` côté parent ? *(Que devient un fils dont le parent ne fait pas `wait` ? Cherchez « processus zombie » dans `man 2 wait`.)*
    - Modifiez le programme pour créer **deux fils** (deux `fork()` successifs côté parent). Le parent doit attendre les deux fils avant de se terminer.

### Exercice 10 — Mini-projet : un mini-shell qui exécute une commande ⭐

Quand vous tapez `ls /tmp` dans `bash`, le shell fait en réalité :

1. `fork()` → crée un processus fils.
2. Côté fils : `exec*()` → remplace l’image mémoire du fils par celle de `ls`.
3. Côté parent : `wait()` → attend la fin du fils.

Vous allez reproduire ce mécanisme.

1. Créez `mysh.c` dans `~/ti307/c/` :
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

2. Compilez : `gcc -Wall -o mysh mysh.c`.
3. Testez :
   ```bash
   $ ./mysh ls -l /tmp
   $ ./mysh date
   $ ./mysh echo Hello from mysh
   $ ./mysh /commande/inexistante
   ```

4. **Questions d’analyse** :

     - Pourquoi `execvp` ne revient-il **jamais** si tout se passe bien ?
     - Quelle est la différence entre `execv`, `execvp` et `execve` ? *(Indice : `man 3 exec`.)*
     - Combinez les acquis : modifiez `mysh.c` pour que la sortie de la commande exécutée soit **redirigée** vers un fichier `mysh.out`. *(Indice : avant l’`exec*`, faites `dup2` comme à l’exercice 10 du TP3.)*

!!! success "Félicitations"
    Vous venez d’implémenter le cœur de fonctionnement d’un shell Unix : `fork` + `exec` + `wait` + redirection via `dup2`. Toutes ces briques sont ce que `bash` lui-même fait en interne à chaque commande que vous tapez.

    > **Référence** : Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. Chapitres 24 (Process Creation), 27 (Program Execution), 26 (Monitoring Child Processes).

---

## Pour aller plus loin (lectures recommandées)

- *POSIX.1-2017, Base Specifications Issue 7* : <https://pubs.opengroup.org/onlinepubs/9699919799/>
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203. *(Référence canonique pour les exercices ⭐.)*
- Stevens, W. R., & Rago, S. A. (2013). *Advanced Programming in the UNIX Environment*, 3rd ed. Addison-Wesley. ISBN 978-0321637734.
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O’Reilly. ISBN 978-0596009656.
- Tanenbaum, A. S., & Bos, H. (2014). *Modern Operating Systems*, 4th ed. Pearson. ISBN 978-0133591620. *(Chapitre 2 — Processes and Threads.)*
