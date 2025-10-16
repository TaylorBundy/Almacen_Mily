let datos = [];
let headers = [];
let titulo = null;
let contador = null;
let usuarioActivoEnModal = false;
const items = document.getElementById('contador');
const inputSearch = document.getElementById('searchInput');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnAgregarArticulo = document.getElementById('btnAgregarArticulo');
const btnAbrirModalEliminar = document.getElementById('btnAbrirModalEliminar');
const buscarEliminar = document.getElementById('buscarEliminar');
const btnGuardar = document.getElementById('btnGuardar');
const nuevoNombre = document.getElementById('nuevoNombre');
const precio1 = document.getElementById('nuevoPrecio1');
const precio2 = document.getElementById('nuevoPrecio2');
const regexPrecio = /^\$\s\d{1,3}(\.\d{3})*,\d{2}$/;
const fechaActual = new Date().toLocaleDateString();
let porcentaje = null;
const chkPorcentaje = document.getElementById('porcentajeChk');
const fileName = document.querySelector('#fileInput');
const archivo = 'Lista_Precios.csv';
let nombre = null;
const csvDataOriginal = localStorage.getItem("csvOriginal");
const csvData = localStorage.getItem("csvData");
const csvName = localStorage.getItem("csvName");
const LS_KEY = "csvData";
let articuloSeleccionado = null;
const archivoOriginal = 'csvOriginal';
const csvDatos = 'csvData';
const csvNombre = 'csvName';
let coincidencias = [];
let indiceActual = 0;
let nuevoIndice = 0;
let intervalId = null; // Guardará el ID del setInterval
let intentos = 0;
let estadoTemporizador = false;
let FechasViejas = [];
let FechasActuales = [];
let segundos = 0;
let segundosTooltip = 0;
let origen = null;
let estadoTooltip = false;
let mensaje = null;
let desdeDonde = null;
const modal = document.getElementById('modal');
const modalCargar = document.getElementById("modalCargar");
const modalEliminar = document.getElementById('modalEliminar');
const containerEliminar = document.getElementById('containerEliminar');
const contador2 = document.getElementById("contadorCoincidencias");
const btnEliminar = document.getElementById("btnEliminar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAnterior = document.getElementById("btnAnterior");
let id = document.getElementById("codigoEncontrado");
let id2 = document.getElementById("codigoEncontradoP");
//const
let nombreEncontrado = document.getElementById("nombreEncontrado");
//const
let nombreEncontradoP = document.getElementById("nombreEncontradoP");
//const
let precioEncontrado = document.getElementById("precioEncontrado");
//const
let precioEncontradoP = document.getElementById("precioEncontradoP");
//const
let precioEncontrado2 = document.getElementById("precioEncontrado2");
//const
let precioEncontrado2P = document.getElementById("precioEncontrado2P");
//const
let resultadoEliminar = document.getElementById("resultadoEliminar");
let elementos = [id, id2, nombreEncontrado, nombreEncontradoP, 
      precioEncontrado, precioEncontradoP, 
      precioEncontrado2, precioEncontrado2P, 
      resultadoEliminar];
const customButton = document.getElementById("btnCargar");
const fileName2 = document.getElementById("fileName");
let timeoutMostrarContador = null;
let intervalContador = null;
const contadorCerrar = document.getElementById("contadorCerrar");
let segundosRestantes = null;
let timeoutID;

const Icons = {
  csv: "📦",
  csv2: "📝",
  carpeta: "📂",
  advertencia: "⚠️",
  informacion: "ℹ️",
  limpiar: "♻️",
  guardar: "💾",
  anterior: "⏮️",
  siguiente: "⏭️",
  buscar: "🔎",
  cancelar: "⛔",
  eliminar: "✖️",
  ok: "✔️",
  salir: "🚫",
  agregar: "➕",
  retry: "🔁",
  editar: "✏️",
  foco: "💡",
  question: "❓",
  money: "💰",
  money2: "💲",
  cargando: "⌛",
  reloj: "🕙"
};
//  🧠 Títulos para tooltips
const TitulosList = {
  codigo: "Ingrese el Código de Barras.\nNo obligatorio.",
  nombre: "Ingrese el nombre del Producto.\n(Obligatorio)",
  precio1: "Ingrese el Precio de Venta.\n(Obligatorio)",
  precio2: "Ingrese el Precio para deudores.\n(No obligatorio)",
  searchInput: `${Icons.buscar} Buscar artículos por nombre o ID.\nBúsqueda parcial y sin acentos.`,
  porcentajeInput: "➗ Aplicar un porcentaje a todos los precios deudores.\nEjemplo: 10 para aumentar 10%, -5 para reducir 5%.\nValor por defecto: 20%",
  chkPorcentaje: "Activar o ➗desactivar el uso del porcentaje.",
  btnFormularioAgregar: "💡 Abrir formulario para agregar artículo nuevo.!",
  btnGuardar: `${Icons.guardar} Guardar los cambios realizados en la base de datos.`,
  btnAgregar: `${Icons.agregar} Agregar el nuevo artículo a la base de datos.`,
  btnCargar: `${Icons.csv}📝📂 Cargar archivo CSV con la base de datos de productos.`,
  btnCancelar: `${Icons.cancelar} Cancelar y cerrar este cuadro.`,
  btnFormularioEliminar: "💡 Abrir formulario para eliminar artículo.!",
  btnEliminar: `${Icons.eliminar} Eliminar el artículo seleccionado de la base de datos.`,
  btnLimpiar: `${Icons.limpiar} Limpiar datos de todos los campos.`,
  btnAnterior: `${Icons.anterior} Mostrar artículo anterior.!`,
  btnSiguiente: `${Icons.siguiente} Mostrar artículo siguiente.!`,
  resultadoEliminar: "Artículo encontrado para eliminar.\nVerifique que sea el correcto.",
  modalEliminarSinData: `${Icons.advertencia} Acá se van a mostrar el artículo que busca para eliminar.!\nVerifique el artículo antes de confirmar la eliminación.!`,
  modales: `${Icons.salir} Precione "ESC" para cerrar este cuadro.`
};
// 🧠 Tooltip flotante reutilizable
const tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.background = 'rgba(0,0,0,0.8)';
tooltip.style.color = 'white';
tooltip.style.padding = '6px 10px';
tooltip.style.borderRadius = '6px';
tooltip.style.fontSize = '13px';
tooltip.style.whiteSpace = 'pre-line';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '9999';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);
// 👁️ Mostrar tooltip
function mostrarTooltip(e, texto) {
  tooltip.innerText = texto;
  tooltip.style.left = (e.clientX + 10) + 'px';
  tooltip.style.top = (e.clientY + 10) + 'px';
  tooltip.style.display = 'block';
  estadoTooltip = true;
  //setTimeout(() => {
    //ocultarTooltip();
  //}, 5000);
}
// ✖️ Ocultar tooltip
function ocultarTooltip(tiempoOcultar) {
  if (tiempoOcultar === null) {
    console.log('nada');
  }
  setTimeout(() => {
    estadoTooltip = false;
    tooltip.style.display = 'none';
  }, tiempoOcultar);
  //tooltip.style.display = 'none';
  //estadoTooltip = false;
}
// 🟢 Muestra un mensaje visual de confirmación (opcional)
function mostrarMensajeOK(texto, origen) {
  segundos = 3500;
  const msg = document.createElement("div");
  //msg.textContent = texto;
  msg.innerHTML = texto;
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.right = "20px";
  msg.style.color = "white";
  msg.style.padding = "10px 16px";
  msg.style.borderRadius = "8px";
  msg.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  msg.style.zIndex = 9999;
  msg.style.opacity = "0.8";
  if (origen === 'modalAgregar' || origen === 'modalCargando' || origen === 'modalCargado' || origen === 'modalCargandoOnline' || origen === 'modalCargadoOnline') {
    segundos = 2500;
    //msg.style.background = "#FFAB50";
    msg.style.background = "#ff992b";
    msg.style.color = "black";
    msg.style.fontWeight = "bold";
  } else if (origen === 'modalEliminar') {
    msg.style.background = "#4caf50";
  } else if (origen === 'compruebaCambios') {
    msg.style.background = "#2196f3";
  } else if (origen === 'datosOriginales') {
    segundos = 4000;
    msg.style.background = "#2196f3";
  }
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), segundos);
}
// Muestra un mensaje visual con temporizador y callback opcional
function mostrarMensajeConTimer(texto, origen = '', segundos = 3, callback = null) {
  const msg = document.createElement("div");

  // --- Estilos del mensaje ---
  Object.assign(msg.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    zIndex: 9999,
    opacity: "0.95",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    maxWidth: "300px",
    lineHeight: "1.4",
    transition: "opacity 0.5s ease",
  });

  // --- Colores según el origen ---
  if (origen === 'modalAgregar') {
    msg.style.background = "#ff992b";
    msg.style.color = "black";
  } else if (origen === 'modalEliminar') {
    msg.style.background = "#4caf50";
  } else if (origen === 'error') {
    msg.style.background = "#e53935";
  } else if (origen === 'modalCargando' || origen === 'modalCargado' || origen === 'modalCargandoOnline' || origen === 'modalCargadoOnline') {
    msg.style.background = "#2196f3";
  } else {
    msg.style.background = "#607d8b";
  }

  // --- Mostrar mensaje inicial ---
  msg.innerHTML = texto;
  document.body.appendChild(msg);

  // --- Actualizar número dentro del texto ---
  let restante = segundos;
  const intervalo = setInterval(() => {
    restante--;

    // reemplaza cualquier número dentro del texto que represente los segundos
    msg.innerHTML = texto.replace(/\d+/, restante);

    if (restante <= 0) {
      clearInterval(intervalo);
      msg.style.opacity = "0";
      //setTimeout(() => {
        msg.remove();
        if (origen === 'modalCargando') {
          //mostrarMensajeOK(`📦 Archivo CSV: ${nombre} cargado y guardado localmente`, "modalCargando");
          modalCargar.style.display = "flex";
          detenerCSVTemporizador();
        }
        if (origen === 'modalCargado') {
          mostrarMensajeOK(`${Icons.carpeta} Archivo CSV: ${nombre} cargado con exito.!`, origen);
          detenerCSVTemporizador();
        }
        if (origen === 'modalCargandoOnline' || origen === 'modalCargadoOnline') {
          mostrarMensajeOK(`${Icons.carpeta} Datos JSON: "jsonData" cargado con exito.!`, origen);
          detenerCSVTemporizador();
        }
        if (typeof callback === "function") callback();
      //}, 500);
    }
  }, 1000);
}

