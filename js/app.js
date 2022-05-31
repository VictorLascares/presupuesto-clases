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
    this.calcularRestante()
  }

  calcularRestante() {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
    this.restante = this.presupuesto - gastado
    console.log(this.restante);
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter(gasto => gasto.id !== id)
    this.calcularRestante()
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
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`

      // Boton para borrar el gasto
      const btnBorrar = document.createElement('button')
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
      btnBorrar.textContent = 'Eliminar'
      btnBorrar.onclick = () => {
        eliminarGasto(id)
      }
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

  actualizarRestante( restante ) {
    document.querySelector('#restante').textContent = restante
  }

  comprobarPresupuesto( presupuestoObj) {
    const { presupuesto, restante } = presupuestoObj

    const restanteDiv = document.querySelector('.restante')

    // Comprobar si se gasto mas del 75% del presupuesto
    if (( presupuesto / 4 ) > restante) {
      restanteDiv.classList.remove('alert-success', 'alert-warning')
      restanteDiv.classList.add('alert-danger')
    } else if (( presupuesto / 2 ) > restante ) {
      restanteDiv.classList.remove('alert-success')
      restanteDiv.classList.add('alert-warning')
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-warning')
      restanteDiv.classList.add('alert-success')
    }

    // Si el total es 0 o menor
    if (restante <= 0 ) {
      ui.imprimirAlerta('El Presupuesto se ha agotado', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true
    } else {
      formulario.querySelector('button[type="submit"]').disabled = false
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
  const { gastos, restante } = presupuesto
  ui.agregarGastoListado(gastos)

  ui.actualizarRestante(restante)

  ui.comprobarPresupuesto(presupuesto)

  // Renicio del formulario
  formulario.reset()
}

function eliminarGasto(id) {
  // Eliminar gastos del objeto
  presupuesto.eliminarGasto(id)

  const { gastos, restante } = presupuesto

  // Eliminar gastos del HTML
  ui.agregarGastoListado(gastos)

  ui.actualizarRestante(restante)

  ui.comprobarPresupuesto(presupuesto)
}