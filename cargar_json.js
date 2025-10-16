// ⚡ Cargar JSON automáticamente
async function cargarJSON2() {
    try {
      const response = await fetch('datos.json'); // Asegurate que esté en la misma carpeta
      if (!response.ok) throw new Error('No se pudo cargar el JSON');
      const json = await response.json();
      datos = json;
      mostrarTabla(datos);
    } catch (err) {
      console.error(err);
    }
  }

async function cargarJSON() {
    try {
        const response = await fetch('Lista_Precios.json'); // Asegurate que esté en la misma carpeta
        if (!response.ok) throw new Error('No se pudo cargar el JSON');
        const json = await response.json();

        // Adaptamos los datos al formato esperado por mostrarTabla
        datos = json.map(item => ({
        CODIGO: item.CODIGO || item.codigo || '0',  // soporta JSON con mayúscula o minúscula
        ID: item.ID || item.id || '',
        PRODUCTO: item.PRODUCTO || item.producto || '',
        PRECIO: item.PRECIO || item.precio || '',
        PRECIO2: item.PRECIO2 || item.precio2 || '',
        ACTUALIZADO: item.ACTUALIZADO || item.actualizado || ''
        }));

        // Llamamos a mostrarTabla con los datos adaptados
        mostrarTabla(datos);
        //console.log(datos);
        //localStorage.setItem('pruebaonline', datos);
        //localStorage.setItem('pruebaonline', JSON.stringify(datos));
        localStorage.setItem('csvData', JSON.stringify(datos));
        localStorage.setItem('csvOriginal', JSON.stringify(datos));

        return datos; // opcional, si necesitas usar los datos luego
    } catch (err) {
        console.error(err);
        return [];
    }
}

function cargarDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem("csvData");
  
    if (datosGuardados) {
      try {
        const lista = JSON.parse(datosGuardados);
        if (Array.isArray(lista) && lista.length > 0) {
          mostrarTabla(lista);
          console.log(`✅ Datos cargados desde localStorage (${lista.length} artículos)`);
        } else {
          console.warn("⚠️ No se encontraron artículos válidos en localStorage.");
        }
      } catch (e) {
        console.error("❌ Error al leer los datos del localStorage:", e);
      }
    } else {
      console.log("ℹ️ No hay datos guardados en localStorage.");
    }
  }