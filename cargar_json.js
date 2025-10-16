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
      console.log(datos);
  
      return datos; // opcional, si necesitas usar los datos luego
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  