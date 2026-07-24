---
title: Mémo des commandes
---

# Mémo des commandes Linux

!!! tip "Utilisation"
    Cette page regroupe toutes les commandes vues dans les TPs. Utilisez <kbd>Ctrl+F</kbd> pour rechercher rapidement une commande.

---

## TP1 — Premières commandes

### Navigation et arborescence

| Commande | Description | Exemple |
|----------|-------------|---------|
| `pwd` | Affiche le répertoire courant | `pwd` |
| `cd` | Change de répertoire | `cd /home/user` |
| `cd ..` | Remonte d'un niveau | `cd ..` |
| `cd ~` | Retourne au répertoire personnel | `cd ~` |
| `cd -` | Retourne au répertoire précédent | `cd -` |
| `ls` | Liste le contenu d'un répertoire | `ls -la` |
| `ls -l` | Liste détaillée (permissions, taille…) | `ls -l /etc` |
| `ls -a` | Affiche les fichiers cachés | `ls -a` |
| `ls -R` | Liste récursive | `ls -R /home` |

### Manipulation de fichiers et répertoires

| Commande | Description | Exemple |
|----------|-------------|---------|
| `touch` | Crée un fichier vide (ou met à jour la date) | `touch fichier.txt` |
| `mkdir` | Crée un répertoire | `mkdir dossier` |
| `mkdir -p` | Crée un répertoire et ses parents | `mkdir -p a/b/c` |
| `cp` | Copie un fichier | `cp source.txt dest.txt` |
| `cp -r` | Copie un répertoire récursivement | `cp -r dossier/ copie/` |
| `mv` | Déplace ou renomme | `mv ancien.txt nouveau.txt` |
| `rm` | Supprime un fichier | `rm fichier.txt` |
| `rm -r` | Supprime un répertoire récursivement | `rm -r dossier/` |
| `rm -i` | Supprime avec confirmation | `rm -i fichier.txt` |
| `rmdir` | Supprime un répertoire vide | `rmdir dossier/` |

### Aide et informations

| Commande | Description | Exemple |
|----------|-------------|---------|
| `man` | Affiche le manuel d'une commande | `man ls` |
| `help` | Aide pour les commandes internes du shell | `help cd` |
| `type` | Indique le type d'une commande | `type ls` |
| `which` | Localise l'exécutable d'une commande | `which python` |
| `whoami` | Affiche le nom de l'utilisateur courant | `whoami` |
| `hostname` | Affiche le nom de la machine | `hostname` |
| `uname -a` | Informations sur le système | `uname -a` |
| `date` | Affiche la date et l'heure | `date` |
| `cal` | Affiche un calendrier | `cal` |

### Affichage de contenu

| Commande | Description | Exemple |
|----------|-------------|---------|
| `cat` | Affiche le contenu d'un fichier | `cat fichier.txt` |
| `more` | Affiche page par page | `more fichier.txt` |
| `less` | Affiche avec navigation (mieux que `more`) | `less fichier.txt` |
| `head` | Affiche les premières lignes | `head -5 fichier.txt` |
| `tail` | Affiche les dernières lignes | `tail -10 fichier.txt` |
| `wc` | Compte les lignes, mots, caractères | `wc -l fichier.txt` |
| `echo` | Affiche un texte | `echo "Bonjour"` |

### Jokers (globbing)

| Joker | Description | Exemple |
|-------|-------------|---------|
| `*` | N'importe quelle chaîne (y compris vide) | `ls *.txt` |
| `?` | Exactement un caractère | `ls fichier?.txt` |
| `[abc]` | Un caractère parmi a, b ou c | `ls [aA]*.txt` |
| `[a-z]` | Un caractère dans l'intervalle a–z | `ls [0-9]*` |

### Raccourcis clavier du terminal

