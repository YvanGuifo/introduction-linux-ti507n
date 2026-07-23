---
title: Quelques commandes supplémentaires
---

!!! info "Objectifs pédagogiques"

    À l’issue de ce TP, l’étudiant sera capable de :
    
    - Renforcer la maîtrise des redirections et tubes dans le shell.
    - Utiliser les filtres textuels classiques (`grep`, `sort`, `cut`, `uniq`, `tr`, `head`, `tail`, etc.).
    - Enchaîner plusieurs commandes avec des redirections et des tubes.
    - Appliquer des filtres sur des fichiers textuels en combinant des options.
    - Manipuler efficacement les entrées/sorties dans des scénarios concrets.
    - Approfondir l’utilisation de `grep` pour rechercher dans des arborescences de fichiers.
    - Apprendre à extraire des informations spécifiques de fichiers système (`/etc`, `/usr/include`, etc.).


!!! info "Indications"
    Les exercices suivants sont des exercices supplémentaires pour vous entraîner et voir d'autres utilisations des tubes et des redirections. 

!!! tip "Barème d’interprétation des exercices"

    > 📚 = Facile · 📚📚 = Moyenne · 📚📚📚 = Élevée

!!! tip "Filtres textuels"
    Les *filtres textuel* sont des commandes qui lisent ou peuvent lire depuis leur entrée standard et écrivent des données modifiées sur leur sortie standard. 

    En voici quelques-uns parmi les plus courants :

     - `head` : affiche les premières lignes de son entrée ;
     - `tail` : affiche les dernières lignes de son entrée. Avec l’option -f (pour follow, continuer à afficher la fin du fichier quand il est mis à jour) c’est l’une des commandes préférées des administrateurs systèmes ;
     - `grep` : une des commandes les plus connues, affiche des lignes correspondant à une chaîne, ou plus généralement une expression rationnelle dans son entrée ;
     - `cut` : sélectionne des champs ou des caractères dans chaque ligne de l’entrée standard ;
     - `sort` : trie son entrée standard suivant des critères.
     - `tr` : remplace des caractères dans son entrée standard.
     - `uniq` : supprime les lignes consécutives identiques dans son entrée standard.
  
  ---

### Exercice 1 — Frère Jacques 📚

1. Créer un fichier `fj` contenant ces lignes :
    ```bash
    Frère Jaques, 
    Frère Jacques,                    
    Dormez-vous,
    Dormez-vous,
    Sonnez les matines,
    Sonnez les matines !
    Ding !
    Ding ! 
    Dong !
    ```
    avec la commande `echo` (**le caractère `<newline>` correspond à la touche entrée de votre clavier**):
    ```bash
    $ echo 'Frère Jaques,<newline> 
    > Frère Jacques,<newline>                     
    > Dormez-vous,<newline> 
    > Dormez-vous,<newline> 
    > Sonnez les matines,<newline> 
    > Sonnez les matines !<newline> 
    > Ding !<newline> 
    > Ding !<newline> 
    > Dong !' > fj
    ```
2. Testez ensuite les commandes suivantes et observez leur résultats:
    ```bash
    $ cat fj 
    $ head fj
    $ tail fj
    $ head -n 2 fj
    $ tail -n 3 fj
    $ grep "Dormez" fj
    $ grep -v "Dormez" fj
    $ grep "dormez" fj
    $ grep -i "dormez" fj
    $ sort fj 
    $ uniq fj
    $ cut -c 1 fj
    $ cut -c 2 fj
    $ cut -c 1-3 fj
    $ cut -d ' ' -f 1 fj
    $ cut -d ' ' -f 1,2 fj
    ```
    - Où sont affichés les résultats ?
    - À quoi servent les options `-n` de `head` et `tail` ? 
    - À quoi sert l'option `-v` de `grep` ? À quoi sert l'option `-i` de `grep` ?
    - À quoi servent les options `-c` et `-d` de `cut` ?


### Exercice 2 — Trier les fichiers 📚📚📚

!!! tip "Nom de base"
    Le nom de base d'un fichier est le nom du fichier sans son extension. Par exemple le nom de base du fichier `/usr/include/stdio.h` est `stdio`.

Dans cet exercice, nous voudrions afficher sur le terminal le nom de base des 10 fichiers les plus légers (en taille en octets) parmi les fichier `.h ` du répertoire `/usr/include`.

En utilisant les commandes `wc`, `sort`, `cut`, `head` (ou éventuellement `tail`), et les redirections par tube, écrivez une commande qui affiche le nom de base des 10 fichiers les plus légers parmi les fichiers `.h` du répertoire `/usr/include`.

