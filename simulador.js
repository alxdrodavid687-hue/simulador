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

// === FUNCIÓN CALCULAR ===
// Esta función no recibe parámetros
function calcular() {
    // 1. Leer el valor de ingresos (float)
    const ingresos = parseFloat(txtIngresos.value) || 0;
    
    // 2. Leer el valor de egresos (float)
    const egresos = parseFloat(txtEgresos.value) || 0;
    
    // 3. Llamar a la función calcularDisponible y guardar el retorno en una variable
    const disponible = calcularDisponible(ingresos, egresos);
    
    // 4. Mostrar en pantalla, en el componente lblDisponibleValor
    lblDisponibleValor.textContent = disponible;
    
    // 5. Llamar a la función calcularCapacidadPago y guardar el retorno en una variable
    const capacidadPago = calcularCapacidadPago(disponible);
    
    // 6. Mostrar en pantalla, en el componente lblCapacidadValor
    lblCapacidadValor.textContent = capacidadPago;
    
    // 7. Leer los valores de Monto solicitado, Plazo en años, Tasa anual simple, como enteros
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    // 8. Llamar a la función calcularInteresSimple y guardar el retorno en una variable
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    
    // 9. Mostrar en pantalla, en el componente lblInteresValor
    lblInteresValor.textContent = interesPagar;
    
    // 10. Invocar a calcularTotalPagar
    const totalPagar = calcularTotalPagar(monto, interesPagar);
    
    // 11. Mostrar en pantalla, en el componente lblTotalValor
    lblTotalValor.textContent = totalPagar;
    
    // 12. Invocar a calcularCuotaMensual
    const cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    
    // 13. Mostrar en pantalla, en el componente lblCuotaValor
    lblCuotaValor.textContent = cuotaMensual;
    
    // 14. Invocar a aprobarCredito (analizarCredito) y guardar el resultado en una variable
    let aprobado = false;
    let mensajeCredito = "";
    
    // Validar que los valores sean válidos para el análisis
    if (cuotaMensual > 0 && capacidadPago > 0) {
        aprobado = aprobarCredito(capacidadPago, cuotaMensual);
        
        // 15. Si fue aprobado mostrar en pantalla el mensaje CREDITO APROBADO
        // 16. Si fue rechazado mostrar en pantalla CREDITO RECHAZADO
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
    
    // Cambiar color según el mensaje
    if (mensajeCredito === "CREDITO APROBADO") {
        spnEstadoCredito.style.color = "green";
    } else if (mensajeCredito.includes("RECHAZADO")) {
        spnEstadoCredito.style.color = "red";
    } else {
        spnEstadoCredito.style.color = "";
    }
    
    // Retornar los valores incluyendo el análisis
    return { disponible, capacidadPago, interesPagar, totalPagar, cuotaMensual, aprobado, mensajeCredito };
}

// === FUNCIÓN PARA ACTUALIZAR SOLO EL INTERÉS, TOTAL Y CUOTA ===
function actualizarValoresCredito() {
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    // Calcular interés
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    lblInteresValor.textContent = interesPagar;
    
    // Calcular total
    const totalPagar = calcularTotalPagar(monto, interesPagar);
    lblTotalValor.textContent = totalPagar;
    
    // Calcular cuota mensual
    const cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    lblCuotaValor.textContent = cuotaMensual;
    
    return { interesPagar, totalPagar, cuotaMensual };
}

// === FUNCIÓN PARA CALCULAR CRÉDITO COMPLETO ===
function calcularCredito() {
    // Llamar a la función calcular que actualiza todos los valores y analiza el crédito
    const resultado = calcular();
    
    // Mostrar en consola para depuración (opcional)
    console.log("Análisis de crédito:", resultado);
    
    return resultado;
}

// === FUNCIÓN PARA REINICIAR ===
function reiniciar() {
    // Limpiar inputs
    txtIngresos.value = '';
    txtEgresos.value = '';
    txtMonto.value = '';
    txtPlazo.value = '';
    txtTasaInteres.value = '';
    
    // Limpiar spans
    lblDisponibleValor.textContent = '';
    lblCapacidadValor.textContent = '';
    lblInteresValor.textContent = '';
    lblTotalValor.textContent = '';
    lblCuotaValor.textContent = '';
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    spnEstadoCredito.textContent = 'ANALIZANDO...';
    spnEstadoCredito.style.color = '';
}

// === EVENTOS ===
// Ejecutar calcular cuando cambien los valores de ingresos o egresos
txtIngresos.addEventListener('input', function() {
    calcular();
});

txtEgresos.addEventListener('input', function() {
    calcular();
});

// Actualizar interés, total y cuota cuando cambien monto, plazo o tasa
txtMonto.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular(); // Recalcular completo para actualizar estado
});

txtPlazo.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular(); // Recalcular completo para actualizar estado
});

txtTasaInteres.addEventListener('input', function() {
    actualizarValoresCredito();
    calcular(); // Recalcular completo para actualizar estado
});

// Evento para el botón Calcular Crédito
const btnCalcularCredito = document.getElementById('btnCalcularCredito');
if (btnCalcularCredito) {
    btnCalcularCredito.addEventListener('click', calcularCredito);
}

// Evento para el botón Reiniciar
const btnReiniciar = document.getElementById('btnReiniciar');
if (btnReiniciar) {
    btnReiniciar.addEventListener('click', reiniciar);
}

// Inicializar valores al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    calcular();
});