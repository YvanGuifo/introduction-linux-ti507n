---
title: FAQ — Problèmes courants
---

# FAQ — Problèmes courants et erreurs fréquentes

!!! tip "Comment utiliser cette page"
    Utilisez <kbd>Ctrl+F</kbd> pour rechercher le message d'erreur exact que vous rencontrez. Chaque problème est accompagné de son **explication** et de sa **solution**.

---

## Erreurs de permissions

### `Permission denied`

```
bash: ./mon_script.sh: Permission denied
```

**Cause** : le fichier n'a pas le droit d'exécution (`x`) pour votre utilisateur.

**Solution** :

```bash
$ chmod u+x mon_script.sh
$ ./mon_script.sh
```

→ Voir [TP2 — Permissions](./tp2.md)

---

### `Permission denied` sur un répertoire

```
bash: cd: /root: Permission denied
```

**Cause** : vous n'avez pas le droit de traversée (`x`) sur ce répertoire, ou pas le droit de lecture (`r`) pour lister son contenu.

**Solution** : vérifiez les permissions avec `ls -ld /chemin/du/repertoire`. Si le répertoire appartient à `root`, utilisez `sudo` (avec précaution).

→ Voir [TP2 — Permissions sur les répertoires](./tp2.md)

---

### `Operation not permitted`

```
rm: cannot remove '/etc/hosts': Operation not permitted
```

**Cause** : le fichier appartient à `root` et vous n'avez pas les privilèges suffisants.

**Solution** : utilisez `sudo` uniquement si vous savez ce que vous faites :

```bash
$ sudo rm /etc/hosts   # ⚠️ Dangereux ! Ne faites pas cela sur un fichier système.
```

!!! danger "Attention"
    `sudo` exécute la commande avec les droits administrateur. Une erreur avec `sudo` peut rendre le système inutilisable. Ne l'utilisez que quand c'est nécessaire et en comprenant la commande.

---

## Erreurs de commandes

### `command not found`

```
bash: gcc: command not found
```

**Causes possibles** :

1. **Le programme n'est pas installé.**
   ```bash
   $ sudo apt update && sudo apt install build-essential   # pour gcc
   ```

2. **Le programme n'est pas dans le `$PATH`.**
   ```bash
   $ echo $PATH                    # vérifiez les répertoires listés
   $ which mon_programme           # cherchez l'emplacement
   $ type mon_programme            # distinction interne/externe
   ```

3. **Faute de frappe dans le nom de la commande.**
   ```bash
   $ lls                           # ❌ erreur de frappe
   $ ls                            # ✅ correct
   ```

→ Voir [TP2 — PATH](./tp2.md), [TP3 — Variables](./tp3.md)

---

### `No such file or directory`

```
bash: cd: mon_dossier: No such file or directory
```

**Causes possibles** :

1. **Le fichier ou répertoire n'existe pas.** Vérifiez avec `ls`.
2. **Erreur dans le chemin** (relatif vs absolu, faute de frappe).
   ```bash
   $ pwd                           # où suis-je ?
   $ ls -la                        # qu'y a-t-il ici ?
   ```
3. **Casse incorrecte.** Linux distingue majuscules et minuscules : `Documents` ≠ `documents`.

---

### `Is a directory`

```
cat: tp_shell: Is a directory
```

**Cause** : vous essayez d'utiliser une commande prévue pour les fichiers sur un répertoire.

**Solution** : utilisez `ls` pour lister un répertoire, pas `cat` :

```bash
$ ls tp_shell/                     # ✅ lister le contenu
$ cat tp_shell/fichier.txt         # ✅ afficher un fichier dedans
```

---

### `Not a directory`

```
bash: cd: fichier.txt: Not a directory
```

**Cause** : vous essayez de `cd` dans un fichier au lieu d'un répertoire.

**Solution** : vérifiez le type avec `ls -l` (la première lettre : `d` = répertoire, `-` = fichier).

---

## Erreurs du shell

### Le terminal semble bloqué (pas de prompt)

**Causes possibles** :

1. **Une commande attend une entrée** (ex. `cat` sans argument lit stdin).
   - **Solution** : appuyez sur <kbd>Ctrl+D</kbd> (fin de fichier) ou <kbd>Ctrl+C</kbd> (interruption).

2. **Un programme tourne en avant-plan** (ex. `sleep 1000`).
   - **Solution** : <kbd>Ctrl+C</kbd> pour l'arrêter, ou <kbd>Ctrl+Z</kbd> puis `bg` pour le passer en arrière-plan.

3. **Vous êtes dans `man` ou `less`.**
   - **Solution** : appuyez sur <kbd>q</kbd> pour quitter.

→ Voir [TP4 — Processus et signaux](./tp4.md)

---

### `Syntax error near unexpected token`

