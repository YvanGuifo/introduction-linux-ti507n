---
title: TP1 - Premières commandes, navigation et gestion de fichiers
---

<!--
================================================================================
 TP1 — VERSION PILOTE — Année 2025–2026
 Auteur : Dr. Yvan GUIFO FODJO — EFREI Paris
 Construction : à partir du syllabus officiel (`syllabus-operating-system.md`,
 section "Introduction et prérequis") en l'absence du contenu de `tp1.md`
 année précédente. À comparer avec votre version existante.
================================================================================
-->

# TP1 — Premières commandes, navigation et gestion de fichiers

!!! objectifs "Objectifs pédagogiques (taxonomie de Bloom révisée)"
    À l’issue de ce TP, vous serez capable de :

    - **[Appliquer]** consulter le manuel d’une commande Linux avec `man` et interpréter son SYNOPSIS.
    - **[Appliquer]** vous déplacer dans l’arborescence du système de fichiers avec `pwd`, `cd`, `ls`.
    - **[Appliquer]** créer, copier, déplacer et supprimer des fichiers et répertoires avec `touch`, `mkdir`, `cp`, `mv`, `rm`.
    - **[Appliquer]** afficher et compter le contenu d’un fichier avec `cat`, `less`, `head`, `tail`, `wc`.
    - **[Analyser]** comparer le comportement de plusieurs commandes (ex. `cat` vs `less`) et choisir la plus appropriée.
    - **[Évaluer]** justifier le choix d’une option de commande (ex. `ls -l` vs `ls -a` vs `ls -lh`).

    > **Référence** : Anderson & Krathwohl (2001), *A Taxonomy for Learning, Teaching, and Assessing*. ISBN: 978-0801319037.

!!! tip "Prérequis"
    - Lecture préliminaire effectuée ([preliminary-reading](./preliminary-reading.md)).
    - Distribution Debian 12 installée ([installation-wsl](./installation-wsl.md)) **ou** session MarioNum active ([Intro-MarioNum](./Intro-MarioNum.md)).
    - Un terminal ouvert et le prompt visible (`$`).

!!! info "Conventions"
    - Le `$` en début de commande représente le prompt — ne le tapez pas.
    - Les sorties attendues sont précédées du symbole `→` dans le texte (mais jamais dans le terminal).
    - Notez vos réponses sur un fichier texte personnel (vous y reviendrez avant le CC S38).

!!! tip "Barème d’interprétation des exercices"
    > 📚 = Facile · 📚📚 = Moyenne · 📚📚📚 = Élevée
    >
    > ⭐ = **Exercice « groupe étoile »** : extension optionnelle vers les **appels système en C**.
    > Non requis pour les évaluations. Recommandé si vous terminez les autres exercices avant la fin de la séance.

!!! info "Alignement avec les évaluations (Biggs, 1996)"
    Les exercices 📚 et 📚📚 préparent au **CC S38** (QCM + commandes courtes).
    Les exercices 📚📚📚 préparent au **DE S42** (QCM).
    Les exercices ⭐ ne sont pas évalués mais préparent la suite (TP3, TP4).

---

## 1. Le manuel : `man`, le format d’une commande

!!! tip "Le manuel Linux (`man`)"
    `man` ouvre la page de manuel d’une commande. Toutes les pages suivent la même structure :

    - **NAME** : nom et description courte
    - **SYNOPSIS** : forme générale d’appel (avec ses arguments et options)
    - **DESCRIPTION** : explication détaillée
    - **OPTIONS** : liste des options
    - **EXAMPLES** : exemples d’usage (quand disponibles)
    - **SEE ALSO** : commandes liées

    Navigation dans une page : <kbd>↑</kbd>/<kbd>↓</kbd> ou <kbd>Space</kbd>/<kbd>b</kbd>, recherche avec <kbd>/</kbd>, sortie avec <kbd>q</kbd>.

