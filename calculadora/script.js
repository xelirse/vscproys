const app = document.getElementById('app');

const styles = `
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

const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);

const calculator = document.createElement('div');
calculator.className = 'calculator';
calculator.setAttribute('aria-label', 'Calculadora');

const display = document.createElement('div');
display.className = 'display';
display.setAttribute('aria-live', 'polite');

const history = document.createElement('div');
history.className = 'history';
history.id = 'history';
history.textContent = '0';

const result = document.createElement('div');
result.className = 'result';
result.id = 'result';
result.textContent = '0';

display.appendChild(history);
display.appendChild(result);

const keys = document.createElement('div');
keys.className = 'keys';

const keyConfigs = [
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

keyConfigs.forEach(({ label, value, action, className = '' }) => {
  const button = document.createElement('button');

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
app.appendChild(calculator);

let currentValue = '0';
let previousValue = null;
let operator = null;
let waitingForNewValue = false;
let justEvaluated = false;

function updateDisplay() {
  result.textContent = currentValue;
}

function updateHistory() {
  if (previousValue === null || operator === null) {
    history.textContent = currentValue;
    return;
  }

  history.textContent = `${previousValue} ${operator} ${waitingForNewValue ? '' : currentValue}`.trim();
}

function clearCalculator() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  waitingForNewValue = false;
  justEvaluated = false;
  updateDisplay();
  updateHistory();
}

function inputDigit(value) {
  if (waitingForNewValue) {
    currentValue = value;
    waitingForNewValue = false;
  } else {
    currentValue = currentValue === '0' ? value : currentValue + value;
  }

  justEvaluated = false;
  updateDisplay();
  updateHistory();
}

function inputDecimal() {
  if (justEvaluated) {
    currentValue = '0';
    justEvaluated = false;
  }

  if (waitingForNewValue) {
    currentValue = '0.';
    waitingForNewValue = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }

  updateDisplay();
  updateHistory();
}

function deleteLast() {
  if (waitingForNewValue) {
    return;
  }

  if (currentValue.length <= 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }

  updateDisplay();
  updateHistory();
}

function performCalculation(nextValue) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return 'Error';
  }

  switch (operator) {
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
      return nextValue;
  }
}

function selectOperator(nextOperator) {
  const inputValue = parseFloat(currentValue);

  if (previousValue === null) {
    previousValue = currentValue;
  } else if (operator) {
    const result = performCalculation(currentValue);
    currentValue = result;
    previousValue = currentValue;
  }

  if (Number.isNaN(inputValue)) {
    currentValue = '0';
  }

  operator = nextOperator;
  waitingForNewValue = true;
  justEvaluated = false;
  updateDisplay();
  updateHistory();
}

function evaluate() {
  if (operator === null || waitingForNewValue) {
    return;
  }

  const resultValue = performCalculation(currentValue);
  if (resultValue === 'Error') {
    currentValue = 'Error';
    previousValue = null;
    operator = null;
    waitingForNewValue = false;
    justEvaluated = true;
    updateDisplay();
    history.textContent = 'Error';
    return;
  }

  currentValue = resultValue;
  previousValue = null;
  operator = null;
  waitingForNewValue = false;
  justEvaluated = true;
  updateDisplay();
  updateHistory();
}

const buttons = Array.from(document.querySelectorAll('button'));

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { value, action } = button.dataset;

    if (action === 'clear') {
      clearCalculator();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'equals') {
      evaluate();
      return;
    }

    if (value === '.') {
      inputDecimal();
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      selectOperator(value);
      return;
    }

    inputDigit(value);
  });
});

document.addEventListener('keydown', (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key)) {
    inputDigit(key);
  }

  if (key === '.') {
    inputDecimal();
  }

  if (['+', '-', '*', '/'].includes(key)) {
    selectOperator(key);
  }

  if (key === 'Enter' || key === '=') {
    evaluate();
  }

  if (key === 'Backspace') {
    deleteLast();
  }

  if (key === 'Escape') {
    clearCalculator();
  }
});

updateDisplay();
updateHistory();
