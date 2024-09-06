---
title: TP2 - Système de fichiers et permissions
---

# TP2 - Système de fichiers et permissions (corrigé)

!!! info "Instructions"
    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` pour savoir ce qu'elle fait.


## Système de fichiers

!!! tip "Le système de fichiers Linux"

    Le système de fichiers Linux est une *arborescence* ou une *hiérarchie* de fichiers et de répertoires. Le répertoire racine est `/` et tous les autres répertoires sont des sous-répertoires de celui-ci. Les répertoires sont séparés par des `/` et les fichiers sont des noms de fichiers. 
        
    Quand vous lancez un shell (i.e. ouvrez un terminal), celui-ci se trouve *dans* un répertoire. Ce répertoire est appelé votre *répertoire courant* ou *répertoire de travail*. 

    Un système Linux typique comporte des dixaines de milliers de répertoires système et de fichiers. La plupart de ces répertoires et fichiers sont cachés et ne sont pas visibles par défaut. Ces fichiers et répertoires cachés sont utilisés par le système d'exploitation pour stocker des informations de configuration et d'autres informations système.

    Les sous-répertoires de la racine sont généralement réservés aux fichiers système. Les répertoires `/home` et `/tmp` sont utilisés pour stocker des fichiers temporaires et des fichiers personnels.

    À moins d'être un administrateur système, vous n'avez pas besoin de vous soucier de la plupart des fichiers et répertoires système. Toutefois il est important de comprendre comment les répertoires et les fichiers sont organisés afin de pouvoir naviguer dans le système de fichiers et de pouvoir trouver les fichiers dont vous avez besoin.

    Le tableau décrit le contenu des principaux répertoires du système de fichiers Linux.

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

### Exercice 1 : `id` et `/etc/passwd`

1. Entrez les commandes suivantes dans un terminal et notez les résultats :
    ```bash
    $ id
    ```
    
    !!! success "Réponse"
        Affiche le UID et le GID de l'utilisateur courant, ansi que tous les GID des groupes dans lequel l'utilisateur courant appartient.
   
2. Ensuite tapez la même commande, mais cette fois-ci avec l'argument `root`, notez les résultats.
    ```bash
    $ id root
    ```
   
    !!! success "Réponse"
        Même chose mais pour l'user root.

3. Affichez ensuite le contenu du fichier `/etc/passwd` avec la commande `cat`.
    
    !!! success "Réponse"
        Chaque ligne représente les informations des utilisateurs : UID, GID, répertoire personnel, shell ... . Les champs sont séparés par des `;`.

4. Recherchez les lignes où apparaîssent votre nom d'utilisateur et celui de l'utilisateur `root`. Quelles sont les différences ?

    !!! success "Réponse"
        La ligne de root a un UID de 0, un GID de 0, un répertoire personnel `/root` et un shell `/bin/bash`. La ligne de l'utilisateur courant a un UID et un GID différents, un répertoire personnel différent et un shell différent.

5. Pouvez-vous déduire à quoi sert le fichier `/etc/passwd` ?

    !!! success "Réponse"
        Le fichier `/etc/passwd` contient les informations des utilisateurs du système. Il est utilisé par le système pour associer un UID à un nom d'utilisateur, un GID à un nom de groupe, un répertoire personnel à un utilisateur et un shell à un utilisateur.
    

## Permissions associées aux fichiers

!!! tip "Protection des fichiers"
    Un système Linux peut permettre à de nombreux utilisateurs d'accéder aux fichiers et aux répertoires. Pour protéger les fichiers et les répertoires, Linux utilise un système de permissions. Les permissions sont des droits d'accès aux fichiers et aux répertoires. Les permissions sont associées à des utilisateurs et à des groupes. Les utilisateurs sont des personnes qui ont un compte sur le système.

    Pour les fichiers normaux, les permissions sont associées à trois catégories d'utilisateurs : le propriétaire du fichier (généralement celui qui a crée le fichier), le groupe propriétaire du fichier et les autres utilisateurs. 
        
    Les catégories de permissions pour un fichier sont les suivantes :
        
    - **read** `r`: permet de lire le contenu du fichier.
    - **write** `w`: permet de modifier le contenu du fichier.
    - **execute** `x`: permet d'exécuter le fichier (si c'est un programme ou un script).

    L'option `-l` de la commande `ls` les méta-données associées à un fichier, son nom, sa taille, son propriétaire, son groupe, ... et en particuler ses permissions, par exemple :

    ```bash
    $ ls -l fichier
    -rw-r--r-- 1 user group 0 2019-09-09 10:00 fichier
    ```

    La chaîne `-rw-r--r--` représente les permissions associées au fichier. Le premier caractère désigne le type du fichier, les trois suivants représentent les permissions du propriétaire, les trois suivants celles du groupe propriétaire et les trois derniers celles des autres utilisateurs. Les permissions sont représentées par les caractères `r`, `w` et `x` pour les permissions respectivement en lecture, écriture et exécution. Si la permission n'est pas accordée, le caractère `-` est utilisé à la place.

    Les permissions peuvent être représentées par des **chiffres (représentation en octal)** ou des **lettres (représentation symbolique)**.

    Le tableau suivant donne la correspondance entre les deux représentations :

    | Chiffre | Lettre | Description |
    | ------- | ------ | ----------- |
    | 0 | --- | Aucune permission |
    | 1 | --x | Exécution |
    | 2 | -w- | Écriture |
    | 3 | -wx | Écriture et exécution |
    | 4 | r-- | Lecture |
    | 5 | r-x | Lecture et exécution |
    | 6 | rw- | Lecture et écriture |
    | 7 | rwx | Lecture, écriture et exécution |

---

### Exercice 2 : Permissions associées aux fichiers

1. Créez un répertoire vide et un fichier vide (ces deux derniers doivent être au même niveau). Utilisez la commande `ls` et les options `-l` et `-d` sur chacun de ces deux nouveaux fichiers pour déterminer les permissions que vous (respectivement votre groupe et les autres) avez sur ces fichiers. Comment reconnaissez-vous un répertoire ?

    !!! success "Réponse"
        Le résultat dépend du masque utilisateur (`umask`, voir le dernier exo), mais fréquemment on trouve:
           
           -  `-rw-r--r--` pour un fichier normal
           -  `drwxr-xr-x` pour un répertoire.
        
        Pour le fichier normal, le propriétaire a donc la permission de lire (`r` pour read), d’écrire (`w` pour write) ; le groupe et les autres ont le droit de le lire.
        
        Pour le répertoire (qu’on repère au `d`, pour directory, avant les permissions), l’utilisateur a le droit de le traverser (`x` pour cross, on dit aussi *search*), de le lire (par exemple avec `ls`) et de modifier son contenu (supprimer ou créer des fichiers dedans). Le groupe et les autres ont le droit de le traverser et de le lire.
    
2. Les lignes suivantes donnent la réponse de la commande `ls -ld` sur un certain répertoire (pour les besoins de l'exercice nous n'avons reporté que le premier et le dernier champ du résultat de `ls -ld`).
    ```bash
    drwxr-xr-x a
    dr-xr--r-- b
    -rw-r--r-- c.txt
    --w--w-r-- d.c
    -rwxr-xr-x op
    ```
    Parmi ces fichiers, quels sont les répertoires ?
    
    !!! success "Réponse"
        Les fichiers a et b sont des répertoires, les autres des fichiers normaux. 

3. Pour chacun des fichiers ci-dessus, donnez les permissions associées à chacun des utilisateurs (propriétaire, groupe propriétaire et autres utilisateurs) en utilisant la représentation symbolique et la représentation octale.
   
    !!! success "Réponse"
         - Pour le répertoire `a` tout le monde peut le traverser mais seul son propriétaire peut le modifier. La représentation octale de ces permissions est 0755. 
         - Le propriétaire du répertoire `b` peut le lire et le traverser mais pas le modifier. Les autres utilisateurs peuvent seulement le lire. Représentation octale 0544. 
         - Le fichier `c.txt` est lisible par tous, modifiable par son propriétaire, représentation octale 0644. 
         - Le fichier `d.c` est seulement modifiable par l’utilisateur et le groupe et seulement consultable par les autres, représentation octale 114.
         -  Enfin, le fichier `op` peut être lu et exécuté par tous et peut être modifié par son propriétaire.
  
4. Donnez la représentation symbolique et la représentation octale des permissions associées au fichier `/etc/passwd`, à la commande `ls` et à votre répertoire personnel.
    
    !!! success "Réponse"
        La commande à taper est la suivante:
        ```bash
        $ ls -ld /etc/passwd /bin/ls ~ 
        # Ce qui renvoie chez moi
        -rw-r--r-- 1  root    root    /etc/passwd
        -rwxr-xr-x 1  root    root    /bin/ls
        drwxr-xr-x 19 debian  deian   /home/debian
        ```
        En octal ça donne respectivement 0644, 0755 et 0755. **Rappeler que root peut tout faire**



### Exercice 3 : Modification des permissions `chmod`

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
    
    !!! success "Réponse"
        La syntaxe est : l’une des lettres `augo` (all, user, group, others) suivi d’un des caractères `=+-` (affecter les permissions, ajouters des permissions, retirer des permissions) suivi d’une partie de `rwx` (qui peut être vide) ou bien, d’un caractère parmi ugo, pour égaler, ajouter ou supprimer les permissions d’une de ces catégories d’utilisateurs. 
        
        Enfin, on peut juxtaposer ces modifications en les séparant par une virgule (sans espace, car cela doit être un seul argument).

2. Testez la commande `chmod 644 f; ls -l f`. Que fait cette commande ?
    
    !!! success "Réponse"
        On a donné la permission de lire pour tous et la permission d’écrire pour le propriétaire.

3. Avec les deux modes d'utilisation de `chmod` (octale et symbolique), modifiez les permissions du fichier `f` de la manière suivante :
    - exécution pour tous, lecture et écriture uniquement pour le propriétaire.
    - lecture et exécution pour tous, personne ne peut écrire.
    - toutes les permissions pour tous, pas d'écriture pour les autres.
    - lecture et écriture pour le propriétaire, exécution pour le groupe et aucune pour les autres.
    
    !!! success "Réponse"
        - `chmod a=x,u+rw f` (par exemple) et `chmod 711 f`
        - `chmod a=rx f` (par exemple) et `chmod 555 f`
        - `chmod a=rwx,o- f` (par exemple) et `chmod 775 f`
        - `chmod u=rw,g=x,o= f` et `chmod 610 f`

### Exercice 4 : Permissions associées aux fichiers normaux

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

!!! success "Correction globale"
    ```bash
    $ touch f g
    $ echo "fichier f" > f; echo "fichier g" > g
    $ chmod u-r f; chmod u-w g
    $ cat f
    cat: f: Permission non accordée
    $ cat g
    fichier g
    $ echo "toto" >> g
    bash: g: Permission non accordée
    $ cp f h
    cp: impossible d ouvrir f en lecture: Permission non accordée
    $ cp g h
    $ cat h
    fichier g
    $ ls -l h
    -r--r--r-- 1 debian debian 9 2021-09-09 10:00 h
    $ echo "toto" >> f
    $ chmod u+r f
    $ cat f
    fichier f
    toto
    $ rm g
    rm: supprimer g protégé en écriture régulier ? n
    $ rm -f g
    $ ls -l g
    ls: impossible d'accéder à g: Aucun fichier ou dossier de ce type
    ```
    **Insister sur le fait qu'un fichier protégé en écriture peut être supprimé.**


## Permissions associées aux répertoires

!!! tip "Qu'est-ce qu'un répertoire ?"
    
    Un répertoire est une table de noms de fichiers associés à un numéro d'index appelé *numéro d'inode* qui permet de connaître les informations (contenues dans l'inode) concernant ce fichier (taille, permissions, horodatage, où trouver le contenu du fichier, ...).

    Dans un répertoire, les permissions ne sont pas associées aux fichiers mais au répertoire lui-même. Les permissions associées à un répertoire sont :

      - **read** `r`: permet de lister le contenu du répertoire.
      - **write** `w`: permet de modifier le contenu du répertoire (créer ou supprimer des fichiers).
      - **execute** `x`: permet d'ouvrir le répertoire (avec la commande `cd` par exemple).


---

### Exercice 5 : Permissions associées aux répertoires

1. Créez un répertoire `rep` et deux fichiers normaux `a` et `b` à l'intérieur de ce répertoire.
    
    !!! success "Réponse"
        $ mkdir rep; touch rep/a rep/b

3. Retirez toutes les permissions sur le répertoire `rep` et essayez les commandes suivantes :
    ```bash
    $ cd rep
    $ ls rep
    $ cat rep/a
    $ touch rep/c
    $ rm rep/a
    ```
    
    !!! success "Réponse"
        ```bash
        $ chmod 000 rep
        ```
        On ne peut rien faire de ces commandes.

3. Redonnez la permission *read* uniquement sur le répertoire `rep` et essayez les toutes les commandes de la question 2. Notez les différences.
    
    !!! success "Réponse"
        Avec la permission r, on peut lister le contenu de rep et c’est tout.

5. Même question mais avec seulement la permission *write* sur `rep`. Notez les différences.
    
    !!! success "Réponse"
        Avec w tout seul, on ne peut rien faire du tout.

7. Cette fois-ci avec uniquement la permission *execute* sur `rep`. Testez les commandes suivantes :
    ```bash
    $ cd rep
    $ ls rep
    $ echo "toto" >> rep/a
    $ cat rep/c
    $ ls -l rep/a
    $ touch rep/c
    $ rm rep/a
    ```
    
    !!! success "Réponse"
        Avec x tout seul, on peut `cd` dans le répertoire, lire et modifier les fichiers qu’il contient (à condition d’avoir les permissions adéquates sur ces fichiers). On ne peut pas créer ou supprimer de fichier.

6. Avec l'ensemble de permissions `-wx` sur `rep` pour tous les utilisateurs, essayez de:
   
      - créer un fichier d dans `rep`
      - renommer le fichier b
      - retirer toutes les permissions associées au fichier d
      - supprimer le fichier d
   
   
    !!! success "Réponse"
        Avec `-wx` on peut tout faire, sauf lister le contenu du répertoire. On insiste encore sur le fait que pour supprimer un fichier, il suffit d’avoir les permissions `-wx` sur le répertoire qui le contient, peu importent les permissions associées au fichier.

### Exercice 6 : Les répertoires du `PATH`

!!! warning "Attention"
    
    Cet exercice de type *expérimentation* est délicat et important. Il faut le traiter avec un soin particulier et en prenant son temps.

1. Ouvrir un nouveau terminal et entrer la commande suivante :
    ```bash
    $ echo $PATH
    ```
    Observer le résultat, à votre avis à quoi correspondent les éléments séparés par des `:` ?

    !!! success "Réponse"
        Les éléments séparés par des `:` sont les répertoires où le shell va chercher les commandes à exécuter. Le premier répertoire est le répertoire personnel de l'utilisateur, puis les répertoires `/usr/local/bin`, `/usr/bin`, `/bin`, `/usr/sbin`, `/sbin` et d’autres encore.

2. Créer un répertoire `bin` dans votre répertoire personnel et entrer les commandes suivantes:
    ```bash
    $ PATH=~/bin:$PATH
    $ echo $PATH
    ```
    Quelle est la différence avec d'affichage avec le résultat de la question 1 ?

    !!! success "Réponse"
        Le répertoire `~/bin` a été ajouté au début du `PATH`.

3. À l’aide de la commande `type`, chercher les chemin absolus des programmes `cat` et `rm` et les noter.

    !!! success "Réponse"
        ```bash
        $ type cat
        cat is /bin/cat
        $ type rm
        rm is /bin/rm # ou bien /usr/bin/rm (dépend du système)
        ```

4. Faire une copie de `cat` dans `~/bin` en le renommant `rm`.

    !!! success "Réponse"
        ```bash
        $ cp /bin/cat ~/bin/rm
        ```

5. Créer un fichier `fic`, y mettre quelques caractères et créer deux copies `fic2` et `fic3` de `fic`.

    !!! success "Réponse"
        ```bash
        $ echo "toto" > fic
        $ cp fic fic2
        $ cp fic fic3
        ```

6. Essayer de détruire `fic` avec la commande `rm`. Que s’est-il passé ?

    !!! success "Réponse"
        Le contenu de `fic` est affiché à l’écran, mais le fichier n’est pas supprimé.

7. Entrer la commande `$ type rm`.

    !!! success "Réponse"
        rm is ~/bin/rm

8. Lancer la commande
    ```bash
    $ <chemin vers rm> fic
    ```
    en remplaçant `<chemin vers rm>` par le chemin absolu vers la commande `rm` noté à la question 3. Que s’est-il passé ?

    !!! success "Réponse"
        Le fichier `fic` a été supprimé.

9.  Enlever la permission `x` sur le fichier `~/bin/rm` et essayer de supprimer `fic2`.

    !!! success "Réponse"
        ```bash
        $ chmod -x ~/bin/rm
        $ rm fic2
        rm: impossible de supprimer 'fic2': Permission non accordée
        ```

10. Demander au shell d’oublier les emplacements enregistrés (« hachés ») avec la commande `$ hash -r`, puis entrer les commandes
    ```bash
    $ type rm
    $ rm fic2
    ```

    !!! success "Réponse"
        ```bash
        rm is /bin/rm
        ```
        
        fic2 a été supprimé. En demandant au shell d’oublier les emplacements enregistrés, il va rechercher de nouveau dans les répertoires du `PATH` un fichier exécutable qui s’appelle `rm`. Comme `~/bin/rm` ne l’est plus, il va trouver `/bin/rm`, qui va donc supprimer fic2.

    
11. Remettre la permission `x` sur `~/bin/rm` puis entrer les commandes suivantes (où `<chemin vers rm>` désigne le chemin absolu noté à la question 3) :
    ```bash
    $ ~/bin/rm fic3
    $ cd ~/bin
    $ ./rm fic3
    $ <chemin vers rm> rm
    $ rm fic3
    ```

    !!! success "Réponse"
        Si un nom de commande contient un slash, le `PATH` n’est pas utilisé, et le nom de commande est interprété comme un chemin vers un fichier qui contient le programme qui sera lancé. Ainsi, la commande `~/bin/rm fic3` lance le programmme `~/bin/rm` (qui est une copie de `cat`). De même pour `./rm` avec un chemin relatif si l’on est dans le répertoire `~/bin`.
        
        En revanche, `rm` ne contient pas d’oblique donc le shell cherche dans le `PATH`. Comme `~/bin/rm` n’existe plus, c’est `/bin/rm` (ou `/usr/bin/rm`, dépend du système) qui est trouvé et fic3 est supprimé.

12. Faire le bilan de cet exercice en répondant aux questions suivantes :
    - Qu'est-ce qui est contenu dans `PATH` ?
    - Dans quel cas est-ce qu’un nom de commande est cherché dans les répertoires du `PATH` ?
    - S’il y a plusieurs programmes correspondants dans les répertoires du `PATH`, lequel est choisi ?

    !!! success "Réponse"
        - `PATH` contient les répertoires où le shell va chercher les commandes à exécuter.
        - Un nom de commande est cherché dans les répertoires du `PATH` si le nom de commande ne contient pas de slash.
        - Si plusieurs programmes correspondent, c’est le premier trouvé dans le `PATH` qui est choisi.


## Récapitulatif sur permissions et permissions par défaut

### Exercice 7: On lache le clavier

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

!!! success "Réponses"
    Pour toutes les questions, on doit au minimum avoir la permission `x` sur les répertoires `/` et `/usr` pour pouvoir les traverser. Ensuite, pour les commandes :
    
    - `cat /usr/include/stdio.h` : il faut la permission de lecture sur `/usr/include/stdio.h` et `x` sur `/usr/include/`.
    - `cd /usr/include/` : il faut la permission `x` sur `/usr/include/`.
    - `ls /usr/include/` : il faut la permission `r` sur `/usr/include/`.
    - `echo '/* fin */' >> /usr/include/stdio.h` : il faut la permission `w` sur `/usr/include/stdio.h` et `x` sur `/usr/include/`.
    - `rm /usr/include/stdio.h` : il faut la permission `wx` sur `/usr/include/`.
    - `touch /usr/include/ma_bib.h` : il faut la permission `wx` sur `/usr/include/`.
    - `chmod u+w /usr/include/stdio.h` : il faut la permission `x` sur `/usr/include/` et être soit root soit le propriétaire de `/usr/include/stdio.h`.
    - `/usr/bin/uname` : il faut la permission `x` sur `/usr/bin/` et `x` sur `/usr/bin/uname`.
    

### Exercice 5 : `umask` (en plus)

1. Dans un terminal, tapez la commande `umask` et notez le résultat.
    
    !!! success "Réponse"
        La réponse dépend du système, les valeurs 0022 et 0002 sont les plus courantes.

2. Créez un répertoire `rep` et un fichier `f` au même niveau que `rep`. Affichez les permissions associées à `rep` et `f` avec la commande `ls -ld rep f`. Convertissez ces permissions en représentation octale et notez-les. Enfin, supprimez `rep` et `f`.
    
    !!! success "Réponse"
          - Dans le cas 0022 on trouve pour le fichier normal 0644 et pour le répertoire 0755. 
          - Dans le cas 0002 on trouve 0664 et 0775.
  
3. Changez la valeur du masque avec la commande
    ```bash
    $ umask 240
    ```
    puis refaites la question précédente.
    
    !!! success "Réponse"
        0426 pour le fichier normal, et 0537 pour le répertoire.

4. Changez la valeur du masque avec la commande
    ```bash
    $ umask 121
    ```
    puis refaites la question 2.
    
    !!! success "Réponse"
        0646 pour le fichier normal, et 0656 pour le répertoire.

5. Changez la valeur du masque avec la commande
    ```bash
    $ umask 666
    ```
    puis refaites la question 2.
    
    !!! success "Réponse"
        0000 pour le fichier normal, et 0111 pour le répertoire.

6. De toutes les questions précédentes, pouvez-vous déduire comment la valeur de l'umask agit sur les permissions associées aux répertoires et aux fichiers que vous créez ?
    
    !!! success "Réponse"
        Les fichiers normaux créés ont des permissions qui sont le résultat de l’opération bit à bit `0666 & ~umask`, c’est-à-dire qu’on enlève les permissions présentes dans le masque à celle de 0666. Pour le répertoire, on enlève les permissions présentes dans le masque à `0777`. Peut-être qu’en passant en binaire, c’est davantage compréhensible.
    
        Par exemple pour le umask 240, on a
        ```bash
        umask (240) 000 010 100 000
        ~umask      111 101 011 111
    
        0666        000 110 110 110   # & logique
        ~umask      111 101 011 111
        ---------------------------
                    000 100 010 110   # Ce qui donne 0426
        ```
    
7. Donnez à l'umask sa valeur initiale.