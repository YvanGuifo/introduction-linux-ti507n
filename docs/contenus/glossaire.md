---
title: Glossaire
---

# Glossaire des termes techniques

!!! tip "Utilisation"
    Utilisez <kbd>Ctrl+F</kbd> pour rechercher un terme. Chaque définition renvoie au TP où le concept est abordé.

---

## A

Alias
:   Raccourci défini par l'utilisateur pour remplacer une commande longue ou fréquente. Exemple : `alias ll='ls -la'`. Les alias sont définis dans le shell courant ou dans `~/.bashrc` pour les rendre persistants.
:   → Voir [TP3](./tp3.md)

Arborescence
:   Structure hiérarchique du système de fichiers Linux, organisée en arbre à partir de la racine `/`. Chaque nœud est un répertoire pouvant contenir des fichiers ou d'autres répertoires.
:   → Voir [TP1](./tp1.md)

Argument
:   Mot passé à une commande après son nom. Par exemple dans `cp fichier.txt copie.txt`, les deux noms de fichiers sont des arguments de la commande `cp`.
:   → Voir [TP1](./tp1.md)

## B

Bash
:   **B**ourne **A**gain **Sh**ell. Interpréteur de commandes par défaut sur la plupart des distributions Linux. C'est un sur-ensemble du shell Bourne (`sh`) original, avec des fonctionnalités supplémentaires comme l'historique et l'auto-complétion.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

Bit setgid
:   Bit spécial (permission `s` sur le groupe) qui, appliqué à un répertoire, force les nouveaux fichiers créés à hériter du groupe du répertoire plutôt que du groupe primaire de l'utilisateur.
:   → Voir [TP2](./tp2.md)

Bit setuid
:   Bit spécial (permission `s` sur le propriétaire) qui permet à un exécutable de s'exécuter avec les droits de son propriétaire, et non ceux de l'utilisateur qui le lance. Exemple : `/usr/bin/passwd`.
:   → Voir [TP2](./tp2.md)

Bit sticky
:   Bit spécial (permission `t`) appliqué aux répertoires partagés comme `/tmp` : seul le propriétaire d'un fichier (ou root) peut le supprimer, même si les autres ont le droit d'écriture dans le répertoire.
:   → Voir [TP2](./tp2.md)

## C

Canal standard
:   Les trois flux d'entrée/sortie associés à chaque processus : **stdin** (entrée, fd 0), **stdout** (sortie, fd 1) et **stderr** (erreurs, fd 2). Ils peuvent être redirigés vers des fichiers ou connectés entre processus via des tubes.
:   → Voir [TP4](./tp4.md)

Chemin absolu
:   Chemin qui commence par `/` (la racine) et décrit la position complète d'un fichier dans l'arborescence. Exemple : `/home/user/Documents/fichier.txt`.
:   → Voir [TP1](./tp1.md)

Chemin relatif
:   Chemin exprimé par rapport au répertoire courant (`pwd`). Utilise `.` (répertoire courant) et `..` (répertoire parent). Exemple : `../Documents/fichier.txt`.
:   → Voir [TP1](./tp1.md)

Commande interne (built-in)
:   Commande exécutée directement par le shell, sans lancer de processus séparé. Exemples : `cd`, `echo`, `export`, `alias`. On les identifie avec `type commande`.
:   → Voir [TP1](./tp1.md)

Commande externe
:   Programme stocké sur le disque et exécuté dans un processus fils. Le shell le localise via le `$PATH`. Exemples : `ls`, `grep`, `gcc`.
:   → Voir [TP1](./tp1.md)

Compilation
:   Transformation d'un code source (ex. C) en un fichier exécutable binaire. Sous Linux, on utilise typiquement `gcc` (GNU Compiler Collection).
:   → Voir [TP3](./tp3.md)

Core dump
:   Fichier image de la mémoire d'un processus au moment de sa terminaison anormale. Produit notamment par le signal `SIGQUIT` (3). Utile pour le débogage post-mortem.
:   → Voir [TP4](./tp4.md)

## D

Daemon (démon)
:   Processus qui s'exécute en arrière-plan, sans terminal associé, et fournit un service système. Exemples : `sshd` (SSH), `cron` (tâches planifiées), `systemd` (init). Le nom vient de la mythologie grecque (esprit intermédiaire).
:   → Voir [TP4](./tp4.md)

Distribution
:   Ensemble cohérent composé du noyau Linux, d'outils GNU, d'un gestionnaire de paquets et de logiciels supplémentaires. Exemples : Debian, Ubuntu, Fedora, Arch Linux.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

## E