!!! tip "Format général d’une commande Linux"
    ```bash
    $ commande [-options] [--option-longue] [arguments]
    ```
    - **options courtes** : un tiret + une lettre (`-l`, `-a`, `-h`).
    - **options longues** : deux tirets + un mot (`--help`, `--version`).
    - **options combinables** : `ls -l -a -h` ≡ `ls -lah`.
    - **arguments** : généralement des chemins de fichiers ou répertoires.

---

### Exercice 1 : Premier contact avec `man` 📚

1. Ouvrez la page de manuel de la commande `ls` :
   ```bash
   $ man ls
   ```
2. Naviguez dans la page avec <kbd>Space</kbd> (page suivante) et <kbd>b</kbd> (page précédente).
3. Recherchez le mot `human-readable` dans la page : tapez `/human-readable` puis <kbd>Entrée</kbd>.
4. Sortez du manuel avec <kbd>q</kbd>.
5. **Question** : à quoi correspond l’option `-h` de `ls` ? Recopiez la phrase exacte du manuel.

!!! star "⭐ Pour aller plus loin — Sections du manuel"
    Le manuel Linux est organisé en **sections numérotées** :

    | Section | Contenu |
    |---|---|
    | 1 | Commandes utilisateur (ex. `ls`, `grep`) |
    | 2 | Appels système (kernel) — ex. `open`, `read`, `fork` |
    | 3 | Bibliothèque C standard (libc) — ex. `printf`, `malloc` |
    | 5 | Formats de fichiers (ex. `/etc/passwd`) |
    | 8 | Administration système |

    1. Comparez `man 1 printf` et `man 3 printf`. Qu’observez-vous ?
    2. Lancez `man 2 open`. Cette page documente l’**appel système** `open()` que vous utiliserez en C dans les TP3 et TP4.

    > **Référence** : Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN: 978-1593272203.

---

## 2. Se repérer et se déplacer dans l’arborescence

!!! tip "Trois commandes essentielles"
    - `pwd` (*print working directory*) : affiche le chemin absolu du répertoire courant.
    - `cd <chemin>` (*change directory*) : se déplace dans `<chemin>`.
        - `cd` seul ≡ retour au répertoire personnel
        - `cd ..` ≡ remonter d’un niveau
        - `cd -` ≡ retour au répertoire précédent
    - `ls [<chemin>]` (*list*) : liste le contenu d’un répertoire.

!!! info "Chemins absolus vs relatifs"
    - **Absolu** : commence par `/` — ex. `/home/etudiant/cours`.
    - **Relatif** : ne commence pas par `/` — interprété depuis le répertoire courant.
    - **Notation `~`** : raccourci pour votre répertoire personnel.
    - **Notation `.`** : répertoire courant. **`..`** : répertoire parent.

---

### Exercice 2 : Exploration de l’arborescence 📚

1. Affichez votre répertoire courant : `pwd`. Notez le résultat.
2. Listez son contenu : `ls`.
3. Affichez le contenu de `/` : `ls /`. Identifiez les répertoires `bin`, `etc`, `home`, `usr`, `var`.
4. Comparez : `ls -l /etc`, `ls -a /etc`, `ls -lh /etc`.
5. **Question d’analyse** : quelle est la différence entre `ls -l` et `ls -a` ? Que combine `ls -la` ?

---

### Exercice 3 : Naviguer efficacement 📚📚

1. Depuis votre répertoire personnel, déplacez-vous successivement vers `/usr/share`, puis `/etc`, puis revenez avec `cd -`. Notez ce que fait `cd -`.
2. Créez l’arborescence suivante dans votre répertoire personnel :
   ```
   ~/ti307/
   ├── tp1/
   ├── tp2/
   └── notes/
   ```
   *(indice : `mkdir -p`)*
3. Déplacez-vous dans `~/ti307/tp1` puis affichez le chemin absolu.
4. Avec **un seul `cd`**, remontez à `~/ti307`. Trouvez deux manières différentes de le faire.
5. **Question** : `cd ./../tp2` et `cd ../tp2` produisent-ils le même résultat ? Justifiez.

