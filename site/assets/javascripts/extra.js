// ==========================================================================
// TI507N — Shell prompt handling for MkDocs Material
// 1. Strips "$ " prompt from copied text (copy button + Ctrl-C)
// 2. Adds per-line copy buttons on multi-command code blocks
// NOTE: per-line buttons are decorative shortcuts; the block-level copy button
// provided by Material remains the accessible primary path.
// ==========================================================================

(function () {
  'use strict';

  if (window.__shellCopyInit) return;
  window.__shellCopyInit = true;

  // --- Helper: clean shell text ------------------------------------------
  function stripPrompt(text) {
    if (!/^\$ /m.test(text)) return text;
    return text
      .split('\n')
      .map(function (line) {
        if (line.startsWith('$ ')) line = line.slice(2);
        // retire les repères « # (i) » / « # (1) » de fin de ligne (romains ou chiffres)
        return line.replace(/\s*#\s*\((?:\d+|[ivxlcdm]+)\)!?\s*$/i, '');
      })
      .join('\n');
  }

  // --- Helper: texte d'un fragment de code, sans les annotations ----------
  // Material insère l'info-bulle d'une annotation (<div class="md-tooltip">)
  // À L'INTÉRIEUR de l'élément <code>. Sans ce filtrage, copier une commande
  // annotée embarque tout le texte explicatif — inutilisable dans un terminal.
  function codeTextOf(node) {
    var holder = document.createElement('div');
    holder.appendChild(node.cloneNode(true));
    holder
      .querySelectorAll('.md-tooltip, .md-annotation__index, .md-annotation')
      .forEach(function (n) { n.remove(); });
    return holder.textContent;
  }

  // === 1a. Écriture presse-papiers native, non modifiée =================
  // NOTE (audit 2026) : la version précédente remplaçait globalement
  // Clipboard.prototype.writeText. Or Material 9 copie via clipboard.js +
  // document.execCommand('copy') : ce patch ne s'exécutait jamais, tout en
  // modifiant durablement une API native du navigateur pour toute la page.
  // C'est bien l'écouteur « copy » ci-dessous (1b) qui retire le prompt.
  var writeClipboard = navigator.clipboard
    ? navigator.clipboard.writeText.bind(navigator.clipboard)
    : function (text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } finally { ta.remove(); }
        return Promise.resolve();
      };

  // === 1b. "copy" event listener (catches Ctrl-C / right-click Copy) =====
  document.addEventListener('copy', function (e) {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;

    // Only act when the selection is inside a code block
    var anchor = sel.anchorNode;
    if (!anchor) return;
    var codeEl =
      anchor.nodeType === 1
        ? anchor.closest('code')
        : anchor.parentElement && anchor.parentElement.closest('code');
    if (!codeEl) return;

    var raw = sel.toString();
    // reconstruire la sélection sans le contenu des annotations
    var fragment;
    try {
      fragment = document.createElement('div');
      fragment.appendChild(sel.getRangeAt(0).cloneContents());
      var withoutNotes = codeTextOf(fragment);
      if (withoutNotes.trim()) raw = withoutNotes;
    } catch (err) { /* on retombe sur sel.toString() */ }

    var cleaned = stripPrompt(raw);
    if (cleaned !== sel.toString()) {
      e.clipboardData.setData('text/plain', cleaned);
      e.preventDefault();
    }
  });

  // === 2. Per-line copy buttons ==========================================
  var ICON_COPY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">' +
    '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1' +
    ' 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';

  var ICON_OK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">' +
    '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

  function processBlocks() {
    document.querySelectorAll('.highlight code').forEach(function (code) {
      var hl = code.closest('.highlight');
      if (!hl || hl.dataset.cmdInit) return;

      var lines = codeTextOf(code).split('\n');
      var cmds = [];

      lines.forEach(function (raw, i) {
        if (/^\$ /.test(raw)) {
          var c = raw
            .slice(2)
            .replace(/\s*#\s*\((?:\d+|[ivxlcdm]+)\)!?\s*$/i, '')
            .trimEnd();
          if (c) cmds.push({ i: i, c: c });
        }
      });

      if (cmds.length < 2) return;
      hl.dataset.cmdInit = '1';

      // Position verticale : on s'appuie sur les <span id="__span-N-M"> produits
      // par pymdownx.highlight (line_spans). getBoundingClientRect() donne la
      // position RÉELLE de chaque ligne, y compris lorsqu'une commande longue se
      // replie sur plusieurs lignes visuelles (mobile, fenêtre étroite) — ce que le
      // calcul « numéro de ligne × line-height » ne savait pas faire.
      var spans = code.querySelectorAll('span[id^="__span-"]');
      var hlTop = hl.getBoundingClientRect().top;

      var cs = window.getComputedStyle(code);
      var lh = parseFloat(cs.lineHeight);
      if (isNaN(lh) || lh < 10) {
        lh = Math.round(parseFloat(cs.fontSize) * 1.45);
      }
      var pt = parseFloat(cs.paddingTop) || 0;

      var wrap = document.createElement('div');
      wrap.className = 'per-line-copy';

      cmds.forEach(function (cmd) {
        var btn = document.createElement('button');
        btn.className = 'per-line-copy-btn';
        btn.title = cmd.c;
        btn.setAttribute('aria-label', 'Copier : ' + cmd.c);
        var span = spans[cmd.i];
        btn.style.top = span
          ? Math.round(span.getBoundingClientRect().top - hlTop) + 'px'
          : Math.round(pt + cmd.i * lh) + 'px';   // repli si line_spans absent
        btn.innerHTML = ICON_COPY;

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          Promise.resolve(writeClipboard(cmd.c)).then(function () {
            btn.innerHTML = ICON_OK;
            setTimeout(function () {
              btn.innerHTML = ICON_COPY;
            }, 1500);
          });
        });

        wrap.appendChild(btn);
      });

      hl.style.position = 'relative';
      hl.appendChild(wrap);
    });
  }

  // === 3. Explications de code → numérotation romaine « i) » ==============
  // Une liste ordonnée qui SUIT immédiatement un bloc de code contenant des
  // repères « # (i) », « # (ii) »... donne la signification de ces repères.
  // On la marque de la classe « ti507n-legende » pour que la CSS la numérote en
  // chiffres romains « i) ii) iii) », afin de la distinguer des étapes de
  // l'exercice (numérotées 1, 2, 3...).
  //
  // Le repérage se fait sur la PRÉSENCE des marqueurs dans le code (et non sur
  // une adjacence CSS fragile) : robuste face aux variations de rendu Markdown
  // (liste imbriquée, admonition, <div> déplacé hors d'un <p>...) et sans effet
  // sur les vraies listes procédurales (dont le code ne porte pas de marqueur).
  var LEGEND_MARK = /(?:#|\/\/)\s*\((?:[ivxlcdm]+|\d+)\)/;
  function tagCodeLegends() {
    var seq = document.querySelectorAll(
      '.md-typeset .highlight, .md-typeset ol, ' +
      '.md-typeset h1, .md-typeset h2, .md-typeset h3, .md-typeset h4, .md-typeset hr'
    );
    for (var i = 0; i < seq.length; i++) {
      var el = seq[i];
      if (!el.classList.contains('highlight')) continue;
      var code = el.querySelector('code');
      if (!code || !LEGEND_MARK.test(code.textContent)) continue;
      var next = seq[i + 1];
      if (next && next.tagName === 'OL') {
        next.classList.add('ti507n-legende');
      }
    }
  }

  // === 4. Interrupteur de langue FR ⇄ EN, 1 clic, à drapeaux ==============
  // Objectif : basculer FR↔EN en UN clic (au lieu de « bouton → menu → clic »).
  // On RÉUTILISE les liens contextuels déjà calculés par mkdocs-static-i18n
  // (dans « .md-select ») : chacun pointe vers la MÊME page dans l'autre langue.
  // On ne code donc aucune URL en dur — l'interrupteur suit toujours le plugin.
  // Drapeaux en SVG inline (et non emoji 🇫🇷🇬🇧) : rendu identique partout, y
  // compris sous Windows où les emoji-drapeaux ne s'affichent pas.
  var FLAG_FR =
    '<svg class="ti507n-flag" viewBox="0 0 3 2" aria-hidden="true" focusable="false">' +
    '<rect width="3" height="2" fill="#F2F2F2"/>' +
    '<rect width="1" height="2" fill="#0055A4"/>' +
    '<rect x="2" width="1" height="2" fill="#EF4135"/></svg>';
  var FLAG_GB =
    '<svg class="ti507n-flag" viewBox="0 0 60 30" aria-hidden="true" focusable="false">' +
    '<clipPath id="ti507nukA"><path d="M0 0v30h60V0z"/></clipPath>' +
    '<clipPath id="ti507nukB"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>' +
    '<g clip-path="url(#ti507nukA)">' +
    '<path d="M0 0v30h60V0z" fill="#012169"/>' +
    '<path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6"/>' +
    '<path d="M0 0 60 30M60 0 0 30" clip-path="url(#ti507nukB)" stroke="#C8102E" stroke-width="4"/>' +
    '<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>' +
    '<path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/>' +
    '</g></svg>';

  function setupLangToggle() {
    var select = document.querySelector('.md-header .md-select') ||
                 document.querySelector('.md-select');
    if (!select) return;                                  // pas de sélecteur → rien
    var host = select.parentElement || select;
    if (host.querySelector('.ti507n-lang')) return;        // déjà construit
    var links = {
      fr: select.querySelector('a[hreflang="fr"]'),
      en: select.querySelector('a[hreflang="en"]')
    };
    if (!links.fr || !links.en) return;                   // liens manquants → repli
    var cur = (document.documentElement.getAttribute('lang') || 'fr')
                .slice(0, 2).toLowerCase();
    if (cur !== 'en') cur = 'fr';

    var defs = [
      { code: 'fr', flag: FLAG_FR, label: 'Version française' },
      { code: 'en', flag: FLAG_GB, label: 'English version' }
    ];
    var nav = document.createElement('nav');
    nav.className = 'ti507n-lang';
    nav.setAttribute('aria-label', 'Langue / Language');
    defs.forEach(function (d) {
      var a = document.createElement('a');
      a.className = 'ti507n-lang__flag';
      a.setAttribute('hreflang', d.code);
      a.setAttribute('aria-label', d.label);
      a.href = links[d.code].getAttribute('href');
      if (d.code === cur) a.setAttribute('aria-current', 'true');
      a.innerHTML = d.flag;
      nav.appendChild(a);
    });
    host.appendChild(nav);
    host.classList.add('ti507n-has-lang');                 // masque le menu déroulant (CSS)
  }

  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      processBlocks();
      tagCodeLegends();
      setupLangToggle();
    });
  } else {
    processBlocks();
    tagCodeLegends();
    setupLangToggle();
  }

  // Le repli des lignes change avec la largeur : on recalcule au redimensionnement.
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      document.querySelectorAll('.highlight[data-cmd-init]').forEach(function (hl) {
        var wrap = hl.querySelector('.per-line-copy');
        if (wrap) wrap.remove();
        delete hl.dataset.cmdInit;
      });
      processBlocks();
    }, 200);
  });

  // Handle MkDocs Material instant loading
  var timer;
  new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      processBlocks();
      tagCodeLegends();
      setupLangToggle();
    }, 150);
  }).observe(document.body, { childList: true, subtree: true });
})();
