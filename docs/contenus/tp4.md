---
title: TP4 - Redirections et tubes
---

Objectif: écrire une suite de commandes sans puis avec tubes qui permet d'afficher (ou de créer
un fichier contenant) les noms et nombre de lignes des n fichiers contenant le
plus de lignes parmi une liste de noms de fichiers fournis dans plusieurs fichiers d'entrée

1/ [utilisation basique de >] Créer un fichier nommé fichiersinclude contenant les noms de tous les
 fichiers du répertoire /usr/include dont l'extension est ".h"
-> ls /usr/include/*.h > fichiersinclude

2/ après exécution de la commande:
 ls /bin/ls /bin/cp /bin/prog.c > f1 2> f2
que contiennent les fichiers f1 et f2 ?
 et après exécution de la commande ?
 ls /bin/ls /bin/cp /bin/prog.c 1> f1 2> f2
quel est l'intérêt de la commande:
ls /bin/ls /bin/cp /bin/prog.c 2> f2
que fait la commande:
ls /bin/ls /bin/cp /bin/prog.c 2> /dev/null

3/ Que font les commandes suivantes:
wc -l fichiersinclude
-> affiche le nombre de lignes de fichiersinclude (e.g. nb fichiers .h dans /usr/include)
wc -l < fichiersinclude
-> idem
wc -l $(cat fichiersinclude)
-> affiche le nombre de lignes de CHACUN des fichiers dont le nom est dans
le fichier fichiersinclude
ls -l fichiersinclude
-> affiche les caractéristiques du fichier fichiersinclude
ls -l < fichiersinclude
-> même effet que ls -l car ls ne traite pas l'entrée standard
(la redirection est ignorée)
ls -l $(cat fichiersinclude)
-> affiche les caractéristiques de CHACUN des fichiers dont le nom est dans
le fichier fichiersinclude

4/ Ecrire un script redls qui utilise la commande ls (avec les mêmes options que ls)
pour afficher les caractéristiques de tous les fichiers dont les noms sont transmis
sur son entrée standard de sorte que:
redls -l < fichiersinclude
produise le même effet que:
ls -l $(cat fichiersinclude)

En déduire un script redwc tel que:
redwc -l < fichiersinclude
produise le même effet que:
wc -l $(cat fichiersinclude)

A l'aide de cette commande créer un fichier fichiersincludenbl contenant
sur chaque ligne: le nom d'un fichier de fichiersinclude et le nombre de lignes
de ce fichier

5/ La commande sort permet de trier les lignes d'un fichier texte par ordre
croissant ou décroissant (evec l'option -r). Utiliser la commande sort pour trier
le fichier fichiersincludenbl obtenu précédemment dans un nouveau fichiers
fichinclnblsort. En consultant le manuel
déterminer si sort peut accépter le fichier à trier sur son entrée standard

6/ Les commandes head et tail permettent respectivement d'afficher les n
premières ou n dernières lignes d'un fichier. Après consultation du manuel
écrire une commande permettant d'afficher les 30 fichiers de fichiersinclude
contenant le plus grand nombre de lignes. En déduire un script prenant en paramètre
un entier n et un fichier contenant des noms de fichier et affichant en sortie
la liste des n fichiers contenant le plus grand nombre de ligne avec le nombre
de lignes de chaque fichier.

7/ En utilisant les tubes écrire UNE ligne de commandes permettant d'obtenir le
même résultat que le script de la question précédente. Cette commande ne devra
contenir aucune redirection et ne devra utiliser aucun fichier intermédiaire
->  cat fichiersinclude | redwc -l | sort -nr | head -n 30