| Raccourci | Action |
|-----------|--------|
| <kbd>Tab</kbd> | Auto-complétion |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Historique des commandes |
| <kbd>Ctrl+C</kbd> | Interrompre la commande en cours |
| <kbd>Ctrl+L</kbd> | Effacer l'écran |
| <kbd>Ctrl+U</kbd> | Effacer la ligne avant le curseur |
| <kbd>Ctrl+D</kbd> | Fin de saisie (EOF) / déconnexion |
| <kbd>Ctrl+R</kbd> | Recherche dans l'historique |

---

## TP2 — Système de fichiers et permissions

### Liens et inodes

| Commande | Description | Exemple |
|----------|-------------|---------|
| `ln` | Crée un lien physique (hard link) | `ln fichier.txt lien` |
| `ln -s` | Crée un lien symbolique (symlink) | `ln -s fichier.txt lien` |
| `ls -i` | Affiche les numéros d'inode | `ls -i` |
| `stat` | Informations détaillées sur un fichier | `stat fichier.txt` |
| `file` | Identifie le type d'un fichier | `file image.png` |
| `find` | Recherche de fichiers | `find / -name "*.conf"` |

### Permissions

| Commande | Description | Exemple |
|----------|-------------|---------|
| `chmod` | Modifie les permissions | `chmod 755 script.sh` |
| `chmod u+x` | Ajoute l'exécution pour le propriétaire | `chmod u+x script.sh` |
| `chmod go-w` | Retire l'écriture pour groupe et autres | `chmod go-w fichier.txt` |
| `chown` | Change le propriétaire | `chown user:group fichier` |
| `chgrp` | Change le groupe | `chgrp staff fichier` |
| `umask` | Définit le masque de permissions par défaut | `umask 022` |

### Notation des permissions

| Valeur | Permission | Signification |
|--------|-----------|---------------|
| `r` = 4 | Lecture | Lire le contenu |
| `w` = 2 | Écriture | Modifier le contenu |
| `x` = 1 | Exécution | Exécuter (fichier) / traverser (répertoire) |
| `755` | `rwxr-xr-x` | Propriétaire : tout · Autres : lecture + exécution |
| `644` | `rw-r--r--` | Propriétaire : lecture + écriture · Autres : lecture |

---

## TP3 — Environnement de travail et compilateur C

### Variables et environnement

| Commande | Description | Exemple |
|----------|-------------|---------|
| `env` | Affiche les variables d'environnement | `env` |
| `printenv` | Affiche une variable spécifique | `printenv HOME` |
| `export` | Définit une variable d'environnement | `export MA_VAR="valeur"` |
| `unset` | Supprime une variable | `unset MA_VAR` |
| `set` | Affiche toutes les variables (shell + env) | `set` |
| `echo $VAR` | Affiche la valeur d'une variable | `echo $PATH` |
| `alias` | Crée un raccourci de commande | `alias ll='ls -la'` |
| `unalias` | Supprime un alias | `unalias ll` |
| `source` | Exécute un script dans le shell courant | `source ~/.bashrc` |

### Variables importantes

| Variable | Rôle |
|----------|------|
| `$HOME` | Répertoire personnel |
| `$PATH` | Répertoires de recherche des commandes |
| `$USER` | Nom de l'utilisateur |
| `$SHELL` | Shell par défaut |
| `$PWD` | Répertoire courant |
| `$PS1` | Format de l'invite de commande |
| `$?` | Code retour de la dernière commande |

### Inhibition des caractères spéciaux

