---
title: TP<N> - <Titre court du TP>
---

<!--
================================================================================
 GABARIT PÉDAGOGIQUE - TI307 & TI307P - Introduction au système Linux
 Auteur : Dr. Yvan GUIFO FODJO — EFREI Paris — 2025–2026
 Contact : yvan.guifo-fodjo@efrei.fr

 Référentiels :
  - Anderson, L. W., & Krathwohl, D. R. (2001). A Taxonomy for Learning,
    Teaching, and Assessing. Longman. ISBN: 978-0801319037.
  - Biggs, J. (1996). Enhancing teaching through constructive alignment.
    Higher Education, 32(3), 347–364. DOI: 10.1007/BF00138871.
  - Sweller, J., Ayres, P., & Kalyuga, S. (2011). Cognitive Load Theory.
    Springer. DOI: 10.1007/978-1-4419-8126-4.

 RÈGLES DU GABARIT :
  1. Ne jamais retirer le bloc "Objectifs pédagogiques" en tête.
  2. Préserver la légende 📚 / 📚📚 / 📚📚📚 et ⭐.
  3. Chaque ⭐ doit pouvoir être sauté SANS impact sur l'évaluation principale.
  4. Chaque exercice de difficulté 📚📚📚 a une indication explicite
     (sous-questions guidées ou indices).
================================================================================
-->

# TP<N> — <Titre complet du TP>

!!! objectifs "Objectifs pédagogiques (taxonomie de Bloom révisée)"
    À l’issue de ce TP, vous serez capable de :

    - **[Appliquer]** <verbe + objet mesurable, ex. : utiliser `ls` avec ses options pour explorer une arborescence>
    - **[Appliquer]** <…>
    - **[Analyser]** <ex. : comparer le comportement de `cat`, `less` et `head` sur un même fichier>
    - **[Évaluer]** <ex. : choisir la commande la plus appropriée pour un besoin donné>
    - **[Créer]** *(optionnel — exercices ⭐)* <ex. : composer un mini-pipeline shell résolvant un problème concret>

    > **Référence pédagogique** : Anderson & Krathwohl (2001), *A Taxonomy for Learning, Teaching, and Assessing*. ISBN: 978-0801319037.

!!! tip "Prérequis"
    - <ex. : TP précédent terminé>
    - <ex. : machine virtuelle Debian 12 opérationnelle (cf. [installation](./installation-wsl.md))>
    - <ex. : connexion à MarioNum prête (cf. [Intro-MarioNum](./Intro-MarioNum.md))>

!!! info "Conventions de lecture"
    - Le `$` en début de commande représente le prompt — ne le tapez pas.
    - Les blocs `man <commande>` sont à consulter dès qu’une commande nouvelle apparaît.
    - Notez vos observations à la suite de chaque exercice — c’est ce qui sera évalué au DE S42.

!!! tip "Barème d’interprétation des exercices"
    > 📚 = Facile (acquisition de base, indispensable)
    > 📚📚 = Moyenne (combinaison de plusieurs notions)
    > 📚📚📚 = Élevée (synthèse, raisonnement, choix justifié)
    >
    > ⭐ = **Exercice « groupe étoile »** : extension volontaire vers les **appels système en C**.
    > Non requis pour les évaluations. Recommandé si vous avez fini les autres exercices.

!!! info "Alignement avec les évaluations (Biggs, 1996)"
    Les exercices 📚 et 📚📚 préparent au **CC S38** et au **TP noté S40**.
    Les exercices 📚📚📚 préparent au **DE S42 (QCM)** par leur dimension d’analyse.
    Les exercices ⭐ ne sont pas évalués.

---

## 1. <Titre de la section 1 — ex. : Le manuel et le format des commandes>

<!-- Apport théorique court : 1 à 3 admonitions `!!! tip` qui posent la notion. -->

!!! tip "<Notion-clé>"
    <Définition opérationnelle de 4 à 8 lignes maximum.>

    Exemple minimal :
    ```bash
    $ <commande>
    <résultat attendu>
    ```

---

### Exercice 1 : <intitulé court> 📚

1. <Tâche guidée pas-à-pas, vérifiable>.
2. <Question d’observation>.
3. <Comparaison ou variante>.

!!! star "⭐ Pour aller plus loin — Bridge vers le C"
    Cet exercice vous initie aux **appels système** vus dans le syllabus
    (cf. `syllabus-operating-system.md`, section *Programmation*).

    1. Écrivez un programme C minimal `hello.c` :
       ```c
       #include <stdio.h>
       int main(int argc, char **argv) {
           printf("Hello, %s!\n", argc > 1 ? argv[1] : "world");
           return 0;
       }
       ```
    2. Compilez-le avec `gcc -Wall -o hello hello.c`, puis testez :
       `./hello` puis `./hello Yvan`.
    3. **Question d’analyse** : que représente `argc` ? Que contient `argv[0]` ?

    > **Référence** : Kernighan, B. W., & Ritchie, D. M. (1988).
    > *The C Programming Language*, 2nd ed. Prentice Hall. ISBN: 978-0131103627.

---

### Exercice 2 : <intitulé court> 📚📚

<Énoncé combinant deux notions vues précédemment.>

!!! info "Indication"
    <Indice méthodologique pour ne pas bloquer un étudiant moyen.>

!!! star "⭐ Pour aller plus loin"
    <Extension C cohérente avec l’exercice ci-dessus.>

---

### Exercice 3 : <intitulé court> 📚📚📚

<Énoncé de synthèse / raisonnement / justification.>

!!! info "Aide structurée"
    - Étape 1 : <…>
    - Étape 2 : <…>
    - Étape 3 : <…>

!!! star "⭐ Pour aller plus loin"
    <Extension C avancée.>

---

## 2. <Titre de la section 2>

<!-- Même structure : apport théorique court → exercices gradués → ⭐ -->

---

## Synthèse — Ce que vous devez savoir faire

!!! success "Auto-évaluation rapide"
    Avant de quitter ce TP, vérifiez que vous savez :

    - [ ] <compétence 1 — alignée sur objectif Bloom 1>
    - [ ] <compétence 2>
    - [ ] <compétence 3>
    - [ ] <compétence 4>
    - [ ] *(⭐)* <compétence C optionnelle>

    Si l’un des items n’est pas coché, **revenez sur l’exercice correspondant**
    ou consultez l’enseignant en début de la séance suivante.

---

## Pour aller plus loin (lectures et ressources)

- *Manuel de référence Debian* : <https://www.debian.org/doc/manuals/debian-reference/>
- *The Linux Documentation Project* : <https://tldp.org/>
- Robbins, A. & Beebe, N. H. F. (2005). *Classic Shell Scripting*. O'Reilly. ISBN: 978-0596005955.
- Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press. ISBN: 978-1593272203.
  *(Référence canonique pour les exercices ⭐ sur les appels système.)*
