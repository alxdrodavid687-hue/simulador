// === REFERENCIAS A ELEMENTOS DEL DOM ===
const txtIngresos = document.getElementById('txtIngresos');
const txtEgresos = document.getElementById('txtEgresos');
const lblDisponibleValor = document.getElementById('lblDisponibleValor');

// === FUNCIÓN CALCULAR (solicitada en la imagen) ===
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
    
    // Retornar el valor por si se necesita en otros cálculos
    return disponible;
}

// === CÓDIGO ADICIONAL PARA QUE LA FUNCIÓN SE EJECUTE AUTOMÁTICAMENTE ===

// Ejecutar calcular cuando se carga la página (valores iniciales)
document.addEventListener('DOMContentLoaded', function() {
    calcular();
});

// Ejecutar calcular cuando cambien los valores de ingresos o egresos
txtIngresos.addEventListener('input', calcular);
txtEgresos.addEventListener('input', calcular);