btnLimpiar.addEventListener('click', () => {
  limpiarInputs('#modal'); // Limpia todos los inputs dentro del formulario con id="miFormulario"
});

// 🔹 Detectar cambios en el input de porcentaje con retardo de 1 segundo
document.getElementById('porcentajeInput').addEventListener('input', function() {
  setTimeout(() => {
    if (this.value === '') {
      porcentaje = 20;
    } else {
      porcentaje = this.value;
    }
    recalcularPrecios();
  }, 1000);
})
// 🔹 Detectar cambios en el input de porcentaje
//document.getElementById('porcentajeInput').addEventListener('input', recalcularPrecios);
// 🔹 Funciones auxiliares
function desformatearPrecio(valor) {
  return parseFloat(
    valor
      .toString()
      .replace(/[^\d,.,-]/g, '') // dejar solo números, comas, puntos y signos
      .replace(/\./g, '')        // eliminar puntos de miles
      .replace(',', '.')         // pasar coma decimal a punto
  ) || 0;
}
// 🔹 Recalcular precios según porcentaje
function recalcularPrecios() {
  const factor = 1 + porcentaje / 100;
  datos.forEach(obj => {
    const p1 = desformatearPrecio(obj.PRECIO || '0');
    const nuevo = p1 * factor;
    obj.PRECIO2 = formatearPrecio(nuevo);
  });
  mostrarTabla(datos);
}
// Validar formato de precio
function esPrecioValido(valor) {
  return regexPrecio.test(valor);
}
// Deshabilitar búsqueda y botones si no hay datos
window.onload = function() {
  contador = items.textContent.split(': ')[1];
  if (contador == '0') {
    inputSearch.disabled = true;
    inputSearch.style.cursor = 'not-allowed';
    btnAbrirModal.disabled = true;
    btnAbrirModal.style.cursor = 'not-allowed';
    btnAbrirModalEliminar.disabled = true;
    btnAbrirModalEliminar.style.cursor = 'not-allowed';
    btnGuardar.disabled = true;
    btnGuardar.style.cursor = 'not-allowed';
  }
  
  porcentaje = document.getElementById('porcentajeInput')?.value || 20;
  // Comprueba si existe csv en localstorage
  comprobarCSV();
  // Activa temporizador para comprobar cambios cada 2 minutos
  //csvTemporizador();
  if (!estadoTemporizador) {
    estadoTemporizador = true;
    segundos = 10000;
    iniciarCSVTemporizador(segundos);
  }
};
//Definimos la funcion que agrega los titulos a los componentes
function Titulos(id) {
    segundosTooltip = 1500;
    const item = document.getElementById(`${id}`);
    if (item.className.includes('precio1')) {
      titulo = `Producto: ${item.previousElementSibling.textContent}\nPrecio: ${item.textContent}`;
    } else if (item.className.includes('precio2')) {
      titulo = `Producto: ${item.previousElementSibling.previousElementSibling.textContent}\nPrecio: ${item.textContent}`;
    } else if (item.className.includes('producto')) {
      titulo = `Producto: ${item.textContent}\nId: ${item.previousElementSibling.textContent}\nPrecio Venta: ${item.nextElementSibling.textContent}\nPrecio Deudores: ${item.nextElementSibling.nextElementSibling.textContent}`;
    } else if (item.className.includes('codigo')) {
      titulo = `Código de barras: ${item.textContent}\n✏️Contenido modificable.!`;
    }
    asignarTooltipUnico2(item, () => `${titulo}`, segundosTooltip);
    // item.addEventListener('mouseover', (e) => {
    //   item.title = titulo;
    // });
    //if (item.onmouseover) {
    //item.title = titulo;
    // item.addEventListener('mouseover', (e) => {
    //   mostrarTooltip(e, titulo);
    // });
    // item.addEventListener('mouseout', () => {
    //   ocultarTooltip(3000);
    // });
    //}
}
// 📂 Cargar CSV
//document.getElementById('fileInput')
fileName.addEventListener('change', function(e) {
  const file = e.target.files[0];
  //console.log(file);
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    const contenido = evt.target.result;
    const lineas = contenido.split(/\r?\n/).filter(l => l.trim() !== '');
    const separador = lineas[0].includes(';') ? ';' : ',';
    headers = lineas[0].split(separador).map(h => h.trim());

    // Si PRECIO2 no existe en los headers, lo agregamos
    //if (!headers.includes('PRECIO2')) headers.push('PRECIO2');

    datos = lineas.slice(1).map(linea => {
        const valores = linea.split(separador);
        let obj = {};
        headers.forEach((h, i) => obj[h] = valores[i]?.trim() || '');
        if (chkPorcentaje.checked) {
          // ✅ Calcular PRECIO2 si hay PRECIO1
          if (obj.PRECIO) {
              let p1 = parseFloat(
                obj.PRECIO
                  .replace(/[^\d.,]/g, '')  // deja solo dígitos, comas y puntos
                  .replace(/\./g, '')       // elimina los puntos de miles
                  .replace(',', '.')        // convierte coma decimal en punto
              );
              let num = parseFloat(obj.PRECIO.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
              if (!isNaN(num)) {
                  // ⚙️ Ajustá el porcentaje acá (ej. 20%)
                  const p2 = p1 * (1 + porcentaje / 100);
                  obj.PRECIO2 = formatearPrecio(p2);
              }
          }
        }
        return obj;
    });
    //mostrarTabla(datos);
    //nombre = fileName.value;
    //console.log(nombre.replace(/.*[\/\\]/, ''));
    // Llamar esta función **después de cargar la tabla**
    //inicializarCeldasCodigo();
  };
  reader.readAsText(file, 'UTF-8');
});

