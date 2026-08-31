function programa() {
  var app = document.getElementById('app');
  crearEstilos();

  var calculadora = crearCalculadora();
  var shell = calculadora.shell;
  var calculator = calculadora.calculator;
  var history = calculadora.history;
  var result = calculadora.result;
  var digitCount = calculadora.digitCount;
  var historyList = calculadora.historyList;
  var buttons = calculadora.buttons;

  result.digitCount = digitCount;
  app.appendChild(shell);

  var estado = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    justEvaluated: false,
    historial: []
  };

  asociarEventos(estado, result, history, buttons, historyList);
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
  actualizarListaHistorial(historyList, estado.historial);
}

programa();
