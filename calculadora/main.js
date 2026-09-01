function programa() {
  var app = document.getElementById('app');
  crearEstilos();

  var calculadora = crearCalculadora();
  var shell = calculadora.shell;
  var calculator = calculadora.calculator;
  var history = calculadora.history;
  var result = calculadora.result;
  var digitCount = calculadora.digitCount;
  var copyButton = calculadora.copyButton;
  var saveButton = calculadora.saveButton;
  var historyList = calculadora.historyList;
  var buttons = calculadora.buttons;

  result.digitCount = digitCount;
  result.periodNote = calculadora.periodNote;
  result.pageControls = calculadora.pageControls;
  result.chunkSizeInput = calculadora.chunkSizeInput;
  result.delayInput = calculadora.delayInput;
  result.pageNumber = 0;
  result.fullValue = '0';
  result.chunkSize = Number(result.chunkSizeInput && result.chunkSizeInput.value ? result.chunkSizeInput.value : 500000) || 500000;
  result.delayMs = Number(result.delayInput && result.delayInput.value ? result.delayInput.value : 37) || 37;
  app.appendChild(shell);

  var estado = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    justEvaluated: false,
    historial: []
  };

  asociarEventos(estado, result, history, buttons, historyList, copyButton, saveButton);
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
  actualizarListaHistorial(historyList, estado.historial);
}

programa();
