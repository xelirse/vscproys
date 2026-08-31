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
    }

    .left-column {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 12px;
      height: 100%;
      min-height: 0;
      align-content: start;
    }

    .right-column {
      display: grid;
      grid-template-rows: 1fr;
      height: 100%;
      min-height: 100%;
      align-content: stretch;
      overflow: hidden;
      gap: 12px;
      align-self: stretch;
    }

    .history-panel {
      width: min(30vw, 220px);
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 18px;
      padding: 16px 14px;
      color: var(--text);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.25);
      height: 100%;
      min-height: 170px;
      overflow: hidden;
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
      max-height: calc(100% - 42px);
      overflow-y: auto;
    }

    .history-item {
      background: rgba(148, 163, 184, 0.08);
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 0.82rem;
      line-height: 1.4;
      word-break: break-word;
      color: var(--text);
    }

    .calculator {
      width: min(92vw, 420px);
      padding: 20px;
      border-radius: 24px;
      background: rgba(17, 24, 39, 0.9);
      box-shadow: 0 20px 50px var(--shadow);
      border: 1px solid rgba(148, 163, 184, 0.2);
      flex-shrink: 0;
      display: grid;
      grid-template-rows: minmax(50px, 0.75fr) minmax(120px, 1.25fr);
      gap: 12px;
      align-items: stretch;
      height: 100%;
      max-height: 100%;
      min-height: 100%;
      overflow: hidden;
      align-self: stretch;
    }

    .history {
      background: rgba(148, 163, 184, 0.08);
      border-radius: 14px;
      padding: 12px 12px 10px;
      font-size: 0.9rem;
      color: var(--muted);
      min-height: 50px;
      width: 100%;
      text-align: left;
      overflow-wrap: anywhere;
      display: flex;
      align-items: center;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
    }

    .display {
      background: #f8fafc;
      color: #0f172a;
      min-height: 180px;
      border-radius: 16px;
      padding: 0;
      display: grid;
      grid-template-rows: 1fr auto;
      box-shadow: inset 0 2px 8px rgba(15, 23, 42, 0.08);
      gap: 0;
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      min-height: 0;
    }

    .result-wrap {
      width: 100%;
      height: 100%;
      max-height: 100%;
      min-height: 0;
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-gutter: stable;
      padding: 14px 16px 8px 18px;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
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
      word-break: break-word;
      overflow-wrap: anywhere;
      width: 100%;
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
      grid-template-columns: 1fr auto auto;
      align-items: center;
      gap: 8px;
      border-top: 1px solid rgba(148, 163, 184, 0.35);
      background: rgba(148, 163, 184, 0.08);
      padding: 6px 12px 8px 12px;
      box-sizing: border-box;
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

  var rightColumn = document.createElement('div');
  rightColumn.className = 'right-column';

  var historyPanel = document.createElement('aside');
  historyPanel.className = 'history-panel';

  var historyTitle = document.createElement('h3');
  historyTitle.textContent = 'Historial';

  var historyList = document.createElement('ul');
  historyList.className = 'history-list';

  historyPanel.appendChild(historyTitle);
  historyPanel.appendChild(historyList);

  var calculator = document.createElement('div');
  calculator.className = 'calculator';
  calculator.setAttribute('aria-label', 'Calculadora');

  var history = document.createElement('div');
  history.className = 'history';
  history.id = 'history';
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

  displayFooter.appendChild(digitCount);
  displayFooter.appendChild(copyButton);
  displayFooter.appendChild(saveButton);

  resultWrap.appendChild(result);
  display.appendChild(resultWrap);
  display.appendChild(displayFooter);

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

  rightColumn.appendChild(calculator);

  appShell.appendChild(leftColumn);
  appShell.appendChild(rightColumn);

  return {
    shell: appShell,
    calculator: calculator,
    history: history,
    result: result,
    digitCount: digitCount,
    copyButton: copyButton,
    saveButton: saveButton,
    historyList: historyList,
    buttons: Array.from(keys.querySelectorAll('button'))
  };
}

function actualizarDisplay(result, currentValue) {
  var texto = currentValue || '0';
  var textoPlano = texto.replace(/<[^>]*>/g, '');
  var longitud = textoPlano === 'Error' ? 5 : textoPlano.replace('-', '').length;
  var digitCount = result.digitCount;

  result.value = textoPlano;

  if (digitCount) {
    digitCount.textContent = 'Dígitos: ' + longitud;
  }

  if (textoPlano === 'Error') {
    result.style.fontSize = '1.4rem';
    return;
  }

  var size = 2.6 - longitud * 0.08;
  if (size < 0.8) {
    size = 0.8;
  }

  result.style.fontSize = size + 'rem';
}

function actualizarHistory(history, previousValue, operator, currentValue, waitingForNewValue) {
  if (previousValue === null || operator === null) {
    history.textContent = currentValue;
    return;
  }

  history.textContent = previousValue + ' ' + operator + ' ' + (waitingForNewValue ? '' : currentValue);
  history.textContent = history.textContent.trim();
}
