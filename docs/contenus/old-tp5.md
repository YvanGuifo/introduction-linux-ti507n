---
title: TP5 - Processus, et autres commandes
---

# TP5 - Processus

!!! info "Instructions"

    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` (si elle est disponible) pour savoir ce qu'elle fait.
    - N'hésitez pas à reconsulter les anciens TP pour vous aider.
    - Les exercices 1, 2, 3 et 4 sont **obligatoires**. Le reste est optionnel, mais à finir si vous avez le temps.

!!! warning "Dernière séance"
    Comme il s'agit de la dernière séance du module, prennez le temps de répondre au questionnaire d'évaluation du cours :) N'hésitez pas à nous faire part de ce que vous avez trouvé de bien et de moins bien. Vos réponses sont anonymes et nous permettront d'améliorer le cours pour les prochaines années. Merci d'avance !

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

### Exercice 1 - Visualisation des processus
1. Testez les commandes suivantes et observez leurs résultats. Aidez-vous de `man ps` pour comprendre les options utilisées.
    ```bash
    $ ps
    $ ps -f
    $ ps -u
    $ ps -T
    $ ps -e
    $ ps -U root
    ```
2. La commande `ps` retourne la liste des processus en cours d'exécution. Cette liste contient quatre colonnes par défaut.
    
    !!! info "Informations de la commande `ps`"
        - La première colonne correspond au *PID* (Process IDentifier) du processus.
        - La deuxième colonne correspond au *TTY* (TeleTYpewriter) sur lequel le processus est lancé. C'est le type de terminal utilisé pour lancer le processus. Ici `pts/1` (pseudo-terminal slave) signifie que le processus a été lancé dans un pseudo-terminal. Le chiffre renseigné correspond au numéro du terminal (par exemple si vous avez plusieurs instances du terminal ouverts).
        - La troisième colonne correspond au *TIME* (temps) d'exécution du processus.
        - La quatrième colonne correspond à la *CMD* (CoMmanDe) qui a lancé le processus.
  
3. La sortie standard de la commande `ps` peut être redirigée. En utilisant la commande `grep` et/ou `wc` :

    - Affichez le nombre de processus lancés par l'utilisateur courant.
    - Affichez le nombre de processus lancés par l'utilisateur `root`.
    - Affichez les nombre de processus lancés par l'utilisateur courant et dont la commande est `bash`.

4. (Optionnel) La commande `top` permet d'afficher les processus en cours d'exécution. Une fois lancée, elle s'exécute en continu et affiche les processus en temps réel. La touche `h` permet d'afficher l'aide et de visualiser les fonctionnalités disponible, la touche `q` permet de quitter `top`. Testez la commande `top`, afficher l'aide puis:
    - Filtrer les processus en cours d'exécution pour n'afficher que ceux lancés par l'utilisateur courant.
    - Filtrer les processus en cours d'exécution pour n'afficher que ceux lancés par l'utilisateur `root`.
    - Filtrer les processus en cours d'exécution pour n'afficher que ceux dont la commande est `bash`.

### Exercice 2 - Processus et tâches
1. Dans cet exercice nous allons simuler l'exécution d'un processus long. Pour cela, nous allons utiliser la commande `sleep` qui permet de mettre en pause l'exécution d'un script pendant un certain temps. Tapez la commande `sleep 10` et observez ce qu'il se passe.
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

3. Créer un ficher `gros_processus` dont le contenu est le suivant:
    ```bash
    #!/bin/bash
    sleep 120
    echo 'Terminé'
    ```
4. Modifier les droits du fichier `gros_processus` pour qu'il soit exécutable. Puis exécutez les commandes suivantes et observez attentivement les résultats:
    ```bash
    $ ./gros_processus 1
    $ C-z
    $ ./gros_processus 2 &
    $ jobs
    $ jobs -p
    $ ps
    $ fg %1
    $ C-z
    $ bg %1
    $ jobs
    $ fg %2
    $ C-z
    $ bg %2 # puis attendre que les processus se terminent
    $ jobs
    ```
    - Quels procédés permettent de placer un processus en arrière-plan ? et en avant-plan ?
    - Quelle différence remarquez-vous entre `./gros_processus 1` puis `C-z` et directement `./gros_processus 2 &` ? (À part 1 et 2 bien-sûr) ?
    - À quoi sert l'option `-p` de la commande `jobs` ?
    - Sans passer par `help bg`, pouvez-vous deviner ce que fait les commandes `bg %1` et `bg %2`? et la commande `bg` de manière générale ?
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

### Exercice 3 - La commande `kill`
1. Tapez la commande `kill -L` et notez les numéros associés aux signaux `SIGINT`, `SIGTSTP`, `SIGCONT`, `SIGTERM` et `SIGKILL`.
2. Reprenez ensuite le script `gros_processus` de l'exercice précédent et testez les commandes suivantes. Et commentez les résultats.
```bash
$ ./gros_processus 1 & # ce sera notre processus 1
$ ./gros_processus 2 & # ce sera notre processus 2
$ ./gros_processus 3 & # ce sera notre processus 3
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
3. Selon vous quel est la différence entre `SIGINT` et `SIGTSTP` ? et entre `SIGTSTP` et `SIGTERM` ?
4. D'après vos observations sur les résultats de la question 2, de combien de manière différente peut-on utiliser la commande `kill` pour arriver au même résultat ?
---

