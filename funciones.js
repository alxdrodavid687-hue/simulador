function calcularDisponible(ingresos, egresos) {
    const d = ingresos - egresos;
    return d > 0 ? d : 0;
}

function calcularCapacidadPago(disponible) {
    return disponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazo) {
    return monto * (tasa / 100) * plazo;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

function calcularCuotaMensual(total, plazo) {
    if (plazo === 0) return 0;
    return total / (plazo * 12);
}