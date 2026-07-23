---
title: "Vous n'avez pas de système Linux installé ? Pas grave, Codespace à la rescousse !"
---

# Vous n'avez pas de système Linux installé ? Pas grave, Codespace à la rescousse !

!!! danger "IMPORTANT — Ne pas utiliser Codespaces durant les séances de cours"
    <span style="color:red; font-weight:bold; font-size:1.1em;">
    GitHub Codespaces ne doit EN AUCUN CAS être utilisé durant les séances de cours.<br>
    Pendant les séances, nous utiliserons exclusivement <strong>MarioNum</strong> comme environnement de travail.<br>
    Codespaces est réservé uniquement à votre travail personnel en dehors des séances (révisions, entraînement, préparation des TP).
    </span>

!!! objectifs "Objectif pédagogique"
    Ce tutoriel vous guide pas à pas pour accéder à un **terminal Linux** directement depuis votre navigateur, grâce à **GitHub Codespaces**. Vous pourrez ainsi pratiquer les commandes du cours sans avoir besoin d'installer Linux sur votre machine.

!!! tip "Prérequis"
    - Un navigateur web récent (Firefox, Chrome, Edge…).
    - Une connexion internet stable.
    - Un compte GitHub (si vous n'en avez pas encore, suivez l'**Étape 1** ci-dessous).

!!! info "C'est quoi GitHub Codespaces ?"
    **GitHub Codespaces** est un environnement de développement dans le cloud proposé par GitHub. Il vous fournit une machine virtuelle Linux accessible depuis votre navigateur, avec un terminal intégré. Chaque compte GitHub dispose d'un **quota gratuit mensuel** (60 heures pour les comptes gratuits), ce qui est largement suffisant pour s'entraîner sur les commandes Linux du cours.

---

## Étape 1 : Créer un compte GitHub (si ce n'est pas déjà fait)

Si vous possédez déjà un compte GitHub, passez directement à l'**Étape 2**.

1. Rendez-vous sur [https://github.com](https://github.com).
2. Cliquez sur le bouton **"Sign up"** en haut à droite de la page.
3. Renseignez les informations demandées :
    - **Adresse e-mail** : utilisez de préférence votre adresse e-mail étudiante.
    - **Mot de passe** : choisissez un mot de passe robuste.
    - **Nom d'utilisateur** : choisissez un nom simple et professionnel (ex. : `prenom-nom`).
4. Résolvez le captcha de vérification si demandé.
5. Cliquez sur **"Create account"**.
6. GitHub vous enverra un **code de vérification** par e-mail. Ouvrez votre boîte de réception, copiez le code et collez-le dans le formulaire GitHub.
7. Une fois le code validé, votre compte est créé.

!!! tip "Conseil"
    Pensez à activer l'**authentification à deux facteurs (2FA)** dans les paramètres de votre compte pour sécuriser votre accès. GitHub l'exige pour certaines fonctionnalités.

---

## Étape 2 : Accéder à GitHub Codespaces

1. Connectez-vous à votre compte GitHub sur [https://github.com](https://github.com).
2. Rendez-vous sur la page Codespaces : [https://github.com/codespaces](https://github.com/codespaces).

---

## Étape 3 : Créer un nouveau Codespace avec le template "Blank"

!!! warning "Attention"
    Vous **devez** sélectionner le template **"Blank"** pour obtenir un environnement Linux minimal adapté aux exercices du cours. N'utilisez pas d'autre template.

1. Sur la page [https://github.com/codespaces](https://github.com/codespaces), repérez la section **"Explore quick start templates"** (ou **"Start with a template"**).
2. Parmi les templates proposés, cliquez sur **"Blank"**.
3. GitHub va créer et démarrer automatiquement votre Codespace. L'opération peut prendre quelques secondes.
4. Une fois le chargement terminé, vous arrivez sur une interface qui ressemble à un éditeur de code (VS Code) directement dans votre navigateur.

---

## Étape 4 : Ouvrir le terminal Linux

1. Dans l'interface de votre Codespace, un **terminal** est normalement ouvert en bas de l'écran.
2. Si le terminal n'est pas visible, ouvrez-le avec le raccourci clavier :
    - ++ctrl+grave++ (la touche **`** se trouve en haut à gauche du clavier, sous la touche **Échap**)
    - Ou bien via le menu : **Terminal** → **New Terminal**
3. Vous devriez voir un **prompt** (invite de commande) de ce type :
```bash
@votre-nom ➜ /workspaces/codespace-xxx $
```

!!! info "Notez bien"
    Le prompt que vous voyez dans Codespaces peut être légèrement différent de celui d'une installation Debian classique, mais les commandes Linux fonctionnent de la même manière.

---

## Étape 5 : Tester votre environnement

Tapez les commandes suivantes dans le terminal pour vérifier que tout fonctionne :

```bash
whoami
hostname
ls /
uname -a
```

Vous devriez obtenir des résultats similaires à ceux-ci :

- `whoami` : affiche votre nom d'utilisateur.
- `hostname` : affiche le nom de la machine.
- `ls /` : affiche le contenu de la racine du système de fichiers Linux.
- `uname -a` : affiche les informations sur le noyau Linux.

!!! success "Bravo !"
    Si les commandes ci-dessus s'exécutent correctement, votre environnement Linux est prêt. Vous pouvez maintenant pratiquer les commandes vues en cours !

---

## Étape 6 : Arrêter et reprendre votre Codespace

### Arrêter un Codespace

Lorsque vous avez terminé votre session de travail, **arrêtez votre Codespace** pour préserver votre quota d'heures gratuites :

1. Retournez sur [https://github.com/codespaces](https://github.com/codespaces).
2. Repérez votre Codespace actif dans la liste.
3. Cliquez sur les **trois points** (`...`) à droite de votre Codespace.
4. Sélectionnez **"Stop codespace"**.

### Reprendre un Codespace

Pour reprendre votre travail ultérieurement :

1. Retournez sur [https://github.com/codespaces](https://github.com/codespaces).
2. Cliquez sur le nom de votre Codespace existant pour le relancer.

!!! warning "Gestion du quota"
    Chaque compte GitHub gratuit dispose de **60 heures gratuites** par mois pour Codespaces. Pensez à **toujours arrêter** votre Codespace lorsque vous ne l'utilisez pas. Un Codespace laissé actif consomme votre quota même si vous ne travaillez pas dessus.

### Supprimer un Codespace

Si vous n'avez plus besoin d'un Codespace :

1. Sur [https://github.com/codespaces](https://github.com/codespaces), cliquez sur les **trois points** (`...`).
2. Sélectionnez **"Delete"**.

---

## Récapitulatif

| Étape | Action |
|-------|--------|
| 1 | Créer un compte GitHub (si nécessaire) |
| 2 | Se rendre sur [github.com/codespaces](https://github.com/codespaces) |
| 3 | Créer un Codespace avec le template **Blank** |
| 4 | Ouvrir le terminal dans l'interface |
| 5 | Tester avec `whoami`, `hostname`, `ls /`, `uname -a` |
| 6 | Arrêter le Codespace après chaque session |

!!! danger "Rappel"
    <span style="color:red; font-weight:bold;">
    Codespaces est réservé à votre travail personnel en dehors des séances de cours.<br>
    En séance, utilisez exclusivement MarioNum.
    </span>
