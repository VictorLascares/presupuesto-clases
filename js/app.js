// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
let presupuesto



// Eventos
eventListeners()
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto)

  formulario.addEventListener('submit', agregarGasto)
}


// Classes
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = presupuesto
    this.restante = presupuesto
    this.gastos = []
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto]
  }
}


class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad
    document.querySelector('#total').textContent = presupuesto
    document.querySelector('#restante').textContent = restante
  }
  imprimirAlerta(mensaje, tipo) {
    // Crear el div
    const divMensaje = document.createElement('div')
    divMensaje.classList.add('text-center', 'alert')

    if (tipo == 'error') {
      divMensaje.classList.add('alert-danger')
    } else {
      divMensaje.classList.add('alert-success')
    }

    // Mensaje de error
    divMensaje.textContent = mensaje

    // Insertar en el HTML
    document.querySelector('.primario').insertBefore(divMensaje, formulario)

    // Quitar del HTML
    setTimeout(() => {
      divMensaje.remove()
    }, 3000)
  }

  agregarGastoListado(gastos) {
    // Limpiar HTML previo
    this.limpiarHTML()

    gastos.forEach(gasto => {
      const { cantidad, nombre, id } = gasto;

      // Crear li
      const nuevoGasto = document.createElement('li')
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
      nuevoGasto.dataset.id = id

      // Agregar el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`

      // Boton para borrar el gasto
      const btnBorrar = document.createElement('button')
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
      btnBorrar.textContent = 'Eliminar'
      nuevoGasto.appendChild(btnBorrar)

      // Agregar al HTML
      gastoListado.appendChild(nuevoGasto)
    })
  }

  limpiarHTML() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild)
    }
  }
}

// Instanciar
const ui = new UI()


// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = Number(prompt('¿Cual es tu presupuesto?'))


  if (!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario < 0) {
    window.location.reload()
  }


  // Presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario)


  ui.insertarPresupuesto(presupuesto)
}

// Añade gastos
function agregarGasto(e) {
  e.preventDefault()


  // Leer los datos del formulario
  const nombre = document.querySelector('#gasto').value
  const cantidad = Number(document.querySelector('#cantidad').value)


  // Validar
  if (!nombre || !cantidad) {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
    return
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta('Cantidad no válida', 'error')
    return
  }

  // Generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() }


  // Añadiendo nuevo gasto
  presupuesto.nuevoGasto(gasto)

  // Mensaje de proceso exitoso
  ui.imprimirAlerta('Gasto agregado correctamente')


  // Imprimir los gastos
  const { gastos } = presupuesto
  ui.agregarGastoListado(gastos)

  // Renicio del formulario
  formulario.reset()
}

