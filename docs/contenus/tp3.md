---
title: TP3 - Environnement de travail
---

# TP3 - Environnement de travail

!!! info "Instructions"
    - On rappelle que dans tous les exercices le `$` en début de commande représente le prompt, il n'est pas à saisir lorsque vous écrivez une ligne de commande.
    - Pour chaque nouvelle commande, n'hésitez pas à consulter sa page de manuel avec la commande `man`, ou à utiliser l'option `--help` (si elle est disponible) pour savoir ce qu'elle fait.


## Les variables du shell

!!! tip "Définition et utilisation"
    
    Une variable est un nom qui est associé à une valeur. En shell, les variables sont des chaînes de caractères.
    Le **développement** d’une variable est le remplacement du nom de la variable par sa valeur.

    Par exemple, la variable `PS1` est la variable qui contient le prompt du shell. Lors des TP précédents, quand vous tapiez
    la commande `PS1='$ '`, vous avez affecté la chaîne `$<space>` à la variable `PS1`. Lorsque le shell affiche le prompt, il développe la variable `PS1` et affiche la chaîne `$<space>`. 
    
    Les variables du shell sont des variables d’environnement. Elles sont accessibles à tous les processus lancés par le shell. On peut les lister avec la commande `env` ou `printenv`. On peut également les lister avec la commande `set` qui liste également les variables internes du shell (voir la page de manuel de `set` pour plus de détails).
---
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
1. Rappelez ce que fait la commande `echo`. À votre avis, à quoi sert le caractère `$` devant le nom de la variable `nom_fich`?
2. Que se passe-t-il si on demande au shell d'afficher le contenu d'une variable qui n'existe pas?
3. Que se passe-t-il si vous mettez un espace entre le nom de la variable et le signe égal `=`? Et entre le signe égal et la valeur?
4. Entrez les commandes suivantes et essayez de commenter leur effet:
```bash
$ sujet=Alice verbe=aime cod=piscine
$ phrase ="$sujet $verbe la $cod."
$ echo $phrase
$ sujet=Bob verbe=mange cod=salade
$ echo $phrase
$ echo "$sujet $verbe la $cod."
```

## Caractères spéciaux et inhibitions
!!! tip "Caractères spéciaux du shell"
    Certains caractères ont une signification particulière pour le shell : on dit qu’ils sont *spéciaux*. À l’inverse, on dit d’un caractère qui n’a pas d’autre signification que lui-même, qu’il a son sens *littéral*. Nous listons ci-dessous les caractères spéciaux ; la plupart d’entre eux seront vus en détail plus tard dans le cours.
    
    - `; <newline> | &` ils mettent fin à la commande qui les précède. On a utilisé `<newline>` pour représenter le caractère *nouvelle ligne* qu’on saisit avec la touche Entrée. Le caractère spécial `|` est saisi avec la combinaison de touches `Alt Gr-6` (`Option-Shift-l` sous mac), on l’appelle *pipe* ou *conduite*. Le caractère spécial `&` est saisi avec la combinaison de touches `Alt Gr-8` et sert à lancer des commandes en arrière-plan.
    - `< >` appelés chevrons, ils permettent les *redirections*.
    - `( )` pour regrouper des commandes et les lancer dans un sous-shell.
    - `$` pour le développement de variables, le développement arithmétique et la substitution de commande.
    - `` ` `` l’accent grave (en anglais, *backtick* ou *backquote*) pour la substitution de commandes (ancienne syntaxe). Il est saisi au clavier avec la combinaison de touches `Alt Gr-7` suivie d’un espace.
    - `<space> <tab>` délimitent les noms de commandes et arguments.
    - `\ ' "` la contre-oblique (aussi appelée *backslash* ou *antislash*), l’apostrophe (en anglais *single quote*) et le guillemet anglais (en anglais *double quote*) qui permettent justement d’inhiber les caractères spéciaux, c’est-à-dire leur rendre leur sens littéral.

    Enfin, les caractères suivants ont une signification particulière dans certains contextes et doivent donc parfois être inhibés:

    -  `* ? ]` Pour le développement de noms de chemins.
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
2. En vous référent aux questions précédentes, répondez aux questions ci dessous:
    - Que fait le caractère `\` devant un autre caractère que `<newline>` (on rappelle que le caractère `<newline>` est celui qui résulte de l'appui de la touche Entrée du clavier) ?
    - À quoi sert la chaîne de caractères `\<newline>` ?
    - Comment peut-on obtenir un caractère `\` littéral ? Comment afficher `\\` à l'aide de la commande `echo` ?

### Exercice 3 : L’inhibition des caractères spéciaux (l'apostrophe `'`)
!!! info "Remarque"
    L'option `-i` de la commande `rm` permet de demander une confirmation avant la suppression.

1. Tester les commandes suivantes :  
```bash
$ touch 'ceci est un horrible nom de fichier'
$ rm -i ceci est un horrible nom de fichier
$ rm -i 'ceci est un horrible nom de fichier'
$ touch p; echo le caractère * est-il spécial ? et ?
$ echo 'le caractère * est-il spécial ? et ?'
$ echo 'en fait, même la fin de ligne<newline>est un caractère normal entre<newline>apostrophes'
$ echo 'le seul caractère spécial entre apostrophes n'est-il pas apostrophe ?'
```
    où `<newline>` sera à taper avec la touche Entrée de votre clavier.