!!! info "Indication"

    - L'option `-c` de `wc` vous donne le nombre d'octets d'un fichier.
    - L'option `-n` de `sort` vous permet de trier les lignes d'un fichier par ordre numérique.
    - L'option `-d` de `tr` supprime les caractères reçus en premiers argument au lieu de les remplacer.

Si vous avez installé `gcc`, vous devriez avoir :
```bash
pool
wait
syslog
syscall
lastlog
termio
stab
memory
re_comp
alloca
```
### Exercice 3 — Plus sur `grep` 📚📚

!!! tip "Passer un répertoire en argument de `grep`"
    
    - L'option `-r` de `grep` permet de passer un répertoire en argument. Et lui demande de chercher dans tous les fichiers de ce répertoire.
    - L'option `-l` de `grep` permet de n'afficher que le nom des fichiers qui contiennent la chaîne recherchée.

En utilisant `grep` et éventuellement d'autres commandes, trouvez une ligne de commande qui permet de:

1. Afficher la valeur de `RAND_MAX` (c'est une constante de la librairie standard de C). 
2. Afficher le chemin absolu des fichiers qui contiennent de la chaîne `127.0.0.1` dans les fichiers de `/etc`.
3. Afficher uniquement le nom des fichiers qui contiennent de la chaîne `127.0.0.1` dans les fichiers de `/etc`. (indice : il existe une commande qui s'appelle `rev`).
4. Affiche le chemin du répertoire personnel de l'utilisateur `games`.

---

## ⭐ Exercices supplémentaires

!!! star "À qui s'adressent les exercices 4, 5, 6 ?"
    Vous avez terminé les exercices 1 à 3 ? Ces trois exercices approfondissent les **filtres textuels** et les **tubes** en vous faisant découvrir `sed`, `awk` et l'écriture d'un script d'extraction de données complet.

    Les niveaux taxonomiques visés sont **[Analyser]**, **[Évaluer]** et **[Créer]** (Bloom révisé).

    Ces exercices sont **optionnels** et **non évalués**.

### Exercice 4 — Transformations avec `sed` ⭐

!!! tip "L'éditeur de flux `sed`"
    `sed` (*stream editor*) applique des transformations ligne par ligne sur un flux de texte. La syntaxe la plus courante est la substitution :

    ```bash
    $ sed 's/motif/remplacement/' fichier
    ```

    - `s` = substitution ; `g` en fin = remplacer **toutes** les occurrences sur la ligne.
    - `sed` ne modifie pas le fichier original (sauf avec `-i`).

    > **Référence** : Dale Dougherty & Arnold Robbins (1997). *sed & awk*, 2nd ed. O'Reilly. ISBN 978-1565922259.

1. Créez un fichier `utilisateurs.txt` :
   ```bash
   $ cut -d: -f1,3,6 /etc/passwd > utilisateurs.txt
   $ cat utilisateurs.txt
   ```
   Ce fichier contient `nom:UID:home` pour chaque utilisateur.

2. Remplacez les `:` par des espaces pour une lecture plus facile :
   ```bash
   $ sed 's/:/ /g' utilisateurs.txt
   ```

3. Affichez uniquement les lignes dont l'UID (2ᵉ champ) est supérieur ou égal à 1000 (utilisateurs humains) :
   ```bash
   $ awk -F: '$2 >= 1000' utilisateurs.txt
   ```
   *(Aperçu de `awk` — détaillé à l'exercice 5.)*

4. Supprimez les lignes contenant `nologin` :
   ```bash
   $ sed '/nologin/d' /etc/passwd
   ```
   Que fait le `d` ? Combien de lignes restent par rapport à l'original ?

5. **Substitution avancée** : dans le fichier `fj` (exercice 1), remplacez toutes les occurrences de `Frère` par `Sœur` et redirigez le résultat dans `fj2` :
   ```bash
   $ sed 's/Frère/Sœur/g' fj > fj2
   $ cat fj2
   ```

6. **Question d'analyse** : quelle différence y a-t-il entre `sed 's/Dormez/Réveillez/' fj` et `sed 's/Dormez/Réveillez/g' fj` ? Testez les deux sur le fichier `fj`.

### Exercice 5 — Extraction structurée avec `awk` ⭐

!!! tip "Le langage `awk`"
    `awk` traite des fichiers structurés **champ par champ**. Il découpe chaque ligne selon un séparateur (espace par défaut, `-F` pour changer) et rend les champs accessibles via `$1`, `$2`, etc. (`$0` = la ligne entière).

    ```bash
    $ awk -F: '{ print $1, $3 }' /etc/passwd
    ```

    `awk` peut aussi faire des calculs, des conditions et des boucles.

    > **Référence** : Aho, A. V., Kernighan, B. W., & Weinberger, P. J. (1988). *The AWK Programming Language*. Addison-Wesley. ISBN 978-0201079814.

1. Affichez le nom d'utilisateur et le shell de connexion (champs 1 et 7) de `/etc/passwd` :
   ```bash
   $ awk -F: '{ print $1, $7 }' /etc/passwd
   ```

2. Affichez uniquement les utilisateurs dont le shell est `/bin/bash` :
   ```bash
   $ awk -F: '$7 == "/bin/bash" { print $1 }' /etc/passwd
   ```

3. Comptez le nombre d'utilisateurs dont l'UID (champ 3) est supérieur ou égal à 1000 :
   ```bash
   $ awk -F: '$3 >= 1000 { count++ } END { print count }' /etc/passwd
   ```
   Que font `count++` et le bloc `END` ?

4. Affichez un tableau formaté des utilisateurs humains (UID ≥ 1000) avec en-tête :
   ```bash
   $ awk -F: 'BEGIN { printf "%-15s %-6s %s\n", "NOM", "UID", "HOME" }
              $3 >= 1000 { printf "%-15s %-6s %s\n", $1, $3, $6 }' /etc/passwd
   ```

5. **Analyse de logs** : créez un fichier `acces.log` simulé :
   ```bash
   $ echo "2025-01-15 alice connexion
   2025-01-15 bob connexion
   2025-01-15 alice déconnexion
   2025-01-16 alice connexion
   2025-01-16 charlie connexion
   2025-01-16 bob connexion
   2025-01-16 alice déconnexion" > acces.log
   ```
   Avec `awk`, comptez le nombre de connexions par utilisateur :
   ```bash
   $ awk '$3 == "connexion" { c[$2]++ } END { for (u in c) print u, c[u] }' acces.log
   ```

6. **Question d'évaluation** : dans quel cas préférez-vous `cut` à `awk` ? Et inversement ? Donnez un exemple concret pour chaque.

### Exercice 6 — Script d'analyse de `/etc/passwd` ⭐

Cet exercice combine `grep`, `cut`, `sort`, `wc`, `awk` et `sed` dans un script complet.

1. Créez le script `analyse-passwd.sh` :
   ```bash
   #!/bin/bash
   # Analyse du fichier /etc/passwd — Commandes supplémentaires étoile

   FICHIER="/etc/passwd"

   echo "========================================="
   echo "  ANALYSE DE $FICHIER"
   echo "  Date : $(date)"
   echo "========================================="
   echo ""

   # 1. Nombre total d'utilisateurs
   total=$(wc -l < "$FICHIER")
   echo "1. Nombre total d'utilisateurs : $total"
   echo ""

   # 2. Utilisateurs humains (UID >= 1000)
   echo "2. Utilisateurs humains (UID >= 1000) :"
   awk -F: '$3 >= 1000 { printf "   - %-15s (UID: %s, home: %s)\n", $1, $3, $6 }' "$FICHIER"
   humains=$(awk -F: '$3 >= 1000' "$FICHIER" | wc -l)
   echo "   Total : $humains"
   echo ""

   # 3. Répartition des shells de connexion
   echo "3. Répartition des shells :"
   cut -d: -f7 "$FICHIER" | sort | uniq -c | sort -rn
   echo ""

   # 4. Utilisateurs sans shell de connexion (nologin ou false)
   echo "4. Utilisateurs sans shell interactif :"
   grep -E "nologin|/bin/false" "$FICHIER" | cut -d: -f1 | tr '\n' ', '
   echo ""
   echo ""

   # 5. Comptes système (UID < 100)
   systeme=$(awk -F: '$3 < 100' "$FICHIER" | wc -l)
   echo "5. Comptes système (UID < 100) : $systeme"

   echo ""
   echo "========================================="
   echo "  FIN DE L'ANALYSE"
   echo "========================================="
   ```

2. Rendez-le exécutable et lancez-le :
   ```bash
   $ chmod +x analyse-passwd.sh
   $ ./analyse-passwd.sh
   ```

3. **Amélioration 1** : ajoutez une section qui détecte les utilisateurs ayant le même shell que `root`. *(Indice : récupérez d'abord le shell de root avec `grep`, puis cherchez les autres utilisateurs ayant ce même shell.)*

4. **Amélioration 2** : modifiez le script pour qu'il accepte un fichier en argument (`$1`) au lieu de toujours analyser `/etc/passwd`. Si aucun argument n'est fourni, utilisez `/etc/passwd` par défaut :
   ```bash
   FICHIER="${1:-/etc/passwd}"
   ```
   Que signifie la syntaxe `${1:-valeur}` ?

5. **Question d'évaluation** : dans la section 4 du script, pourquoi utilise-t-on `tr '\n' ','` ? Que se passerait-il sans cette commande ? Proposez une alternative avec `paste`.