```
bash: syntax error near unexpected token `('
```

**Cause** : le shell interprète des caractères spéciaux que vous n'avez pas protégés.

**Solution** : utilisez des guillemets ou des antislashs pour inhiber les caractères spéciaux :

```bash
$ echo "Hello (world)"            # ✅ guillemets doubles
$ echo Hello \(world\)            # ✅ antislash
```

→ Voir [TP3 — Inhibitions](./tp3.md)

---

### Le `$` du prompt a été copié-collé

```
bash: $: command not found
```

**Cause** : vous avez copié le `$` du prompt en même temps que la commande depuis le sujet du TP.

**Solution** : le `$` dans les énoncés représente le prompt — ne le tapez pas. Tapez uniquement la commande qui suit :

```bash
$ ls -l          # ❌ si vous copiez "$ ls -l"
ls -l            # ✅ tapez seulement ceci
```

---

### Guillemets non fermés (prompt `>`)

```
$ echo "hello
>
>
```

**Cause** : le shell attend la fermeture d'un guillemet (`"` ou `'`).

**Solution** : fermez le guillemet manquant, ou annulez avec <kbd>Ctrl+C</kbd> :

```bash
$ echo "hello"                     # ✅ guillemet fermé
```

---

## Erreurs de compilation (TP3)

### `undefined reference to 'main'`

```
/usr/bin/ld: undefined reference to `main'
```

**Cause** : votre programme C n'a pas de fonction `main()`, ou vous compilez le mauvais fichier.

**Solution** : vérifiez que `main()` est bien définie dans votre code source :

```c
int main(void) {       // ✅ point d'entrée obligatoire
    return 0;
}
```

---

### `expected ';' before`

```
hello.c:5:1: error: expected ';' before '}' token
```

**Cause** : il manque un point-virgule à la fin d'une instruction.

**Solution** : chaque instruction C se termine par `;`. Vérifiez la ligne indiquée et la ligne précédente.

---

### `implicit declaration of function`

```
hello.c:4:5: warning: implicit declaration of function 'printf'
```

**Cause** : vous utilisez une fonction sans inclure son fichier d'en-tête.

**Solution** : ajoutez le `#include` approprié en haut du fichier :

```c
#include <stdio.h>     // pour printf, scanf, etc.
#include <stdlib.h>    // pour malloc, exit, etc.
#include <string.h>    // pour strlen, strcpy, etc.
```

→ Voir [TP3 — Compilation](./tp3.md)

---

## Erreurs de redirections et tubes (TP4)

### `ambiguous redirect`

```
bash: fichier: ambiguous redirect
```

**Cause** : le nom du fichier de redirection contient des espaces non protégés ou une variable non définie.

**Solution** :

```bash
$ echo hello > "mon fichier.txt"   # ✅ guillemets autour du nom
$ echo hello > $FICHIER            # ❌ si $FICHIER est vide ou contient des espaces
$ echo hello > "$FICHIER"          # ✅ toujours protéger les variables
```

---

### Le fichier de sortie est vide après `>`

**Cause** : `>` **écrase** le fichier avant d'écrire. Si vous redirigez un fichier vers lui-même, il est d'abord vidé :

```bash
$ sort fichier.txt > fichier.txt   # ❌ fichier vidé puis trié (résultat : vide !)
$ sort fichier.txt > fichier_trié.txt  # ✅ utiliser un fichier différent
```

---

### `Broken pipe`

```
$ commande1 | commande2
bash: commande1: Broken pipe
```

**Cause** : `commande2` s'est terminée avant que `commande1` ait fini d'écrire.

**Solution** : ce message est souvent bénin (ex. `cat gros_fichier | head -5`). Le résultat est généralement correct malgré le message.

→ Voir [TP4 — Tubes](./tp4.md)

---

## Problèmes courants avec WSL

### WSL ne démarre pas

```
WslRegisterDistribution failed with error: 0x80370102
```

**Cause** : la virtualisation n'est pas activée dans le BIOS/UEFI.

**Solution** : redémarrez l'ordinateur, entrez dans le BIOS (souvent <kbd>F2</kbd>, <kbd>F12</kbd> ou <kbd>Suppr</kbd> au démarrage) et activez **Intel VT-x** ou **AMD-V**.

→ Voir [Installation WSL](./installation-wsl.md)

---

### Pas d'accès réseau depuis WSL

```
wget: unable to resolve host address
```

**Solution** :

```bash
$ sudo nano /etc/resolv.conf
```

Ajoutez ou modifiez la ligne :

```
nameserver 8.8.8.8
```

---

### Les fichiers Windows sont où dans WSL ?

Les disques Windows sont montés automatiquement :

```bash
$ cd /mnt/c/Users/VotreNom/        # accès au disque C:
$ ls /mnt/d/                        # accès au disque D: (si présent)
```

Et depuis Windows, les fichiers WSL sont accessibles via : `\\wsl$\Debian\home\votre_user\`

!!! warning "Attention aux fins de ligne"
    Les fichiers créés sous Windows utilisent `\r\n` (CRLF), ceux sous Linux `\n` (LF). Cela peut causer des erreurs avec des scripts shell. Utilisez `dos2unix` pour convertir :
    ```bash
    $ sudo apt install dos2unix
    $ dos2unix mon_script.sh
    ```

---

## Bonnes pratiques pour éviter les erreurs

!!! tip "Réflexes à adopter"
    1. **Lisez le message d'erreur en entier** — il indique presque toujours la cause et le fichier/la ligne concernés.
    2. **Utilisez `man` et `--help`** avant de tenter une commande inconnue.
    3. **Utilisez <kbd>Tab</kbd>** pour la complétion — moins de fautes de frappe.
    4. **Testez sur un fichier sans importance** avant de manipuler des données réelles.
    5. **Ne copiez pas le `$`** des énoncés de TP.
    6. **Préférez les chemins absolus** quand vous avez un doute sur le répertoire courant.
    7. **`sudo` n'est pas la solution par défaut** — comprenez d'abord pourquoi la permission est refusée.
