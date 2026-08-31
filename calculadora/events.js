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