EOF (End Of File)
:   Marqueur de fin de fichier. Au terminal, on le produit avec <kbd>Ctrl+D</kbd>. Il indique au programme qu'il n'y a plus de données à lire sur l'entrée standard.
:   → Voir [TP1](./tp1.md)

Expansion d'accolades
:   Mécanisme du shell qui génère plusieurs chaînes à partir d'un motif. Exemple : `fichier{1,2,3}.txt` produit `fichier1.txt fichier2.txt fichier3.txt`. Évaluée avant le globbing.
:   → Voir [TP3](./tp3.md)

## F

Fichier caché
:   Fichier dont le nom commence par un point (`.`). Non affiché par `ls` sauf avec l'option `-a`. Conventions courantes : `.bashrc`, `.profile`, `.ssh/`.
:   → Voir [TP1](./tp1.md)

File descriptor (fd)
:   Entier positif utilisé par le noyau pour identifier un fichier ouvert par un processus. Les trois premiers sont réservés : 0 (stdin), 1 (stdout), 2 (stderr).
:   → Voir [TP4](./tp4.md)

## G

GCC
:   **G**NU **C**ompiler **C**ollection. Compilateur libre pour C, C++ et d'autres langages. Commande de base : `gcc -o programme source.c`.
:   → Voir [TP3](./tp3.md)

Globbing
:   Expansion des jokers (`*`, `?`, `[...]`) par le shell pour correspondre à des noms de fichiers. Le globbing est effectué par le shell **avant** l'exécution de la commande.
:   → Voir [TP1](./tp1.md)

GNU
:   **G**NU's **N**ot **U**nix. Projet lancé par Richard Stallman en 1983 pour créer un système d'exploitation entièrement libre. Les outils GNU (bash, coreutils, gcc…) combinés au noyau Linux forment GNU/Linux.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

GRUB
:   **GR**and **U**nified **B**ootloader. Chargeur d'amorçage qui permet de choisir le système d'exploitation au démarrage.
:   → Voir [Installation](./installation-wsl.md)

## I

Inode
:   Structure de données du système de fichiers qui stocke les métadonnées d'un fichier : permissions, propriétaire, taille, dates, emplacements des blocs de données. Chaque fichier possède un numéro d'inode unique (visible avec `ls -i`). Le nom du fichier n'est **pas** stocké dans l'inode mais dans le répertoire.
:   → Voir [TP2](./tp2.md)

Inhibition (quoting)
:   Mécanisme qui empêche le shell d'interpréter les caractères spéciaux. Trois niveaux : `\` (un caractère), `'...'` (tout), `"..."` (tout sauf `$`, `` ` ``, `\`).
:   → Voir [TP3](./tp3.md)

## J

Job
:   Tâche gérée par le shell. Un job peut être au premier plan (foreground) ou en arrière-plan (background). On les gère avec `jobs`, `fg`, `bg` et <kbd>Ctrl+Z</kbd>.
:   → Voir [TP4](./tp4.md)

Joker (wildcard)
:   Caractère spécial interprété par le shell pour matcher des noms de fichiers. `*` = n'importe quelle chaîne, `?` = un caractère, `[abc]` = un parmi a, b, c.
:   → Voir [TP1](./tp1.md)

## K

Kernel (noyau)
:   Cœur du système d'exploitation. Le noyau Linux gère la mémoire, les processus, les pilotes matériels et les appels système. Créé par Linus Torvalds en 1991.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

## L

Lien physique (hard link)
:   Entrée de répertoire qui pointe directement vers l'inode d'un fichier. Plusieurs liens physiques peuvent pointer vers le même inode. Le fichier n'est supprimé que lorsque le dernier lien est effacé. Créé avec `ln`.
:   → Voir [TP2](./tp2.md)

Lien symbolique (symlink)
:   Fichier spécial qui contient le chemin vers un autre fichier ou répertoire. Similaire à un raccourci. Créé avec `ln -s`. Peut pointer vers une cible inexistante (lien cassé).
:   → Voir [TP2](./tp2.md)

## M

Man page
:   Page de manuel accessible avec la commande `man`. Documentation standard des commandes Unix/Linux, organisée en sections (1 = commandes utilisateur, 5 = formats de fichiers, 8 = administration…).
:   → Voir [TP1](./tp1.md)

## N

Noyau
:   Voir **Kernel**.

## O

Option
:   Modificateur du comportement d'une commande, généralement précédé de `-` (forme courte) ou `--` (forme longue). Exemple : `ls -l` (forme courte), `ls --all` (forme longue).
:   → Voir [TP1](./tp1.md)

## P

PATH
:   Variable d'environnement contenant la liste des répertoires (séparés par `:`) dans lesquels le shell recherche les commandes externes. Modifiable avec `export PATH=$PATH:/nouveau/chemin`.
:   → Voir [TP2](./tp2.md), [TP3](./tp3.md)

