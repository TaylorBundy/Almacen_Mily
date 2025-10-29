async function cargarCSVdesdeGitHub() {
    try {
      // 🔹 URL del archivo CSV público en GitHub (usa el RAW link)
      //const url = 'https://raw.githubusercontent.com/USUARIO/REPO/main/Lista_Precios.csv';
      //const response = await fetch(url);
      const response = await fetch('Lista_Precios.csv'); // Asegurate que esté en la misma carpeta
      if (!response.ok) throw new Error('No se pudo cargar el CSV desde GitHub');
  
      const texto = await response.text();
  
      // 🔹 Parsear CSV a objetos (simple, separador por coma o punto y coma)
      // const lineas = texto.split(/\r?\n/).filter(l => l.trim() !== '');
      // const encabezados = lineas[0].split(/;|,/).map(h => h.trim());
      // const datos = lineas.slice(1).map(linea => {
      //   const valores = linea.split(/;|,/);
      //   const item = {};
      //   encabezados.forEach((col, i) => item[col] = valores[i] || '');
      //   return {
      //     CODIGO: item.CODIGO || item.codigo || '0',
      //     ID: item.ID || item.id || '',
      //     PRODUCTO: item.PRODUCTO || item.producto || '',
      //     PRECIO: item.PRECIO || item.precio || '',
      //     PRECIO2: item.PRECIO2 || item.precio2 || '',
      //     ACTUALIZADO: item.ACTUALIZADO || item.actualizado || '0'
      //   };
      // });
      const lineas = texto.split(/\r?\n/).filter(l => l.trim() !== '');
      const separador = lineas[0].includes(';') ? ';' : ',';
      headers = lineas[0].split(separador).map(h => h.trim());
      datos = lineas.slice(1).map(linea => {
        const valores = linea.split(separador);
        let obj = {};
        headers.forEach((h, i) => obj[h] = valores[i]?.trim() || '');
        return obj;
      });
  
      // 🔹 Mostrar en tabla y guardar localmente
      mostrarTabla(datos);
      localStorage.setItem('csvData', texto);

      localStorage.setItem('csvOriginal', texto);
      cantidadOriginal = datos.length;
  
      console.log("✅ CSV cargado desde GitHub correctamente");
      return datos;
  
    } catch (err) {
      console.error("❌ Error al cargar el CSV desde GitHub:", err);
      alert("No se pudo cargar el CSV desde GitHub.");
      return [];
    }
  }
  