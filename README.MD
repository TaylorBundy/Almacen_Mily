# 🧾 Lista de Precios

**Lista_Precios** es una aplicación web ligera y sin servidor que permite visualizar, buscar y actualizar listas de precios de manera simple y rápida.  
Está diseñada para pequeños comercios que manejan sus precios en hojas de cálculo y desean una interfaz visual más cómoda sin depender de internet ni bases de datos externas.

---

## 🚀 Características

- 📂 **Carga de archivos CSV** para importar fácilmente tus productos y precios.
- 🔍 **Búsqueda inteligente** por nombre o código de producto (sin distinguir mayúsculas ni acentos).
- ✏️ **Edición en línea**: modifica los precios directamente en la tabla.
- 🕓 **Actualización automática de fecha** cuando se cambia un precio.
- 💾 **Guardado en LocalStorage**: tus cambios se conservan incluso al cerrar el navegador.
- 🔁 **Comparación de cambios** entre la lista original y la actual.
- 🧮 **Formato automático de precios** (por ejemplo: `$ 1.250,00`).
- ⚠️ **Mensajes y modales dinámicos** para confirmaciones o advertencias.

---

## 💡 Uso

1. Abre el archivo `index.html` en tu navegador.
2. Carga tu archivo CSV con la lista de productos y precios.
3. Visualiza los datos en la tabla.
4. Edita precios, agrega o elimina artículos según necesites.
5. Los cambios se guardarán automáticamente en el almacenamiento local del navegador.

> 💾 No es necesario un servidor ni conexión a internet. Todo funciona de manera local.

---

## 📄 Formato del archivo CSV

El archivo CSV debe tener las siguientes columnas (en cualquier orden):

| CÓDIGO | NOMBRE | PRECIO 1 | PRECIO 2 | ACTUALIZADO |
|--------|---------|-----------|-----------|--------------|
| 12345  | Producto A | 2500 | 2300 | 15/10/2025 |
| 67890  | Producto B | 1000 | 950 | 10/10/2025 |

---

## 🧰 Tecnologías utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6)**  
- **LocalStorage** para persistencia de datos  
- **File API** para lectura de archivos CSV  

---

## 🖼️ Capturas (opcional)

*(Podés agregar imágenes de ejemplo de la tabla o interfaz, por ejemplo en una carpeta `/img`)*

```markdown
![Vista principal](img/vista_principal.png)
