/**
 * Representa un producto para ser creado o actualizado en la API.
 *
 * Esta clase encapsula las propiedades de un producto y provee
 * getters, setters con validaciones básicas y un método utilitario
 * para serializar el objeto antes de enviarlo al backend.
 *
 * @class Product
 */
class Product {
  /**
   * Crea una instancia de Product.
   *
   * @constructor
   * @param {string} title - Título del producto.
   * @param {number} price - Precio del producto.
   * @param {string} description - Descripción del producto.
   * @param {number} categoryId - Identificador de la categoría asociada.
   * @param {string[]} images - Arreglo de URLs de imágenes del producto.
   */
  constructor(title, price, description, categoryId, images) {
    this._title = title;
    this._price = price;
    this._description = description;
    this._categoryId = categoryId;
    this._images = images;
  }

  /**
   * Obtiene el título del producto.
   *
   * @returns {string} Título del producto.
   */
  get title() {
    return this._title;
  }

  /**
   * Establece el título del producto.
   *
   * @param {string} value - Nuevo título del producto.
   */
  set title(value) {
    this._title = value;
  }

  /**
   * Obtiene el precio del producto.
   *
   * @returns {number} Precio del producto.
   */ get price() {
    return this._price;
  }

  /**
   * Establece el precio del producto.
   *
   * @param {number} value - Nuevo precio del producto.
   * @throws {Error} Si el precio es menor que cero.
   */
  set price(value) {
    if (value < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    this._price = value;
  }

  /**
   * Obtiene la descripción del producto.
   *
   * @returns {string} Descripción del producto.
   */
  get description() {
    return this._description;
  }

  /**
   * Establece la descripción del producto.
   *
   * @param {string} value - Nueva descripción del producto.
   */
  set description(value) {
    this._description = value;
  }

  /**
   * Obtiene el identificador de la categoría.
   *
   * @returns {number} Identificador de la categoría.
   */
  get categoryId() {
    return this._categoryId;
  }

  /**
   * Establece el identificador de la categoría.
   *
   * @param {number} value - Nuevo identificador de la categoría.
   */
  set categoryId(value) {
    this._categoryId = value;
  }

  /**
   * Obtiene el arreglo de imágenes del producto.
   *
   * @returns {string[]} Arreglo de URLs de imágenes.
   */ get images() {
    return this._images;
  }

  /**
   * Establece el arreglo de imágenes del producto.
   *
   * @param {string[]} value - Arreglo de URLs de imágenes.
   * @throws {Error} Si el valor no es un arreglo.
   */
  set images(value) {
    if (!Array.isArray(value)) {
      throw new Error("Images debe ser un arreglo");
    }
    this._images = value;
  }

  /**
   * Serializa la instancia del producto a un objeto plano
   * compatible con la API.
   *
   * @returns {{
   *  title: string,
   *  price: number,
   *  description: string,
   *  categoryId: number,
   *  images: string[]
   * }} Objeto listo para ser enviado al backend.
   */ toJSON() {
    return {
      title: this._title,
      price: this._price,
      description: this._description,
      categoryId: this._categoryId,
      images: this._images,
    };
  }
}

export default Product;
