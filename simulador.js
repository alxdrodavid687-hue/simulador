const inputs = document.querySelectorAll("input");

const barra = document.getElementById("barra");
const estado = document.getElementById("estado");
const cuotaLbl = document.getElementById("cuota");

// ERRORES
const errores = {
    ingresos: document.getElementById("errorIngresos"),
    egresos: document.getElementById("errorEgresos"),
    monto: document.getElementById("errorMonto"),
    plazo: document.getElementById("errorPlazo"),
    tasa: document.getElementById("errorTasa")
};

function limpiarErrores() {
    Object.values(errores).forEach(e => e.textContent = "");
    inputs.forEach(i => i.classList.remove("input-error"));
}

function validar() {

    limpiarErrores();
    let ok = true;

    const ingresos = parseFloat(txtIngresos.value);
    const egresos = parseFloat(txtEgresos.value);
    const monto = parseFloat(txtMonto.value);
    const plazo = parseFloat(txtPlazo.value);
    const tasa = parseFloat(txtTasaInteres.value);

    if (!txtIngresos.value) {
        errores.ingresos.textContent = "Obligatorio";
        txtIngresos.classList.add("input-error");
        ok = false;
    }

    if (!txtEgresos.value) {
        errores.egresos.textContent = "Obligatorio";
        txtEgresos.classList.add("input-error");
        ok = false;
    }

    if (ingresos < egresos) {
        errores.egresos.textContent = "Mayor que ingresos";
        ok = false;
    }

    if (monto < 5000 || monto > 50000) {
        errores.monto.textContent = "5000 - 50000";
        ok = false;
    }

    if (plazo < 1 || plazo > 5) {
        errores.plazo.textContent = "1 - 5";
        ok = false;
    }

    if (tasa < 1 || tasa > 30) {
        errores.tasa.textContent = "1% - 30%";
        ok = false;
    }

    return ok;
}

function formatear(num) {
    return num.toLocaleString("es-EC", {
        style: "currency",
        currency: "USD"
    });
}

function evaluar() {

    if (!validar()) {
        estado.textContent = "Corrige errores";
        barra.style.width = "0%";
        return;
    }

    const ingresos = +txtIngresos.value;
    const egresos = +txtEgresos.value;
    const monto = +txtMonto.value;
    const plazo = +txtPlazo.value;
    const tasa = +txtTasaInteres.value;

    const disponible = calcularDisponible(ingresos, egresos);
    const capacidad = calcularCapacidadPago(disponible);
    const interes = calcularInteresSimple(monto, tasa, plazo);
    const total = calcularTotalPagar(monto, interes);
    const cuota = calcularCuotaMensual(total, plazo);

    cuotaLbl.textContent = formatear(cuota);

    let porcentaje = (capacidad / cuota) * 100;
    porcentaje = Math.min(porcentaje, 100);

    barra.style.width = porcentaje + "%";

    if (capacidad >= cuota) {
        estado.textContent = "Aprobado";
        barra.style.background = "var(--success)";
    } else {
        estado.textContent = "Riesgo alto";
        barra.style.background = "var(--error)";
    }
}

document.getElementById("btnCalcular").addEventListener("click", evaluar);
