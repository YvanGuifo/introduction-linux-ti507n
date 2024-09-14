# TP3 - Environnement de travail et Compilateur C (Corrigé)

## Les variables du shell

### Exercice 1 : Les variables du Shell
1. Tapez les commandes suivantes dans un terminal:
    ```bash
    $ nom_fich=hello.c
    $ echo nom_fich
    $ echo $nom_fich
    $ echo ${nom_fich}
    $ touch $nom_fich
    $ echo $nom_fichpp
    $ echo ${nom_fich}pp
    $ rm ${nom_fich}
    ```
2. Rappelez ce que fait la commande `echo`. À votre avis que fait la commande à quoi sert le caractère `$` devant le nom de la variable `nom_fich`?
    
    !!! success "Réponse"
        `echo` affiche sur la sortie standard ses arguments. Le `$` devant le nom de variable `nom_fich` permet le développement de celle-ci par le shell.

3. Que se passe-t-il si on demande au shell d'afficher le contenu d'une variable qui n'existe pas?
    
    !!! success "Réponse"
        Le résultat du développement d'une variable non définie est une chaîne vide.
    
4. Que se passe-t-il si vous mettez un espace entre le nom de la variable et le signe égal `=`? Et entre le signe égal et la valeur?
    
    !!! success "Réponse"
        On aura une « commande » inconnue sur le premier mot. Il ne doit pas y avoir d’espace d’un côté ou de l’autre du signe `=`.
    
5. Entrez les commandes suivantes et essayez de commenter leur effet:
    ```bash
    $ sujet=Alice verbe=aime cod=piscine
    $ phrase ="$sujet $verbe la $cod."
    $ echo $phrase
    $ sujet=Bob verbe=mange cod=salade
    $ echo $phrase
    $ echo "$sujet $verbe la $cod."
    ```
    
    !!! success "Réponse"
        Au moment de l’affectation de `phrase`, les variables `sujet`, `verbe` et `cod` sont développées, donc la variable `phrase` ne change pas de valeur, même si ces premières en changent.

        Autre remarque : on peut affecter plusieurs variables sur la même ligne (ce n’est pas forcément utile tout de suite mais ça le sera lorsqu’on voudra changer l’environnement d’une commande).


## Caractères spéciaux et inhibitions

!!! tip "Caractères spéciaux du shell"

    Certains caractères ont une signification particulière pour le shell : on dit qu’ils sont *spéciaux*. À l’inverse, on dit d’un caractère qui n’a pas d’autre signification que lui-même, qu’il a son sens *littéral*. Nous listons ci-dessous les caractères spéciaux ; la plupart d’entre eux seront vus en détail plus tard dans le cours.
    
      - `; <newline> | &` ils mettent fin à la commande qui les précède. On a utilisé `<newline>` pour représenter le caractère *nouvelle ligne* qu’on saisit avec la touche Entrée. Le caractère spécial `|` est saisi avec la combinaison de touches `Alt Gr-6`, on l’appelle *pipe* ou *conduite*.
      - `< >` appelés chevrons, ils permettent les *redirections*.
      - `( )` pour regrouper des commandes et les lancer dans un sous-shell.
      - `$` pour le développement de variables, le développement arithmétique et la substitution de commande.
      - `` ` `` l’accent grave (en anglais, *backtick* ou *backquote*) pour la substitution de commandes (ancienne syntaxe). Il est saisi au clavier avec la combinaison de touches `Alt Gr-7` suivie d’un espace.
      - `<space> <tab>` délimitent les noms de commandes et arguments.
      - `\ ' "` la contre-oblique (aussi appelée *backslash* ou *antislash*), l’apostrophe (en anglais *single quote*) et le guillemet anglais (en anglais *double quote*) qui permettent justement d’inhiber les caractères spéciaux, c’est-à-dire leur rendre leur sens littéral.

       Enfin, les caractères suivants ont une signification particulière dans certains contextes et doivent donc parfois être inhibés:

       - `* ? ]` Pour le développement de noms de chemins.
       - `#` Pour écrire des commentaires (sauf s’il est au milieu d’un mot).
       - `~` Pour le développement du tilde (répertoire personnel).
       - `=` Pour l’affectation de variables.
       - `%` Pour le contrôle des tâches (job control).