## Autres commandes

### Exercice 4 - Archiver des fichiers et extraire des archives
!!! tip "Compression de fichiers et archivage"
    Archiver un ensemble de fichiers consiste à les regrouper dans un seul fichier. Cela permet de les stocker ou de les transférer plus facilement. Tandis que compresser un fichier consiste à réduire sa taille en supprimant les informations redondantes. Cela permet de gagner de l'espace de stockage et éventuellement de réduire le temps de transfert.

    Ces deux procédés vont souvent de paire. En effet, on va souvent compresser un fichier avant de l'archiver. Il existe plusieurs outils pour compresser et archiver des fichiers.

    - `gzip` (*GNU zip*): permet de compresser un fichier et dont les fichiers ont l'extension `.gz`.
    - `bzip2` (*block-sorting zip*): permet de compresser un fichier et dont les fichiers ont l'extension `.bz2`.
    - `zip`: permet de compresser et d'archiver un ensemble de fichiers et dont les fichiers ont l'extension `.zip` (format standard des archives Windows)
    - `tar` (*tape archive*): permet d'archiver un ensemble de fichiers et dont les fichiers ont l'extension `.tar`.

    On décompresse ensuite un fichier en fonction de son format de compréssion et d'archivage. 
    
    - `gunzip` : permet de décompresser un fichier compressé avec `gzip`.
    - `bunzip2` : permet de décompresser un fichier compressé avec `bzip2`.
    - `unzip` : permet de décompresser et d'extraire un fichier archivé avec `zip`.
  
    !!! warning "Remarque"
        `tar` permet à la fois la compression et l'archivage
        
        - L'option `-c` de `tar` permet de créer une archive.
        - L'option `-x` de `tar` permet d'extraire une archive.
        - L'option `-f` de `tar` permet de spécifier le nom de l'archive.


1. Dans un répertoire `dir` créer l'arborescence suivante :
```bash
dir
├── files
│   ├── file-a.md
│   ├── file-b.md
│   ├── file-c.md
│   ├── file-d.md
│   └── file-e.md
└── imgs
    ├── img001.png
    ├── img002.png
    ├── img003.png
    ├── img004.png
    └── img005.png
```
1. On se place dans le répertoire `dir`. Tapez ensuite la commande suivante pour créer une archive `files.tar` contenant les fichiers du répertoire `files`:
```bash
$ tar -cvf files.tar files
```
    Listez ensuite les fichiers de `dir`.
1. Toujours dans `dir`. Tapez la commande suivante pour créer une archive `imgs.tar` contenant les images du répertoire `imgs`:
```bash
$ tar -cf imgs.tar imgs
```
    Listez ensuite les fichiers de `dir`.
1. Que pouvez vous dire sur l'option `-v` de `tar` ?
2. Déplacer vous ensuite dans le répertoire parent de `dir` et tapez les commandes suivantes:
```bash
$ tar -czvf dir.tar.gz dir
$ ls
$ gunzip dir.tar.gz
$ ls
$ tar -xvf dir.tar
```
    - Après la commande `gunzip`, qu'est devenu le fichier `dir.tar.gz` ?
    - Selon vous à quoi sert l'option `-z` de tar ?

---

