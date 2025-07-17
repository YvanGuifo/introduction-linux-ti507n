---
title: TP2 - Système de fichiers et permissions
---

# TP2 - Système de fichiers et permissions

!!! objectifs "Objectifs pédagogiques"

    À l’issue de ce TP, l’étudiant sera capable de :
    
    - Comprendre la structure du système de fichiers Linux (hiérarchie, répertoires standards)
    - Identifier les utilisateurs, groupes et fichiers système (`/etc/passwd`, `id`)
    - Lire et interpréter les permissions en notation symbolique et octale
    - Modifier les permissions avec `chmod`
    - Manipuler les fichiers et répertoires en tenant compte des droits d'accès
    - Comprendre la différence entre permissions sur    fichiers et sur répertoires
    - Expérimenter les effets du `PATH` sur la résolution des commandes
    - Identifier les permissions nécessaires à l’exécution d’une commande
    - Comprendre et manipuler le mécanisme de `umask`




!!! info "Instructions"
    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` (si elle est disponible) pour savoir ce qu'elle fait.


!!! tip "Barème d’interprétation des exercices"

    > 📚 = Facile, 📚📚 = Moyenne, 📚📚📚 = Élevée  


## Système de fichiers

!!! tip "Le système de fichiers Linux"

    Le système de fichiers Linux est une *arborescence* ou une *hiérarchie* de fichiers et de répertoires. Le répertoire racine est `/` et tous les autres répertoires sont des sous-répertoires de celui-ci. Les répertoires sont séparés par des `/` et les fichiers sont des noms de fichiers. 
    
    Quand vous lancez un shell (i.e. ouvrez un terminal), celui-ci se trouve *dans* un répertoire. Ce répertoire est appelé votre *répertoire courant* ou *répertoire de travail*. 

    Un système Linux typique comporte des dixaines de milliers de répertoires système et de fichiers. La plupart de ces répertoires et fichiers sont cachés et ne sont pas visibles par défaut. Ces fichiers et répertoires cachés sont utilisés par le système d'exploitation pour stocker des informations de configuration et d'autres informations système.

    Les sous-répertoires de la racine sont généralement réservés aux fichiers système. Les répertoires `/home` et `/tmp` sont utilisés pour stocker des fichiers temporaires et des fichiers personnels.

    À moins d'être un administrateur système, vous n'avez pas besoin de vous soucier de la plupart des fichiers et répertoires système. Toutefois il est important de comprendre comment les répertoires et les fichiers sont organisés afin de pouvoir naviguer dans le système de fichiers et de pouvoir trouver les fichiers dont vous avez besoin.

    Le tableau suivant décrit le contenu des principaux répertoires du système de fichiers Linux.

    | Répertoire | Description |
    ------------ | -------------
    | `/` | Répertoire racine. Tous les autres répertoires sont des sous-répertoires de celui-ci. |
    | `/bin` | Contient les programmes essentiels au fonctionnement du système. |
    | `/boot` | Contient les fichiers nécessaires au démarrage du système. |
    | `/dev` | Contient les fichiers représentant les périphériques. |
    | `/etc` | Contient les fichiers de configuration du système. |
    | `/home` | Contient les répertoires personnels des utilisateurs. |
    | `/lib` | Contient les bibliothèques partagées et les modules du noyau. |
    | `/media` | Contient les points de montage des périphériques amovibles. |
    | `/mnt` | Contient les points de montage des systèmes de fichiers temporaires. |
    | `/opt` | Contient les logiciels additionnels. |
    | `/proc` | Contient les informations sur les processus et le système. |
    | `/root` | Répertoire personnel de l'administrateur. |
    | `/run` | Contient les fichiers d'exécution des applications. |
    | `/sbin` | Contient les programmes essentiels au fonctionnement du système. |
    | `/srv` | Contient les données des services fournis par le système. |
    | `/sys` | Contient les informations sur les périphériques. |
    | `/tmp` | Contient les fichiers temporaires. |
    | `/usr` | Contient les programmes, les bibliothèques et les fichiers de configuration. |
    | `/var` | Contient les fichiers variables comme les logs, les mails, les bases de données, etc. |
    | `/lost+found` | Contient les fichiers récupérés lors d'un crash du système. |

---

### Exercice 1 : `id` et `/etc/passwd` 📚

1. Entrez les commandes suivantes dans un terminal et notez les résultats :
   ```bash
   $ id
   ```
2. Ensuite tapez la même commande, mais cette fois-ci avec l'argument `root`, notez les résultats.
   ```bash
   $ id root
   ```
3. Affichez ensuite le contenu du fichier `/etc/passwd` avec la commande `cat`. 
4. Recherchez les lignes où apparaîssent votre nom d'utilisateur et celui de l'utilisateur `root`. Quelles sont les différences ?
5. Pouvez-vous déduire à quoi sert le fichier `/etc/passwd` ?

## Permissions associées aux fichiers

!!! tip "Protection des fichiers"
    
    Un système Linux peut permettre à de nombreux utilisateurs d'accéder aux fichiers et aux répertoires. Pour protéger les fichiers et les répertoires, Linux utilise un système de permissions. Les permissions sont des droits d'accès aux fichiers et aux répertoires. Les permissions sont associées à des utilisateurs et à des groupes. Les utilisateurs sont des personnes qui ont un compte sur le système.

    Pour les fichiers normaux, les permissions sont associées à trois catégories d'utilisateurs : le propriétaire du fichier (généralement celui qui a crée le fichier), le groupe propriétaire du fichier et les autres utilisateurs. 
    
    Les catégories de permissions pour un fichier sont les suivantes :
      
      - **read** `r`: permet de lire le contenu du fichier.
      - **write** `w`: permet de modifier le contenu du fichier.
      - **execute** `x`: permet d'exécuter le fichier (si c'est un programme ou un script).

    L'option `-l` de la commande `ls` affiche les méta-données associées à un fichier, son nom, sa taille, son propriétaire, son groupe, ... et en particuler ses permissions, par exemple :

    ```bash
    $ ls -l fichier
    -rw-r--r-- 1 user group 0 2019-09-09 10:00 fichier
    ```

    La chaîne `-rw-r--r--` représente les permissions associées au fichier. Le premier caractère désigne le type du fichier, les trois suivants représentent les permissions du propriétaire, les trois suivants celles du groupe propriétaire et les trois derniers celles des autres utilisateurs. Les permissions sont représentées par les caractères `r`, `w` et `x` pour les permissions respectivement en lecture, écriture et exécution. Si la permission n'est pas accordée, le caractère `-` est utilisé à la place.

    Les permissions peuvent être représentées par des **chiffres (représentation en octal)** ou des **lettres (représentation symbolique)**.

    Le tableau suivant donne la correspondance entre les deux représentations :

    | Chiffre | Lettre | Description |
    | ------- | ------ | ----------- |
    | 0 | `---` | Aucune permission |
    | 1 | `--x` | Exécution |
    | 2 | `-w-` | Écriture |
    | 3 | `-wx` | Écriture et exécution |
    | 4 | `r--` | Lecture |
    | 5 | `r-x` | Lecture et exécution |
    | 6 | `rw-` | Lecture et écriture |
    | 7 | `rwx` | Lecture, écriture et exécution |


    C'est-à-dire que pour la chaîne `-rw-r--r--` les permissions sont les suivantes :

    | | Utilisateur | Groupe | Autres |
    |-|----------- | ------ | ------ |
    | symbolique | `rw-` | `r--` | `r--` |
    | binaire | 110 | 100 | 100 |
    | octale | 6 | 4 | 4 |
---

### Exercice 2 : Permissions associées aux fichiers 📚

1. Créez un répertoire vide et un fichier vide (ces deux derniers doivent être au même niveau). Utilisez la commande `ls` et les options `-l` et `-d` sur chacun de ces deux nouveaux fichiers pour déterminer les permissions que vous (respectivement votre groupe et les autres) avez sur ces fichiers. Comment reconnaissez-vous un répertoire ?

2. Les lignes suivantes donnent la réponse de la commande `ls -ld` sur un certain répertoire (pour les besoins de l'exercice nous n'avons reporté que le premier et le dernier champ du résultat de `ls -ld`).
    ```bash
    drwxr-xr-x a
    dr-xr--r-- b
    -rw-r--r-- c.txt
    --w--w-r-- d.c
    -rwxr-xr-x op
    ```
    Parmi ces fichiers, quels sont les répertoires ?
3. Pour chacun des fichiers ci-dessus, donnez les permissions associées à chacun des utilisateurs (propriétaire, groupe propriétaire et autres utilisateurs) en utilisant la représentation symbolique et la représentation octale.
4. Donnez la représentation symbolique et la représentation octale des permissions associées au fichier `/etc/passwd`, à la commande `ls` et à votre répertoire personnel.

### Exercice 3 : Modification des permissions `chmod` 📚📚

1. Testez les commandes suivantes dans un terminal et essayez de comprendre comment fonctionne la commande `chmod` (avec la représentation symbolique).
    ```bash
    $ touch f; ls -l f
    $ chmod a= f; ls -l f
    $ chmod o+rw f; ls -l f
    $ chmod u=o f; ls -l f
    $ chmod o-wx f; ls -l f
    $ chmod g+u f; ls -l f
    $ chmod a+x,g-w f; ls -l f
    ```
2. Testez la commande `chmod 644 f; ls -l f`. Que fait cette commande ?
3. Avec les deux modes d'utilisation de `chmod` (octale et symbolique), modifiez les permissions du fichier `f` de la manière suivante :
    - exécution pour tous, lecture et écriture uniquement pour le propriétaire.
    - lecture et exécution pour tous, personne ne peut écrire.
    - toutes les permissions pour tous, pas d'écriture pour les autres.
    - lecture et écriture pour le propriétaire, exécution pour le groupe et aucune pour les autres.

### Exercice 4 : Permissions associées aux fichiers normaux 📚📚

1. Dans un répertoire de votre choix, créer deux fichiers `f` et `g`. Puis entrer (par exemple avec un éditeur de texte) du texte dans ces fichiers.
2. Pour vous (propriétaire), retirer la permission de lire dans le fichier `f` et la permission d'écrire dans le fichier `g`.
3. Testez ensuite les commandes suivantes, puis notez les résultats :
    ```bash
    $ cat f
    $ cat g
    ```
4. Essayer de modifier `g` avec un éditeur de texte. Que se passe-t-il ?
5. Tester les commandes:
    ```bash
    $ cp f h
    $ cp g h
    ```
    Puis observer le contenu du fichier `h` ainsi que les permissions associées à ce fichier.
6. La commande suivante permet d'écrire la chaîne `toto` à la fin du fichier `f` (nous la verrons plus en détail dans un prochain TP) :
    ```bash
    $ echo "toto" >> f
    ```
    Tester cette commande, puis redonnez-vous les droits de lecture sur le fichier `f`. Enfin affichez le contenu du fichier `f` grâce à la commande `cat`.
7. Tester la commande:
    ```bash
    $ rm g
    ```
    **Tapez `n` pour refuser**. Enfin tester la commande suivante:
    ```bash
    $ rm -f g
    ```
    A-t-elle réussie ? Que pouvez vous en déduire ?

## Permissions associées aux répertoires

!!! tip "Qu'est-ce qu'un répertoire ?"
    
    Un répertoire est une table de noms de fichiers associés à un numéro d'index appelé *numéro d'inode* qui permet de connaître les informations (contenues dans l'inode) concernant ce fichier (taille, permissions, horodatage, où trouver le contenu du fichier, ...).

    Dans un répertoire, les permissions ne sont pas associées aux fichiers mais au répertoire lui-même. Les permissions associées à un répertoire sont :

      - **read** `r`: permet de lister le contenu du répertoire.
      - **write** `w`: permet de modifier le contenu du répertoire (créer ou supprimer des fichiers).
      - **execute** `x`: permet d'ouvrir le répertoire (avec la commande `cd` par exemple).
---

### Exercice 5 : Permissions associées aux répertoires 📚📚📚

1. Créez un répertoire `rep` et deux fichiers normaux `a` et `b` à l'intérieur de ce répertoire.
2. Retirez toutes les permissions sur le répertoire `rep` et essayez les commandes suivantes :
    ```bash
    $ cd rep
    $ ls rep
    $ cat rep/a
    $ touch rep/c
    $ rm rep/a
    ```
3. Redonnez la permission *read* uniquement sur le répertoire `rep` et essayez les toutes les commandes de la question 2. Notez les différences.
4. Même question mais avec seulement la permission *write* sur `rep`. Notez les différences.
5. Cette fois-ci avec uniquement la permission *execute* sur `rep`. Testez les commandes suivantes :
    ```bash
    $ cd rep
    $ ls rep
    $ echo "toto" >> rep/a
    $ cat rep/c
    $ ls -l rep/a
    $ touch rep/c
    $ rm rep/a
    ```
6. Avec l'ensemble de permissions `-wx` sur `rep` pour tous les utilisateurs, essayez de:
      
      - créer un fichier `d` dans `rep`
      - renommer le fichier `b`
      - retirer toutes les permissions associées au fichier `d`
      - supprimer le fichier `d`


### Exercice 6 : Les répertoires du `PATH` 📚📚📚

!!! warning "Attention"
    
    Cet exercice de type *expérimentation* est délicat et important. Il faut le traiter avec un soin particulier et en prenant son temps.

1. Ouvrir un nouveau terminal et entrer la commande suivante :
    ```bash
    $ echo $PATH
    ```
    Observer le résultat, à votre avis à quoi correspondent les éléments séparés par des `:` ?
2. Créer un répertoire `bin` dans votre répertoire personnel et entrer les commandes suivantes:
    ```bash
    $ PATH=~/bin:$PATH
    $ echo $PATH
    ```
    Quelle est la différence avec d'affichage avec le résultat de la question 1 ?
3. À l’aide de la commande `type`, chercher les chemin absolus des programmes `cat` et `rm` et les noter.
4. Faire une copie de `cat` dans `~/bin` en le renommant `rm`.
5. Créer un fichier `fic`, y mettre quelques caractères et créer deux copies `fic2` et `fic3` de `fic`.
6. Essayer de détruire `fic` avec la commande `rm`. Que s’est-il passé ?
7. Entrer la commande `$ type rm`.
8. Lancer la commande
    ```bash
    $ <chemin vers rm> fic
    ```
    en remplaçant `<chemin vers rm>` par le chemin absolu vers la commande `rm` noté à la question 3. Que s’est-il passé ?
9. Enlever la permission `x` sur le fichier `~/bin/rm` et essayer de supprimer `fic2`.
10. Demander au shell d’oublier les emplacements enregistrés (« hachés ») avec la commande `$ hash -r`, puis entrer les commandes
    ```bash
    $ type rm
    $ rm fic2
    ```
11. Remettre la permission `x` sur `~/bin/rm` puis entrer les commandes suivantes (où `<chemin vers rm>` désigne le chemin absolu noté à la question 3) :
    ```bash
    $ ~/bin/rm fic3
    $ cd ~/bin
    $ ./rm fic3
    $ <chemin vers rm> rm
    $ rm fic3
    ```
12. Faire le bilan de cet exercice en répondant aux questions suivantes :
    - Qu'est-ce qui est contenu dans `PATH` ?
    - Dans quel cas est-ce qu’un nom de commande est cherché dans les répertoires du `PATH` ?
    - S’il y a plusieurs programmes correspondants dans les répertoires du `PATH`, lequel est choisi ?


## Récapitulatif sur permissions et permissions par défaut

### Exercice 7: On lache le clavier 📚📚

!!! info "Consigne"
    
    Cet exercice est à faire à l’écrit, on lâche le clavier !

Pour chacune des commandes suivantes, dire quelles permissions sont nécessaires pour qu’elle réussisse (on suppose que tous les répertoires et fichiers existent, sauf ceux qu’on veut créer).

```bash
$ cat /usr/include/stdio.h
$ cd /usr/include/
$ ls /usr/include/
$ echo '/* fin */' >> /usr/include/stdio.h
$ rm /usr/include/stdio.h
$ touch /usr/include/ma_bib.h
$ chmod u+w /usr/include/stdio.h
$ /usr/bin/uname
```

### Exercice 8 : Permissions par défaut et `umask` (optionnel) 📚📚📚

!!! tip 

    `umask` est une commande qui permet de définir les permissions par défaut des fichiers et des répertoires que vous créez. La valeur de l'umask est une valeur octale qui est *soustraite* des permissions par défaut. Par exemple, si l'umask vaut 022, les permissions par défaut sont 755 pour les répertoires et 644 pour les fichiers.

1. Dans un terminal, tapez la commande `umask` et notez le résultat.
2. Créez un répertoire `rep` et un fichier `f` au même niveau que `rep`. Affichez les permissions associées à `rep` et `f` avec la commande `ls -ld rep f`. Convertissez ces permissions en représentation octale et notez-les. Enfin, supprimez `rep` et `f`.
5. Changez la valeur du masque avec la commande
    ```bash
    $ umask 240
    ```
4. Changez la valeur du masque avec la commande
    ```bash
    $ umask 121
    ```
    puis refaites la question 2.
5. Changez la valeur du masque avec la commande
    ```bash
    $ umask 666
    ```
    puis refaites la question 2.
6. De toutes les questions précédentes, pouvez-vous déduire comment la valeur de l'umask agit sur les permissions associées aux répertoires et aux fichiers que vous créez ?
7. Donnez à l'umask sa valeur initiale.