---

### Exercice 2 : Inhibition de caractères spéciaux (la contre-oblique `\`)
1. Testez les commandes suivantes.
    ```bash
    $ echo a b
    $ echo a\ \ \ b
    $ touch fichier\ vide
    $ rm fichier vide
    $ rm fichier\ vide
    $ echo 3$canadiens
    $ echo 3\$canadiens
    $ echo ; echo *
    $ echo \; echo \*
    $ echo "salut"
    $ echo \"salut\"
    $ echo 'salut'
    $ echo \'salut\'
    $ echo \
    $ echo \\
    ```
    
    !!! success "Réponse"
         - Deux arguments : a et b.
         - Un seul argument car les 3 blancs ont été inhibés.
         - Un seul argument (blanc inhibé).
         - Deux arguments, la commande échoue.
         - Un seul argument.
         - La variable non définie $canadiens est développée en la chaîne vide.
         - Le caractère `$` est inhibé donc littéral.
         - Deux commandes, le `;` a son rôle spécial de terminateur de commande (on dit aussi opérateur de contrôle) et l’astérisque a son rôle spécial de caractère joker. On aura deux lignes affichées, la première est vide, la seconde contient la liste des fichiers du répertoire courant.
         - Une seule commande echo avec trois arguments : un `;`, le mot `echo` et un caractère `*`.
         - Les guillemets anglais sont spéciaux, ils inhibent certains caractères spéciaux dans salut (en l’occurence il n’y en a pas) puis sont enlevés par le shell.
         - Ils sont inhibés, donc traités comme n’importe quel caractère et apparaissent dans la chaîne affichée.
         - Idem avec l’apostrophe.
         - Idem avec l’apostrophe.
         - Un prompt secondaire apparaît, on doit appuyer sur entrée pour terminer la commande : on a en fait une commande sur deux lignes qui est un `echo` sans argument.
         - La contre-oblique retrouve son sens littéral.

2. En vous référent aux questions précédentes, répondez aux questions ci dessous:
    - Que fait le caractère `\` devant un autre caractère que `<newline>` (on rappelle que le caractère `<newline>` est celui qui résulte de l'appui de la touche Entrée du clavier) ?
        
        !!! success "Réponse"
            Le caractère `\` préserve le sens littéral du prochain caractère (sauf `<newline>)` puis est enlevé par le shell.

    - À quoi sert la chaîne de caractères `\<newline>` ?
        
        !!! success "Réponse"
            La séquence `\<newline>` permet d’écrire une commande sur plusieurs ligne. Ces deux caractères sont supprimés de la commande par le shell
        
    - Comment peut-on obtenir un caractère `\` littéral ? Comment afficher `\\` à l'aide de la commande `echo` ?
        
        !!! success "Réponse"
            La séquence `\\` est interprétée comme une contre-oblique littérale. Pour afficher `\\` avec `echo`, on peut entrer la commande `echo \\\\`.
        

### Exercice 3 : L’inhibition des caractères spéciaux (l'apostrophe `'`)

1. Tester les commandes suivantes :  
    ```bash
    $ touch 'ceci est un horrible nom de fichier'
    $ rm -i ceci est un horrible nom de fichier
    $ rm -i 'ceci est un horrible nom de fichier'
    $ touch p; echo le caractère * est-il spécial ? et ?
    $ echo 'le caractère * est-il spécial ? et ?'
    $ echo 'en fait ,même la fin de ligne<newline>est un caractère normal entre<newline>apostrophes'
    $ echo 'le seul caractère spécial entre apostrophes n'est-il pas apostrophe ?'
    ```
    où `<newline>` sera à taper avec la touche Entrée de votre clavier.

