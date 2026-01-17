import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * Genera un slug a partir de un texto.
 *
 * Convierte el texto a minúsculas, elimina acentos, caracteres especiales
 * y reemplaza los espacios por guiones, generando un identificador
 * legible y compatible con URLs.
 *
 * @function createSlug
 *
 * @param {string} title - Texto base a convertir en slug.
 *
 * @returns {string} Slug generado a partir del texto proporcionado.
 */
const createSlug = (title) => {
  return title
    .toLowerCase() // minúsculas
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres especiales
    .trim() // quita espacios al inicio y fin
    .replace(/\s+/g, "-"); // espacios por guiones
};

/**
 * Filtra una lista de productos por un rango de fechas de creación.
 *
 * Convierte las fechas de inicio y fin a tiempo UTC ajustado (+5 horas)
 * y retorna únicamente los productos cuya fecha de creación se
 * encuentre dentro del rango especificado.
 *
 * @function searchProducstByDateRange
 *
 * @param {Array<Object>} products - Arreglo de productos a filtrar.
 * @param {string | Date} startDate - Fecha inicial del rango de búsqueda.
 * @param {string | Date} endDate - Fecha final del rango de búsqueda.
 *
 * @returns {Array<Object>} Lista de productos cuya fecha de creación
 * se encuentra dentro del rango especificado.
 */
const searchProducstByDateRange = (products, startDate, endDate) => {
  // Convertimos las fechas del input a UTC sumando 5 horas
  const start = dayjs(startDate).startOf("day").add(5, "hour").valueOf();

  const end = dayjs(endDate).endOf("day").add(5, "hour").valueOf();

  return products.filter((product) => {
    const productDate = dayjs(product.creationAt).valueOf();
    return productDate >= start && productDate <= end;
  });
};

export { createSlug, searchProducstByDateRange };
