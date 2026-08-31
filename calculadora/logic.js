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