2. Au vu des expériences précédentes (et d’autres à inventer si nécessaire), répondre aux questions suivantes :
    - Quels sont les caractères qui sont spéciaux entre apostrophes ?
    - Comment obtenir une apostrophe dans une chaîne entre apostrophes (question piège) ?
    - Comment, avec une combinaison de chaînes entre apostrophes et d’une inhibition par contre-oblique, obtenir avec `echo`` l’affichage suivant ?
        ```bash
        Un développement de variable (comme $var) peut-il s'inhiber; par exemple entre apostrophes ?
        ```

    !!! success "Réponse"
        Dans une chaîne entre apostrophe, tous les caractères sont littéraux, y compris les espaces et les fins de ligne, sauf l’apostrophe elle-même qui met fin à l’inhibition. On ne peut donc pas mettre d’apostrophe à l’intérieur d’une chaîne entre apostrophes. Si besoin, on peut toujours utiliser la séquence `'\''` pour mettre fin à la chaîne entre apostrophe, taper une apostrophe inhibée et recommencer une chaîne entre apostrophes, comme dans la dernière question :

        ```bash
        $ echo 'Un développement de variable (comme $var) peut s '\''inhiber; par exemple entre apostrophes.' 
        ```

### Exercice 4 : L’inhibition des caractères spéciaux (les guillemets anglais `"`)

