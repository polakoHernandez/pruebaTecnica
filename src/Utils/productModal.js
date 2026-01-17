/**
 * Valida si un formulario tiene campos obligatorios vacíos o inválidos.
 *
 * Recorre dinámicamente un objeto de datos y verifica:
 * - Campos string obligatorios no estén vacíos.
 * - El arreglo de imágenes exista y tenga al menos un elemento.
 * - El campo `categoryId` tenga un valor válido.
 * - Ignora campos temporales como `imageUrl`.
 *
 * Esta función es útil para habilitar o deshabilitar botones
 * de envío en formularios de creación o edición.
 *
 * @function isAllFieldsEmpty
 *
 * @param {Object} data - Objeto que contiene los datos del formulario.
 *
 * @returns {boolean} Retorna `true` si algún campo obligatorio
 * está vacío o es inválido, de lo contrario `false`.
 */
const isAllFieldsEmpty = (data) => {
  for (const key in data) {
    const value = data[key];

    // Ignorar campo temporal
    if (key === "imageUrl") {
      continue;
    }

    // Validar imágenes (array obligatorio)
    if (key === "images") {
      if (!Array.isArray(value) || value.length === 0) {
        return true;
      }
      continue;
    }

    // Validar categoryId (número obligatorio)
    if (key === "categoryId") {
      if (value === null || value === undefined || value === 0) {
        return true;
      }
      continue;
    }

    // Validar strings obligatorios
    if (typeof value === "string") {
      if (value.trim() === "") {
        return true;
      }
    }
  }

  return false;
};

export { isAllFieldsEmpty };