Permission
:   Droit d'accès associé à un fichier ou répertoire. Trois types : lecture (`r`), écriture (`w`), exécution (`x`). Trois catégories : propriétaire (`u`), groupe (`g`), autres (`o`). Modifiées avec `chmod`.
:   → Voir [TP2](./tp2.md)

PID (Process ID)
:   Identifiant numérique unique attribué par le noyau à chaque processus en cours d'exécution. Le processus `init`/`systemd` a toujours le PID 1. Visible avec `ps` ou `top`.
:   → Voir [TP4](./tp4.md)

Pipe (tube)
:   Mécanisme de communication inter-processus qui connecte la sortie standard d'une commande à l'entrée standard de la suivante. Syntaxe : `commande1 | commande2`.
:   → Voir [TP4](./tp4.md)

Processus
:   Instance d'un programme en cours d'exécution. Chaque processus possède un PID, un espace mémoire propre, des descripteurs de fichiers et un processus parent (PPID).
:   → Voir [TP4](./tp4.md)

Prompt
:   Invite de commande affichée par le shell pour signaler qu'il attend une saisie. Typiquement `$` pour un utilisateur normal et `#` pour root. Personnalisable via la variable `$PS1`.
:   → Voir [TP1](./tp1.md)

## R

Racine (root `/`)
:   Sommet de l'arborescence du système de fichiers Linux. Tous les fichiers et répertoires en descendent. À ne pas confondre avec `/root` (répertoire personnel du super-utilisateur) ni avec l'utilisateur `root`.
:   → Voir [TP1](./tp1.md)

Redirection
:   Mécanisme qui permet de rediriger les flux d'entrée/sortie d'une commande vers des fichiers. Syntaxe : `>` (écraser), `>>` (ajouter), `<` (lire depuis), `2>` (stderr).
:   → Voir [TP4](./tp4.md)

Root (super-utilisateur)
:   Compte administrateur avec tous les droits sur le système (UID 0). Les commandes nécessitant des privilèges sont exécutées via `sudo`.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

## S

Shell
:   Interpréteur de commandes qui fait l'interface entre l'utilisateur et le noyau. Le shell lit les commandes, les interprète (expansion, substitution, globbing) et les exécute. Bash est le shell par défaut sur la plupart des distributions.
:   → Voir [Lecture préliminaire](./preliminary-reading.md)

Signal
:   Notification asynchrone envoyée à un processus pour lui demander une action. Exemples : `SIGTERM` (15) = terminaison propre, `SIGKILL` (9) = terminaison forcée, `SIGINT` (2) = interruption via <kbd>Ctrl+C</kbd>.
:   → Voir [TP4](./tp4.md)

Stderr
:   Sortie d'erreur standard (file descriptor 2). Flux dédié aux messages d'erreur. Par défaut, affiché à l'écran comme stdout mais redirigeable séparément avec `2>`.
:   → Voir [TP4](./tp4.md)

Stdin
:   Entrée standard (file descriptor 0). Par défaut, le clavier. Peut être redirigée depuis un fichier avec `<` ou alimentée par un tube.
:   → Voir [TP4](./tp4.md)

Stdout
:   Sortie standard (file descriptor 1). Par défaut, l'écran du terminal. Peut être redirigée vers un fichier avec `>` ou `>>`, ou connectée à un tube.
:   → Voir [TP4](./tp4.md)

Substitution de commande
:   Mécanisme qui exécute une commande et remplace l'expression par sa sortie. Syntaxe moderne : `$(commande)`. Ancienne syntaxe : `` `commande` ``.
:   → Voir [TP3](./tp3.md)

## T

Terminal
:   Interface textuelle permettant d'interagir avec le shell. Un émulateur de terminal (GNOME Terminal, xterm, Konsole…) émule le comportement d'un terminal physique.
:   → Voir [TP1](./tp1.md)

## U

Umask
:   Masque de création de fichiers qui définit les permissions retirées par défaut lors de la création d'un fichier ou répertoire. Exemple : `umask 022` retire l'écriture pour le groupe et les autres.
:   → Voir [TP2](./tp2.md)

## V

Variable d'environnement
:   Variable transmise aux processus fils. Définie avec `export`. Les variables d'environnement configurent le comportement du shell et des programmes (ex. `$PATH`, `$HOME`, `$LANG`).
:   → Voir [TP3](./tp3.md)

Variable shell
:   Variable locale au shell courant, non transmise aux processus fils. Définie par simple affectation : `MA_VAR="valeur"`. Devient une variable d'environnement avec `export`.
:   → Voir [TP3](./tp3.md)