### Exercice 5 - Un aperçu de `vim`
!!! tip "Un éditeur de texte dans la console"
    `vim`  est un éditeur de texte en mode console. Il permet de créer, modifier et visualiser des fichiers textes. Il est très puissant et très utilisé par les développeurs. Il est très complet et possède de nombreuses fonctionnalités. Il est donc assez difficile de le maîtriser. Nous allons voir quelques commandes de base pour pouvoir l'utiliser.

    Dans `vim` il existe plusieurs *modes* (il est renseigné en bas à gauche de la fenêtre):
    
    - Le mode *normal* : c'est le mode par défaut. Il permet de naviguer dans le fichier, de copier, coller, supprimer, etc.
    - Le mode *insertion* : il permet d'insérer du texte dans le fichier.
    - Le mode *commande* : il permet d'entrer des commandes pour effectuer des actions sur le fichier.

    De manière générale, pour revenir dans le mode *normal* il faut appuyer sur la touche `ESC`.
    
    - Pour passer du mode *normal* au mode *insertion* il faut appuyer sur la touche `i`.  
    - Pour passer du mode *normal* au mode *commande* il faut appuyer sur la touche `:`. 

    En mode *commande*, nous allons voir ensemble quelques commandes de base:
    
    - `:q` : quitter `vim`.
    - `:w` : enregistrer le fichier.
    - `:wq` : enregistrer le fichier et quitter `vim`.
    - `:q!` : quitter `vim` sans enregistrer le fichier.

    Si vous voulez en apprendre plus, vous pouvez faire un tour [ici](https://vim-adventures.com/) et [ici](http://www.vimgenius.com/).

---
1. Tapez la commande `vim hellovim` pour créer un fichier `hellovim` avec `vim`.
2. Une fois dans l'éditeur, passer en mode insertion en tapant sur la touche `i`. Puis écrivez le texte suivant:
    ```
    Hello vim !
    ```
3. Revenez en mode normal en appuyant sur la touche `ESC`. Puis enregistrez le fichier en tapant `:w` et quittez `vim` en tapant `:q`.
4. Affichez ensuite le contenu de `hellovim` avec la commande `cat`.

---

### Exercice 6 - Compiler et exécuter un programme C
!!! tip "Le compilateur C de Linux"
    `gcc` est le compilateur C de Linux. Il permet de compiler du code C. Il est très utilisé par les développeurs. Il est très complet et possède de nombreuses fonctionnalités. Nous allons voir un aperçu de son utilisation.

    La compilation d'un programme en C passe par plusieurs étapes, qui sont essentiellement les suivantes:
    
    - La précompilation : elle permet de transformer le code source en un code intermédiaire.
    - La compilation : elle permet de transformer le code intermédiaire en code machine.
    - L'édition des liens : elle permet de lier le code machine avec les bibliothèques utilisées.
    - La création de l'exécutable : elle permet de créer l'exécutable.
  
1. Créer un fichier `hello.c` dont le contenu est le suivant:
    ```c
    #include <stdio.h>

    int main()
    {
        printf("Hello world !\n");
        return 0;
    }
    ```
2. Placez-vous ensuite dans le répertoire contenant votre fichier `hello.c` et tapez la commande `gcc hello.c`. Cette commande va compiler votre programme et créer un fichier `a.out` qui est l'exécutable de votre programme. Tapez enfin la commande `./a.out` pour exécuter votre programme.
    
    !!! warning "Attention"
        - Si vous avez déjà un fichier `a.out` dans votre répertoire, il sera écrasé par la commande `gcc hello.c`.
        - `a.out` est le nom par défaut de l'exécutable créé par `gcc`. Vous pouvez changer ce nom en utilisant l'option `-o` de `gcc`. Par exemple, `gcc hello.c -o hello` va créer un exécutable `hello` au lieu de `a.out`.

3. Récupérez ensuite cette archive [hello.tar.gz](../assets/files/hello.tar.gz).
4. Extraire les fichiers de cet archive et déplacez vos dans le répertoire `hello`.
5. Tapez la commande 
```bash
$ gcc main.c hello.c -o run
```
pour compiler votre programme. Cette commande va compiler votre programme et créer un fichier `run` qui est l'exécutable de votre programme. Exécutez enfin votre programme avec la commande `./run`. 
6. Supprimer le fichier `run` et modifier ensuite le fichier `hello.c` de tel sorte à avoir volontairement une erreur : supprimer l'accolade fermante de la fonction `void hello()`. Réexécutez ensuite les commandes de la question 5. Que remarquez-vous ?
7. Remodifier ensuite le fichier `hello.c` en remettant l'accolade fermante mais rajouter un `return 1` dans la définition de la fonction (avant l'accolade fermante). Réexécutez ensuite les commandes de la question 5. Que remarquez-vous ?
8. Conclure sur la gestion des erreurs et des warnings sur `gcc`.
 
--- 

### Exercice 7 - La commande `trap`
!!! tip "Intercepter les signaux"

    La commande `trap` permet d'intercepter les signaux envoyés à un processus. Elle permet donc de définir des actions à effectuer lorsqu'un signal est envoyé à un processus. Sa syntaxe est la suivante:
    ```bash 
    trap 'commande1;commande2;...' signal1 signal2 ...
    ```
    Ici `commande1;commande2;...` est la lite des *actions* à effectuer à la réception du ou des signaux de la liste `signal1 signal2 ...`.

    À la réception d'un `SIGINT`, par exemple, on voudrait terminer proprement notre processus. On peut dans ce cas désallouer toutes les ressources avant de terminer notre processus. (Ça s'appelle un *graceful shutdown*).

1. Créer un fichier `graceful_shutdown` dont le contenu est le suivant:
```bash
#!/bin/bash

function cmd1()
{
    echo
    echo "Ok, c'est bon je m'arrête..." 
} 

function cmd2()
{
    echo
    echo "...mais dans la grâce" 
}

trap 'cmd1;cmd2;exit' SIGINT SIGTERM

while true
do
    echo "Personne ne peut m'arrêter"
    sleep 10
done
```
2. Faîtes en sorte que le fichier `graceful_shutdown` soit exécutable puis exécutez-le.
3. Tapez ensuite les commandes suivantes et commentez les résultats:
```bash
$ ./graceful_shutdown
$ C-c
```
4. À votre avis, que fait la commande `exit` ?
5. Relancez le script `graceful_shutdown` mais cette fois-ci en arrière-plan. Puis tapez les commandes suivantes et commentez les résultats:
```bash
$ ./graceful_shutdown &
$ C-c
```
    - Que remarquez-vous ? Dès que vous avez la main sur le terminal envoyer un `SIGTERM` au processus `graceful_shutdown`.
    - Quelle conclusion pouvez-vous tirer sur `C-c` et les processus en arrière plan ?
---