---
title: TP3 - Environnement de travail et Compilateur C
---

# TP3 — Environnement de travail et compilateur C

!!! objectifs "Objectifs pédagogiques (taxonomie de Bloom révisée)"
    À l’issue de ce TP, vous serez capable de :

    - **[Comprendre]** la notion de **variable shell** et le mécanisme de **développement** (`$var`, `${var}`).
    - **[Analyser]** distinguer une **variable du shell** d'une **variable d'environnement** et justifier le rôle d'`export`.
    - **[Appliquer]** identifier et inhiber les **caractères spéciaux** du shell (`\`, `'`, `"`).
    - **[Appliquer]** utiliser l’**expansion d’accolades** (`{a,b,c}`, `{1..10}`) pour générer efficacement des ensembles de chaînes.
    - **[Appliquer]** utiliser la **substitution de commande** `$(...)` pour capturer dynamiquement le résultat d’une commande.
    - **[Appliquer]** compiler un programme C avec `gcc`, décomposer les étapes, effectuer une **compilation séparée** (`-c`) et une **édition de liens**.
    - **[Analyser]** interpréter les **erreurs** et **warnings** du compilateur.
    - **[Évaluer]** choisir la stratégie de quotation (`'`, `"`, `\`) selon le contenu à protéger.

    > **Référence** : Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman. ISBN 978-0801319037.

!!! tip "Prérequis"
    - **TP1 et TP2 terminés** : navigation, permissions, `chmod`, jokers.
    - Distribution Debian 12 ou session MarioNum active.
    - Compilateur `gcc` disponible :
      ```bash
      $ gcc --version
      ```
      Sinon : `sudo apt update && sudo apt install build-essential`.

!!! info "Instructions"
    - Le `$` en début de commande représente le prompt et ne doit pas être saisi.
    - Pour chaque nouvelle commande, consultez `man` ou `--help`.

!!! warning "À propos des réponses du TP"

    Avant de commencer, créez un fichier nommé **`resultat_commande_TP3_NomPrenomEtudiant.txt`**.
    Vous y consignerez progressivement les résultats des commandes.

    > **Création du fichier**

    1. Clic droit dans votre répertoire de travail
    2. Créer un document → Fichier vide
    3. Nommez : `resultat_commande_TP3_NomPrenomEtudiant.txt`

    > **Notez bien :**
    >> - <span style="color:blue"> Votre enseignant doit pouvoir consulter ce fichier à tout moment. </span>

    >> - <span style="color:red"> Sauvegardez ce fichier **en local** avant la fin de la séance. </span>
    >>> **Procédure de sauvegarde en local** :
        1. Cliquez sur le **presse-papier** (à gauche du Bureau de la VM).
    ![PressePapier](../assets/img/PressePapier.png)
        2. Sélectionnez le contenu et copiez.
        3. Collez sur votre machine hôte.

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

## 1. Les variables du shell

!!! tip "Définition et développement"
    Une **variable** shell associe un nom à une chaîne de caractères. Le **développement** est le remplacement de `$nom` par sa valeur.

    Exemple : la variable `PS1` contient le prompt. Quand vous tapez `PS1='$ '`, vous affectez la chaîne `$<espace>` à `PS1`. Le shell développe ensuite `$PS1` pour afficher le prompt.

    !!! warning "Variable shell ≠ variable d'environnement"
        Une variable créée par simple affectation (`x=coucou`) est une **variable
        du shell** : elle n'existe **que** dans le shell courant et n'est **pas**
        transmise aux processus qu'il lance. Elle ne devient une **variable
        d'environnement** qu'après `export x`.

        Vérifiez-le :

        ```bash
        $ x=coucou
        $ bash -c 'echo "[$x]"'      # affiche [] : le fils ne voit rien
        $ export x
        $ bash -c 'echo "[$x]"'      # affiche [coucou]
        ```

    - `env` ou `printenv` : listent les variables **d'environnement** uniquement.
    - `set` : liste **toutes** les variables du shell (environnement compris) ainsi
      que les fonctions.

    > **Référence** : *Bash Reference Manual*, § 3.7.4 *Environment*, Free Software
    > Foundation. <https://www.gnu.org/software/bash/manual/bash.html#Environment>

### Exercice 1 — Les variables du shell 📚

1.  Tapez :
    ```bash
    $ nom_fich=hello.c       # (i)
    $ echo nom_fich
    $ echo $nom_fich         # (ii)
    $ echo ${nom_fich}       # (iii)
    $ touch $nom_fich
    $ echo $nom_fichpp       # (iv)
    $ echo ${nom_fich}pp     # (v)
    $ rm ${nom_fich}
    ```

    1. **Affectation** : pas d'espace autour du `=`. Le shell crée la variable `nom_fich` avec la valeur `hello.c`.
    2. Le `$` déclenche le **développement** : le shell remplace `$nom_fich` par sa valeur (`hello.c`) avant d'exécuter `echo`.
    3. `${nom_fich}` est équivalent à `$nom_fich` — les accolades délimitent explicitement le nom de la variable.
    4. Le shell cherche la variable `nom_fichpp` (qui n'existe pas) → chaîne vide.
    5. Les accolades `{}` permettent de **séparer** le nom de variable du texte qui suit : `${nom_fich}` + `pp` = `hello.cpp`.

2.  Rappelez ce que fait `echo`. À quoi sert le `$` devant le nom de variable ?
3.  Que se passe-t-il si on demande d’afficher une variable qui n’existe pas ?
4.  Que se passe-t-il si vous mettez un espace entre le nom de la variable et le `=` ? Et entre le `=` et la valeur ?
5.  Testez et commentez :
    ```bash
    $ sujet=Alice verbe=aime cod=piscine
    $ phrase="$sujet $verbe la $cod."
    $ echo $phrase
    $ sujet=Bob verbe=mange cod=salade
    $ echo $phrase
    $ echo "$sujet $verbe la $cod."
    ```

---

## 2. Caractères spéciaux et inhibitions

!!! tip "Caractères spéciaux du shell"
    Certains caractères ont une **signification particulière** pour le shell (on dit qu’ils sont *spéciaux*). À l’inverse, un caractère qui n’a que son sens *littéral* est ordinaire.

    Principaux caractères spéciaux :

    - `; <newline> | &` : terminaisons de commande. `|` = *pipe*, `&` = arrière-plan.
    - `< >` : redirections.
    - `( )` : groupement / sous-shell.
    - `$` : développement de variables, substitution de commande, arithmétique.
    - `` ` `` : substitution de commande (ancienne syntaxe).
    - `<space> <tab>` : séparateurs.
    - `\ ' "` : caractères d’**inhibition** — leur donnent leur sens littéral.

    Autres caractères spéciaux (dans certains contextes) :

    - `* ? [ ]` : expansion des chemins.
    - `#` : commentaire.
    - `~` : développement du tilde.
    - `=` : affectation de variable.
    - `%` : contrôle de tâches.

### Exercice 2 — La contre-oblique `\` 📚

1. Testez :
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

2. Répondez :

      - Que fait `\` devant un caractère autre que `<newline>` ?
      - À quoi sert la séquence `\<newline>` ?
      - Comment obtenir un `\` littéral ? Comment afficher `\\` avec `echo` ?

### Exercice 3 — L’apostrophe `'` 📚📚

!!! info "Remarque"
    L’option `-i` de `rm` demande une confirmation avant suppression.

1. Testez :
   ```bash
   $ touch 'ceci est un horrible nom de fichier'
   $ rm -i ceci est un horrible nom de fichier
   $ rm -i 'ceci est un horrible nom de fichier'
   $ touch p; echo le caractère * est-il spécial ? et ?
   $ echo 'le caractère * est-il spécial ? et ?'
   $ echo 'en fait, même la fin de ligne
   est un caractère normal entre
   apostrophes'
   ```

2. Répondez :

      - Quels caractères sont spéciaux **entre apostrophes** ?
      - Comment obtenir une apostrophe dans une chaîne entre apostrophes ?

### Exercice 4 — Le guillemet `"` 📚📚

1. Testez et comparez avec l’exercice 3 :
   ```bash
   $ x=coucou
   $ echo "$x"
   $ echo '$x'
   $ echo "le prix est de 30$"
   $ echo "il a dit \"salut\""
   $ echo "aujourd'hui"
   ```

2. Répondez :

     - Quels caractères **restent spéciaux** entre guillemets ?
     - Que se passe-t-il si vous mettez `\` devant `$`, `"`, `\` entre guillemets ?
     - Quand utiliseriez-vous `'...'` plutôt que `"..."` ?

---

## 3. Expansion d’accolades

!!! tip "L’expansion d’accolades"
    L’**expansion d’accolades** est un mécanisme du shell qui génère des chaînes à partir d’un motif.

    - `{a,b,c}` génère les chaînes `a`, `b`, `c`.
    - `{1..5}` génère `1 2 3 4 5`.
    - `{a..e}` génère `a b c d e`.
    - Combinable avec du texte : `file_{1..3}.txt` → `file_1.txt file_2.txt file_3.txt`.

    Attention : contrairement aux jokers `*`, `?`, `[]`, l’expansion d’accolades **ne dépend pas** des fichiers existants — elle génère les chaînes même si aucun fichier ne correspond.

### Exercice 5 — Extension d’accolades 📚📚

1. Testez et commentez :
   ```bash
   $ echo a{b,c,d}e
   $ echo {1..10}
   $ echo {a..e}{1..3}
   $ mkdir -p projet/{src,tests,docs}
   $ ls -R projet
   $ touch fichier_{01..05}.txt
   $ ls fichier_*
   ```

2. Utilisez l’expansion d’accolades pour créer, **en une seule commande**, l’arborescence suivante dans votre répertoire personnel :
   ```
   ~/labo/
   ├── donnees/
   │   ├── brutes/
   │   └── nettoyees/
   ├── scripts/
   └── resultats/
   ```

3. **Question** : quelle est la différence fondamentale entre `{a,b,c}` et `[abc]` du point de vue du shell ?

---

## 4. Substitution de commande

!!! tip "Substitution de commande"
    La **substitution de commande** insère la **sortie d’une commande** dans une ligne de commande. Deux syntaxes existent :

    - **Moderne** : `$(commande)` — recommandée, imbrication facile.
    - **Ancienne** : `` `commande` `` — déconseillée, imbrication ambiguë.

### Exercice 6 — Substitution simple 📚

1. Testez :
   ```bash
   $ date
   $ echo date
   $ echo $(date)
   $ aujourdhui=$(date)
   $ echo $aujourdhui
   $ echo "Nous sommes le $(date)"
   ```

2. Que fait `echo $(date)` ? Quel est le rôle du `$` devant `(` ?
3. Testez et commentez :
   ```bash
   $ prefix="Nous sommes le"
   $ echo $prefix $(date)
   $ echo $prefix $aujourdhui
   $ echo ${prefix} ${aujourdhui}
   $ phrase=${prefix} ${aujourdhui}
   $ phrase="${prefix} ${aujourdhui}"
   $ echo $phrase
   $ echo "$phrase"
   ```

4. Quel est le rôle des guillemets dans la substitution ?
5. Quelle est la différence entre `$(...)` et `${...}` ?

---

## 5. Compilation d’un programme C

??? saviezvous "Dennis Ritchie, le C et « Hello, World! »"
    Le langage **C** a été créé par **Dennis Ritchie** aux Bell Labs entre 1969 et 1973, initialement pour réécrire le noyau Unix (qui était en assembleur PDP-7). Le célèbre programme `"Hello, World!"` apparaît pour la première fois dans le livre *The C Programming Language* (1978) de **Brian Kernighan** et Dennis Ritchie — surnommé le **K&R**, il reste l’un des livres d’informatique les plus influents. Fait remarquable : Unix, le langage C et une bonne partie des outils que vous utilisez dans ce TP (le shell, `cat`, `ls`…) sont tous nés dans le même couloir du bâtiment 2 des Bell Labs à Murray Hill, New Jersey.

    > Kernighan, B. W. & Ritchie, D. M. (1978). *The C Programming Language*. Prentice Hall. ISBN 978-0131101630.

!!! tip "Le compilateur GCC"
    `gcc` (*GNU Compiler Collection*) est le compilateur C de référence sous Linux. La compilation d’un programme C se décompose en **quatre étapes** :

    | Étape | Outil | Entrée → Sortie | Option `gcc` |
    |---|---|---|---|
    | 1. Préprocesseur | `cpp` | `.c` → texte étendu | `-E` |
    | 2. Compilation | `gcc` | texte étendu → assembleur `.s` | `-S` |
    | 3. Assemblage | `as` | `.s` → objet `.o` | `-c` |
    | 4. Édition de liens | `ld` | `.o` → exécutable | *(par défaut)* |

    Options utiles :

    - `-o <nom>` : nomme l’exécutable de sortie (sinon `a.out`).
    - `-Wall` : active la plupart des avertissements courants.
    - `-Wextra` : active des avertissements supplémentaires.
    - `-Werror` : transforme les avertissements en erreurs.

    > **Référence** : *GCC User Manual*, Free Software Foundation. <https://gcc.gnu.org/onlinedocs/>

### Exercice 7 — Compilation, erreurs et warnings 📚📚📚

1.  Créez `hello.c` :
    ```c
    #include <stdio.h>

    int main(void)
    {
        printf("Hello world !\n");
        return 0;
    }
    ```

2.  Placez-vous dans le répertoire contenant `hello.c` et compilez avec `gcc hello.c`. Un fichier `a.out` est créé. Exécutez-le avec `./a.out`.

    Attention : si `a.out` existait déjà, il est **écrasé sans avertissement**.
    Utilisez `-o` pour choisir un autre nom : `gcc hello.c -o hello`.

3.  Récupérez cette archive : [hello.tar.gz](../assets/files/hello.tar.gz).
4.  Extrayez-la et placez-vous dans le répertoire `hello` :
    ```bash
    $ tar -xvf hello.tar.gz # (i)
    ```

    1. `-x` = e**x**traire, `-v` = **v**erbose (affiche les fichiers extraits), `-f` = **f**ichier archive à traiter. L'ordre des options est libre.

5.  Compilez le projet :
    ```bash
    $ gcc main.c hello.c -o run # (i)
    ```

    1. `gcc` compile **plusieurs** fichiers source en un seul exécutable. `-o run` nomme l'exécutable `run` au lieu du défaut `a.out`.
    Exécutez avec `./run`.

6.  Supprimez le fichier `run`. Modifiez `hello.c` pour introduire volontairement une erreur : supprimez **l’accolade fermante** de la fonction `void hello()`. Recompilez. Que remarquez-vous ?
7.  Remettez l’accolade et ajoutez un `return 1;` dans la définition de la fonction `hello` (qui est `void`). Recompilez. Que remarquez-vous ?
8.  Recompilez maintenant avec `-Wall -Wextra`, puis avec `-Wall -Wextra -Werror`.
    Que change chaque ajout ?

     !!! info "À observer précisément"
         Le `return 1;` de la question 7 déclenche `-Wreturn-type`, qui est **actif
         par défaut** : le message apparaît donc **déjà sans `-Wall`**. Ce qui change
         vraiment, c'est `-Werror`, qui transforme cet avertissement en **erreur**
         et fait échouer la compilation. Pour voir un avertissement que seul `-Wall`
         révèle, ajoutez dans `main()` une variable jamais utilisée
         (`int inutilise;`) et recompilez avec et sans `-Wall`.

9.  **Concluez** sur la différence entre **erreurs** et **warnings**, et sur l'intérêt
    professionnel des options `-Wall -Wextra -Werror` en intégration continue.

!!! info "Cet exercice est représentatif d’un item type **DE S42 (QCM)**."

---

## Synthèse — Ce que vous devez savoir faire

!!! success "Auto-évaluation rapide"
    Avant de quitter la séance, vérifiez que vous savez :

    - [ ] Créer, développer et utiliser une variable shell.
    - [ ] Distinguer et inhiber les caractères spéciaux du shell (`\`, `'`, `"`).
    - [ ] Comparer `'...'` et `"..."` et choisir la bonne quotation.
    - [ ] Générer des chaînes avec l’expansion d’accolades (`{a,b,c}`, `{1..N}`).
    - [ ] Utiliser la substitution de commande `$(...)`.
    - [ ] Compiler un programme C avec `gcc`, décomposer les 4 étapes, faire une compilation séparée.
    - [ ] Distinguer erreurs et warnings et interpréter les messages de `gcc`.

    **Programmation système (⭐ — évalué)** :

    - [ ] Compiler séparément plusieurs sources en `.o` puis faire l’édition de liens.
    - [ ] Nommer les trois descripteurs standards et leur numéro (`0`, `1`, `2`).
    - [ ] Écrire sur un descripteur avec `write()` et lire avec `read()`.
    - [ ] Ouvrir un fichier avec `open()`, tester l’échec et le signaler avec `perror()`.
    - [ ] Rediriger un descripteur avec `dup()` / `dup2()` et expliquer le rôle de `close()`.

    Si un item n’est pas coché, **revenez sur l’exercice correspondant** avant le TP4.

---

## ⭐ Programmation système

!!! star "Les exercices 8, 9 et 10 font partie du programme"
    Le TP3 a introduit la **compilation C** ; ces trois exercices la prolongent vers la
    **programmation système**, qui constitue la partie « Programmation » du syllabus du
    module. Vous y découvrirez la compilation séparée, les descripteurs de fichiers
    standards, et vous réimplémenterez en C ce que le shell fait quand vous tapez
    `commande > fichier`.

    **Appels système travaillés** : `open`, `read`, `write`, `close`, `perror`, `dup`, `dup2`.

    Niveaux taxonomiques visés : **[Analyser]**, **[Évaluer]**, **[Créer]** (Bloom révisé).

    !!! warning "Changement 2026‑2027"
        Ces exercices étaient auparavant présentés comme optionnels. **Ils sont
        désormais évalués** : les appels système font partie du périmètre du
        **DE S42**. Les ⭐ du TP1 et du TP2 (`find`, `ln`, `umask`, SUID/SGID),
        eux, restent optionnels.

### Exercice 8 — Compilation séparée et édition de liens 📚📚📚 ⭐

!!! tip "Compilation séparée"
    Pour un projet de plusieurs fichiers, il est plus efficace de compiler chaque source en un fichier **objet** (`.o`), puis d’effectuer l’édition de liens **une seule fois**.

    - `-c` demande à `gcc` de s’arrêter à l’objet (pas d’édition de liens).
    - Sans `-o`, `gcc -c foo.c` produit `foo.o`.
    - L’édition de liens se fait ensuite : `gcc a.o b.o -o run`.

    !!! tip "Deux conventions C à respecter dès maintenant"
        - **`void f(void)` et non `void f()`.** En C, `void f()` ne déclare **aucun**
          prototype : le compilateur ne vérifie alors ni le nombre ni le type des
          arguments. `gcc -Wstrict-prototypes` le signale. (Depuis C23 la sémantique
          change et `()` devient équivalent à `(void)` — raison de plus pour écrire
          explicitement `(void)`.)
        - **Gardes d'en-tête : `BYE_H`, pas `_BYE_H_`.** Les identifiants commençant
          par un `_` suivi d'une majuscule sont **réservés à l'implémentation**
          (norme C, § 7.1.3). Les utiliser est un comportement indéfini.

        L'archive `hello.tar.gz` fournie contient encore les anciennes conventions
        (`void hello();`, `_HELLO_H_`) : **corrigez-les**, c'est un bon premier
        exercice de lecture critique de code.

1. Dans le répertoire `hello` de l’exercice 7, créez `bye.c` et `bye.h` **en utilisant l’expansion d’accolades** :
   - `bye.h` :
     ```c
     #ifndef BYE_H
     #define BYE_H

     void bye(void);

     #endif
     ```
   - `bye.c` :
     ```c
     #include <stdio.h>
     #include "bye.h"

     void bye(void)
     {
         printf("I'm done, bye !\n");
     }
     ```

2. **Toujours avec l’expansion d’accolades**, compilez `hello.c` et `bye.c` en `hello.o` et `bye.o`. Vérifiez qu’aucune erreur n’est levée.
3. Modifiez `main.c` pour inclure `bye.h` et appeler `bye()` :
   ```c
   #include <stdio.h>
   #include "hello.h"
   #include "bye.h"

   int main(void)
   {
       hello();
       bye();
       return 0;
   }
   ```

4. Compilez `main.c` en `main.o`.
5. Avec l’expansion de chemin `*`, éditez les liens de tous vos `.o` pour créer `run`. Exécutez-le.

### Exercice 9 — Maîtriser les descripteurs standards ⭐

Tout processus Unix dispose au démarrage de **trois descripteurs de fichiers** ouverts :

| Numéro | Nom | Rôle |
|---|---|---|
| `0` | `STDIN_FILENO` | entrée standard |
| `1` | `STDOUT_FILENO` | sortie standard |
| `2` | `STDERR_FILENO` | erreur standard |

1. Créez `std-fd.c` :
   ```c
   #include <unistd.h>    /* write, STDOUT_FILENO, STDERR_FILENO */
   #include <string.h>    /* strlen */

   int main(void) {
       const char *msg_out = "Message normal sur stdout.\n";
       const char *msg_err = "Message d'erreur sur stderr.\n";

       write(STDOUT_FILENO, msg_out, strlen(msg_out));
       write(STDERR_FILENO, msg_err, strlen(msg_err));

       return 0;
   }
   ```

2. Compilez : `gcc -Wall -o std-fd std-fd.c`.
3. Testez :
   ```bash
   $ ./std-fd                      # les deux à l'écran
   $ ./std-fd > sortie.txt         # stderr reste à l'écran ; stdout dans sortie.txt
   $ ./std-fd 2> erreur.txt        # stdout reste à l'écran ; stderr dans erreur.txt
   $ ./std-fd > out.txt 2> err.txt # les deux redirigés
   ```

4. Vérifiez les contenus.
5. **Question** : pourquoi distinguer `stdout` et `stderr` ? Donnez un cas d’usage.

### Exercice 9 bis — Lire un descripteur avec `read()` ⭐

!!! tip "L'appel système `read()`"
    ```c
    ssize_t read(int fd, void *tampon, size_t taille);
    ```

    `read()` tente de lire au plus `taille` octets depuis le descripteur `fd`.
    Sa valeur de retour est **essentielle** :

    | Retour | Signification |
    |---|---|
    | `> 0` | nombre d'octets **réellement** lus — souvent **moins** que demandé |
    | `0` | fin de fichier (EOF) — plus rien à lire |
    | `-1` | erreur ; `errno` est positionné, `perror()` l'affiche |

    C'est la raison pour laquelle un `read()` s'utilise **toujours dans une boucle** :
    rien ne garantit qu'un seul appel suffise, en particulier sur un tube ou un
    terminal. Même remarque pour `write()`, qui peut écrire partiellement.

    > **Référence** : Kerrisk, M. (2010). *The Linux Programming Interface*.
    > No Starch Press. ISBN 978-1593272203, chapitre 4 (*File I/O: The Universal I/O Model*).

1.  Lisez `man 2 read`. Quel est le type de retour, et pourquoi n'est-il pas `int` ?

2.  Créez `echo-fd.c`, une version minimale de `cat` sans argument, qui recopie son
    entrée standard sur sa sortie standard **uniquement** avec `read()` et `write()` :

    ```c
    #include <unistd.h>    /* read, write, STDIN_FILENO, STDOUT_FILENO */
    #include <stdio.h>     /* perror */

    #define TAILLE 4096

    int main(void) {
        char tampon[TAILLE];
        ssize_t lus;

        while ((lus = read(STDIN_FILENO, tampon, TAILLE)) > 0) {
            ssize_t ecrits = 0;
            while (ecrits < lus) {                  // (i)
                ssize_t n = write(STDOUT_FILENO, tampon + ecrits, lus - ecrits);
                if (n < 0) { perror("write"); return 1; }
                ecrits += n;
            }
        }
        if (lus < 0) { perror("read"); return 1; }  // (ii)
        return 0;
    }
    ```

    1.  Boucle d'écriture : `write()` peut n'écrire qu'une **partie** du tampon. Tant
        que tout n'est pas écrit, on rappelle `write()` sur ce qu'il reste.
    2.  On distingue la fin de fichier (`0`, sortie normale de la boucle) de l'erreur
        (`-1`), qu'on signale avec `perror()`.

3.  Compilez et testez les trois situations :

    ```bash
    $ gcc -Wall -Wextra -o echo-fd echo-fd.c
    $ printf 'ligne A\nligne B\n' > src.txt
    $ ./echo-fd < src.txt
    $ printf 'x\ny\nz\n' | ./echo-fd | wc -l
    $ ./echo-fd
    ```

    Pour la dernière commande, tapez quelques lignes puis <kbd>Ctrl</kbd>+<kbd>D</kbd>.
    Quel `read()` renvoie alors `0` ?

4.  **Vérification sur un gros volume** — la boucle est-elle correcte ?

    ```bash
    $ head -c 100000 /dev/urandom > big.bin
    $ ./echo-fd < big.bin > out.bin
    $ cmp big.bin out.bin && echo "copie conforme"
    ```

5.  **Question d'analyse** : que se passerait-il si vous remplaciez la boucle
    `while (ecrits < lus)` par un simple `write(STDOUT_FILENO, tampon, lus);` ?
    Dans quel cas concret le bug se manifesterait-il ?

6.  **Question d'évaluation** : `TAILLE` vaut 4096. Que gagne-t-on à l'augmenter ?
    Que perd-on ? Quel critère guiderait votre choix en production ?

### Exercice 10 — Réimplémenter `>` en C avec `dup2()` ⭐

Quand vous tapez `./hello > sortie.txt`, le shell fait en interne :

1. Il ouvre `sortie.txt` en écriture (obtient par exemple le descripteur `3`).
2. Il **redirige** `STDOUT_FILENO` (descripteur 1) vers ce nouveau descripteur via `dup2(3, 1)`.
3. Il ferme le descripteur 3 (devenu redondant).
4. Il exécute `./hello`. Tout ce qui va sur `stdout` va maintenant dans `sortie.txt`.

**À vous de jouer :**

1. Lisez `man 2 dup`. Notez la signature de `dup` et `dup2`.
2. Créez `myredirect.c` :
   ```c
   #include <fcntl.h>
   #include <unistd.h>
   #include <stdio.h>

   int main(int argc, char **argv) {
       if (argc != 2) {
           fprintf(stderr, "Usage: %s <fichier-sortie>\n", argv[0]);
           return 1;
       }

       int fd = open(argv[1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
       if (fd < 0) { perror("open"); return 1; }

       if (dup2(fd, STDOUT_FILENO) < 0) {
           perror("dup2"); close(fd); return 1;
       }
       close(fd);

       /* À partir d'ici, printf écrit dans le fichier */
       printf("Ligne 1 redirigée.\n");
       printf("Ligne 2 redirigée.\n");
       printf("Ligne 3 redirigée.\n");

       return 0;
   }
   ```

3. Compilez et exécutez :
   ```bash
   $ gcc -Wall -o myredirect myredirect.c
   $ ./myredirect captures.txt
   $ cat captures.txt
   ```
   Les trois lignes doivent être dans `captures.txt` — **rien** dans le terminal.

4. **Questions d’analyse** :

      - Pourquoi appelle-t-on `close(fd)` immédiatement après `dup2` ?
      - Que se passerait-il si vous inversiez les arguments : `dup2(STDOUT_FILENO, fd)` ?
      - Modifiez le programme pour rediriger **`stderr`** au lieu de `stdout`. Quelle ligne changez-vous ?

### Exercice 10 bis — `dup()` : deux noms pour le même fichier ouvert ⭐

!!! tip "`dup()` et la table des descripteurs"
    ```c
    int dup(int ancien);          /* renvoie le plus petit descripteur libre */
    int dup2(int ancien, int nouveau);
    ```

    `dup()` crée une **seconde entrée** dans la table des descripteurs du processus,
    qui désigne **la même description de fichier ouvert** que l'originale. Les deux
    descripteurs partagent donc la **même position de lecture/écriture** (*offset*) et
    les mêmes drapeaux d'état.

    C'est exactement ce qui distingue `dup()` d'un second `open()` sur le même fichier :
    deux `open()` créent deux descriptions **indépendantes**, avec deux offsets séparés.

1.  Créez `mondup.c` :

    ```c
    #include <fcntl.h>
    #include <unistd.h>
    #include <string.h>
    #include <stdio.h>

    static void ecrire(int fd, const char *s) { write(fd, s, strlen(s)); }

    int main(void) {
        int fd = open("journal.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd < 0) { perror("open"); return 1; }

        int copie = dup(fd);                       // (i)
        if (copie < 0) { perror("dup"); close(fd); return 1; }

        printf("fd = %d, copie = %d\n", fd, copie);

        ecrire(fd,    "1 - ecrit via fd\n");
        ecrire(copie, "2 - ecrit via copie\n");   // (ii)

        close(fd);
        ecrire(copie, "3 - fd ferme, copie toujours valide\n");  // (iii)
        close(copie);
        return 0;
    }
    ```

    1.  `dup()` renvoie le **plus petit descripteur disponible**. Les descripteurs 0, 1
        et 2 étant déjà pris, attendez-vous à obtenir 3 puis 4.
    2.  Cette écriture ne repart **pas** du début du fichier : l'offset est partagé
        avec `fd`.
    3.  Fermer `fd` ne ferme pas le fichier : la description reste vivante tant qu'au
        moins un descripteur la référence.

2.  Compilez, exécutez, puis affichez le résultat :

    ```bash
    $ gcc -Wall -Wextra -o mondup mondup.c
    $ ./mondup
    $ cat journal.txt
    ```

    Quels numéros obtenez-vous pour `fd` et `copie` ? Les trois lignes se
    suivent-elles, ou se sont-elles écrasées ?

3.  **Question d'analyse** : remplacez `int copie = dup(fd);` par un second
    `int copie = open("journal.txt", O_WRONLY);`. Recompilez, relancez, observez
    `journal.txt`. Expliquez la différence à partir de la notion d'offset partagé.

4.  **Question de synthèse** : `dup2(fd, 1)` équivaut à « fermer 1 s'il est ouvert,
    puis dupliquer `fd` sur 1 ». Écrivez cette opération **sans** `dup2()`, en
    utilisant seulement `close()` et `dup()`. Pourquoi cette version est-elle
    dangereuse dans un programme multithread ? *(Indice : que se passe-t-il si un
    autre fil d'exécution ouvre un fichier entre le `close()` et le `dup()` ?)*

!!! info "Vers le TP4"
    Vous venez de réimplémenter le mécanisme exact que le shell utilise pour `commande > fichier`. Au **TP4** vous verrez le shell exploiter ce mécanisme via `fork` + `dup2` + `exec`, ainsi que les signaux qui interrompent un processus.

    > **Référence** : Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203, chapitre 5 (File I/O: Further Details), §5.4 *Duplicating File Descriptors*.

---

## Pour aller plus loin (lectures recommandées)

- *GCC User Manual* : <https://gcc.gnu.org/onlinedocs/>
- Kernighan, B. W., & Ritchie, D. M. (1988). *The C Programming Language*, 2nd ed. Prentice Hall. ISBN 978-0131103627.
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN 978-1593272203.
- Robbins, A., Hannah, E., & Lamb, L. (2008). *Learning the bash Shell*, 3rd ed. O’Reilly. ISBN 978-0596009656.
- Stevens, W. R., & Rago, S. A. (2013). *Advanced Programming in the UNIX Environment*, 3rd ed. Addison-Wesley. ISBN 978-0321637734.