// 🔎 Búsqueda con restauración si está vacío
document.getElementById('searchInput').addEventListener('input', function(e) {
    const valor = e.target.value.trim().toLowerCase();
    if (!valor) {
        // Si está vacío, mostrar toda la base
        mostrarTabla(datos);
        return;
    }
    // Filtrar datos
    const filtrados = datos.filter(row => {
        return Object.values(row).some(v => v.toLowerCase().includes(valor));
    });
    mostrarTabla(filtrados);
});

// 🔍 Búsqueda (insensible y parcial)
function buscar() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultados = datos.filter(d =>
    d.nombre?.toLowerCase().includes(query) ||
    d.id?.toLowerCase().includes(query)
  );
  mostrarTabla(resultados);
}
// 📝 Procesar CSV
function procesarCSV(texto) {
  const lineas = texto.split(/\r?\n/).filter(l => l.trim() !== '');
  const separador = lineas[0].includes(';') ? ';' : ',';
  headers = lineas[0].split(separador).map(h => h.trim());
  datos = lineas.slice(1).map(linea => {
    const valores = linea.split(separador);
    let obj = {};
    headers.forEach((h, i) => obj[h] = valores[i]?.trim() || '');
    return obj;
  });
  mostrarTabla(datos);
}
// 📋 Mostrar tabla
function mostrarTabla(lista) {
  const tbody = document.querySelector('#tabla tbody');
  tbody.innerHTML = '';
  lista.forEach((r, idx) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td class="indice">${idx + 1}</td>
      <td class="codigoN" id="codigo${idx + 1}" contenteditable="true" onfocus="formatearCampo(this)" oninput="editar(${idx}, 'CODIGO', this.innerText)" onblur="if(this.innerText.trim() === '') this.innerText = '0'" onmouseover="Titulos(this.id)">${r.CODIGO || ''}</td>
      <td class="id">${r.ID || ''}</td>
      <td class="producto" id="producto${idx + 1}" onmouseover="Titulos(this.id)">${r.PRODUCTO || ''}</td>
      <td class="precio1N" id="precio-${idx + 1}" contenteditable="true" onfocus="formatearCampo(this)" oninput="editar(${idx}, 'PRECIO', this.innerText)" onblur="aplicarFormato(this, ${idx}, 'PRECIO')" onmouseover="Titulos(this.id)">${r.PRECIO || ''}</td>
      <td class="precio2N" id="precio2-${idx + 1}" contenteditable="true" onfocus="formatearCampo(this)" oninput="editar(${idx}, 'PRECIO2', this.innerText)" onblur="aplicarFormato(this, ${idx}, 'PRECIO2')" onmouseover="Titulos(this.id)">${r.PRECIO2 || ''}</td>
      <td class="fecha">${r.ACTUALIZADO || ''}</td>
    `;
    tbody.appendChild(fila);
  });

  document.getElementById('contador').innerText = `Artículos cargados: ${lista.length}`;
  contador = items.textContent.split(': ')[1];
  if (contador !== '0') {
    inputSearch.disabled = false;
    inputSearch.style.cursor = 'text';
    btnAbrirModal.disabled = false;
    btnAbrirModal.style.cursor = 'pointer';
    btnAbrirModalEliminar.disabled = false;
    btnAbrirModalEliminar.style.cursor = 'pointer';
    btnGuardar.disabled = false;
    btnGuardar.style.cursor = 'pointer';
  }
}
chkPorcentaje.addEventListener("change", () => {
  if (chkPorcentaje.checked) {
    porcentaje = document.getElementById('porcentajeInput')?.value || 30;
    recalcularPrecios();
  } else {
    //porcentaje = null;
    mostrarTabla(datos);
  }
  //recalcularPrecios();
});
// ✏️ Editar
// function editar2(idx, campo, valor) {
//   datos[idx][campo] = valor;
// }
// // ✏️ Editar
// function editar3(idx, campo, valor) {
//   // Guardamos el valor editado
//   datos[idx][campo] = valor;
//   // Si el campo editado es 'precio1' o 'precio2', actualizamos la fecha
//   if (campo === 'PRECIO' || campo === 'PRECIO2' || campo === 'CODIGO') {
//     datos[idx]['ACTUALIZADO'] = fechaActual;
//     // Actualizamos la tabla en pantalla (opcional)
//     const fila = document.querySelector(`#tabla tbody tr:nth-child(${idx + 1}) td:nth-child(7)`);
//     if (fila) fila.innerText = datos[idx]['ACTUALIZADO'];
//   }
// }
function editar(idx, campo, valor) {
  if (campo === 'PRECIO' || campo === 'PRECIO2') {
    if (chkPorcentaje.checked) {
      let num = parseFloat(valor.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      datos[idx]['PRECIO'] = formatearPrecio(num);
      if (campo === 'PRECIO') {
        const nuevoP2 = num * (1 + porcentaje / 100);
        datos[idx]['PRECIO2'] = formatearPrecio(nuevoP2);
      } else if (campo === 'PRECIO2') {
        const nuevoP2 = num * (1 + porcentaje / -100);
        datos[idx]['PRECIO'] = formatearPrecio(nuevoP2);
      }
    }
    datos[idx]['ACTUALIZADO'] = fechaActual;
    setTimeout(() => {
      mostrarTabla(datos);
      if (!estadoTemporizador) {
        iniciarCSVTemporizador(3500);
      }
    }, 1000);
    //return;
  }
  datos[idx][campo] = valor;
}

// Asignamos el comportamiento a todas las celdas de código
function inicializarCeldasCodigo() {
  document.querySelectorAll('.codigoN').forEach(td => {
      // Extraer índice desde el id
      const idx = parseInt(td.id.replace('codigo','')) - 1;
      // Control de teclas mientras escribe
      td.addEventListener('keydown', function(e) {
          const permitido = ['Backspace','ArrowLeft','ArrowRight','Delete','Tab'];
          // Permitir control de cursor y borrado
          if (permitido.includes(e.key)) return;
          // Permitir solo números y máximo 13 dígitos
          if (!/\d/.test(e.key) || this.innerText.length >= 13) {
              e.preventDefault();
          }
      });
      // Validar al pegar o modificar contenido
      td.addEventListener('input', function() {
          // Limpiar todo lo que no sea número y cortar a 13 dígitos
          this.innerText = this.innerText.replace(/\D/g, '').slice(0,13);
          // Actualizar array de datos
          datos[idx]['CODIGO'] = this.innerText;
          // console.log(idx);
          datos[idx]['ACTUALIZADO'] = fechaActual;
          // Mover cursor al final
          moverCursorAlFinal(this);
      });
  });
}
// 💾 Guardar CSV actualizado (sin confirmación, solo muestra si fue OK)
function guardarCSV() {
  origen = "modalGuardar";
  if (!datos.length) return; // no hay datos, no hace nada

  const separador = ';';
  const columnas = headers;
  const lineas = [columnas.join(separador)];

  datos.forEach(obj => {
    const fila = columnas.map(c => {
      const valor = (obj[c] || '').toString().replace(/"/g, '');
      return `${valor}`;
    }).join(separador);
    lineas.push(fila);
  });
  const csvTexto = lineas.join('\n'); // 📄 texto completo del CSV

  try {
    const blob = new Blob([lineas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    nombre = nombre.replace(/.*[\/\\]/, '');
    a.href = url;
    a.download = nombre;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Mostrar éxito sin interrumpir
    // console.log("✅ Archivo guardado correctamente:", nombre);
    SetCookie('csvData', csvTexto, 30);

    // (Opcional) Mostrar mensaje visual breve
    mostrarMensajeOK("Archivo guardado correctamente ✅", origen);

  } catch (err) {
    console.error("❌ Error al guardar el archivo:", err);
  }
}
// ➕ Abrir modal agregar articulo
function abrirModal() {
  origen = "modalAgregar";
  if (!precio1.value && !nuevoNombre.value) {
    btnAgregarArticulo.disabled = true;
    btnLimpiar.disabled = true;
  } else {
    btnAgregarArticulo.disabled = false;
    btnLimpiar.disabled = false;
  }
  //document.getElementById('modal')
  modal.style.display = 'flex';
  //document.getElementById('nuevoNombre')
  nuevoNombre.focus();
  setTimeout(() => {
    if (modal.style.display === 'flex') {
      if (!nuevoNombre.value || !precio1.value) {
        cerrarModal();
        mostrarMensajeOK(`${Icons.informacion} No se ingresaron datos.!<br>⚙️Nombre Producto o ${Icons.money2} Precio Venta vacio.!<br>El formulario: "${modal.ariaLabel}" se cerró automáticamente tras 10 segundos.`, origen);
      }
    }
  }, 15000);
}
// ❌ Cerrar modal agregar articulo
function cerrarModal() {
  //document.getElementById('modal')
  modal.style.display = 'none';
  limpiarInputs('#modal'); // Limpia todos los inputs dentro del formulario con id="miFormulario"
}
// 🔒 Cerrar modal agregar articulo con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (modal && modal.style.display === 'flex') {
      cerrarModal(); // 👈 usa tu función existente
    }
    if (modalEliminar && modalEliminar.style.display === 'flex') {
      cerrarModalEliminar(); // 👈 usa tu función existente
    }
  }
});
// 🚪 Abrir/Cerrar modal eliminar articulo
// function abrirModalEliminar2() {
//   origen = "modalEliminar";
//   //document.getElementById("modalEliminar")
//   modalEliminar.style.display = "flex";
//   usuarioActivoEnModal = false;
//   clearTimeout(timeoutCerrarModal);
//   //document.getElementById("buscarEliminar")
//   buscarEliminar.value = "";
//   //document.getElementById("buscarEliminar")
//   buscarEliminar.focus();
//   coincidencias = [];
//   indiceActual = 0;
//   actualizarVistaCoincidencia();
//   setTimeout(() => {
//     //if (!nuevoNombre.value || !precio1.value) {
//     if (modalEliminar.style.display === 'flex') {
//       // if (buscarEliminar.oninput()) {
//       //   console.log('cambioooo');
//       // }
//       // console.log(buscarEliminar.value);
//       if (!buscarEliminar.value === '') {
//         // console.log('no esta vacio');
//         return;
//       } else {
//         cerrarModalEliminar();
//         mostrarMensajeOK(`${Icons.informacion} El formulario: "${modalEliminar.ariaLabel}"<br>Se cerró automáticamente tras 10 segundos por inactividad.`, origen);
//       }
//     }
//   }, 10000);
// }
let timeoutCerrarModal = null;

function abrirModalEliminar() {
  origen = "modalEliminar";
  segundosRestantes = 10;
  modalEliminar.style.display = "flex";
  contadorCerrar.style.display = "none"; // oculto al abrir
  mensaje = `${Icons.advertencia} El formulario: "${modalEliminar.ariaLabel}"\nSe cerrará en: ${Icons.reloj} ${segundosRestantes} segundos por inactividad.!\nIngrese un valor sobre el campo de busqueda, o haga click en cualquier lugar del formulario para Cancelar el cierre.!`;
  //contadorCerrar.textContent = `${Icons.advertencia} El formulario: "${modalEliminar.ariaLabel}"\nSe cerrará en: ${Icons.reloj} ${segundosRestantes} segundos por inactividad.!`;


  // Cancelar temporizadores previos si existían
  //clearTimeout(timeoutMostrarContador);
  clearInterval(intervalContador);

  // Reiniciamos bandera y timeout cada vez que abrimos
  usuarioActivoEnModal = false;
  clearTimeout(timeoutCerrarModal);

  // Detectar actividad del usuario dentro del modal
  const eventosActividad = ["keydown", "mousedown", "focusin", "input"];
  eventosActividad.forEach(evento => {
    modalEliminar.addEventListener(evento, mantenerModalActivo);
  });
  buscarEliminar.addEventListener('input', cancelarContador);
  //modalEliminar.querySelectorAll('div').addEventListener('click', cancelarContador);
  modalEliminar.querySelectorAll('div').forEach(div => {
    div.addEventListener('click', cancelarContador);
  });

  // Configurar el cierre automático
  timeoutCerrarModal = setTimeout(() => {
    if (modalEliminar.style.display === "flex" && !usuarioActivoEnModal) {
      if (!buscarEliminar.value) {
        contadorCerrar.style.display = "block";
        contadorCerrar.textContent = mensaje;//`${Icons.advertencia} El formulario: "${modalEliminar.ariaLabel}"\nSe cerrará en: ${Icons.reloj} ${segundosRestantes} segundos por inactividad.!`;
        // 🔹 Contador regresivo cada segundo
        intervalContador = setInterval(() => {
          segundosRestantes--;
          mensaje = `${Icons.advertencia} El formulario: "${modalEliminar.ariaLabel}"\nSe cerrará en: ${Icons.reloj} ${segundosRestantes} segundos por inactividad.!\nIngrese un valor sobre el campo de busqueda, o haga click en cualquier lugar del formulario para Cancelar el cierre.!`;
          if (segundosRestantes > 0) {
            contadorCerrar.textContent = mensaje;//`${Icons.advertencia} El formulario: "${modalEliminar.ariaLabel}"\nSe cerrará en: ${Icons.reloj} ${segundosRestantes} segundos por inactividad.!`;
          } else {
            clearInterval(intervalContador);
            cerrarModalEliminar();
            mostrarMensajeOK(`${Icons.informacion} El formulario: "${modalEliminar.ariaLabel}"<br>Se cerró automáticamente tras 10 segundos por inactividad.`, origen);
          }
        }, 1000)
        //cerrarModalEliminar();
        //mostrarMensajeOK(`${Icons.informacion} El formulario: "${modalEliminar.ariaLabel}"<br>Se cerró automáticamente tras 10 segundos por inactividad.`, origen);
        // mostrarMensajeOK(
        //   `${Icons.informacion} No se ingresaron datos.<br>⚙️Nombre Producto o ${Icons.money2} Precio Venta vacíos.<br>El formulario: "${modalEliminar.ariaLabel}" se cerró automáticamente tras 15 segundos.`,
        //   origen
        // );
      }
    }
  }, 10000);
  actualizarVistaCoincidencia();
}

// 👤 Si el usuario interactúa, marcamos como activo y cancelamos el cierre
function mantenerModalActivo() {
  usuarioActivoEnModal = true;
  clearTimeout(timeoutCerrarModal);
}

// ❌ Cerrar modal eliminar articulo
function cerrarModalEliminar() {
  //document.getElementById("modalEliminar")
  modalEliminar.style.display = "none";
  coincidencias = [];
  articuloSeleccionado = null;
  indiceActual = 0;
  // Limpiar temporizadores para que no se acumulen
  clearTimeout(timeoutCerrarModal);
  clearInterval(intervalContador);
  limpiarInputs('#modalEliminar'); // Limpia todos los inputs dentro del formulario con id="miFormulario"
}
// Función que cancela el contador si el usuario escribe
function cancelarContador() {
  //const contador = document.getElementById("contadorCerrar");
  contadorCerrar.style.display = "none";

  clearTimeout(timeoutCerrarModal);
  clearInterval(intervalContador);
}
// 💲 Formatear campo de precio al perder foco
function formatearCampo(elem) {
  // Si está vacío o no empieza con "$", lo formateamos
  let valor = elem.innerText.trim();
  const range = document.createRange();
  const sel = window.getSelection();
  //if (valor == '$ 0,00') {
  if (valor.includes('$')) {
    elem.innerText = '$ ';
  } else if (valor == '0') {
    elem.innerText = '';
  }
  // Mover el cursor al final
  range.selectNodeContents(elem);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
  // 🧾 Formatear número como moneda estilo "$ 2.300,00"
function formatearPrecio(valor) {
  let num = parseFloat(valor.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
  if (isNaN(num)) num = 0;
  return '$ ' + num.toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
// Pasar el foco al input PRECIO luego de 2.5 segundos.
nuevoNombre.addEventListener('input', function() {
  if (btnAgregarArticulo.disabled) {
    btnAgregarArticulo.disabled = false;
  }
  if (btnLimpiar.disabled) {
    btnLimpiar.disabled = false;
  }
  setTimeout(() => {
    precio1.focus();
  }, 2500);
})
// Pasar el foco al input PRECIO2 luego de 2.5 segundos.
precio1.addEventListener('input', function() {
  if (btnAgregarArticulo.disabled) {
    btnAgregarArticulo.disabled = false;
  }
  if (btnLimpiar.disabled) {
    btnLimpiar.disabled = false;
  }
  setTimeout(() => {
    precio2.focus();
  }, 2500);
})
// Pasar el foco al botón Agregar Artículo luego de 2.5 segundos si el usuario no ingresa datos.
precio2.addEventListener('focusin', function() {
  setTimeout(() => {
    if (!precio2.value) {
      btnAgregarArticulo.focus();
    }
  }, 2500);
})
// Pasar el foco al boton Agregar Articulo luego de 2.5 segundos.
precio2.addEventListener('input', function() {
  setTimeout(() => {
    btnAgregarArticulo.focus();
  }, 2500);
})
// 💲 Formatear al perder foco (onblur) en el modal
precio1.addEventListener('blur', function() {
  precio1.value = formatearPrecio2(precio1.value);
})
// 💲 Formatear al perder foco (onblur) en el modal
precio2.addEventListener('blur', function() {
  precio2.value = formatearPrecio2(precio2.value);
})
// 🧾 Formatear número como moneda estilo "$ 2.300,00"
function formatearPrecio2(valor) {
  // //console.log(valor);
  let num = parseFloat(valor.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
  if (isNaN(num)) num = 0;
  return '$ ' + num.toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
// 💰 Cuando el usuario sale del campo (onblur)
function aplicarFormato(elem, idx, campo) {
  const valor = elem.innerText.trim();
  const formateado = formatearPrecio(valor);
  elem.innerText = formateado;
  datos[idx][campo] = formateado; // 🧠 actualizar array principal
}
  // ➕ Agregar artículo nuevo
function agregarArticulo() {
  console.log(datos);
  let codigo = document.getElementById('nuevoCodigo').value.trim();
  //let nombre = document.getElementById('nuevoNombre')
  nombre = nuevoNombre.value.trim();
  let precio1 = document.getElementById('nuevoPrecio1').value.trim();
  //precio1.value.trim();
  let precio2 = document.getElementById('nuevoPrecio2').value.trim();
  //precio2.value.trim();
  if (!nombre || !precio1) {
    if (!nombre) {
      alert("⚠️ El Nombre del producto es obligatorio.!");
    } else if (!precio1) {
      alert("⚠️ El Precio de venta es obligatorio.!");
    } else {
      alert("⚠️ El nombre del producto, y el precio de venta son obligatorios.!");
    }
    return;
  }
  if (!codigo) codigo = '0';
  if (!precio1) precio1 = '0';
  if (!precio2) precio2 = '0';
  // Formatear precios
  if (!esPrecioValido(precio1)) {
    precio1 = formatearPrecio(precio1);
  } else {
    precio1 = precio1;
  }
  if (!esPrecioValido(precio2)) {
    precio2 = formatearPrecio(precio2);
  } else {
    precio2 = precio2;
  }
  // Calcular nuevo ID
  let maxID = 0;
  datos.forEach(d => {
    const idNum = parseInt(d.ID) || 0;
    if (idNum > maxID) maxID = idNum;
  });
  const nuevoID = (maxID + 1).toString();
  // Crear nuevo artículo
  const nuevoArticulo = {
    CODIGO: codigo,
    ID: nuevoID,
    PRODUCTO: nombre.toUpperCase(),
    PRECIO: precio1,
    PRECIO2: precio2,
    ACTUALIZADO: new Date().toLocaleDateString()
  };

  // Agregar y actualizar
  datos.push(nuevoArticulo);
  mostrarTabla(datos);

  // Limpiar campos
  document.getElementById('nuevoCodigo').value = '';
  document.getElementById('nuevoNombre').value = '';
  document.getElementById('nuevoPrecio1').value = '';
  document.getElementById('nuevoPrecio2').value = '';

  cerrarModal();
  origen = "modalAgregar";
  mostrarMensajeOK(`${Icons.ok} Artículo: ${nombre} agregado correctamente.!`, origen);
  // iniciamos temporizador para comprobar cambios
  if (!estadoTemporizador) {
    estadoTemporizador = true;
    segundos = 3500;
    iniciarCSVTemporizador(segundos);
  }
}
// Mover cursor al final en elemento contenteditable
function moverCursorAlFinal(elemento) {
  const rango = document.createRange();
  const seleccion = window.getSelection();
  rango.selectNodeContents(elemento);
  rango.collapse(false); // false → al final
  seleccion.removeAllRanges();
  seleccion.addRange(rango);
}
// 🍪 Guardar en "cookie" (localStorage)
function SetCookie(data, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  //const expira = "expires=" + fecha.toUTCString();
  //document.cookie = nombre + "=" + encodeURIComponent(valor) + ";" + expira + ";path=/";
  localStorage.setItem(data, valor); // Guardar para uso offline futuro
  localStorage.setItem('csvName', archivo); // Guardar para uso offline futuro
  localStorage.setItem(archivoOriginal, valor); // Guardar para uso offline futuro
}
// 🍪 Leer "cookie" (localStorage)
function getCookie(nombre) {
  const nombreEQ = nombre + "=";
  const partes = document.cookie.split(';');
  for (let c of partes) {
    c = c.trim();
    if (c.indexOf(nombreEQ) === 0) return decodeURIComponent(c.substring(nombreEQ.length));
  }
  return null;
}
// Obtener posibles valores almacenados
function comprobarCSV() {
  // Si no hay datos, no hacer nada
  if (!csvData) {
    // console.log("❌ No hay CSV en localStorage");
    return false;
  }

  // Si hay datos, verificar el nombre
  if (csvName && csvName.trim() !== "") {
    nombre = csvName;
    // console.log(`✅ CSV cargado: ${nombre} (${csvData.length} caracteres)`);
  } else {
    // Si no existe el nombre, crear uno por defecto
    nombre = archivo;
    // console.log("⚠️ No había csvName, se asignó nombre por defecto:", nombre);
    localStorage.setItem("csvName", nombre);
  }

  // Retornar true si hay datos válidos
  return true;
}

// 🔍 Buscar artículo para eliminar
function buscarArticuloEliminar() {
  const busqueda = document.getElementById("buscarEliminar").value.toLowerCase().trim();

  coincidencias = datos.filter(obj =>
    obj.ID?.toString().includes(busqueda) ||
    obj.PRODUCTO?.toLowerCase().includes(busqueda)
  );
  indiceActual = 0;
  actualizarVistaCoincidencia();
}
// ⏭️ Mostrar siguiente coincidencia
function mostrarSiguienteCoincidencia() {
  if (coincidencias.length === 0) return;
  indiceActual = (indiceActual + 1) % coincidencias.length; // Avanza circularmente
  nuevoIndice = indiceActual + 1;
  if (nuevoIndice === coincidencias.length) {
    btnSiguiente.disabled = true;
    btnSiguiente.style.cursor = 'not-allowed';
  }
  actualizarVistaCoincidencia();
}
// ⏭️ Mostrar siguiente coincidencia
function mostrarAnteriorCoincidencia() {
  if (coincidencias.length === 0) return;
  indiceActual = (indiceActual - 1) % coincidencias.length; // Avanza circularmente
  nuevoIndice = nuevoIndice - 1;
  if (nuevoIndice >= 1) {
    btnAnterior.disabled = true;
    btnAnterior.style.cursor = 'not-allowed';
  }
  actualizarVistaCoincidencia();
}
// 🧾 Actualiza la vista del resultado actual
function actualizarVistaCoincidencia() {
  segundosTooltip = 2000;
  contador2.textContent = `${coincidencias.length} ${coincidencias.length === 1 ? 'coincidencia' : 'coincidencias'}`;
  if (coincidencias.length > 0) {
    articuloSeleccionado = coincidencias[indiceActual];
    //if (articuloSeleccionado) {
    // Primero definimos los valores de cada textContent
    id.textContent = articuloSeleccionado?.ID || "-";
    nombreEncontrado.textContent = articuloSeleccionado?.PRODUCTO || "-";
    precioEncontrado.textContent = articuloSeleccionado?.PRECIO || "-";
    precioEncontrado2.textContent = articuloSeleccionado?.PRECIO2 || "-";
    // Luego definimos un tooltip unico para cada elemento
    //asignarTooltipUnico2(id, () => `ID: ${articuloSeleccionado.ID}`);
    asignarTooltipUnico2(id, () => `ID: ${id.textContent}`, segundosTooltip);
    //asignarTooltipUnico(id,`ID: ${articuloSeleccionado.ID}`);
    asignarTooltipUnico2(id2, () => `ID: ${id.textContent}`, segundosTooltip);
    asignarTooltipUnico2(nombreEncontrado, () => `Producto: ${nombreEncontrado.textContent}`, segundosTooltip);
    asignarTooltipUnico2(nombreEncontradoP, () => `Producto: ${nombreEncontrado.textContent}`, segundosTooltip);
    asignarTooltipUnico2(precioEncontrado, () => `Precio Venta: ${precioEncontrado.textContent}`, segundosTooltip);
    asignarTooltipUnico2(precioEncontradoP, () => `Precio Venta: ${precioEncontrado.textContent}`, segundosTooltip);
    asignarTooltipUnico2(precioEncontrado2, () => `Precio Deudor: ${precioEncontrado2.textContent}`, segundosTooltip);
    asignarTooltipUnico2(precioEncontrado2P, () => `Precio Deudor: ${precioEncontrado2.textContent}`, segundosTooltip);
    asignarTooltipUnico2(resultadoEliminar, () => `Producto: ${nombreEncontrado.textContent}\nId: ${id.textContent}\nPrecio Venta: ${precioEncontrado.textContent}\nPrecio Deudores: ${precioEncontrado2.textContent}`);
    // asignarTooltipUnico2(nombreEncontrado, () => `Producto: ${articuloSeleccionado.PRODUCTO}`);
    // asignarTooltipUnico2(nombreEncontradoP, () => `Producto: ${articuloSeleccionado.PRODUCTO}`);
    // asignarTooltipUnico2(precioEncontrado, () => `Precio Venta: ${articuloSeleccionado.PRECIO}`);
    // asignarTooltipUnico2(precioEncontradoP, () => `Precio Venta: ${articuloSeleccionado.PRECIO}`);
    // asignarTooltipUnico2(precioEncontrado2, () => `Precio Deudor: ${articuloSeleccionado.PRECIO2}`);
    // asignarTooltipUnico2(precioEncontrado2P, () => `Precio Deudor: ${articuloSeleccionado.PRECIO2}`);
    // asignarTooltipUnico2(resultadoEliminar, () => `Producto: ${articuloSeleccionado.PRODUCTO}\nId: ${articuloSeleccionado.ID}\nPrecio Venta: ${articuloSeleccionado.PRECIO}\nPrecio Deudores: ${articuloSeleccionado.PRECIO2}`);
    btnEliminar.disabled = false;
    btnEliminar.style.cursor = 'pointer';
    if (nuevoIndice < coincidencias.length) {
      btnSiguiente.disabled = coincidencias.length <= 1;
      btnSiguiente.style.cursor = 'pointer';
    }
    if (coincidencias.length === 1) {
      btnSiguiente.disabled = true;
      btnSiguiente.title = 'No hay más coincidencias';
      btnSiguiente.style.cursor = 'not-allowed';
    }
    if (indiceActual > 0) {
      btnAnterior.disabled = false;
      btnAnterior.style.cursor = 'pointer';
    }
  } else {
    //elementos.forEach(el => el && (el._tieneTooltip = false));
    articuloSeleccionado = null;
    document.getElementById("codigoEncontrado").textContent = "-";
    document.getElementById("nombreEncontrado").textContent = "-";
    document.getElementById("precioEncontrado").textContent = "-";
    document.getElementById("precioEncontrado2").textContent = "-";
    btnEliminar.disabled = true;
    btnEliminar.style.cursor = 'not-allowed';
    btnSiguiente.disabled = true;
    btnSiguiente.style.cursor = 'not-allowed';
    if (indiceActual === 0) {
      btnAnterior.disabled = true;
      btnAnterior.style.cursor = 'not-allowed';
    }
    asignarTooltipsModalEliminar();
  }
}
// 🗑️ Eliminar artículo actual
function eliminarArticuloSeleccionado() {
  if (!articuloSeleccionado) return;
  origen = "modalEliminar";

  if (confirm(`¿Seguro que querés eliminar "${articuloSeleccionado.PRODUCTO}"?`)) {
    datos = datos.filter(obj => obj !== articuloSeleccionado);
    mostrarMensajeOK(`${Icons.eliminar} Artículo: ${articuloSeleccionado.PRODUCTO} eliminado correctamente.!`, origen);
    mostrarTabla(datos);

    // Quitar del array de coincidencias y actualizar
    coincidencias.splice(indiceActual, 1);
    if (indiceActual >= coincidencias.length) indiceActual = 0;
    actualizarVistaCoincidencia();
    //mostrarMensajeOK(`✖️ Artículo: ${articuloSeleccionado.PRODUCTO} eliminado correctamente.!`, "modalEliminar");
    cerrarModalEliminar();
    if (!estadoTemporizador) {
      estadoTemporizador = true;
      segundos = 3500;
      iniciarCSVTemporizador(segundos);
    }
  }
}
// 🔁 Comprobar cada X tiempo si los datos visibles cambiaron
function iniciarCSVTemporizador(tiempo) {
  //console.log(estadoTemporizador);
  if (intervalId) return; // Ya está corriendo, no hacemos nada
  intervalId = setInterval(() => {
    if (intentos < 3) {
      //estadoTemporizador = true;
      //comprobarCambiosCSV();
      comprobarCambiosDatos();
      intentos += 1;
      //console.log(`intentos: ${intentos}`);
    } else {
      //console.log('Se alcanzó el máximo de intentos, deteniendo temporizador');
      detenerCSVTemporizador();
    }
  }, tiempo); // Cambia 10000 por 5 * 60 * 1000 para 5 minutos
}
// Detener el temporizador completamente
function detenerCSVTemporizador() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    estadoTemporizador = false;
    intentos = 0;
    // console.log('Temporizador detenido');
  }
}

// 🧩 Función principal
function comprobarCambiosCSV() {
  try {
    const separador = ';';
    const columnas = headers;
    const lineas = [columnas.join(separador)];

    // 🧾 Convertir los datos actuales de la tabla al mismo formato CSV
    datos.forEach(obj => {
      const fila = columnas.map(c => {
        const valor = (obj[c] || '').toString().replace(/"/g, '');
        return `${valor}`;
      }).join(separador);
      lineas.push(fila);
    });

    const csvActual = lineas.join('\n'); // CSV actual generado
    console.log(csvActual);
    const csvGuardado = localStorage.getItem("csvData"); // CSV guardado

    if (!csvGuardado) {
      // //console.log("💾 No había CSV guardado, creando uno nuevo...");
      //localStorage.setItem("csvData", csvActual);
      return;
    }

    // ⚖️ Comparar cadenas CSV completas
    if (csvActual.trim() !== csvGuardado.trim()) {
      localStorage.setItem("csvData", csvActual);
      origen = "compruebaCambios";
      mostrarMensajeOK(`${Icons.advertencia} Se detectaron cambios en los datos de LocalStorage.!<br>${Icons.guardar} Cambios guardados automáticamente`, origen);
      detenerCSVTemporizador();
    } else {
      // console.log("✅ El CSV visible coincide con el almacenado.");
    }

  } catch (err) {
    console.error("❌ Error al comprobar cambios CSV:", err);
  }
}
// 🧩 Función principal
function comprobarCambiosDatos() {
  try {
    // Detectar si estamos usando JSON o CSV
    const usandoJSON = window.location.href.startsWith('https://');
    const storageKey = usandoJSON ? 'jsonData' : 'csvData';
    const guardado = localStorage.getItem(storageKey);

    if (!guardado) return; // No hay base previa, salir sin tocar nada

    let datosGuardados;
    let datosActuales = datos; // Asumimos que "datos" tiene la tabla actual en memoria

    // 🔄 Parsear según el modo
    if (usandoJSON) {
      datosGuardados = JSON.parse(guardado);
    } else {
      // Si es CSV, convertimos la cadena guardada a texto para comparar
      const separador = ';';
      const columnas = headers;
      const lineas = [columnas.join(separador)];

      datosActuales.forEach(obj => {
        const fila = columnas.map(c => (obj[c] || '').toString().replace(/"/g, '')).join(separador);
        lineas.push(fila);
      });
      datosGuardados = guardado.trim();
      datosActuales = lineas.join('\n').trim();
    }

    // ⚖️ Comparar
    let hayCambios = false;

    if (usandoJSON) {
      // Comparar objetos JSON
      hayCambios = JSON.stringify(datosGuardados) !== JSON.stringify(datosActuales);
    } else {
      // Comparar texto CSV
      hayCambios = datosGuardados !== datosActuales;
    }

    // 💾 Guardar si hubo cambios
    if (hayCambios) {
      if (usandoJSON) {
        localStorage.setItem(storageKey, JSON.stringify(datosActuales));
      } else {
        localStorage.setItem(storageKey, datosActuales);
      }

      mostrarMensajeOK(
        `${Icons.advertencia} Se detectaron cambios en los datos de LocalStorage.<br>${Icons.guardar} Cambios guardados automáticamente`,
        "compruebaCambios"
      );

      detenerCSVTemporizador();
    }

  } catch (err) {
    console.error("❌ Error al comprobar cambios:", err);
  }
}

// 🧹 Limpiar input (genérico-individual)
function limpiarInput(inputElement) {
  if (!inputElement) return;
  
  switch (inputElement.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
    case 'search':
      inputElement.value = '';
      break;
    case 'checkbox':
    case 'radio':
      inputElement.checked = false;
      break;
    case 'select-one':
    case 'select-multiple':
      inputElement.selectedIndex = 0;
      break;
    default:
      inputElement.value = '';
  }
}
// 🧹 Limpiar todos los inputs dentro de un contenedor (formulario, modal, etc.)
function limpiarInputs(contenedorSelector) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;

  const inputs = contenedor.querySelectorAll('input, textarea, select, span');
  inputs.forEach(input => {
    const tag = input.tagName.toLowerCase();

    if (tag === 'span') {
      input.textContent = '-'; // 🧹 Limpia texto visible
      return;
    }
    
    switch (input.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'password':
      case 'tel':
      case 'url':
      case 'search':
        input.value = '';
        break;
      case 'checkbox':
      case 'radio':
        input.checked = false;
        break;
      case 'select-one':
      case 'select-multiple':
        input.selectedIndex = 0;
        break;
      default:
        input.value = '';
    }
  });
}
// Observar cambios en el nombre del archivo cargado
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === "characterData" || mutation.type === "childList") {
      const nuevoTexto = fileName2.textContent.trim();
      if (nuevoTexto) {
        origen = "modalCargado";
        console.log('es aca');
        //mostrarMensajeOK(`🔄 El texto cambió a: <b>${nuevoTexto}</b>`, "modalCargado");
        mostrarMensajeOK(`${Icons.csv2} Archivo CSV: ${nuevoTexto} cargado y guardado localmente`, origen);
      }
    }
  }
});

// Observar cambios en el contenido del span
observer.observe(fileName2, { childList: true, characterData: true, subtree: true });

// 🔹 Obtener la fecha más reciente de la columna "ACTUALIZADO" en formato dd/mm/yyyy
function obtenerFechaMasRecienteFormatoCSV(csvTexto, origenFecha) {
  if (!csvTexto) return null;

  const lineas = csvTexto.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lineas.length < 2) return null;

  const separador = lineas[0].includes(';') ? ';' : ',';
  const headers = lineas[0].split(separador).map(h => h.trim().toUpperCase());
  const idxFecha = headers.indexOf("ACTUALIZADO");
  if (idxFecha === -1) return null; // columna no encontrada

  // Buscar la fecha más reciente
  const fechas = lineas.slice(1).map(l => {
    const partes = l.split(separador);
    const valor = partes[idxFecha]?.trim();
    if (origenFecha === 'original') {
      // //console.log(`Fechas Originales: ${valor}`);
      FechasViejas.push(valor);
    } else {
      //console.log(`Fechas Actuales: ${valor}`);
      FechasActuales.push(valor);
    }
    //console.log(valor);
    if (!valor) return null;

    const [dia, mes, año] = valor.split('/').map(Number);
    return new Date(año, mes - 1, dia);
  }).filter(f => f instanceof Date && !isNaN(f));

  if (!fechas.length) return null;

  const fechaMax = new Date(Math.max(...fechas.map(f => f.getTime())));

  // Devolver en formato dd/mm/yyyy
  const dia = String(fechaMax.getDate()).padStart(2, '0');
  const mes = String(fechaMax.getMonth() + 1).padStart(2, '0');
  const año = fechaMax.getFullYear();

  return `${dia}/${mes}/${año}`;
}
// 🔹 Obtener la fecha más reciente del campo "ACTUALIZADO" en un JSON
function obtenerFechaMasRecienteFormatoJSON(jsonData, origenFecha) {
  if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) return null;

  const fechas = jsonData.map(item => {
    const valor = item["ACTUALIZADO"]?.trim();

    if (origenFecha === "original") {
      FechasViejas.push(valor);
    } else {
      FechasActuales.push(valor);
    }

    if (!valor || valor === "0") return null;

    const [dia, mes, año] = valor.split("/").map(Number);
    if (!dia || !mes || !año) return null;

    return new Date(año, mes - 1, dia);
  }).filter(f => f instanceof Date && !isNaN(f));

  if (!fechas.length) return null;

  const fechaMax = new Date(Math.max(...fechas.map(f => f.getTime())));
  const dia = String(fechaMax.getDate()).padStart(2, "0");
  const mes = String(fechaMax.getMonth() + 1).padStart(2, "0");
  const año = fechaMax.getFullYear();

  return `${dia}/${mes}/${año}`;
}


// 🔹 Compara dos arrays de fechas (mismo largo idealmente)
// function compararFechasArrays(fechasOriginal, fechasNuevas) {
//   const resultados = [];

//   const maxLen = Math.max(fechasOriginal.length, fechasNuevas.length);
//   for (let i = 0; i < maxLen; i++) {
//     const fOrig = fechasOriginal;
//     const fNueva = fechasNuevas;

//     if (!fOrig || !fNueva) continue;

//     if (fNueva > fOrig) {
//       resultados.push({
//         indice: i,
//         original: fechasOriginal[i],
//         nueva: fechasNuevas[i]
//       });
//     }
//   }
//   return resultados;
// }
// Funcion que busca las fechas diferentes
function obtenerFechasMasNuevas(fechasOriginal, fechasNuevas) {
  const diferentes = [];
  for (let i = 0; i < fechasNuevas.length; i++) {
    const fOrig = fechasOriginal[i];
    const fNueva = fechasNuevas[i];
    if (!fOrig || !fNueva) continue;

    // Solo guarda si la nueva es posterior
    if (fNueva > fOrig) {
      diferentes.push({
        indice: i,
        original: fechasOriginal[i],
        nueva: fechasNuevas[i]
      });
    }
  }
  return diferentes;
}
// Comprobamos si los datos del archivo original
// cargado en localStorage con nombre "csvOriginal"
// contiene los mismos datos que localStorage con nombre "csvData"
setTimeout(() => {
  if (esLocal()) {
    obtenerFechaMasRecienteFormatoCSV(csvData, 'actuales');
    obtenerFechaMasRecienteFormatoCSV(csvDataOriginal, 'original');
  } else {
    const datosActuales = localStorage.getItem("jsonData");
    const datosOriginales = localStorage.getItem("jsonOriginal");
    obtenerFechaMasRecienteFormatoJSON(datosActuales, 'actuales');
    obtenerFechaMasRecienteFormatoJSON(datosOriginales, 'original');
    //console.log()
  }
  const cambios = obtenerFechasMasNuevas(FechasViejas, FechasActuales);
  const originalesDiferentes = cambios.map(c => c.original);
  const actualesDiferentes = cambios.map(c => c.nueva);
  if (originalesDiferentes.length > 0) {
    mostrarMensajeOK(`${Icons.advertencia} Los datos almacenados en: ${archivoOriginal} procedente del archivo original: ${Icons.csv}${nombre}<br>Son más antiguos que los datos de: ${csvDatos} almacenados en LocalStorage`, 'datosOriginales');
    localStorage.setItem(archivoOriginal, csvData);
  } else {
    console.log('son iguales');
  }
}, 5000);
// 🔹 Función para asignar un tooltip único a un elemento
function asignarTooltipUnico2(el, textoFn, delay = 2000) {
  if (!el) return;
  el._tieneTooltip = true;
  el.addEventListener('mouseover', e => {
    clearTimeout(timeoutID);
    mostrarTooltip(e, textoFn());
    e.stopPropagation();
  });
  el.addEventListener('mouseout', function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(ocultarTooltip, delay);
    //ocultarTooltip(2000);
  });
}
// 🔹 Función para asignar un tooltip único a un elemento utilizada por 
// la funcion que asigna tooltips dentro del modalEliminar
function asignarTooltipUnico(el, textoFn, delay = 2000) {
  if (!el || el._tieneTooltip) return;
  el._tieneTooltip = true;
  el.addEventListener('mouseover', e => {
    clearTimeout(timeoutID);
    const texto = typeof textoFn === 'function' ? textoFn(el) : textoFn;
    mostrarTooltip(e, texto);
    e.stopPropagation();
  });
  //el.addEventListener('mouseout', ocultarTooltip);
  el.addEventListener('mouseout', function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(ocultarTooltip, delay);
    //ocultarTooltip(2000);
  });
}

