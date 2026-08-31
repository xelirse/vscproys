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

    .calculator {
      width: min(92vw, 360px);
      padding: 20px;
      border-radius: 24px;
      background: rgba(17, 24, 39, 0.9);
      box-shadow: 0 20px 50px var(--shadow);
      border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .display {
      background: #f8fafc;
      color: #0f172a;
      min-height: 86px;
      border-radius: 16px;
      margin-bottom: 18px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      box-shadow: inset 0 2px 8px rgba(15, 23, 42, 0.08);
    }

    .history {
      font-size: 0.9rem;
      color: var(--muted);
      min-height: 20px;
    }

    .result {
      font-size: clamp(2rem, 5vw, 2.5rem);
      font-weight: 700;
      word-break: break-all;
    }

    .keys {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
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

  display.appendChild(history);
  display.appendChild(result);

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
    { label: '=', action: 'equals', className: 'equal' },
    { label: '0', value: '0', className: 'zero' },
    { label: '.', value: '.' }
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

  calculator.appendChild(display);
  calculator.appendChild(keys);

  return { calculator, history, result, buttons: Array.from(keys.querySelectorAll('button')) };
}

function actualizarDisplay(result, currentValue) {
  result.textContent = currentValue;
}

function actualizarHistory(history, previousValue, operator, currentValue, waitingForNewValue) {
  if (previousValue === null || operator === null) {
    history.textContent = currentValue;
    return;
  }

  history.textContent = `${previousValue} ${operator} ${waitingForNewValue ? '' : currentValue}`.trim();
}

function limpiarCalculadora(estado, result, history) {
  estado.currentValue = '0';
  estado.previousValue = null;
  estado.operator = null;
  estado.waitingForNewValue = false;
  estado.justEvaluated = false;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function ingresarDigito(estado, value, result, history) {
  if (estado.waitingForNewValue) {
    estado.currentValue = value;
    estado.waitingForNewValue = false;
  } else {
    estado.currentValue = estado.currentValue === '0' ? value : estado.currentValue + value;
  }

  estado.justEvaluated = false;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function ingresarDecimal(estado, result, history) {
  if (estado.justEvaluated) {
    estado.currentValue = '0';
    estado.justEvaluated = false;
  }

  if (estado.waitingForNewValue) {
    estado.currentValue = '0.';
    estado.waitingForNewValue = false;
  } else if (!estado.currentValue.includes('.')) {
    estado.currentValue += '.';
  }

  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function borrarUltimo(estado, result, history) {
  if (estado.waitingForNewValue) {
    return;
  }

  if (estado.currentValue.length <= 1 || (estado.currentValue.length === 2 && estado.currentValue.startsWith('-'))) {
    estado.currentValue = '0';
  } else {
    estado.currentValue = estado.currentValue.slice(0, -1);
  }

  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function realizarCalculo(estado) {
  var prev = parseFloat(estado.previousValue);
  var current = parseFloat(estado.currentValue);

  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return 'Error';
  }

  switch (estado.operator) {
    case '+':
      return (prev + current).toString();
    case '-':
      return (prev - current).toString();
    case '*':
      return (prev * current).toString();
    case '/':
      if (current === 0) {
        return 'Error';
      }
      return (prev / current).toString();
    default:
      return estado.currentValue;
  }
}

function seleccionarOperacion(estado, nextOperator, result, history) {
  var inputValue = parseFloat(estado.currentValue);

  if (estado.previousValue === null) {
    estado.previousValue = estado.currentValue;
  } else if (estado.operator) {
    var resultado = realizarCalculo(estado);
    estado.currentValue = resultado;
    estado.previousValue = estado.currentValue;
  }

  if (Number.isNaN(inputValue)) {
    estado.currentValue = '0';
  }

  estado.operator = nextOperator;
  estado.waitingForNewValue = true;
  estado.justEvaluated = false;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function evaluar(estado, result, history) {
  if (estado.operator === null || estado.waitingForNewValue) {
    return;
  }

  var resultado = realizarCalculo(estado);
  if (resultado === 'Error') {
    estado.currentValue = 'Error';
    estado.previousValue = null;
    estado.operator = null;
    estado.waitingForNewValue = false;
    estado.justEvaluated = true;
    actualizarDisplay(result, estado.currentValue);
    history.textContent = 'Error';
    return;
  }

  estado.currentValue = resultado;
  estado.previousValue = null;
  estado.operator = null;
  estado.waitingForNewValue = false;
  estado.justEvaluated = true;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function asociarEventos(estado, result, history, buttons) {
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.value;
      var action = button.dataset.action;

      if (action === 'clear') {
        limpiarCalculadora(estado, result, history);
        return;
      }

      if (action === 'delete') {
        borrarUltimo(estado, result, history);
        return;
      }

      if (action === 'equals') {
        evaluar(estado, result, history);
        return;
      }

      if (value === '.') {
        ingresarDecimal(estado, result, history);
        return;
      }

      if (['+', '-', '*', '/'].includes(value)) {
        seleccionarOperacion(estado, value, result, history);
        return;
      }

      ingresarDigito(estado, value, result, history);
    });
  });

  document.addEventListener('keydown', function (event) {
    var key = event.key;

    if (/^[0-9]$/.test(key)) {
      ingresarDigito(estado, key, result, history);
    }

    if (key === '.') {
      ingresarDecimal(estado, result, history);
    }

    if (['+', '-', '*', '/'].includes(key)) {
      seleccionarOperacion(estado, key, result, history);
    }

    if (key === 'Enter' || key === '=') {
      evaluar(estado, result, history);
    }

    if (key === 'Backspace') {
      borrarUltimo(estado, result, history);
    }

    if (key === 'Escape') {
      limpiarCalculadora(estado, result, history);
    }
  });
}

function programa() {
  var app = document.getElementById('app');
  crearEstilos();

  var calculadora = crearCalculadora();
  var calculator = calculadora.calculator;
  var history = calculadora.history;
  var result = calculadora.result;
  var buttons = calculadora.buttons;
  app.appendChild(calculator);

  var estado = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    justEvaluated: false
  };

  asociarEventos(estado, result, history, buttons);
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

programa();
