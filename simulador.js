//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // === REFERENCIAS A ELEMENTOS DEL DOM ===
    const txtIngresos = document.getElementById('txtIngresos');
    const txtEgresos = document.getElementById('txtEgresos');
    const txtMonto = document.getElementById('txtMonto');
    const txtPlazo = document.getElementById('txtPlazo');
    const txtTasaInteres = document.getElementById('txtTasaInteres');
    
    const spnDisponible = document.getElementById('spnDisponible');
    const spnCapacidadPago = document.getElementById('spnCapacidadPago');
    const spnInteresPagar = document.getElementById('spnInteresPagar');
    const spnTotalPrestamo = document.getElementById('spnTotalPrestamo');
    const spnCuotaMensual = document.getElementById('spnCuotaMensual');
    const spnEstadoCredito = document.getElementById('spnEstadoCredito');
    
    const btnCalcularCredito = document.getElementById('btnCalcularCredito');
    const btnReiniciar = document.getElementById('btnReiniciar');
    
    // === FUNCIONES DE ACTUALIZACIÓN DE UI ===
    
    // Actualiza los campos de disponibilidad financiera
    function actualizarDisponibilidad() {
        const ingresos = txtIngresos.value;
        const egresos = txtEgresos.value;
        
        // Llamar a la función de negocio
        const disponible = calcularDisponible(ingresos, egresos);
        const capacidadPago = calcularCapacidadPago(disponible);
        
        // Actualizar la interfaz
        spnDisponible.textContent = disponible.toFixed(2);
        spnCapacidadPago.textContent = capacidadPago.toFixed(2);
        
        return { disponible, capacidadPago };
    }
    
    // Actualiza toda la simulación del crédito
    function actualizarSimulacionCredito() {
        const monto = txtMonto.value;
        const plazo = txtPlazo.value;
        const tasaInteres = txtTasaInteres.value;
        
        // Obtener disponibilidad actual
        const { capacidadPago } = actualizarDisponibilidad();
        
        // Llamar a las funciones de negocio
        const interesPagar = calcularInteresPagar(monto, tasaInteres, plazo);
        const totalPrestamo = calcularTotalPrestamo(monto, interesPagar);
        const cuotaMensual = calcularCuotaMensual(totalPrestamo, plazo);
        const estadoCredito = evaluarEstadoCredito(cuotaMensual, capacidadPago);
        
        // Actualizar la interfaz
        spnInteresPagar.textContent = interesPagar.toFixed(2);
        spnTotalPrestamo.textContent = totalPrestamo.toFixed(2);
        spnCuotaMensual.textContent = cuotaMensual.toFixed(2);
        spnEstadoCredito.textContent = estadoCredito;
        
        // Cambiar color según estado
        if (estadoCredito === "APROBADO") {
            spnEstadoCredito.style.color = "green";
        } else if (estadoCredito === "RECHAZADO") {
            spnEstadoCredito.style.color = "red";
        }
    }
    
    // Reiniciar todos los campos
    function reiniciarFormulario() {
        txtIngresos.value = '';
        txtEgresos.value = '';
        txtMonto.value = '';
        txtPlazo.value = '';
        txtTasaInteres.value = '';
        
        spnDisponible.textContent = '';
        spnCapacidadPago.textContent = '';
        spnInteresPagar.textContent = '';
        spnTotalPrestamo.textContent = '';
        spnCuotaMensual.textContent = '';
        spnEstadoCredito.textContent = 'ANALIZANDO...';
        spnEstadoCredito.style.color = '';
    }
    
    // === EVENTOS ===
    
    // Actualizar disponibilidad cuando cambien ingresos/egresos
    txtIngresos.addEventListener('input', function() {
        actualizarDisponibilidad();
        // Si ya hay datos en crédito, actualizar simulación
        if (txtMonto.value || txtPlazo.value || txtTasaInteres.value) {
            actualizarSimulacionCredito();
        }
    });
    
    txtEgresos.addEventListener('input', function() {
        actualizarDisponibilidad();
        if (txtMonto.value || txtPlazo.value || txtTasaInteres.value) {
            actualizarSimulacionCredito();
        }
    });
    
    // Calcular crédito
    btnCalcularCredito.addEventListener('click', actualizarSimulacionCredito);
    
    // Reiniciar
    btnReiniciar.addEventListener('click', reiniciarFormulario);
    
    // Inicializar valores por defecto (opcional)
    actualizarDisponibilidad();
});