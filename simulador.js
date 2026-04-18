// === REFERENCIAS A ELEMENTOS DEL DOM ===
const txtIngresos = document.getElementById('txtIngresos');
const txtEgresos = document.getElementById('txtEgresos');
const txtMonto = document.getElementById('txtMonto');
const txtPlazo = document.getElementById('txtPlazo');
const txtTasaInteres = document.getElementById('txtTasaInteres');
const lblDisponibleValor = document.getElementById('lblDisponibleValor');
const lblCapacidadValor = document.getElementById('lblCapacidadValor');
const lblInteresValor = document.getElementById('lblInteresValor');
const lblTotalValor = document.getElementById('lblTotalValor');
const lblCuotaValor = document.getElementById('lblCuotaValor');
const statusContainer = document.getElementById('statusContainer');

// === FUNCIÓN PARA ACTUALIZAR EL ESTILO DEL ESTADO ===
function actualizarEstiloEstado(mensaje) {
    // Remover clases existentes
    statusContainer.classList.remove('approved', 'rejected', 'analyzing');
    
    // Agregar clase según el mensaje
    if (mensaje === "CREDITO APROBADO") {
        statusContainer.classList.add('approved');
        // Cambiar icono
        const iconElement = statusContainer.querySelector('.status-icon i');
        if (iconElement) {
            iconElement.className = 'fas fa-check-circle';
        }
    } else if (mensaje.includes("RECHAZADO")) {
        statusContainer.classList.add('rejected');
        // Cambiar icono
        const iconElement = statusContainer.querySelector('.status-icon i');
        if (iconElement) {
            iconElement.className = 'fas fa-times-circle';
        }
    } else {
        statusContainer.classList.add('analyzing');
        // Cambiar icono
        const iconElement = statusContainer.querySelector('.status-icon i');
        if (iconElement) {
            iconElement.className = 'fas fa-chart-simple';
        }
    }
}

// === FUNCIÓN CALCULAR ===
function calcular() {
    // 1. Leer el valor de ingresos (float)
    const ingresos = parseFloat(txtIngresos.value) || 0;
    
    // 2. Leer el valor de egresos (float)
    const egresos = parseFloat(txtEgresos.value) || 0;
    
    // 3. Llamar a la función calcularDisponible y guardar el retorno en una variable
    const disponible = calcularDisponible(ingresos, egresos);
    
    // 4. Mostrar en pantalla, en el componente lblDisponibleValor
    lblDisponibleValor.textContent = `$${disponible.toFixed(2)}`;
    
    // 5. Llamar a la función calcularCapacidadPago y guardar el retorno en una variable
    const capacidadPago = calcularCapacidadPago(disponible);
    
    // 6. Mostrar en pantalla, en el componente lblCapacidadValor
    lblCapacidadValor.textContent = `$${capacidadPago.toFixed(2)}`;
    
    // 7. Leer los valores de Monto solicitado, Plazo en años, Tasa anual simple, como enteros
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    // 8. Llamar a la función calcularInteresSimple y guardar el retorno en una variable
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    
    // 9. Mostrar en pantalla, en el componente lblInteresValor
    lblInteresValor.textContent = `$${interesPagar.toFixed(2)}`;
    
    // 10. Invocar a calcularTotalPagar
    const totalPagar = calcularTotalPagar(monto, interesPagar);
    
    // 11. Mostrar en pantalla, en el componente lblTotalValor
    lblTotalValor.textContent = `$${totalPagar.toFixed(2)}`;
    
    // 12. Invocar a calcularCuotaMensual
    const cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    
    // 13. Mostrar en pantalla, en el componente lblCuotaValor
    lblCuotaValor.textContent = `$${cuotaMensual.toFixed(2)}`;
    
    // 14. Invocar a aprobarCredito y guardar el resultado en una variable
    let aprobado = false;
    let mensajeCredito = "";
    
    // Validar que los valores sean válidos para el análisis
    if (cuotaMensual > 0 && capacidadPago > 0) {
        aprobado = aprobarCredito(capacidadPago, cuotaMensual);
        
        if (aprobado) {
            mensajeCredito = "CREDITO APROBADO";
        } else {
            mensajeCredito = "CREDITO RECHAZADO";
        }
    } else if (cuotaMensual > 0 && capacidadPago === 0) {
        mensajeCredito = "CREDITO RECHAZADO (Sin capacidad de pago)";
        aprobado = false;
    } else if (cuotaMensual === 0 && monto > 0) {
        mensajeCredito = "CREDITO RECHAZADO (Plazo inválido)";
        aprobado = false;
    } else {
        mensajeCredito = "ANALIZANDO...";
        aprobado = false;
    }
    
    // Mostrar el mensaje en el componente spnEstadoCredito
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    spnEstadoCredito.textContent = mensajeCredito;
    
    // Actualizar estilo del estado
    actualizarEstiloEstado(mensajeCredito);
    
    return { disponible, capacidadPago, interesPagar, totalPagar, cuotaMensual, aprobado, mensajeCredito };
}

// === FUNCIÓN PARA ACTUALIZAR SOLO EL INTERÉS, TOTAL Y CUOTA ===
function actualizarValoresCredito() {
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    lblInteresValor.textContent = `$${interesPagar.toFixed(2)}`;
    
    const totalPagar = calcularTotalPagar(monto, interesPagar);
    lblTotalValor.textContent = `$${totalPagar.toFixed(2)}`;
    
    const cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    lblCuotaValor.textContent = `$${cuotaMensual.toFixed(2)}`;
    
    return { interesPagar, totalPagar, cuotaMensual };
}

// === FUNCIÓN PARA CALCULAR CRÉDITO COMPLETO ===
function calcularCredito() {
    const resultado = calcular();
    console.log("Análisis de crédito:", resultado);
    return resultado;
}

// === FUNCIÓN PARA REINICIAR ===
function reiniciar() {
    txtIngresos.value = '';
    txtEgresos.value = '';
    txtMonto.value = '';
    txtPlazo.value = '';
    txtTasaInteres.value = '';
    
    lblDisponibleValor.textContent = '$0';
    lblCapacidadValor.textContent = '$0';
    lblInteresValor.textContent = '$0';
    lblTotalValor.textContent = '$0';
    lblCuotaValor.textContent = '$0';
    
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    spnEstadoCredito.textContent = 'ANALIZANDO...';
    
    actualizarEstiloEstado('ANALIZANDO...');
}

// === EVENTOS ===
txtIngresos.addEventListener('input', function() {
    calcular();
});

txtEgresos.addEventListener('input', function() {
    calcular();
});

txtMonto.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular();
});

txtPlazo.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular();
});

txtTasaInteres.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular();
});

const btnCalcularCredito = document.getElementById('btnCalcularCredito');
if (btnCalcularCredito) {
    btnCalcularCredito.addEventListener('click', calcularCredito);
}

const btnReiniciar = document.getElementById('btnReiniciar');
if (btnReiniciar) {
    btnReiniciar.addEventListener('click', reiniciar);
}

document.addEventListener('DOMContentLoaded', function() {
    calcular();
});