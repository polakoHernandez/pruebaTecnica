/**
 * Formatea un valor numérico como moneda en dólares estadounidenses (USD).
 *
 * Utiliza la API `Intl.NumberFormat` para convertir un número
 * a un string con formato monetario estándar en dólares.
 *
 * @function formatUSD
 *
 * @param {number} value - Valor numérico a formatear.
 *
 * @returns {string} Valor formateado en USD (ej: $1,234.56).
 */
const formatUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export { formatUSD };
