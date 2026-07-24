// ==========================================================================
// TI507N — Shell prompt handling for MkDocs Material
// 1. Strips "$ " prompt from copied text (button + Ctrl-C)
// 2. Adds per-line copy buttons on multi-command code blocks
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
        return line.replace(/\s*#\s*\(\d+\)\s*$/, '');   // annotation markers
      })
      .join('\n');
  }

  // === 1a. Patch Clipboard.prototype.writeText (catches the copy button) ==
  var _origProto = Clipboard.prototype.writeText;
  Clipboard.prototype.writeText = function (text) {
    return _origProto.call(this, stripPrompt(text));
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
    var cleaned = stripPrompt(raw);
    if (cleaned !== raw) {
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

      var lines = code.textContent.split('\n');
      var cmds = [];

      lines.forEach(function (raw, i) {
        if (/^\$ /.test(raw)) {
          var c = raw
            .slice(2)
            .replace(/\s*#\s*\(\d+\)\s*$/, '')
            .trimEnd();
          if (c) cmds.push({ i: i, c: c });
        }
      });

      if (cmds.length < 2) return;
      hl.dataset.cmdInit = '1';

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
        btn.style.top = Math.round(pt + cmd.i * lh) + 'px';
        btn.innerHTML = ICON_COPY;

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          _origProto.call(navigator.clipboard, cmd.c).then(function () {
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

  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processBlocks);
  } else {
    processBlocks();
  }

  // Handle MkDocs Material instant loading
  var timer;
  new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(processBlocks, 150);
  }).observe(document.body, { childList: true, subtree: true });
})();