2. Au vu des expériences précédentes (et d’autres à inventer si nécessaire), répondre aux questions suivantes :
    - Quels sont les caractères qui sont spéciaux entre apostrophes ?
    - Comment obtenir une apostrophe dans une chaîne entre apostrophes (question piège) ?
    - Comment, avec une combinaison de chaînes entre apostrophes et d’une inhibition par contre-oblique, obtenir avec `echo` l’affichage suivant ?
    ```bash
    Un développement de variable (comme $var) peut-il s'inhiber; par exemple entre apostrophes ?
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
    - Quel est le rôle du caractère `\` entre guillemets anglais ? Dans quel contexte est-il spécial, littéral ?
    - Quels sont les développements qui n’ont jamais lieu entre guillemets anglais ?
    - Selon vous, pourquoi avoir créé plusieurs mécanismes d’inhibition ?

## Extensions de chemins
!!! tip "Extension de chemins"
    Lorsqu’on saisit un chemin contenant des *wildcards* ou *caractères joker* (Ref. dernier exo du TP1), le shell le développe en remplaçant les caractères spéciaux `*`, `?` et `[` par les noms des fichiers qui correspondent à l’expression régulière qui résulte de l’extension du chemin. On appelle ce mécanisme l’*extension de chemin*.

    Par exemple, si le répertoire courant contient les fichiers `a`, `b`, `c`, `d` et `e`, alors le chemin `a*` est développé en `a`, le chemin `?` en `a b c d e` et le chemin `[a-c]` en `a b c`.

    L’extension de chemin est effectuée par le shell, avant que la commande ne soit exécutée. Si aucun fichier ne correspond à l’expression régulière, le shell laisse le chemin tel quel.
---

### Exercice 5 : Des fichiers et des images
1. Créer un répertoire `dir` et y créer les fichiers vides `file-1.txt`, `file-2.txt`, `file-3.txt`, `file-4.txt`, `file-5.txt`, `file-6.txt`, `file-7.txt`, `file-8.txt`, `file-9.txt`, `config-a.txt`, `file-b.txt`.
2. Créer également dans `dir` les fichiers vides suivants `img-1.png`, `img-2.png`, `img-3.png`, `img-4.png`, `img-5.png`, `img-6.png`, `img-7.png`, `img-8.png`, `img-9.png`.
3. Créer ensuite dans `dir` deux sous-répertoires `files` et `imgs`. 
4. En vous aidant de l'extension de chemin et de la commande `mv`, déplacer les fichiers `.txt` dans le répertoire `files`. Faîtes de même pour les fichiers `.png` dans le répertoire `imgs`.
5. Donnez l'expression qui reconnais les fichiers `config-a.txt` et `file-b.txt`. Puis supprimez les fichiers correspondants à cette expression. (Grâce à l'extension de chemin, vous pouvez le faire en une seule commande).
6. Supprimez le répertoire `dir` et son contenu.

### Exercice 6 : Extension de l'accolade
1. Testez les commandes suivantes
```bash
$ echo {a, b, c, d}
$ echo {a..d}
$ echo {a..d..2}
$ echo {1, 2, 3, 4, 5, 6, 7, 8, 9}
$ echo {1..9}
$ echo {1..9..2}
```
2. Que fait la commande `echo {a..d}` ? Quel est le rôle de la virgule `,` dans l'extension de l'accolade ?
3. Que fait la commande `echo {a..d..2}` ? Quel est le rôle du `2` dans l'extension de l'accolade ?
4. Testez les commandes suivantes, et observez leur résultats.
```bash
$ echo {a..d}*
$ echo {a..d}.*
$ echo {a..d}.txt
```
6. Créer un répertoire `dir`. Déplacez-vous y. En utilisant l'extension de l'accolade, en une seule commande, créer les fichiers vides `file-1.txt`, `file-2.txt`, `file-3.txt`, `file-4.txt`, `file-5.txt`, `file-6.txt`, `file-7.txt`, `file-8.txt`, `file-9.txt`. 
7. Déplacez tous les fichiers `.txt` dans un répertoire `dir/files`.
8. Créer un répertoire `dir/imgs`. Déplacez-vous y. En utilisant l'extension de l'accolade, en une seule commande, crééer les fichiers vides `img001.png`, `img002.png`, `img003.png`, `img004.png`, `img005.png`, `img006.png`, `img007.png`, `img008.png`, `img009.png`.
9. Supprimez le répertoire `dir` et tout son contenu.

## Substitution de commande
!!! tip "Substitution de commande"
    La substitution de commanande est un mécanisme qui permet d’insérer le résultat d’une commande dans une chaîne de caractères. 
    La substitution de commandes dans une chaîne de caractères est une autre facilité offerte par le shell. Elle permet de capturer la sortie d'une commande et de l'assigner à une variable ou de l'utiliser comme un argument d'une autre commande. Comme beaucoup de commandes Linux génèrent une sortie, la substitution de commandes peut être très intéressante. 
    Il existe deux syntaxes pour la substitution de commande : la syntaxe ancienne avec les accents graves (`` ` ``) et la syntaxe moderne avec les parenthèses `$(...)`. L'ancienne syntaxe est déconseillée car elle ne permet pas d’imbriquer les substitutions de commande. Nous ne la présenterons donc pas ici.
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
4. Pouvez-vous déduire le rôle des guillemets anglais dans la substitution de commande ?
5. Quelle est la différence entre `$(...)` et `${...}` ?

### Exercice 8 : Substitution de commande imbriquée
1. Testez les commandes suivantes et observez leur résultat:
```bash
$ echo $(echo $(date))
$ echo $(echo $(echo $(date)))
$ echo $(echo $(echo $(echo $(date))))
$ echo $(echo $(echo $(echo $(echo $(date)))))
```
2. Testez ensuite la commande suivante:
```bash
$ echo
```
    Sans exécuter la commande qui suit saurez vous prédire son résultat ?
    ```bash
    $ echo $(echo $(echo $(echo $(echo))))
    ```