// 🔹 Función para asignar tooltips dentro del modalEliminar
function asignarTooltipsModalEliminar() {
  //const modal = document.getElementById('modalEliminar');
  if (!modalEliminar) return;
  segundosTooltip = 2000;

  elementos.forEach(el => {
    const id = el.id || el.name || el.textContent?.trim();
    let textoTooltip = null;
    switch (id) {
      default:
        textoTooltip = TitulosList.modalEliminarSinData;
    }

    // 🔸 Elegimos el texto según el id o contenido
    // switch (id) {
    //   case 'btnEliminar':
    //     textoTooltip = TitulosList.btnEliminar;
    //     break;
    //   case 'btnCancelar':
    //     textoTooltip = TitulosList.btnCancelar;
    //     break;
    //   case 'btnLimpiar':
    //     textoTooltip = TitulosList.btnLimpiar;
    //     break;
    //   case 'codigo':
    //     textoTooltip = TitulosList.codigo;
    //     break;
    //   case 'nombre':
    //     textoTooltip = TitulosList.nombre;
    //     break;
    //   // 🔹 Agregá más casos si necesitás
    //   default:
    //     textoTooltip = 'Elemento del modal.';
    // }

    asignarTooltipUnico(el, textoTooltip, segundosTooltip);
  });
}

function esLocal() {
  // Protocolo 'file:' indica que se abrió desde el disco
  if (window.location.protocol === 'file:') return true;
  
  // HTTPS o HTTP indica que está en un servidor (GitHub Pages, otro host)
  return false;
}
