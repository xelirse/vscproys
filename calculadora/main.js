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