!!! star "⭐ Pour aller plus loin — Premier programme C"
    Pour vous initier à la programmation système (cf. syllabus), créez `~/ti307/c/hello.c` :

    ```c
    #include <stdio.h>
    int main(int argc, char **argv) {
        printf("Hello, %s!\n", argc > 1 ? argv[1] : "world");
        return 0;
    }
    ```

    1. Compilez : `gcc -Wall -o hello hello.c`.
    2. Exécutez : `./hello` puis `./hello Yvan`.
    3. **Questions** :
        - Que représente `argc` ? Que contient `argv[0]` ?
        - Pourquoi compiler avec `-Wall` est-il une bonne pratique ?

    > **Référence** : Kernighan & Ritchie (1988), *The C Programming Language*, 2nd ed. ISBN: 978-0131103627.

---

## 3. Créer, copier, déplacer, supprimer

!!! tip "Manipulation de fichiers et répertoires"
    | Commande | Rôle | Exemple |
    |---|---|---|
    | `touch <fichier>` | crée un fichier vide (ou met à jour sa date) | `touch a.txt` |
    | `mkdir <rep>` | crée un répertoire | `mkdir docs` |
    | `mkdir -p a/b/c` | crée toute l’arborescence si besoin | `mkdir -p ~/x/y/z` |
    | `cp <src> <dst>` | copie un fichier | `cp a.txt b.txt` |
    | `cp -r <src> <dst>` | copie un répertoire récursivement | `cp -r docs/ backup/` |
    | `mv <src> <dst>` | déplace ou renomme | `mv a.txt notes.txt` |
    | `rm <fichier>` | supprime un fichier | `rm a.txt` |
    | `rm -r <rep>` | supprime un répertoire récursivement | `rm -r tmp/` |
    | `rmdir <rep>` | supprime un répertoire **vide** | `rmdir docs` |

!!! warning "Attention — `rm` est définitif"
    Sous Linux en ligne de commande, **il n’y a pas de corbeille**. `rm` supprime immédiatement.
    Avant d’utiliser `rm -r`, vérifiez toujours **où vous êtes** (`pwd`) et **ce que vous allez supprimer** (`ls`).

---

### Exercice 4 : Atelier création / suppression 📚📚

Dans `~/ti307/tp1`, réalisez la séquence suivante :

1. Créez trois fichiers vides : `note1.txt`, `note2.txt`, `note3.txt`.
2. Créez un sous-répertoire `archive/` et y déplacer `note1.txt`.
3. Copiez `note2.txt` dans `archive/` sous le nom `note2-copie.txt`.
4. Renommez `note3.txt` en `note-finale.txt`.
5. Listez le contenu de `~/ti307/tp1` et de `~/ti307/tp1/archive` pour vérifier.
6. **Question** : quelle commande permet de tout supprimer d’un coup ? Pourquoi est-elle dangereuse ?

!!! star "⭐ Pour aller plus loin — Codes de retour"
    Toute commande Unix renvoie un **code de retour** : `0` = succès, ≠ `0` = erreur.

    1. Exécutez `ls /` puis `echo $?`. Quel est le code retour ?
    2. Exécutez `ls /chemin/inexistant` puis `echo $?`. Que renvoie-t-on cette fois ?
    3. **Lien avec le C** : en C, `main()` renvoie `0` pour succès. Modifiez votre `hello.c` pour renvoyer `1` quand aucun argument n’est passé. Recompilez et vérifiez avec `echo $?`.

---

## 4. Lire et compter — `cat`, `less`, `head`, `tail`, `wc`

