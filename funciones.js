// ===== FUNCIONES DE NEGOCIO =====

// Función para calcular el valor disponible (ingresos - egresos)
// Si el resultado es negativo, retorna 0
function calcularDisponible(ingresos, egresos) {
    const ingresosNum = parseFloat(ingresos) || 0;
    const egresosNum = parseFloat(egresos) || 0;
    const disponible = ingresosNum - egresosNum;
    return disponible > 0 ? disponible : 0;
}

// Función para calcular la capacidad de pago (50% del valor disponible)
// Parámetros: montoDisponible
// Retorna: La capacidad de pago
function calcularCapacidadPago(montoDisponible) {
    const disponible = parseFloat(montoDisponible) || 0;
    return disponible * 0.5;  // 50% del valor disponible
}

// Función para calcular el interés simple
// Parámetros: Monto, Tasa, plazoAnios
// Retorna: El valor de interés que debe pagar
function calcularInteresSimple(monto, tasa, plazoAnios) {
    const montoNum = parseFloat(monto) || 0;
    const tasaNum = parseFloat(tasa) || 0;
    const plazoNum = parseFloat(plazoAnios) || 0;
    
    // Fórmula: plazo en años * monto * (tasa / 100)
    const interes = plazoNum * montoNum * (tasaNum / 100);
    
    return interes;
}

// Función para calcular el valor total a pagar
// Parámetros: monto, interes
// Retorna: el valor total a pagar (monto + interés + USD 100 por impuestos y contribución a SOLCA)
function calcularTotalPagar(monto, interes) {
    const montoNum = parseFloat(monto) || 0;
    const interesNum = parseFloat(interes) || 0;
    const impuestosSOLCA = 100; // USD 100 por impuestos y contribución a SOLCA
    
    const totalPagar = montoNum + interesNum + impuestosSOLCA;
    
    return totalPagar;
}

// Función para calcular la cuota mensual
// Parámetros: total, plazoAnios
// Retorna: El valor de la cuota mensual
function calcularCuotaMensual(total, plazoAnios) {
    const totalNum = parseFloat(total) || 0;
    const plazoAniosNum = parseFloat(plazoAnios) || 0;
    
    // Convertir plazo de años a meses
    const plazoMeses = plazoAniosNum * 12;
    
    // Calcular cuota mensual (total / número de meses)
    // Si el plazo es 0, retornar 0 para evitar división por cero
    if (plazoMeses === 0) {
        return 0;
    }
    
    const cuotaMensual = totalNum / plazoMeses;
    return cuotaMensual;
}