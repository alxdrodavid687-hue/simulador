// === REFERENCIAS A ELEMENTOS DEL DOM ===
const txtIngresos = document.getElementById('txtIngresos');
const txtEgresos = document.getElementById('txtEgresos');
const txtMonto = document.getElementById('txtMonto');
const txtPlazo = document.getElementById('txtPlazo');
const txtTasaInteres = document.getElementById('txtTasaInteres');
const lblDisponibleValor = document.getElementById('lblDisponibleValor');
const lblCapacidadValor = document.getElementById('lblCapacidadValor');
const lblInteresValor = document.getElementById('lblInteresValor');

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
    
    // ===== NUEVAS INSTRUCCIONES =====
    // 1. Leer los valores de Monto solicitado, Plazo en años, Tasa anual simple, como enteros
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    // 2. Llamar a la función calcularInteresSimple y guardar el retorno en una variable
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    
    // 3. Mostrar en pantalla, en el componente lblInteresValor
    lblInteresValor.textContent = interesPagar;
    
    // Retornar los valores por si se necesitan en otros cálculos
    return { disponible, capacidadPago, interesPagar };
}

// === FUNCIÓN PARA CALCULAR CRÉDITO COMPLETO ===
function calcularCredito() {
    // Llamar a la función calcular que actualiza todos los valores
    const { disponible, capacidadPago, interesPagar } = calcular();
    
    // Obtener valores actualizados
    const monto = parseInt(txtMonto.value) || 0;
    const plazo = parseInt(txtPlazo.value) || 0;
    
    // Calcular total del préstamo (monto + interés)
    const totalPrestamo = monto + interesPagar;
    
    // Calcular cuota mensual (total / (plazo * 12))
    const cuotaMensual = plazo > 0 ? totalPrestamo / (plazo * 12) : 0;
    
    // Evaluar estado del crédito (la cuota no debe superar la capacidad de pago)
    let estadoCredito = "ANALIZANDO...";
    if (cuotaMensual > 0 && capacidadPago > 0) {
        estadoCredito = cuotaMensual <= capacidadPago ? "APROBADO" : "RECHAZADO";
    } else if (cuotaMensual > 0 && capacidadPago === 0) {
        estadoCredito = "RECHAZADO (Sin capacidad de pago)";
    } else if (cuotaMensual === 0 && monto > 0) {
        estadoCredito = "RECHAZADO (Plazo inválido)";
    }
    
    // Mostrar resultados adicionales en pantalla
    document.getElementById('spnTotalPrestamo').textContent = totalPrestamo.toFixed(2);
    document.getElementById('spnCuotaMensual').textContent = cuotaMensual.toFixed(2);
    document.getElementById('spnEstadoCredito').textContent = estadoCredito;
    
    // Cambiar color según estado
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    if (estadoCredito === "APROBADO") {
        spnEstadoCredito.style.color = "green";
    } else if (estadoCredito.includes("RECHAZADO")) {
        spnEstadoCredito.style.color = "red";
    } else {
        spnEstadoCredito.style.color = "";
    }
}

// === FUNCIÓN PARA ACTUALIZAR SOLO EL INTERÉS (cuando cambian monto, plazo o tasa) ===
function actualizarInteres() {
    const monto = parseInt(txtMonto.value) || 0;
    const plazoAnios = parseInt(txtPlazo.value) || 0;
    const tasaAnual = parseInt(txtTasaInteres.value) || 0;
    
    const interesPagar = calcularInteresSimple(monto, tasaAnual, plazoAnios);
    lblInteresValor.textContent = interesPagar;
    
    return interesPagar;
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
    document.getElementById('spnTotalPrestamo').textContent = '';
    document.getElementById('spnCuotaMensual').textContent = '';
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

// Actualizar interés cuando cambien monto, plazo o tasa
txtMonto.addEventListener('input', function() {
    actualizarInteres();
});

txtPlazo.addEventListener('input', function() {
    actualizarInteres();
});

txtTasaInteres.addEventListener('input', function() {
    actualizarInteres();
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