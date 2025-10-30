async function cargarCSVdesdeDrive() {
    const url = 'https://docs.google.com/spreadsheets/d/1U49EKy5X-snACu7jmD_PzprGPYNRqxBpXGSjvOJvjaI/export?format=csv';
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al descargar CSV');
        const texto = await res.text();
        const lineas = texto.split(/\r?\n/).filter(l => l.trim() !== '');
        const separador = lineas[0].includes(';') ? ';' : ','; 
        headers = lineas[0].split(separador).map(h => h.trim());
        // 🧠 Procesar filas respetando comas dentro de precios o comillas
        datos = lineas.slice(1).map(linea => {
            // Expresión regular: divide solo en separadores reales, no en comas dentro de comillas
            const regex = new RegExp(`(".*?"|[^${separador}]+)(?=${separador}|$)`, 'g');
            const valores = (linea.match(regex) || []).map(v =>
            v.replace(/^"|"$/g, '').trim()
            );
            // Crear el objeto con los headers
            let obj = {};
            headers.forEach((h, i) => obj[h] = valores[i] || '');
            return obj;
        });
        // 🔹 Mostrar en tabla y guardar localmente
        mostrarTabla(datos);
        localStorage.setItem('csvData', texto);
        //localStorage.setItem('csvOriginal', localStorage.getItem('csvData'));
        cantidadOriginal = datos.length;
    
        console.log("✅ CSV cargado desde GoogleDrive correctamente");
        return datos;
    } catch (err) {
      console.error('Error:', err);
    }
  }