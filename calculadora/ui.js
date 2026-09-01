function crearEstilos() {
  var styles = `
    :root {
      --bg: #0f172a;
      --panel: #111827;
      --button: #374151;
      --button-hover: #4b5563;
      --button-operator: #f59e0b;
      --button-operator-hover: #fbbf24;
      --button-accent: #10b981;
      --button-accent-hover: #34d399;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --display: #f8fafc;
      --shadow: rgba(15, 23, 42, 0.35);
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #020617, #111827 40%, #0f172a);
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
      overflow-x: hidden;
    }

    .app-shell {
      display: grid;
      grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
      gap: 18px;
      width: min(94vw, 940px);
      height: min(88vh, 820px);
      max-height: 88vh;
      align-items: stretch;
      overflow: hidden;
      min-height: 0;
      min-width: 0;
    }

    .left-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 100%;
      min-height: 0;
      min-width: 0;
      flex: 1 1 0;
      align-content: stretch;
      justify-content: flex-start;
    }

    .right-column {
      display: grid;
      grid-template-rows: minmax(120px, 0.42fr) minmax(0, 1.58fr);
      width: 100%;
      max-width: 100%;
      height: 100%;
      min-height: 0;
      flex: 1 1 auto;
      align-content: stretch;
      overflow: hidden;
      gap: 12px;
      align-self: stretch;
      min-width: 0;
      max-height: 100%;
      box-sizing: border-box;
    }

    .history-split {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(120px, 160px);
      gap: 12px;
      align-items: stretch;
      min-height: 0;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      align-self: stretch;
      box-sizing: border-box;
      height: 100%;
    }

    .history-meta {
      background: rgba(148, 163, 184, 0.08);
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      padding: 10px 12px;
      color: var(--muted);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-width: 0;
      overflow: hidden;
    }

    .history-panel {
      width: min(30vw, 220px);
      max-width: 100%;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 18px;
      padding: 16px 14px;
      color: var(--text);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.25);
      height: 100%;
      min-height: 170px;
      max-height: 100%;
      overflow: hidden;
      min-width: 0;
      display: flex;
      flex-direction: column;
      flex: 1 1 0;
      flex-grow: 1;
      align-self: stretch;
    }

    .history-panel h3 {
      margin: 0 0 12px;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .history-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1 1 auto;
      height: 100%;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      min-width: 0;
      scrollbar-gutter: stable;
      flex-grow: 1;
      align-self: stretch;
    }

    .history-list::-webkit-scrollbar {
      width: 8px;
    }

    .history-list::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.45);
      border-radius: 999px;
    }

    .history-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .history-item {
      display: block;
      width: 100%;
      background: rgba(148, 163, 184, 0.08);
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 0.82rem;
      line-height: 1.4;
      word-break: break-word;
      overflow-wrap: anywhere;
      white-space: normal;
      color: var(--text);
      min-width: 0;
      max-width: 100%;
      overflow: visible;
      text-overflow: clip;
    }

    .calculator {
      width: 100%;
      max-width: 100%;
      padding: 20px;
      border-radius: 24px;
      background: rgba(17, 24, 39, 0.9);
      box-shadow: 0 20px 50px var(--shadow);
      border: 1px solid rgba(148, 163, 184, 0.2);
      display: grid;
      grid-template-rows: minmax(50px, 0.9fr) minmax(0, 1.8fr);
      gap: 12px;
      align-items: stretch;
      height: 100%;
      max-height: 100%;
      min-height: 0;
      overflow: hidden;
      align-self: stretch;
      min-width: 0;
      box-sizing: border-box;
    }

    .history {
      background: rgba(148, 163, 184, 0.08);
      border-radius: 14px;
      padding: 12px 12px 10px;
      font-size: 0.9rem;
      color: var(--muted);
      min-height: 50px;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      text-align: left;
      overflow-wrap: anywhere;
      word-break: break-word;
      white-space: normal;
      display: flex;
      align-items: center;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    .display {
      background: #f8fafc;
      color: #0f172a;
      min-height: 0;
      border-radius: 16px;
      padding: 0;
      display: flex;
      flex-direction: column;
      box-shadow: inset 0 2px 8px rgba(15, 23, 42, 0.08);
      gap: 0;
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      min-height: 0;
      box-sizing: border-box;
    }

    .result-wrap {
      width: 100%;
      max-width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-gutter: stable;
      padding: 14px 16px 8px 18px;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      box-sizing: border-box;
    }

    .result-wrap::-webkit-scrollbar {
      width: 8px;
    }

    .result-wrap::-webkit-scrollbar-thumb {
      background: rgba(71, 85, 105, 0.55);
      border-radius: 999px;
    }

    .result-wrap::-webkit-scrollbar-track {
      background: transparent;
    }

    .result {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: clamp(1.2rem, 4vw, 2.5rem);
      font-weight: 700;
      word-break: break-all;
      overflow-wrap: anywhere;
      line-break: anywhere;
      width: 100%;
      max-width: 100%;
      height: 100%;
      min-height: 100%;
      line-height: 1.2;
      text-align: left;
      padding-left: 6px;
      align-self: stretch;
      resize: none;
      border: none;
      background: transparent;
      color: #0f172a;
      outline: none;
      display: block;
      white-space: pre-wrap;
      box-sizing: border-box;
      overflow-x: hidden;
    }

    .periodic {
      color: #b45309;
      background: rgba(245, 158, 11, 0.18);
      border-radius: 6px;
      padding: 0 2px;
      font-weight: 800;
    }

    .display-footer {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) auto auto auto;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
      border-top: 1px solid rgba(148, 163, 184, 0.35);
      background: rgba(148, 163, 184, 0.08);
      padding: 6px 12px 8px 12px;
      box-sizing: border-box;
    }

    .chunk-controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      flex: 0 0 auto;
      padding: 8px 12px 10px;
      background: rgba(148, 163, 184, 0.04);
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      align-items: center;
    }

    .chunk-field {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.68rem;
      color: #cbd5e1;
      font-weight: 700;
    }

    .chunk-field input {
      width: 90px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.7);
      color: #f8fafc;
      padding: 5px 7px;
      font-size: 0.7rem;
      text-align: center;
    }

    .page-controls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      gap: 8px;
      padding: 10px 10px 12px;
      background: rgba(15, 23, 42, 0.18);
      border-top: 1px solid rgba(148, 163, 184, 0.25);
      min-height: 42px;
      overflow: hidden;
    }

    .page-tree-label {
      font-size: 0.62rem;
      line-height: 1.1;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #cbd5e1;
      text-align: center;
      opacity: 0.9;
      padding: 0 6px 2px;
    }

    .page-tree {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      align-items: stretch;
      justify-items: stretch;
      min-width: 0;
    }

    .page-node {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 58px;
      border: 1px solid rgba(148, 163, 184, 0.55);
      background: rgba(15, 23, 42, 0.65);
      color: #f8fafc;
      border-radius: 12px;
      font-size: 0.68rem;
      font-weight: 700;
      cursor: pointer;
      padding: 6px 6px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      text-align: center;
      overflow: hidden;
    }

    .page-node.is-active {
      background: rgba(59, 130, 246, 0.55);
      border-color: rgba(96, 165, 250, 0.9);
      color: #f8fafc;
    }

    .page-node .page-node-range {
      display: block;
      font-size: 0.7rem;
      line-height: 1.2;
      font-weight: 800;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .page-node .page-node-page {
      display: block;
      font-size: 0.58rem;
      opacity: 0.85;
      margin-top: 4px;
    }

    .period-note {
      font-size: 0.66rem;
      font-weight: 700;
      color: #b45309;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }

    .digit-count {
      align-self: stretch;
      font-size: 0.7rem;
      color: #475569;
      font-weight: 600;
      text-align: right;
      box-sizing: border-box;
    }

    .copy-btn, .save-btn {
      border: 1px solid rgba(59, 130, 246, 0.4);
      background: rgba(59, 130, 246, 0.12);
      color: #0f172a;
      border-radius: 10px;
      padding: 6px 10px;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: none;
      min-width: 68px;
    }

    .copy-btn:hover, .save-btn:hover {
      background: rgba(59, 130, 246, 0.2);
    }

    .save-btn {
      border-color: rgba(16, 185, 129, 0.5);
      background: rgba(16, 185, 129, 0.12);
    }

    .keys {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      align-content: stretch;
      width: 100%;
      height: min(100%, 290px);
      min-height: 240px;
      max-height: 290px;
      margin-top: 0;
      align-self: end;
      flex-shrink: 0;
    }

    button {
      border: none;
      border-radius: 14px;
      padding: 0;
      min-height: 0;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      background: var(--button);
      color: var(--text);
      transition: transform 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
      box-shadow: 0 6px 0 rgba(15, 23, 42, 0.25);
    }

    button:hover {
      filter: brightness(1.08);
    }

    button:active {
      transform: translateY(2px);
      box-shadow: 0 4px 0 rgba(15, 23, 42, 0.25);
    }

    .operator {
      background: var(--button-operator);
      color: #111827;
    }

    .operator:hover {
      background: var(--button-operator-hover);
    }

    .equal {
      background: var(--button-accent);
      color: #052e16;
    }

    .equal:hover {
      background: var(--button-accent-hover);
    }

    .clear {
      background: #ef4444;
    }

    .clear:hover {
      background: #f87171;
    }

    .zero {
      grid-column: span 2;
    }

    .decimal {
      grid-column: span 1;
    }

    .paren {
      grid-column: span 1;
      font-size: 1.1rem;
    }
  `;

  var styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

function crearCalculadora() {
  var appShell = document.createElement('div');
  appShell.className = 'app-shell';

  var leftColumn = document.createElement('div');
  leftColumn.className = 'left-column';
  leftColumn.style.display = 'flex';
  leftColumn.style.flexDirection = 'column';
  leftColumn.style.height = '100%';
  leftColumn.style.minHeight = '0';

  var rightColumn = document.createElement('div');
  rightColumn.className = 'right-column';

  var historySplit = document.createElement('div');
  historySplit.className = 'history-split';

  var historyMeta = document.createElement('div');
  historyMeta.className = 'history-meta';
  historyMeta.textContent = 'Pág. 1';

  var historyPanel = document.createElement('aside');
  historyPanel.className = 'history-panel';
  historyPanel.style.flex = '1 1 0';
  historyPanel.style.height = '100%';
  historyPanel.style.minHeight = '170px';
  historyPanel.style.display = 'flex';
  historyPanel.style.flexDirection = 'column';
  historyPanel.style.alignSelf = 'stretch';

  var historyTitle = document.createElement('h3');
  historyTitle.textContent = 'Historial';

  var historyList = document.createElement('ul');
  historyList.className = 'history-list';
  historyList.style.flex = '1 1 auto';
  historyList.style.height = '100%';
  historyList.style.minHeight = '0';
  historyList.style.overflowY = 'auto';
  historyList.style.overflowX = 'hidden';
  historyList.style.alignSelf = 'stretch';

  historyPanel.appendChild(historyTitle);
  historyPanel.appendChild(historyList);

  var calculator = document.createElement('div');
  calculator.className = 'calculator';
  calculator.setAttribute('aria-label', 'Calculadora');

  var history = document.createElement('div');
  history.className = 'history';
  history.id = 'history';
  history.style.maxWidth = '100%';
  history.style.minWidth = '0';
  history.style.overflowWrap = 'anywhere';
  history.style.wordBreak = 'break-word';
  history.style.whiteSpace = 'normal';
  history.textContent = '0';

  var display = document.createElement('div');
  display.className = 'display';
  display.setAttribute('aria-live', 'polite');

  var resultWrap = document.createElement('div');
  resultWrap.className = 'result-wrap';

  var result = document.createElement('textarea');
  result.className = 'result';
  result.id = 'result';
  result.value = '0';
  result.readOnly = true;
  result.rows = 2;

  var displayFooter = document.createElement('div');
  displayFooter.className = 'display-footer';

  var chunkControls = document.createElement('div');
  chunkControls.className = 'chunk-controls';
  chunkControls.id = 'chunk-controls';

  var chunkFieldSize = document.createElement('label');
  chunkFieldSize.className = 'chunk-field';
  chunkFieldSize.textContent = 'Chars:';

  var chunkSizeInput = document.createElement('input');
  chunkSizeInput.type = 'number';
  chunkSizeInput.min = '1';
  chunkSizeInput.step = '1';
  chunkSizeInput.value = '500000';
  chunkSizeInput.title = 'Caracteres por página';
  chunkSizeInput.dataset.role = 'chunk-size';

  var chunkFieldDelay = document.createElement('label');
  chunkFieldDelay.className = 'chunk-field';
  chunkFieldDelay.textContent = 'ms:';

  var delayInput = document.createElement('input');
  delayInput.type = 'number';
  delayInput.min = '0';
  delayInput.step = '1';
  delayInput.value = '37';
  delayInput.title = 'Milisegundos entre páginas';
  delayInput.dataset.role = 'delay-ms';

  chunkFieldSize.appendChild(chunkSizeInput);
  chunkFieldDelay.appendChild(delayInput);
  chunkControls.appendChild(chunkFieldSize);
  chunkControls.appendChild(chunkFieldDelay);

  var pageControls = document.createElement('div');
  pageControls.className = 'page-controls';
  pageControls.id = 'page-controls';

  var periodNote = document.createElement('div');
  periodNote.className = 'period-note';
  periodNote.id = 'period-note';
  periodNote.textContent = 'Sin periodo';

  var digitCount = document.createElement('div');
  digitCount.className = 'digit-count';
  digitCount.id = 'digit-count';
  digitCount.textContent = 'Dígitos: 1';

  var copyButton = document.createElement('button');
  copyButton.className = 'copy-btn';
  copyButton.type = 'button';
  copyButton.dataset.action = 'copy';
  copyButton.textContent = 'Copiar';

  var saveButton = document.createElement('button');
  saveButton.className = 'save-btn';
  saveButton.type = 'button';
  saveButton.dataset.action = 'save';
  saveButton.textContent = 'Guardar';

  displayFooter.appendChild(periodNote);
  displayFooter.appendChild(digitCount);
  displayFooter.appendChild(copyButton);
  displayFooter.appendChild(saveButton);

  resultWrap.appendChild(result);
  display.appendChild(resultWrap);
  display.appendChild(displayFooter);
  display.appendChild(chunkControls);
  display.appendChild(pageControls);

  var keys = document.createElement('div');
  keys.className = 'keys';

  var keyConfigs = [
    { label: 'C', className: 'clear', action: 'clear' },
    { label: 'DEL', action: 'delete' },
    { label: '÷', value: '/', className: 'operator' },
    { label: '×', value: '*', className: 'operator' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '−', value: '-', className: 'operator' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '+', value: '+', className: 'operator' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '(', value: '(', className: 'paren' },
    { label: '0', value: '0', className: 'zero' },
    { label: ',', value: ',', className: 'decimal' },
    { label: ')', value: ')', className: 'paren' },
    { label: '=', action: 'equals', className: 'equal' }
  ];

  keyConfigs.forEach(function (item) {
    var label = item.label;
    var value = item.value;
    var action = item.action;
    var className = item.className || '';
    var button = document.createElement('button');

    if (className) {
      button.className = className;
    }

    if (action) {
      button.dataset.action = action;
    }

    if (value) {
      button.dataset.value = value;
    }

    button.textContent = label;
    keys.appendChild(button);
  });

  leftColumn.appendChild(historyPanel);
  leftColumn.appendChild(keys);

  calculator.appendChild(history);
  calculator.appendChild(display);

  historySplit.appendChild(history);
  historySplit.appendChild(historyMeta);
  rightColumn.appendChild(historySplit);
  rightColumn.appendChild(calculator);

  appShell.appendChild(leftColumn);
  appShell.appendChild(rightColumn);

  return {
    shell: appShell,
    calculator: calculator,
    history: history,
    result: result,
    digitCount: digitCount,
    periodNote: periodNote,
    copyButton: copyButton,
    saveButton: saveButton,
    pageControls: pageControls,
    chunkControls: chunkControls,
    chunkSizeInput: chunkSizeInput,
    delayInput: delayInput,
    historyList: historyList,
    buttons: Array.from(keys.querySelectorAll('button'))
  };
}

function establecerTitleSeguro(result, texto) {
  if (!result) {
    return;
  }

  var valor = String(texto || '').replace(/<[^>]*>/g, '');
  if (valor.length <= 200000) {
    result.setAttribute('title', valor);
    return;
  }

  result.removeAttribute('title');
}

function crearBotonesPaginas(result, totalPaginas, paginaActual) {
  if (!result || !result.pageControls) {
    return;
  }

  result.pageControls.innerHTML = '';

  if (!Number.isFinite(totalPaginas) || totalPaginas <= 1) {
    result.pageControls.style.display = 'none';
    return;
  }

  result.pageControls.style.display = 'flex';

  var label = document.createElement('div');
  label.className = 'page-tree-label';
  label.textContent = 'Páginas';
  result.pageControls.appendChild(label);

  var tree = document.createElement('div');
  tree.className = 'page-tree';

  var rangoTotal = { start: 0, end: totalPaginas - 1 };
  var mitad = Math.floor((rangoTotal.start + rangoTotal.end) / 2);
  var izquierdo = { start: rangoTotal.start, end: mitad, page: rangoTotal.start };
  var derecho = { start: mitad + 1, end: rangoTotal.end, page: mitad + 1 };
  var actual = { start: Math.max(0, Math.min(paginaActual, rangoTotal.end)), end: Math.max(0, Math.min(paginaActual, rangoTotal.end)), page: paginaActual };

  var grupos = [
    { name: 'Actual', start: actual.start, end: actual.end, page: actual.page },
    { name: 'Izq', start: izquierdo.start, end: izquierdo.end, page: izquierdo.page },
    { name: 'Der', start: derecho.start, end: derecho.end, page: derecho.page }
  ];

  grupos.forEach(function (grupo) {
    var nodo = document.createElement('button');
    nodo.type = 'button';
    nodo.className = 'page-node';
    if (grupo.page === paginaActual) {
      nodo.classList.add('is-active');
    }

    var rango = document.createElement('span');
    rango.className = 'page-node-range';
    var rangoTexto = grupo.start === grupo.end ? 'P' + String(grupo.start + 1) : '[' + String(grupo.start + 1) + '..' + String(grupo.end + 1) + ']';
    rango.textContent = rangoTexto;

    var pagina = document.createElement('span');
    pagina.className = 'page-node-page';
    pagina.textContent = grupo.name;

    nodo.appendChild(rango);
    nodo.appendChild(pagina);
    nodo.dataset.page = String(grupo.page || 0);
    nodo.addEventListener('click', function () {
      var nuevaPagina = Number(this.dataset.page || 0);
      if (!Number.isFinite(nuevaPagina)) {
        return;
      }
      result.pageNumber = Math.max(0, Math.min(nuevaPagina, totalPaginas - 1));
      actualizarDisplay(result, result.fullValue || result.value || '0');
    });

    tree.appendChild(nodo);
  });

  result.pageControls.appendChild(tree);
}

function actualizarDisplay(result, currentValue) {
  var texto = currentValue || '0';
  var textoPlano = String(texto).replace(/<[^>]*>/g, '');
  if (textoPlano === '') {
    textoPlano = '0';
  }

  var longitud = textoPlano === 'Error' ? 5 : textoPlano.replace('-', '').replace(/\(|\)/g, '').length;
  var digitCount = result && result.digitCount;
  var periodNote = result && result.periodNote;
  var tamanoPagina = Number(result && result.chunkSize || 500000);
  if (!Number.isFinite(tamanoPagina) || tamanoPagina < 1) {
    tamanoPagina = 500000;
  }
  if (result) {
    result.chunkSize = tamanoPagina;
  }
  var numeroPagina = Number(result && result.pageNumber || 0);

  if (textoPlano !== 'Error' && result) {
    result.fullValue = textoPlano;
  }

  var esResultadoMuyGrande = textoPlano !== 'Error' && textoPlano.length > 2500000;

  if (textoPlano === 'Error') {
    if (result) {
      result.pageNumber = 0;
      result.value = textoPlano;
      establecerTitleSeguro(result, textoPlano);
      if (result.pageControls) {
        result.pageControls.innerHTML = '';
        result.pageControls.style.display = 'none';
      }
    }
  } else if (result && (result.isGenerating || esResultadoMuyGrande)) {
    if (result.pageControls) {
      result.pageControls.innerHTML = '';
      result.pageControls.style.display = 'none';
    }
    var inicioParcial = numeroPagina * tamanoPagina;
    var finParcial = Math.min(textoPlano.length, inicioParcial + tamanoPagina);
    result.value = textoPlano.slice(inicioParcial, finParcial);
    establecerTitleSeguro(result, textoPlano.slice(0, 200000));
  } else {
    var totalPaginas = Math.max(1, Math.ceil(textoPlano.length / tamanoPagina));
    if (numeroPagina >= totalPaginas) {
      numeroPagina = totalPaginas - 1;
      result.pageNumber = numeroPagina;
    }

    var inicio = numeroPagina * tamanoPagina;
    var fin = Math.min(textoPlano.length, inicio + tamanoPagina);
    var vista = textoPlano.slice(inicio, fin);

    result.value = vista;
    establecerTitleSeguro(result, textoPlano);
    crearBotonesPaginas(result, totalPaginas, numeroPagina);
  }

  if (digitCount) {
    digitCount.textContent = 'Dígitos: ' + longitud;
  }

  if (periodNote) {
    var match = textoPlano.match(/\(([^)]*)\)/);
    if (match && match[1] && match[1].length > 0) {
      var longitudPeriodo = match[1].length;
      periodNote.textContent = String(longitudPeriodo);
      periodNote.style.color = '#b45309';
    } else {
      periodNote.textContent = '0';
      periodNote.style.color = '#475569';
    }
  }

  if (textoPlano === 'Error' && result) {
    result.style.fontSize = '1.4rem';
    return;
  }

  if (result) {
    var size = Math.max(0.7, 2.4 - Math.min(2.1, longitud / 450));
    result.style.fontSize = size + 'rem';
  }
}

function actualizarHistory(history, previousValue, operator, currentValue, waitingForNewValue) {
  if (previousValue === null || operator === null) {
    history.textContent = currentValue;
    return;
  }

  history.textContent = previousValue + ' ' + operator + ' ' + (waitingForNewValue ? '' : currentValue);
  history.textContent = history.textContent.trim();
}
