class ProductController {
  /**
   * Obtiene productos desde la Fake Store API usando paginación.
   *
   * Realiza dos peticiones:
   * 1. Una para obtener el total de productos disponibles.
   * 2. Otra para obtener los productos paginados según `offset` y `limit`.
   *
   * @async
   * @function getProductsByPagination
   *
   * @param {number} offset - Número de elementos a omitir (inicio de la paginación).
   * @param {number} limit - Cantidad de productos a obtener por página.
   *
   * @returns {Promise<{
   *  totalItems: number,
   *  products: Array<Object>
   * }>} Retorna un objeto con el total de productos y la lista paginada.
   *
   
   */
  static async getProductsByPagination(offset, limit) {
    try {
      const response = await fetch(" https://api.escuelajs.co/api/v1/products");
      const listProducts = await response.json();
      const sizeListproducts = listProducts.length;

      const secondResponse = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`,
      );
      const secondListProducts = await secondResponse.json();
      return {
        totalItems: sizeListproducts,
        products: secondListProducts,
      };
    } catch (error) {}
  }

  /**
   * Obtiene un producto a partir de su título (slug) desde la API de EscuelaJS.
   *
   * Realiza una petición HTTP al endpoint de productos por slug y maneja
   * la respuesta según el código de estado HTTP.
   *
   * @async
   * @function getProductByTitle
   *
   * @param {string} title - Slug o título del producto a consultar.
   *
   * @returns {Promise<{
   *   product?: Object,
   *   message?: string,
   *   status: number
   * }>} Retorna el producto si existe o un mensaje de error si no se encuentra.
   */
  static async getProductByTitle(title) {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/slug/${title}`,
      );
      switch (response.status) {
        case 200:
          const product = await response.json();
          return { product: product, status: 200 };
        case 400:
          return {
            message: "Producto no encontrado",
            status: 400,
          };
      }
    } catch (error) {
      console.error("Error fetching product by title:", error);
    }
  }

  /**
   * Crea un nuevo producto en la API de EscuelaJS.
   *
   * Realiza una petición HTTP `POST` enviando los datos del producto en formato JSON
   * y maneja la respuesta según el código de estado HTTP retornado por el servidor.
   *
   * @async
   * @function createProduct
   *
   * @param {Object} product - Objeto que contiene la información del producto a crear.
   *
   * @returns {Promise<{
   *   product?: Object,
   *   error?: Object | string,
   *   status: number
   * }>} Retorna el producto creado o el detalle del error según la respuesta del backend.
   */
  static async createProduct(product) {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

      const data = await response.json(); // 👈 SIEMPRE leer el body

      switch (response.status) {
        case 201:
          return {
            product: data,
            status: 201,
          };

        case 400:
          return {
            error: data, // 👈 respuesta real del backend
            status: 400,
          };

        case 401:
          return {
            error: data,
            status: 401,
          };

        default:
          return {
            error: data,
            status: response.status,
          };
      }
    } catch (error) {
      console.error("Error creating product:", error);
      return {
        error: error.message,
        status: 500,
      };
    }
  }

  /**
   * Actualiza un producto existente en la API de EscuelaJS.
   *
   * Realiza una petición HTTP `PUT` enviando los datos actualizados del producto
   * en formato JSON y maneja la respuesta según el código de estado HTTP.
   *
   * @async
   * @function updateProduct
   *
   * @param {number | string} id - Identificador único del producto a actualizar.
   * @param {Object} product - Objeto con los datos del producto a actualizar.
   *
   * @returns {Promise<{
   *   product?: Object,
   *   error?: Object | string,
   *   status: number
   * }>} Retorna el producto actualizado o el detalle del error según la respuesta del backend.
   */
  static async updateProduct(id, product) {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

      const data = await response.json(); // 👈 siempre leer el body

      switch (response.status) {
        case 200:
          return {
            product: data,
            status: 200,
          };
        case 204:
          return {
            product: data,
            status: 204,
          };

        case 400:
          return {
            error: data, // errores de validación del backend
            status: 400,
          };

        case 404:
          return {
            error: data,
            status: 404,
          };

        case 401:
          return {
            error: data,
            status: 401,
          };

        default:
          return {
            error: data,
            status: response.status,
          };
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return {
        error: error.message,
        status: 500,
      };
    }
  }

  /**
   * Elimina un producto existente en la API de EscuelaJS.
   *
   * Realiza una petición HTTP `DELETE` al endpoint del producto
   * y maneja la respuesta según el código de estado HTTP.
   *
   * @async
   * @function deleteProduct
   *
   * @param {number | string} id - Identificador único del producto a eliminar.
   *
   * @returns {Promise<{
   *   success?: boolean,
   *   error?: Object | string,
   *   status: number
   * }>} Retorna true si se elimina correctamente o el detalle del error.
   */
  static async deleteProduct(id) {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      switch (response.status) {
        case 200:
          return {
            success: true,
            status: 200,
          };

        case 404:
          return {
            error: data,
            status: 404,
          };

        case 401:
          return {
            error: data,
            status: 401,
          };

        default:
          return {
            error: data,
            status: response.status,
          };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return {
        error: error.message,
        status: 500,
      };
    }
  }
}

export default ProductController;
