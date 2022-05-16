// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')




// Eventos
eventListeners()
function eventListeners() {
   document.addEventListener('DOMContentLoaded', preguntarPresupuesto) 
}


// Classes




// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = Number(prompt('¿Cual es tu presupuesto?'))


    if(!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario<0) {
        window.location.reload()
    } else {
        console.log(presupuestoUsuario)
    }
}
