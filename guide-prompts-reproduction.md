# Guide de reproduction — Améliorations ergonomiques MkDocs Material

Ce document liste, dans l'ordre, les prompts et spécifications exactes pour reproduire
toutes les améliorations apportées au site MkDocs Material du cours TI507N.

**Prérequis** : un site MkDocs Material fonctionnel avec `extra.css` déjà référencé dans `mkdocs.yml`.

---

## Prompt 1 — Réduction des tailles de police dans les sidebars

> Je trouve que sur le site, côté colonne droite comme gauche, les titres des pages
> ont des tailles de police trop grandes. Réduis les tailles de police de la
> navigation sidebar gauche et de la table des matières (TOC) sidebar droite.
>
> Spécifications exactes à appliquer dans `extra.css` :
>
> - `.md-nav__item` : `padding: 0.05rem 0`
> - `.md-nav__link` : `font-size: 0.72rem`
> - `.md-nav--primary .md-nav__item--nested > .md-nav__link` : `font-size: 0.72rem`
> - `.md-nav__item--section > .md-nav__link` : `font-size: 0.74rem`
> - `.md-nav--secondary .md-nav__link` : `font-size: 0.68rem`
> - `.md-nav--secondary > .md-nav__title` : `font-size: 0.72rem`
> - `.md-nav__link--active` : `font-weight: 600; border-left: 3px solid var(--md-accent-fg-color); padding-left: 8px`

---

## Prompt 2 — Footer navigation (précédent/suivant)

> Améliore le style des boutons de navigation "précédent / suivant" en bas de chaque page.
>
> Spécifications exactes dans `extra.css` :
>
> - `.md-footer__link` : `padding: 1.2rem 0.8rem; transition: background-color 0.2s ease`
> - `.md-footer__link:hover` : `background-color: rgba(COULEUR_PRIMAIRE, 0.06)`
> - `.md-footer__title` : `font-size: 0.85rem; font-weight: 600`
> - `.md-footer__direction` : `font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7`

---

## Prompt 3 — Barre de progression (instant loading)

> Ajoute un style personnalisé pour la barre de progression qui apparaît en haut de page
> lors du chargement instantané (navigation.instant.progress).
>
> Spécifications exactes dans `extra.css` :
>
> - `.md-progress` : `background-color: rgba(COULEUR_PRIMAIRE, 0.15)`
> - `.md-progress__bar` : `background-color: COULEUR_PRIMAIRE`
> - Variante slate (mode sombre) avec les couleurs adaptées.

---

## Prompt 4 — Page d'accueil avec grille de cartes

> Transforme la page d'accueil (`docs/index.md`) en une page avec des cartes visuelles
> regroupées par section. Chaque carte comporte un emoji, un titre, une description
> courte et un badge de niveau.
>
> **Structure HTML à utiliser dans index.md** (PAS de markdown, du HTML pur) :
>
> ```html
> <h3 class="section-header">EMOJI Nom de la section</h3>
>
> <div class="card-grid">
> <a href="contenus/PAGE/" class="card">
> <span class="card-icon">EMOJI</span>
> <span class="card-title">Titre de la page</span>
> <span class="card-desc">Description courte.</span>
> <span class="card-badge badge-NIVEAU">Label</span>
> </a>
> <!-- autres cartes... -->
> </div>
> ```
>
> **Badges disponibles** : `badge-setup` (vert foncé), `badge-easy` (vert), `badge-medium` (orange),
> `badge-hard` (rouge), `badge-resource` (bleu).
>
> **CSS à ajouter dans `extra.css`** pour les classes suivantes
> (avec variantes `[data-md-color-scheme="slate"]` pour le mode sombre) :
>
> - `.card-grid` : grille responsive `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem`
> - `a.card` : flex column, bordure arrondie 10px, padding 1.2rem, hover avec translateY(-3px) et box-shadow
> - `.card-icon` : font-size 2rem
> - `.card-title` : font-size 0.9rem, font-weight 600
> - `.card-desc` : font-size 0.75rem, couleur atténuée
> - `.card-badge` : inline-block, font-size 0.65rem, padding 2px 8px, border-radius 10px, uppercase
> - `.section-header` : font-size 1rem, font-weight 600, couleur primaire, border-bottom 2px
> - 5 classes `.badge-*` avec couleurs de fond et texte distinctes
>
> **Faire la même chose pour la version anglaise** `docs/index.en.md`.

---

## Prompt 5 — Admonitions personnalisées

