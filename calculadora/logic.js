function actualizarListaHistorial(historyList, historial) {
  historyList.innerHTML = '';

  if (historial.length === 0) {
    var emptyItem = document.createElement('li');
    emptyItem.className = 'history-item';
    emptyItem.textContent = 'Sin operaciones';
    historyList.appendChild(emptyItem);
    return;
  }

  historial.forEach(function (entrada) {
    var item = document.createElement('li');
    item.className = 'history-item';
    item.textContent = entrada;
    historyList.appendChild(item);
  });
}

function limpiarCalculadora(estado, result, history, historyList) {
  estado.currentValue = '0';
  estado.previousValue = null;
  estado.operator = null;
  estado.waitingForNewValue = false;
  estado.justEvaluated = false;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
  actualizarListaHistorial(historyList, estado.historial);
}

function ingresarDigito(estado, value, result, history) {
  if (value === '(' || value === ')') {
    if (estado.currentValue === 'Error') {
      return;
    }

    if (estado.waitingForNewValue) {
      estado.currentValue = value;
      estado.waitingForNewValue = false;
    } else if (estado.currentValue === '0') {
      estado.currentValue = value === '(' ? '(' : '0';
    } else {
      estado.currentValue = estado.currentValue + value;
    }

    estado.justEvaluated = false;
    actualizarDisplay(result, estado.currentValue);
    actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
    return;
  }

  if (value === ',' || value === '.') {
    if (estado.currentValue === 'Error') {
      return;
    }

    var textoActual = String(estado.currentValue || '');

    if (estado.waitingForNewValue) {
      estado.currentValue = '0,';
      estado.waitingForNewValue = false;
    } else if (textoActual === '' || textoActual === '0' || textoActual === '0,' || textoActual === '-' || textoActual === '-0') {
      estado.currentValue = textoActual === '-' || textoActual === '-0' ? '-0,' : '0,';
    } else if (textoActual.indexOf(',') === -1) {
      estado.currentValue = textoActual + ',';
    }

    estado.justEvaluated = false;
    actualizarDisplay(result, estado.currentValue);
    actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
    return;
  }

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

function convertirBigInt(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (value.includes('.')) {
    return null;
  }

  try {
    return BigInt(value);
  } catch (error) {
    return null;
  }
}

function parseRacional(value) {
  if (value === null || value === undefined || value === '' || value === 'Error') {
    return null;
  }

  var texto = String(value).trim();
  if (texto === '') {
    return null;
  }

  if (texto.endsWith(',')) {
    return null;
  }

  if (texto.indexOf('(') !== -1 || texto.indexOf(',') !== -1) {
    var signo = 1n;
    if (texto.charAt(0) === '-') {
      signo = -1n;
      texto = texto.slice(1);
    }

    var parteEntera = '0';
    var parteNoPeriodica = '';
    var partePeriodica = '';

    if (texto.indexOf(',') !== -1) {
      var partes = texto.split(',');
      parteEntera = partes[0] || '0';
      var resto = partes[1] || '';

      if (resto.indexOf('(') !== -1) {
        var subPartes = resto.split('(');
        parteNoPeriodica = subPartes[0] || '';
        partePeriodica = subPartes[1].replace(')', '');
      } else {
        parteNoPeriodica = resto;
      }
    } else if (texto.indexOf('(') !== -1) {
      var subPartes = texto.split('(');
      parteEntera = subPartes[0] || '0';
      partePeriodica = subPartes[1].replace(')', '');
    }

    if (!/^[0-9]*$/.test(parteEntera)) {
      return null;
    }

    if (!/^[0-9]*$/.test(parteNoPeriodica) || !/^[0-9]*$/.test(partePeriodica)) {
      return null;
    }

    if (texto.indexOf('(') !== -1 && partePeriodica.length === 0) {
      return null;
    }

    if (texto.indexOf(',') !== -1 && texto.indexOf('(') === -1) {
      var decimal = parteNoPeriodica || '0';
      var potencia = 10n ** BigInt(decimal.length || 1);
      var entero = BigInt(parteEntera || '0');
      var numerador = entero * potencia + BigInt(decimal);
      return { num: numerador * signo, den: potencia };
    }

    var entero = BigInt(parteEntera || '0');
    var n = BigInt(parteNoPeriodica.length);
    var m = BigInt(partePeriodica.length);
    var x = BigInt(parteNoPeriodica || '0');
    var y = BigInt(partePeriodica || '0');

    var den = (10n ** n) * ((10n ** m) - 1n);
    var numer = entero * den + x * ((10n ** m) - 1n) + y;

    if (partePeriodica.length === 0 && parteNoPeriodica.length === 0) {
      return { num: entero * signo, den: 1n };
    }

    if (den === 0n) {
      return null;
    }

    return { num: numer * signo, den: den };
  }

  var entero = convertirBigInt(texto);
  if (entero !== null) {
    return { num: entero, den: 1n };
  }

  return null;
}

function racionalADecimal(racional) {
  if (racional === null || racional === undefined) {
    return 'Error';
  }

  var num = racional.num;
  var den = racional.den;
  var signo = '';

  if (den === 0n) {
    return 'Error';
  }

  if (num < 0n) {
    signo = '-';
    num = -num;
  }

  var entero = num / den;
  var resto = num % den;

  if (resto === 0n) {
    return signo + entero.toString();
  }

  var cifras = '';
  var indices = new Map();
  var posicion = 0;

  while (resto !== 0n && !indices.has(resto)) {
    indices.set(resto, posicion);
    resto = resto * 10n;
    cifras += (resto / den).toString();
    resto = resto % den;
    posicion += 1;
  }

  if (resto === 0n) {
    return signo + entero.toString() + ',' + cifras;
  }

  var inicio = indices.get(resto);
  var noPeriodica = cifras.slice(0, inicio);
  var periodica = cifras.slice(inicio);

  return signo + entero.toString() + ',' + noPeriodica + '(' + periodica + ')';
}

function validarEntradaBigInt(estado) {
  if (parseRacional(estado.currentValue) === null && estado.currentValue !== '0' && estado.currentValue !== 'Error') {
    estado.currentValue = 'Error';
    estado.previousValue = null;
    estado.operator = null;
    estado.waitingForNewValue = false;
    estado.justEvaluated = true;
    return false;
  }

  return true;
}

function racionalSuma(a, b) {
  return {
    num: a.num * b.den + b.num * a.den,
    den: a.den * b.den
  };
}

function racionalResta(a, b) {
  return {
    num: a.num * b.den - b.num * a.den,
    den: a.den * b.den
  };
}

function racionalMultiplica(a, b) {
  return {
    num: a.num * b.num,
    den: a.den * b.den
  };
}

function racionalDivide(a, b) {
  if (b.num === 0n) {
    return null;
  }

  return {
    num: a.num * b.den,
    den: a.den * b.num
  };
}

function realizarCalculo(estado) {
  var prev = parseRacional(estado.previousValue);
  var current = parseRacional(estado.currentValue);

  if (prev === null || current === null) {
    return 'Error';
  }

  var result;

  switch (estado.operator) {
    case '+':
      result = racionalSuma(prev, current);
      return racionalADecimal(result);
    case '-':
      result = racionalResta(prev, current);
      return racionalADecimal(result);
    case '*':
      result = racionalMultiplica(prev, current);
      return racionalADecimal(result);
    case '/':
      result = racionalDivide(prev, current);
      if (result === null) {
        return 'Error';
      }
      return racionalADecimal(result);
    default:
      return estado.currentValue;
  }
}

function seleccionarOperacion(estado, nextOperator, result, history) {
  if (!validarEntradaBigInt(estado)) {
    actualizarDisplay(result, estado.currentValue);
    history.textContent = 'Error';
    return;
  }

  var inputValue = parseRacional(estado.currentValue);

  if (estado.previousValue === null) {
    estado.previousValue = estado.currentValue;
  } else if (estado.operator) {
    var resultado = realizarCalculo(estado);
    estado.currentValue = resultado;
    estado.previousValue = estado.currentValue;
  }

  if (inputValue === null) {
    estado.currentValue = '0';
  }

  estado.operator = nextOperator;
  estado.waitingForNewValue = true;
  estado.justEvaluated = false;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
}

function evaluar(estado, result, history, historyList) {
  if (!validarEntradaBigInt(estado)) {
    actualizarDisplay(result, estado.currentValue);
    history.textContent = 'Error';
    return;
  }

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

  var operacion = estado.previousValue + ' ' + estado.operator + ' ' + estado.currentValue + ' = ' + resultado;
  estado.historial.push(operacion);
  if (estado.historial.length > 12) {
    estado.historial.shift();
  }

  estado.currentValue = resultado;
  estado.previousValue = null;
  estado.operator = null;
  estado.waitingForNewValue = false;
  estado.justEvaluated = true;
  actualizarDisplay(result, estado.currentValue);
  actualizarHistory(history, estado.previousValue, estado.operator, estado.currentValue, estado.waitingForNewValue);
  actualizarListaHistorial(historyList, estado.historial);
}
