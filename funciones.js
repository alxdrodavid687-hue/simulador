//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
// Función para calcular el valor disponible (ingresos - egresos)
// Si el resultado es negativo, retorna 0
function calcularDisponible(ingresos, egresos) {
    const ingresosNum = parseFloat(ingresos) || 0;
    const egresosNum = parseFloat(egresos) || 0;
    const disponible = ingresosNum - egresosNum;
    return disponible > 0 ? disponible : 0;
}

// Función para calcular capacidad de pago (ejemplo: 30% del disponible)
function calcularCapacidadPago(disponible) {
    return disponible * 0.3;
}

// Función para calcular interés a pagar (interés simple para el ejemplo)
function calcularInteresPagar(monto, tasaInteres, plazoAnios) {
    const montoNum = parseFloat(monto) || 0;
    const tasaNum = parseFloat(tasaInteres) || 0;
    const plazoNum = parseFloat(plazoAnios) || 0;
    return montoNum * (tasaNum / 100) * plazoNum;
}

// Función para calcular total del préstamo
function calcularTotalPrestamo(monto, interesPagar) {
    return (parseFloat(monto) || 0) + (parseFloat(interesPagar) || 0);
}

// Función para calcular cuota mensual
function calcularCuotaMensual(totalPrestamo, plazoAnios) {
    const total = parseFloat(totalPrestamo) || 0;
    const meses = (parseFloat(plazoAnios) || 0) * 12;
    if (meses === 0) return 0;
    return total / meses;
}

// Función para evaluar estado del crédito
function evaluarEstadoCredito(cuotaMensual, capacidadPago) {
    if (cuotaMensual <= capacidadPago) {
        return "APROBADO";
    } else {
        return "RECHAZADO";
    }
}