> Crée 3 types d'admonitions personnalisées utilisables dans les fichiers markdown :
>
> **1. `objectifs`** — pour les objectifs de chaque TP
> - Couleur : `#00838f` (turquoise/primaire)
> - Icône : réutilise `--md-admonition-icon--abstract`
> - Usage : `!!! objectifs "Objectifs du TP"` ou `??? objectifs "Objectifs du TP"` (collapsible)
>
> **2. `star`** — pour les exercices supplémentaires/bonus
> - Couleur : `#f59e0b` (ambre)
> - Icône SVG étoile : `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>')`
> - Définie avec `--md-admonition-icon--star` dans `:root`
>
> **3. `saviezvous`** — pour les anecdotes "Le saviez-vous ?"
> - Couleur : `#7c4dff` (violet)
> - Icône SVG ampoule : `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/></svg>')`
> - Définie avec `--md-admonition-icon--saviezvous` dans `:root`
> - Typiquement collapsible : `??? saviezvous "Le saviez-vous ?"`
>
> Pour chaque admonition, le CSS doit inclure : `border-color`, `.admonition-title` / `summary`
> avec `background-color` semi-transparent, `::before` avec `mask-image`, et variante slate.
>
> Il faut aussi activer dans `mkdocs.yml` les extensions `admonition` et `pymdownx.details`.

---

## Prompt 6 — Annotations de code MkDocs Material

