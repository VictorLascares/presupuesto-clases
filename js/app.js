// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
let presupuesto



// Eventos
eventListeners()
function eventListeners() {
   document.addEventListener('DOMContentLoaded', preguntarPresupuesto) 
}


// Classes
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto
        this.restante = presupuesto
        this.gastos = []
    }
}


class UI {
    insertarPresupuesto( cantidad ) {
        const { presupuesto, restante } = cantidad
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
    }
}

// Instanciar
const ui = new UI()


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = Number(prompt('¿Cual es tu presupuesto?'))


    if(!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario<0) {
        window.location.reload()
    }


    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario)
    console.log(presupuesto)


    ui.insertarPresupuesto(presupuesto)
}