1. Tester les commandes suivantes et notez vos observation:
```bash
$ echo "? * et [ sont utilisés pour le développement de chemins"
$ echo "~ provoque un développement du tilde"
$ echo " Entre \" , on peut aussi <newline>écrire sur plusieurs<newline> lignes"
$ nom=Alice
$ echo '$nom scripte en shell'
$ echo "$nom scripte en shell"
$ echo "\$nom scripte en shell"
$ echo "le chemin absolu du répertoire courant est `pwd`"
$ echo "le chemin absolu du répertoire courant est \`pwd\`"
$ echo "le chemin absolu du répertoire courant est $(pwd)"
$ echo "le chemin absolu du répertoire courant est \$(pwd)"
$ echo "Aussi sûr que 2 et 2 font $((2 + 2))"
$ echo "Aussi sûr que 2 et 2 font \$((2 + 2))"
$ echo "\\\\\"\$\`\*\'"
```
2. Testez les commande suivantes et notez vos observations:
```bash
$ mavar ="Alice<newline> et<newline>Bob"
$ echo $mavar font plein de choses
$ echo "$mavar font plein de choses"
```
3. Au vu des expériences précédentes (et d’autres à inventer si nécessaire), répondre aux questions suivantes :
    - Quels sont les caractères qui sont spéciaux entre guillemets anglais ?
    - Quel est le rôle du caractère \ entre guillemets anglais ? Dans quel contexte est-il spécial, littéral ?
    - Quels sont les développements qui n’ont jamais lieu entre guillemets anglais ?
    - Selon vous, pourquoi avoir créé plusieurs mécanismes d’inhibition ?

    !!! success "Réponse"

        Les seuls caractères spéciaux dans une chaîne entre guillemets sont
        ```bash
                                    $ ` " \ 
        ```
        Les développements de variable, arithmétique (`$((...))`) et la substitution de commande (`$(...)` ou `` `...` ``) ont encore lieu. Bien sûr le guillement est spécial car il met fin à l’inhibition. On peut rendre à ces caractères leur sens littéral en les précédant d’une contre-oblique. Laquelle est donc aussi spéciale, mais seulement lorsqu’elle précède l’un de ces quatre caractères spéciaux.

        Les développements du tilde et de noms de chemins n’ont jamais lieu dans une chaîne entre guillemets.

        Il y a plusieurs mécanismes d’inhibition pour pouvoir contrôler à quel point le shell met sonnez dans nos affaires. De plus (sens du dernier exemple), il fallait trouver une façon d’inhiber le mécanisme (subtil) de la séparation en mots (word splitting) des résultats des développements de variable, arithmétique et substitution de commande.


## Extensions de chemins

### Exercice 5 : Des fichiers et des images

1. Créer un répertoire `dir` et y créer les fichiers vides `file-1.txt`, `file-2.txt`, `file-3.txt`, `file-4.txt`, `file-5.txt`, `file-6.txt`, `file-7.txt`, `file-8.txt`, `file-9.txt`, `config-a.txt`, `file-b.txt`.
2. Créer également dans `dir` les fichiers vides suivants `img-1.png`, `img-2.png`, `img-3.png`, `img-4.png`, `img-5.png`, `img-6.png`, `img-7.png`, `img-8.png`, `img-9.png`.
3. Créer ensuite dans `dir` deux sous-répertoires `files` et `imgs`. 
4. En vous aidant de l'extension de chemin et de la commande `mv`, déplacer les fichiers `.txt` dans le répertoire `files`. Faîtes de même pour les fichiers `.png` dans le répertoire `imgs`.
    
    !!! success "Réponse"
            ```bash
            # En partant de dir
            $ mv *.txt files/
            $ mv *.png imgs/
            ```
            N'hésitez pas à leur suggérer d'utiliser `tree dir` pour voir que tout est bon.

5. Donnez l'expression qui reconnais les fichiers `config-a.txt` et `file-b.txt`. Puis supprimez les fichiers correspondants à cette expression. (Grâce à l'extension de chemin, vous pouvez le faire en une seule commande).
    
    !!! success "Réponse"
        L'expression qui reconnaît peut être par exemplle `*-[ab].txt`. Donc pour les supprimer si on est dans `dir` c'est la commande 
        ```bash
        $ rm */*-[ab].txt
        ```

7. Supprimez le répertoire `dir` et son contenu.

### Exercice 6 : Extension de l'accolade
1. Testez les commandes suivantes
    ```bash
    $ echo {a, b, c, d}
    $ echo {a..d}
    $ echo {a..d..2}
    $ echo {1,2,3,4,5,6,7,8,9}
    $ echo {1..9}
    $ echo {1..9..2}
    ```
2. Que fait la commande `echo {a..d}` ? Quel est le rôle de la virgule `,` dans l'extension de l'accolade ?
    
    !!! success "Réponse"
        Cette commande affiche la séquence `a b c d`. La virgule joue un rôle de séparateur.

3. Que fait la commande `echo {a..d..2}` ? Quel est le rôle du `2` dans l'extension de l'accolade ?
    
    !!! success "Réponse"
        Cette commande affiche la séquence `a c`.Le `2` indique le pas d'incrémentation.

4. Testez les commandes suivantes, et observez leur résultats.
    ```bash
    $ echo {a..d}*
    $ echo {a..d}.*
    $ echo {a..d}.txt
    ```
5. Créer un répertoire `dir`. Déplacez-vous y. En utilisant l'extension de l'accolade, en une seule commande, créer les fichiers vides `file-1.txt`, `file-2.txt`, `file-3.txt`, `file-4.txt`, `file-5.txt`, `file-6.txt`, `file-7.txt`, `file-8.txt`, `file-9.txt`.
    
    !!! success "Réponse"
        ```bash
        $ mkdir dir
        $ cd dir
        $ touch file-{1..9}.txt
        ```

6. Déplacez tous les fichiers `.txt` dans un répertoire `dir/files`.
    
    !!! success "Réponse"
        ```bash
        $ mkdir files
        $ mv file-{1..9}.txt files # ou 
        $ mv *.txt files
        ```

7. Créer un répertoire `dir/imgs`. Déplacez-vous y. En utilisant l'extension de l'accolade, en une seule commande, crééer les fichiers vides `img001.png`, `img002.png`, `img003.png`, `img004.png`, `img005.png`, `img006.png`, `img007.png`, `img008.png`, `img009.png`.
    
    !!! success "Réponse"
        ```bash
        $ mkdir imgs
        $ cd imgs
        $ touch img-{001..009}.png 
        ```

8. Supprimez le répertoire `dir` et tout son contenu.

---
## Substitution de commande

!!! tip "Substitution de commande"
    La substitution de commanande est un mécanisme qui permet d’insérer le résultat d’une commande dans une chaîne de caractères. 

    La substitution de commandes dans une chaîne de caractères est une autre facilité offerte par le shell. Elle permet de capturer la sortie d'une commande et de l'assigner à une variable ou de l'utiliser comme un argument d'une autre commande. Comme beaucoup de commandes UNIX génèrent une sortie, la substitution de commandes peut être très intéressante. 

    Il existe deux syntaxes pour la substitution de commande : la syntaxe ancienne avec les accents graves (`` ` ``) et la syntaxe moderne avec les parenthèses `$(...)`. La syntaxe ancienne est déconseillée car elle ne permet pas d’imbriquer les substitutions de commande. Nous ne la présenterons donc pas ici.

---

### Exercice 7 : Substitution de commande simple
1. Testez les commandes suivantes et observez leur résultat:
```bash
$ date
$ echo date
$ echo $(date)
$ aujourdhui=$(date)
$ echo $aujourdhui
$ echo "Nous sommes le $(date)"
```
2. Que fait la commande `echo $(date)` ? Quel est le rôle du `$` devant la parenthèse ouvrante `(` ?
    
    !!! success "Réponse"
        Pour `echo $(date)`, le shell développe d'abord la commande `date` puis elle va afficher le résultat de la commande (puisque c'est ce résultat qui sera donné en argument de `echo`). Ici il n'y a pas de différence entre `date` et `echo $(date)`. `$(...)` indique la subsiturion de commande.

3. Tapez ensuite les commandes suivantes et observez leur résultat:
```bash
$ prefix="Nous sommes le"
$ echo $prefix $(date)
$ echo $prefix $aujourdhui
$ echo ${prefix} ${ajourdhui}
$ phrase=${prefix} ${ajourdhui}
$ phrase="${prefix} ${ajourdhui}"
$ echo $phrase
$ echo "$phrase"
```
4. Pouvez-vous déduire le rôle des guillemets anglais dans la substitution de commande et le développemt de variable?
    
    !!! success "Réponse"
        Les doubles quotes permettent de concatener dans une même chaîne de caractères le résultat d'une substitution de commande et du développement de variable. 

5. Quelle est la différence entre `$(...)` et `${...}` ?
    
    !!! success "Réponse"
        La première sert à la substitution de commande et la deuxième au développement de variable.


### Exercice 8 : Substitution de commande imbriquée
1. Testez les commandes suivantes et observez leur résultat:
    ```bash
    $ echo $(date)
    $ echo $(echo $(date))
    $ echo $(echo $(echo $(date)))
    $ echo $(echo $(echo $(echo $(date))))
    $ echo $(echo $(echo $(echo $(echo $(date)))))
    ```
    
    !!! success "Réponse"
        Le résultat est toujours le même. 

2. Testez ensuite la commande suivante:
    ```bash
    $ echo
    ```
    Sans exécuter la commande qui suit saurez vous prédire son résultat ?
    ```bash
    $ echo $(echo $(echo $(echo $(echo))))
    ```
    
    !!! success "Réponse"
        Le résultat est le même que `echo` sans argument.

## Compilation de programme C

!!! tip "Le compilateur C de Linux"
    `gcc` est le compilateur C de Linux. Il permet de compiler du code C. Il est très utilisé par les développeurs. Il est très complet et possède de nombreuses fonctionnalités. Nous allons voir un aperçu de son utilisation.

    La compilation d'un programme en C passe par plusieurs étapes, qui sont essentiellement les suivantes:
    
    - La précompilation : elle permet de transformer le code source en un code intermédiaire.
    - La compilation : elle permet de transformer le code intermédiaire en code machine.
    - L'édition des liens : elle permet de lier le code machine avec les bibliothèques utilisées.
    - La création de l'exécutable : elle permet de créer l'exécutable.

---

### Exercice 9 - Le compilateur `gcc`

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
4. Extraire les fichiers de cet archive et déplacez vos dans le répertoire `hello` qui en sera extrait. Vous pouvez le faire grace à la commande suivate:
```bash
$ tar -xvf hello.tar.gz
```
5. Tapez la commande 
```bash
$ gcc main.c hello.c -o run
```
pour compiler votre programme. Cette commande va compiler votre programme et créer un fichier `run` qui est l'exécutable de votre programme. Exécutez enfin votre programme avec la commande `./run`. 
6. Supprimer le fichier `run` et modifier ensuite le fichier `hello.c` de tel sorte à avoir volontairement une erreur : supprimer l'accolade fermante de la fonction `void hello()`. Réexécutez ensuite les commandes de la question 5. Que remarquez-vous ?
7. Remodifier ensuite le fichier `hello.c` en remettant l'accolade fermante mais rajouter un `return 1` dans la définition de la fonction (avant l'accolade fermante). Réexécutez ensuite les commandes de la question 5. Que remarquez-vous ?
8. Conclure sur la gestion des erreurs et des warnings sur `gcc`.

    !!! success "Réponse"
        - Lorsqu'il y a une erreur de compilation, `gcc` affiche un message d'erreur et ne crée pas l'exécutable.
        - Lorsqu'il y a un warning, `gcc` affiche un message d'avertissement mais crée quand même l'exécutable.
        - Il est important de lire les messages d'erreur et de warning de `gcc` pour corriger les erreurs et améliorer son code.
        - L'option `-Wall` de `gcc` permet d'afficher tous les warnings.

### Exercice 10 - Compilation séparée et édition des liens

!!! tip "Compilation en plusieurs étapes"
    Pour compiler un programme en C, il est possible de le faire en plusieurs étapes. On peut d'abord compiler chaque fichier source en un fichier objet, puis éditer les liens pour créer l'exécutable. Cela permet de gagner du temps lors de la compilation de gros projets.

    En effet si un seul fichier source est modifié, il n'est pas nécessaire de recompiler tous les fichiers sources. Il suffit de recompiler le fichier source modifié et de rééditer les liens.

    - L'option `-c` de `gcc` permet de compiler un fichier source en un fichier objet. L'option `-o` permet de spécifier le nom du fichier objet à créer.
    - L'édition des liens se fait avec la commande `gcc` en spécifiant les fichiers objets à lier. L'option `-o` permet de spécifier le nom de l'exécutable à créer.
    
    Dans cette configuration, imaginons que nous avons un fichier `main.c` qui contient la fonction `main` et un fichier `hello.c` qui contient la fonction `hello`. Pour compiler ces deux fichiers en un exécutable `run`, on peut procéder comme suit:
    ```bash
    $ gcc -c main.c -o main.o # Compilation du fichier main.c en main.o
    $ gcc -c hello.c -o hello.o # Compilation du fichier hello.c en hello.o
    $ gcc main.o hello.o -o run # Edition des liens pour créer l'exécutable run
    ```

1. Dans le répertoire `hello`, de l'exercice précédent, créer deux fichiers `bye.c` et `bye.h`, **en utilisant l'extension de l'accolade**, dont les contenus sont les suivants:
    - `bye.h`:
    ```c
    #ifndef BYE_H
    #define BYE_H

    void bye();

    #endif
    ```
    - `bye.c`:
    ```c
    #include <stdio.h>
    #include "bye.h"

    void bye()
    {
        printf("I'm done, bye !\n");
    }
    ```

    !!! success "Réponse"
        ```bash
        $ touch bye.{c,h}
        ```
        Puis éditer les fichiers avec les contenus donnés dans un éditeur de texte (probablement sur leur OS local et non dans Debian).

2. Toujours en utilisant l'extension de l'accolade, compiler les deux fichiers `hello.c` et `bye.c` en deux fichiers objets `hello.o` et `bye.o`. Assurez-vous que le compilateur ne renvoie pas d'erreurs. (**Par défaut si on ne spécifie pas le nom du fichier de sortie, les fichiers `.c` sont compilés en des fichiers objets de même nom**)

    !!! success "Réponse"
        ```bash
        $ gcc -c {hello,bye}.c
        ```
        N'hésitez pas à leur suggérer d'utiliser `ls` pour vérifier que les fichiers objets ont bien été créés.

3. Modifier ensuite le fichier `main.c` pour afin d'inclure le fichier `bye.h` et appeler la fonction `bye` à la fin de la fonction `main`. Le contenu du fichier `main.c` doit être le suivant:
    ```c
    #include <stdio.h>
    #include "hello.h"
    #include "bye.h"

    int main()
    {
        hello();
        bye();
        return 0;
    }
    ```
4. Compiler le fichier `main.c` en un fichier objet `main.o`. Assurez-vous que le compilateur ne renvoie pas d'erreurs.
    
    !!! success "Réponse"
        ```bash
        $ gcc -c main.c
        ```
5. En utilisant l'extention de chemin avec le caractère `*`, éditer les liens pour tous vos fichiers objets afin créer l'exécutable `run`. Exécutez ensuite votre programme avec la commande `./run`.
    
    !!! success "Réponse"
        ```bash
        $ gcc *.o -o run
        $ ./run
        ```