> Active les annotations de code (`content.code.annotate`) dans `mkdocs.yml` sous
> `theme > features`, puis ajoute des annotations pédagogiques dans les blocs de code
> des TPs.
>
> **Syntaxe des annotations** (dans un bloc ` ```bash `) :
>
> ````markdown
> ```bash
> $ mkdir -p vivant/plante/fleur # (1)
> ```
>
> 1. `-p` (*parents*) crée tous les répertoires intermédiaires manquants.
> ````
>
> Le `# (N)` à l'intérieur du bloc de code est remplacé par un bouton cliquable.
> L'explication numérotée `1. Texte...` doit être placée **après** la fermeture ` ``` `
> avec une ligne vide entre les deux.
>
> **Règles importantes** :
> - Les annotations ne fonctionnent QUE dans les blocs de code (pas en markdown inline)
> - Un bloc peut avoir plusieurs annotations `# (1)`, `# (2)`, etc.
> - Chaque annotation doit avoir son explication numérotée correspondante après le bloc
> - Cibler les commandes les plus pédagogiquement pertinentes (options non triviales,
>   syntaxes surprenantes, comportements pièges)
>
> **Faire la même chose pour les versions anglaises** (texte des annotations traduit).

---

## Prompt 7 — Page FAQ

> Crée une page `docs/contenus/faq.md` (et sa version anglaise `faq.en.md`)
> qui regroupe les erreurs et problèmes courants rencontrés par les étudiants.
>
> **Structure de la page** :
>
> ```markdown
> ---
> title: FAQ — Problèmes courants
> ---
>
> # FAQ — Problèmes courants et erreurs fréquentes
>
> !!! tip "Comment utiliser cette page"
>     Utilisez <kbd>Ctrl+F</kbd> pour rechercher le message d'erreur exact...
>
> ---
>
> ## Catégorie (ex: Erreurs de permissions)
>
> ### `Message d'erreur exact`
>
> (bloc de code montrant l'erreur)
>
> **Cause** : explication
>
> **Solution** :
>
> (bloc de code avec la commande correctrice)
>
> → Voir [lien vers le TP concerné]
> ```
>
> **Catégories suggérées** : Erreurs de permissions, Fichiers et répertoires,
> Environnement et variables, Compilation C, Redirections et pipes, Processus et signaux.
>
> **Ajouter la page dans `mkdocs.yml`** sous la section `nav > Ressources` et dans
> `nav_translations` si i18n est actif.

---

## Prompt 8 — Copie de code sans le prompt `$`

> Les blocs de code shell contiennent le prompt `$ ` qui est copié quand l'étudiant
> clique sur le bouton copie. Crée un script JavaScript `docs/assets/javascripts/extra.js`
> qui :
>
> 1. **Intercepte la copie** (bouton Material ET Ctrl+C) pour retirer le `$ ` en début
>    de chaque ligne et les marqueurs d'annotation `# (N)`.
> 2. **Ajoute des boutons copie par commande** sur les blocs contenant 2+ commandes `$` :
>    un petit bouton apparaît au survol à droite de chaque ligne `$`, et copie uniquement
>    cette commande (sans `$`).
>
> **Mécanismes d'interception (les deux sont nécessaires)** :
>
> - Patch de `Clipboard.prototype.writeText` → intercepte le bouton copie de Material
> - Listener `document.addEventListener('copy', ...)` → intercepte Ctrl+C dans un `<code>`
>
> **Fonction de nettoyage** :
> ```javascript
> function stripPrompt(text) {
>   if (!/^\$ /m.test(text)) return text;
>   return text.split('\n').map(function(line) {
>     if (line.startsWith('$ ')) line = line.slice(2);
>     return line.replace(/\s*#\s*\(\d+\)\s*$/, '');
>   }).join('\n');
> }
> ```
>
> **Per-line copy buttons** :
> - Seulement si un bloc contient 2+ lignes commençant par `$ `
> - Position calculée via `getComputedStyle(code).lineHeight` et `paddingTop`
> - Icône SVG Material Design (copy), feedback check pendant 1.5s
> - `MutationObserver` sur `document.body` pour gérer `navigation.instant`
> - Guard `data-cmd-init` pour éviter le double-processing
>
> **CSS à ajouter dans `extra.css`** :
> - `.per-line-copy` : `position: absolute; right: 2.6em; opacity: 0; transition: opacity 0.2s`
> - `.highlight:hover .per-line-copy` : `opacity: 1; pointer-events: auto`
> - `.per-line-copy-btn` : bouton 22x22px, transparent, hover avec couleur accent
> - Variante `[data-md-color-scheme="slate"]` pour le mode sombre
>
> **Référencer dans `mkdocs.yml`** :
> ```yaml
> extra_javascript:
>   - assets/javascripts/extra.js    # AVANT les autres scripts
>   - https://cdnjs.cloudflare.com/...
> ```

---

## Prompt 9 — Style global du site (si pas déjà fait)

> Applique un style professionnel cohérent au site MkDocs Material.
> Voici les éléments CSS à ajouter dans `extra.css` (adapter les couleurs à ta palette) :
>
> - **Palette** : définir `--md-primary-fg-color` et `--md-accent-fg-color` dans `:root`
>   et `[data-md-color-scheme="slate"]`
> - **Typographie globale** : `.md-typeset { font-size: 0.82rem; line-height: 1.7 }`
> - **En-tête** : `.md-header { background: linear-gradient(...) }`
> - **Onglets** : `.md-tabs { background-color: COULEUR }`
> - **Titres h1/h2/h3** : couleurs dégradées (foncé → moyen → clair), h2 avec `border-bottom`
> - **Blocs de code** : `border-left: 3px solid COULEUR_ACCENT; border-radius: 4px`
> - **Tableaux** : `border-radius: 8px; overflow: hidden; box-shadow`, thead coloré, zebra striping
> - **Admonitions** : `border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05)`
> - **Séparateurs hr** : `background: linear-gradient(90deg, transparent, COULEUR, transparent)`
> - **Touches kbd** : `border-radius: 4px; box-shadow`
> - **Bouton retour en haut** : `border-radius: 50%`
> - **Barre de recherche** : `border-radius: 8px`
> - **Tags** : `border-radius: 16px; padding: 2px 12px; font-size: 0.75rem`
>
> Toujours fournir les variantes `[data-md-color-scheme="slate"]` pour le mode sombre.

---

## Prompt 10 — Configuration `mkdocs.yml` complète

> Voici les features à activer dans `mkdocs.yml` sous `theme > features` :
>
> ```yaml
> features:
>   - navigation.tabs
>   - navigation.tabs.sticky
>   - navigation.sections
>   - navigation.expand
>   - navigation.top
>   - navigation.tracking
>   - navigation.footer
>   - navigation.instant
>   - navigation.instant.progress
>   - header.autohide
>   - toc.follow
>   - search.suggest
>   - search.highlight
>   - search.share
>   - content.code.copy
>   - content.code.annotate
> ```
>
> **Extensions markdown** à activer :
> ```yaml
> markdown_extensions:
>   - pymdownx.highlight:
>       anchor_linenums: true
>       line_spans: __span
>       pygments_lang_class: true
>   - pymdownx.inlinehilite
>   - pymdownx.snippets
>   - admonition
>   - pymdownx.details
>   - pymdownx.superfences:
>       custom_fences:
>         - name: mermaid
>           class: mermaid
>   - footnotes
>   - pymdownx.critic
>   - pymdownx.caret
>   - pymdownx.keys
>   - pymdownx.mark
>   - pymdownx.tilde
>   - md_in_html
>   - attr_list
>   - def_list
>   - pymdownx.tasklist:
>       custom_checkbox: true
>   - pymdownx.tabbed:
>       alternate_style: true
>   - pymdownx.emoji:
>       emoji_index: !!python/name:material.extensions.emoji.twemoji
>       emoji_generator: !!python/name:material.extensions.emoji.to_svg
>   - pymdownx.arithmatex:
>       generic: true
>   - tables
>   - toc:
>       permalink: true
>       toc_depth: 3
> ```

---

## Ordre d'exécution recommandé

1. **Prompt 10** — Config `mkdocs.yml` (fondation)
2. **Prompt 9** — Style global CSS (palette, typographie, éléments de base)
3. **Prompt 1** — Tailles de police sidebars
4. **Prompt 2** — Footer navigation
5. **Prompt 3** — Barre de progression
6. **Prompt 5** — Admonitions personnalisées
7. **Prompt 4** — Page d'accueil avec cartes
8. **Prompt 6** — Annotations de code dans les TPs
9. **Prompt 7** — Page FAQ
10. **Prompt 8** — Copie sans `$` + boutons per-line

---

## Notes importantes

- **Adapter les couleurs** : remplacer les valeurs turquoise/indigo par la palette du nouveau cours.
- **i18n** : si le site est bilingue, chaque modification de contenu (index.md, faq.md, annotations)
  doit être dupliquée dans la version `.en.md`.
- **Les annotations `# (N)`** ne fonctionnent que dans les blocs de code (` ```bash `), jamais en texte inline.
- **Le JS `extra.js`** doit être listé AVANT les autres scripts dans `extra_javascript`.
- **Tester** avec `mkdocs serve` après chaque étape.