| Syntaxe | Effet |
|---------|-------|
| `\` | Échappe le caractère suivant |
| `'...'` | Inhibe tout (guillemets simples) |
| `"..."` | Inhibe tout sauf `$`, `` ` ``, `\` |

### Substitution et expansion

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| `$(cmd)` | Substitution de commande | `echo $(date)` |
| `` `cmd` `` | Substitution de commande (ancienne syntaxe) | `` echo `whoami` `` |
| `{a,b,c}` | Expansion d'accolades | `echo fichier{1,2,3}.txt` |
| `{1..5}` | Séquence numérique | `mkdir dir{1..5}` |

### Compilation C

| Commande | Description | Exemple |
|----------|-------------|---------|
| `gcc` | Compile un programme C | `gcc -o prog main.c` |
| `gcc -Wall` | Compile avec tous les avertissements | `gcc -Wall -o prog main.c` |
| `./prog` | Exécute un programme compilé | `./mon_programme` |

---

## TP4 — Redirections, processus et signaux

### Redirections

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| `>` | Redirige stdout vers un fichier (écrase) | `ls > liste.txt` |
| `>>` | Redirige stdout vers un fichier (ajoute) | `echo "fin" >> log.txt` |
| `<` | Redirige stdin depuis un fichier | `wc -l < fichier.txt` |
| `2>` | Redirige stderr vers un fichier | `cmd 2> erreurs.txt` |
| `2>&1` | Redirige stderr vers stdout | `cmd > tout.txt 2>&1` |
| `&>` | Redirige stdout et stderr | `cmd &> tout.txt` |
| `/dev/null` | Poubelle (ignore la sortie) | `cmd 2>/dev/null` |

### Tubes (pipes)

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| `\|` | Connecte la sortie d'une commande à l'entrée de la suivante | `ls -l \| grep ".txt"` |
| `tee` | Duplique la sortie (écran + fichier) | `ls \| tee liste.txt` |

### Filtres textuels

| Commande | Description | Exemple |
|----------|-------------|---------|
| `grep` | Recherche un motif dans un texte | `grep "erreur" log.txt` |
| `grep -i` | Recherche insensible à la casse | `grep -i "hello" fichier` |
| `grep -r` | Recherche récursive | `grep -r "TODO" src/` |
| `grep -n` | Affiche les numéros de ligne | `grep -n "main" prog.c` |
| `sort` | Trie les lignes | `sort fichier.txt` |
| `sort -n` | Tri numérique | `sort -n notes.txt` |
| `sort -r` | Tri inversé | `sort -r fichier.txt` |
| `uniq` | Supprime les doublons consécutifs | `sort fichier \| uniq` |
| `cut` | Extrait des colonnes | `cut -d: -f1 /etc/passwd` |
| `tr` | Remplace ou supprime des caractères | `echo "abc" \| tr 'a-z' 'A-Z'` |
| `sed` | Éditeur de flux | `sed 's/ancien/nouveau/g' fichier` |
| `awk` | Traitement de texte avancé | `awk '{print $1}' fichier` |

### Processus

| Commande | Description | Exemple |
|----------|-------------|---------|
| `ps` | Liste les processus du terminal | `ps` |
| `ps aux` | Liste tous les processus du système | `ps aux` |
| `top` | Moniteur de processus en temps réel | `top` |
| `htop` | Moniteur amélioré (si installé) | `htop` |
| `&` | Lance une commande en arrière-plan | `sleep 60 &` |
| `jobs` | Liste les tâches en arrière-plan | `jobs` |
| `fg` | Ramène une tâche au premier plan | `fg %1` |
| `bg` | Relance une tâche en arrière-plan | `bg %1` |
| <kbd>Ctrl+Z</kbd> | Suspend la tâche en cours | — |

### Signaux

| Commande | Description | Exemple |
|----------|-------------|---------|
| `kill` | Envoie un signal à un processus | `kill 1234` |
| `kill -9` | Force l'arrêt (SIGKILL) | `kill -9 1234` |
| `kill -l` | Liste tous les signaux | `kill -l` |
| `killall` | Tue les processus par nom | `killall firefox` |

### Signaux courants

| Signal | Numéro | Action par défaut |
|--------|--------|-------------------|
| `SIGHUP` | 1 | Terminaison (hangup) |
| `SIGINT` | 2 | Interruption (<kbd>Ctrl+C</kbd>) |
| `SIGQUIT` | 3 | Quit + core dump |
| `SIGKILL` | 9 | Terminaison forcée (non interceptable) |
| `SIGTERM` | 15 | Terminaison propre (par défaut) |
| `SIGSTOP` | 19 | Suspension (non interceptable) |
| `SIGTSTP` | 20 | Suspension (<kbd>Ctrl+Z</kbd>) |
| `SIGCONT` | 18 | Reprise d'un processus suspendu |
