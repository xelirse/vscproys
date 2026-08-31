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
      display: flex;
      align-items: stretch;
      gap: 18px;
      width: min(94vw, 760px);
    }

    .history-panel {
      width: min(30vw, 220px);
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 18px;
      padding: 16px 14px;
      color: var(--text);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.25);
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
      max-height: 300px;
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
      width: min(92vw, 360px);
      padding: 20px;
      border-radius: 24px;
      background: rgba(17, 24, 39, 0.9);
      box-shadow: 0 20px 50px var(--shadow);
      border: 1px solid rgba(148, 163, 184, 0.2);
      flex-shrink: 0;
    }

    .display {
      background: #f8fafc;
      color: #0f172a;
      min-height: 86px;
      border-radius: 16px;
      margin-bottom: 18px;
      padding: 14px 16px 10px 18px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      box-shadow: inset 0 2px 8px rgba(15, 23, 42, 0.08);
      gap: 4px;
    }

    .history {
      font-size: 0.9rem;
      color: var(--muted);
      min-height: 20px;
      width: 100%;
      text-align: left;
      padding-left: 6px;
      overflow-wrap: anywhere;
    }

    .result {
      font-size: clamp(1.2rem, 4vw, 2.5rem);
      font-weight: 700;
      word-break: break-word;
      overflow-wrap: anywhere;
      width: 100%;
      min-height: 2.5rem;
      line-height: 1.2;
      text-align: left;
      padding-left: 6px;
    }

    .periodic {
      color: #b45309;
      background: rgba(245, 158, 11, 0.18);
      border-radius: 6px;
      padding: 0 2px;
      font-weight: 800;
    }

    .digit-count {
      align-self: flex-end;
      font-size: 0.7rem;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
      padding-right: 4px;
    }

    .calculator-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) 110px;
      grid-template-rows: auto auto;
      gap: 12px;
      align-items: stretch;
    }

    .keys {
      grid-column: 1;
      grid-row: 2;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .operations {
      grid-column: 2;
      grid-row: 1;
      display: grid;
      grid-template-rows: repeat(4, minmax(0, 1fr));
      gap: 12px;
      align-items: stretch;
    }

    .display {
      grid-column: 2;
      grid-row: 2;
      background: #f8fafc;
      color: #0f172a;
      min-height: 86px;
      border-radius: 16px;
      margin-bottom: 0;
      padding: 14px 16px 10px 18px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      box-shadow: inset 0 2px 8px rgba(15, 23, 42, 0.08);
      gap: 4px;
    }

    button {
      border: none;
      border-radius: 14px;
      padding: 18px 0;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      background: var(--button);
      color: var(--text);
      transition: transform 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
      box-shadow: 0 6px 0 rgba(15, 23, 42, 0.25);
    }

    .operations button,
    .keys button {
      width: 100%;
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
  `;

  var styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

function crearCalculadora() {
  var appShell = document.createElement('div');
  appShell.className = 'app-shell';

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

  var display = document.createElement('div');
  display.className = 'display';
  display.setAttribute('aria-live', 'polite');

  var history = document.createElement('div');
  history.className = 'history';
  history.id = 'history';
  history.textContent = '0';

  var result = document.createElement('div');
  result.className = 'result';
  result.id = 'result';
  result.textContent = '0';

  var digitCount = document.createElement('div');
  digitCount.className = 'digit-count';
  digitCount.id = 'digit-count';
  digitCount.textContent = 'Dígitos: 1';

  display.appendChild(history);
  display.appendChild(result);
  display.appendChild(digitCount);

  var layout = document.createElement('div');
  layout.className = 'calculator-layout';

  var keys = document.createElement('div');
  keys.className = 'keys';

  var operations = document.createElement('div');
  operations.className = 'operations';

  var keyConfigs = [
    { label: 'C', className: 'clear', action: 'clear' },
    { label: 'DEL', action: 'delete' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '0', value: '0', className: 'zero' }
  ];

  var operationConfigs = [
    { label: '÷', value: '/', className: 'operator' },
    { label: '×', value: '*', className: 'operator' },
    { label: '−', value: '-', className: 'operator' },
    { label: '+', value: '+', className: 'operator' },
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

  operationConfigs.forEach(function (item) {
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
    operations.appendChild(button);
  });

  layout.appendChild(keys);
  layout.appendChild(operations);
  layout.appendChild(display);

  calculator.appendChild(layout);
  appShell.appendChild(historyPanel);
  appShell.appendChild(calculator);

  return {
    shell: appShell,
    calculator: calculator,
    history: history,
    result: result,
    digitCount: digitCount,
    historyList: historyList,
    buttons: Array.from(keys.querySelectorAll('button')).concat(Array.from(operations.querySelectorAll('button')))
  };
}

function actualizarDisplay(result, currentValue) {
  var texto = currentValue || '0';
  var textoPlano = texto.replace(/<[^>]*>/g, '');
  var longitud = textoPlano === 'Error' ? 5 : textoPlano.replace('-', '').length;
  var digitCount = result.digitCount;

  var textoVisible = textoPlano.replace(/\(([^)]+)\)/g, '<span class="periodic">($1)</span>');
  result.innerHTML = textoVisible;

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
