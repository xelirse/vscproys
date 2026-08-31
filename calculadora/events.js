function asociarEventos(estado, result, history, buttons, historyList, copyButton, saveButton) {
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.value;
      var action = button.dataset.action;

      if (action === 'clear') {
        limpiarCalculadora(estado, result, history, historyList);
        return;
      }

      if (action === 'delete') {
        borrarUltimo(estado, result, history);
        return;
      }

      if (action === 'equals') {
        evaluar(estado, result, history, historyList);
        return;
      }

      if (action === 'copy') {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          var texto = String(estado.currentValue || '0');
          navigator.clipboard.writeText(texto).then(function () {
            if (copyButton) {
              var original = copyButton.textContent;
              copyButton.textContent = 'Listo';
              setTimeout(function () {
                copyButton.textContent = original;
              }, 700);
            }
          }).catch(function () {
            if (copyButton) {
              copyButton.textContent = 'Error';
            }
          });
        }
        return;
      }

      if (action === 'save') {
        var texto = String(estado.currentValue || '0');
        var blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'resultado.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        if (saveButton) {
          var original = saveButton.textContent;
          saveButton.textContent = 'Guardado';
          setTimeout(function () {
            saveButton.textContent = original;
          }, 700);
        }
        return;
      }

      if (['+', '-', '*', '/'].includes(value)) {
        seleccionarOperacion(estado, value, result, history);
        return;
      }

      ingresarDigito(estado, value, result, history);
    });
  });

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        var texto = String(estado.currentValue || '0');
        navigator.clipboard.writeText(texto).then(function () {
          var original = copyButton.textContent;
          copyButton.textContent = 'Listo';
          setTimeout(function () {
            copyButton.textContent = original;
          }, 700);
        }).catch(function () {
          copyButton.textContent = 'Error';
        });
      }
    });
  }

  if (saveButton) {
    saveButton.addEventListener('click', function () {
      var texto = String(estado.currentValue || '0');
      var blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'resultado.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      var original = saveButton.textContent;
      saveButton.textContent = 'Guardado';
      setTimeout(function () {
        saveButton.textContent = original;
      }, 700);
    });
  }

  document.addEventListener('keydown', function (event) {
    var key = event.key;

    if (/^[0-9]$/.test(key)) {
      ingresarDigito(estado, key, result, history);
    }

    if (key === ',' || key === '.') {
      ingresarDigito(estado, ',', result, history);
    }

    if (key === '(' || key === ')') {
      ingresarDigito(estado, key, result, history);
    }

    if (['+', '-', '*', '/'].includes(key)) {
      seleccionarOperacion(estado, key, result, history);
    }

    if (key === 'Enter' || key === '=') {
      evaluar(estado, result, history, historyList);
    }

    if (key === 'Backspace') {
      borrarUltimo(estado, result, history);
    }

    if (key === 'Escape') {
      limpiarCalculadora(estado, result, history, historyList);
    }
  });
}
