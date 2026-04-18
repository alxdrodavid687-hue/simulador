// === REFERENCIAS A ELEMENTOS DEL DOM ===
const txtIngresos = document.getElementById('txtIngresos');
const txtEgresos = document.getElementById('txtEgresos');
const lblDisponibleValor = document.getElementById('lblDisponibleValor');
const lblCapacidadValor = document.getElementById('lblCapacidadValor');

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
    // Se le pasa como parámetro el valor disponible
    const capacidadPago = calcularCapacidadPago(disponible);
    
    // 6. Mostrar en pantalla, en el componente lblCapacidadValor
    lblCapacidadValor.textContent = capacidadPago;
    
    return disponible;
}

// === FUNCIÓN PARA CALCULAR CRÉDITO (AL PRESIONAR EL BOTÓN) ===
function calcularCredito() {
    // Primero actualizar disponibilidad y capacidad de pago
    calcular();
    
    // Obtener valores de los inputs de crédito
    const monto = parseFloat(txtMonto.value) || 0;
    const plazo = parseFloat(txtPlazo.value) || 0;
    const tasaInteres = parseFloat(txtTasaInteres.value) || 0;
    
    // Obtener la capacidad de pago actual
    const capacidadPago = parseFloat(lblCapacidadValor.textContent) || 0;
    
    // Calcular interés a pagar (fórmula: monto * tasa * plazo)
    const interesPagar = monto * (tasaInteres / 100) * plazo;
    
    // Calcular total del préstamo
    const totalPrestamo = monto + interesPagar;
    
    // Calcular cuota mensual (total / (plazo * 12))
    const cuotaMensual = plazo > 0 ? totalPrestamo / (plazo * 12) : 0;
    
    // Evaluar estado del crédito (la cuota no debe superar la capacidad de pago)
    let estadoCredito = "ANALIZANDO...";
    if (cuotaMensual > 0) {
        estadoCredito = cuotaMensual <= capacidadPago ? "APROBADO" : "RECHAZADO";
    }
    
    // Mostrar resultados en pantalla
    document.getElementById('spnInteresPagar').textContent = interesPagar.toFixed(2);
    document.getElementById('spnTotalPrestamo').textContent = totalPrestamo.toFixed(2);
    document.getElementById('spnCuotaMensual').textContent = cuotaMensual.toFixed(2);
    document.getElementById('spnEstadoCredito').textContent = estadoCredito;
    
    // Cambiar color según estado
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    if (estadoCredito === "APROBADO") {
        spnEstadoCredito.style.color = "green";
    } else if (estadoCredito === "RECHAZADO") {
        spnEstadoCredito.style.color = "red";
    } else {
        spnEstadoCredito.style.color = "";
    }
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
    document.getElementById('spnInteresPagar').textContent = '';
    document.getElementById('spnTotalPrestamo').textContent = '';
    document.getElementById('spnCuotaMensual').textContent = '';
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    spnEstadoCredito.textContent = 'ANALIZANDO...';
    spnEstadoCredito.style.color = '';
}

// === EVENTOS ===
// Ejecutar calcular cuando cambien los valores de ingresos o egresos
txtIngresos.addEventListener('input', calcular);
txtEgresos.addEventListener('input', calcular);

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