!!! tip "Cinq commandes pour explorer un fichier texte"
    - `cat <fichier>` : affiche tout le contenu d’un coup (utile pour les petits fichiers).
    - `less <fichier>` : affiche page par page (navigation comme `man` : <kbd>Space</kbd>, <kbd>b</kbd>, <kbd>/</kbd>, <kbd>q</kbd>).
    - `head <fichier>` : 10 premières lignes (option `-n N` pour N lignes).
    - `tail <fichier>` : 10 dernières lignes.
    - `wc <fichier>` : compte lignes, mots, caractères (options `-l`, `-w`, `-c`).

---

### Exercice 5 : Choisir la bonne commande 📚📚📚

Le fichier `/etc/passwd` contient la liste des comptes utilisateurs du système.

1. Affichez ses 5 premières lignes.
2. Affichez ses 3 dernières lignes.
3. Comptez son nombre total de lignes.
4. Ouvrez-le avec `less`, recherchez votre nom d’utilisateur avec `/` puis quittez.
5. **Question d’évaluation** : pour chacun des cas suivants, **quelle commande choisiriez-vous et pourquoi ?**
    - (a) lire un fichier de 8 lignes
    - (b) lire un fichier de 8 000 lignes
    - (c) savoir combien de lignes il contient
    - (d) voir les modifications les plus récentes d’un journal système

    *(Justifiez vos choix en 1 à 2 phrases par cas.)*

!!! info "Cet exercice est représentatif d’un item type DE S42 (QCM)."

!!! star "⭐ Pour aller plus loin — Lecture en C avec `read()`"
    Cet exercice anticipe le TP3.

    1. Lisez la page de manuel : `man 2 read`. Quel en-tête doit-on inclure ?
    2. Écrivez `~/ti307/c/show.c` qui lit `/etc/passwd` et écrit son contenu sur la sortie standard à l’aide des appels système `open()`, `read()`, `write()`, `close()`.

       Squelette de départ :
       ```c
       #include <fcntl.h>
       #include <unistd.h>
       #include <stdio.h>

       int main(void) {
           int fd = open("/etc/passwd", O_RDONLY);
           if (fd < 0) { perror("open"); return 1; }

           char buf[1024];
           ssize_t n;
           while ((n = read(fd, buf, sizeof buf)) > 0) {
               write(1, buf, n);  /* 1 = STDOUT_FILENO */
           }
           close(fd);
           return 0;
       }
       ```
    3. Compilez et exécutez. Comparez avec `cat /etc/passwd`.
    4. **Question** : à quoi sert `perror` ? *(Indice : `man 3 perror`.)*

    > **Référence** : Kerrisk (2010), *The Linux Programming Interface*, chap. 4 (File I/O). ISBN: 978-1593272203.

---

## Synthèse — Ce que vous devez savoir faire

!!! success "Auto-évaluation rapide"
    Avant de quitter la séance, vérifiez que vous savez :

    - [ ] Ouvrir, naviguer et quitter une page `man`
    - [ ] Distinguer chemin absolu et chemin relatif
    - [ ] Créer une arborescence avec `mkdir -p`
    - [ ] Copier, déplacer, renommer et supprimer fichiers et répertoires
    - [ ] Choisir entre `cat`, `less`, `head`, `tail` selon la taille et l’objectif
    - [ ] Compter lignes et mots avec `wc`
    - [ ] *(⭐)* Compiler un programme C minimal avec `gcc` et expliquer `argc`/`argv`
    - [ ] *(⭐)* Lire la page `man 2 open` et `man 2 read`

    Si un item n’est pas coché, **revenez sur l’exercice correspondant** avant le TP2.

---

## Pour aller plus loin

- *Debian Reference* : <https://www.debian.org/doc/manuals/debian-reference/>
- *The Linux Documentation Project* : <https://tldp.org/>
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O’Reilly. ISBN: 978-0596009656.
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN: 978-1593272203.
  *(Référence canonique pour les exercices ⭐.)*
- Kernighan, B. W., & Ritchie, D. M. (1988). *The C Programming Language*, 2nd ed. ISBN: 978-0131103627.
