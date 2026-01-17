import * as lib from "../libraries/productModal";
import { styles } from "../Styles/productModal";
import ProductController from "../Controllers/ProductController";
import Producto from "../Models/Product";
import { isAllFieldsEmpty } from "../Utils/productModal";

/**
 * Modal para crear o editar productos.
 *
 * Este componente muestra un formulario dentro de un modal que permite
 * crear o actualizar productos según el método recibido (`create` o `edit`).
 * Maneja la carga de imágenes, validaciones básicas, estados de carga,
 * deshabilitado de botones y comunicación con el controlador de productos.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el modal está abierto o cerrado.
 * @param {Function} props.toggleModal - Función para abrir o cerrar el modal.
 * @param {Function} props.reload - Función para recargar la lista de productos.
 * @param {"create" | "edit"} props.method - Define si el modal se usa para crear o editar.
 * @param {string} props.title - Título inicial del producto (modo edición).
 * @param {number} props.price - Precio inicial del producto (modo edición).
 * @param {number | string} props.id - Identificador del producto (modo edición).
 * @param {string} props.slug - Slug del producto.
 * @param {string} props.image - URL de la imagen principal del producto.
 * @param {string} props.description - Descripción inicial del producto.
 * @param {number} props.categoryId - Identificador de la categoría del producto.
 *
 * @returns {JSX.Element} Modal con formulario para crear o editar productos.
 */
export default function ProdcutModal({
  open,
  toggleModal,
  reload,
  method,
  title,
  price,
  id,
  slug,
  image,
  description,
  categoryId,
}) {
  const [data, setData] = lib.useState({
    title: title || "",
    price: price || "",
    description: description || "",
    categoryId: categoryId || "",
    imageUrl: "", // input temporal
    images: image ? [image] : [], // lista final de URLs
  });

  const [disabled, setdisabled] = lib.useState(false);
  const [loading, setloading] = lib.useState(false);

  const inputs = [
    {
      label: "Título*",
      name: "title",
      variant: "common",
    },
    {
      label: "Precio*",
      name: "price",
      variant: "common",
    },
    {
      label: "Descripción*",
      name: "description",
      variant: "common",
    },
    {
      label: "Categoría*",
      name: "categoryId",
      variant: "select",
    },
    {
      label: "URL de imagen",
      name: "imageUrl",
      variant: "image",
    },
  ];

  const addImage = () => {
    if (!data.imageUrl) return;

    setData((prev) => ({
      ...prev,
      images: [...prev.images, data.imageUrl],
      imageUrl: "",
    }));
  };

  const removeImage = (index) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const catchData = (element) => {
    setData((prevData) => ({
      ...prevData,
      [element.name]: element.value,
    }));
  };

  const cleanData = () => {
    setData({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      imageUrl: "", // input temporal
      images: [], // lista final de URLs
    });
  };

  const createProduct = async () => {
    setdisabled(true);
    setloading(true);

    const product = new Producto(
      data.title,
      parseFloat(data.price),
      data.description,
      parseInt(data.categoryId),
      data.images,
    );

    let respo = null;

    // 🔹 SWITCH 1: decidir acción (crear / actualizar)
    switch (method) {
      case "create":
        respo = await ProductController.createProduct(product);
        break;

      case "edit":
        respo = await ProductController.updateProduct(id, product);
        break;

      default:
        lib.toast.error("Método no válido");
        setdisabled(false);
        setloading(false);
        return;
    }

    // 🔹 SWITCH 2: manejar respuesta del backend
    switch (respo.status) {
      case 200:
        lib.toast.success("Producto actualizado con éxito");
        cleanData();
        reload();
        break;

      case 201:
        lib.toast.success("Producto creado con éxito");
        cleanData();
        reload();
        break;
      case 204:
        lib.toast.success("Producto creado con éxito");
        cleanData();
        reload();
        break;

      case 400:
        lib.toast.error(respo.error || "Error en la operación");
        reload();

        break;

      default:
        lib.toast.error("Error inesperado");
        reload();
        break;
    }

    setdisabled(false);
    setloading(false);
  };

  return (
    <div>
      <lib.Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <lib.Box sx={{ ...styles.main }}>
          <lib.Box sx={{ width: "100%", height: "10%" }}>
            <lib.Box sx={{ display: "flex", justifyContent: "end" }}>
              <lib.Cancel
                onClick={() => {
                  (cleanData(), toggleModal(false));
                }}
                sx={{ ...styles.cancelButton }}
              ></lib.Cancel>
            </lib.Box>
            <lib.Box sx={{ ...styles.firstContainerHeaderText }}>
              <lib.Typography
                variant="h6"
                sx={{ ...styles.secondContainerHeaderText }}
              >
                {method === "create" ? "Agregar producto" : "Editar producto"}
              </lib.Typography>
            </lib.Box>
          </lib.Box>
          <lib.Box sx={{ width: "100%", height: "90%" }}>
            <lib.Grid
              container
              sx={{
                width: "100%",

                height: { xs: "100%", sm: "500px", md: "100%" },
                // bgcolor: "red",
                mt: { xs: "0px", sm: "25px", md: "0px" },
              }}
            >
              {inputs.map((elemet) => {
                if (elemet.variant === "common") {
                  return (
                    <lib.Grid
                      key={elemet.name}
                      item
                      size={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <lib.Box sx={{ width: "90%" }}>
                        <lib.TextField
                          fullWidth
                          onChange={(e) => catchData(e.target)}
                          value={data[elemet.name] || ""}
                          label={elemet.label}
                          name={elemet.name}
                        />
                      </lib.Box>
                    </lib.Grid>
                  );
                }

                if (elemet.variant === "select") {
                  return (
                    <lib.Grid
                      key={elemet.name}
                      item
                      size={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <lib.Box sx={{ width: "90%" }}>
                        <lib.TextField
                          fullWidth
                          select
                          onChange={(e) => catchData(e.target)}
                          value={data[elemet.name] || ""}
                          label={elemet.label}
                          name={elemet.name}
                        >
                          <lib.MenuItem value={1}>Ropa</lib.MenuItem>
                        </lib.TextField>
                      </lib.Box>
                    </lib.Grid>
                  );
                }

                if (elemet.variant === "image") {
                  return (
                    <lib.Grid
                      key={elemet.name}
                      item
                      size={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <lib.Box sx={{ width: "90%", display: "flex", gap: 1 }}>
                        <lib.TextField
                          fullWidth
                          label={elemet.label}
                          name={elemet.name}
                          value={data.imageUrl}
                          onChange={(e) => catchData(e.target)}
                        />
                        <lib.Button variant="contained" onClick={addImage}>
                          Agregar
                        </lib.Button>
                      </lib.Box>
                    </lib.Grid>
                  );
                }
              })}
              {data.images.length > 0 && (
                <lib.Grid
                  item
                  size={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <lib.Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {data.images.map((img, index) => (
                      <lib.Box key={index} sx={{ position: "relative" }}>
                        <img
                          src={img}
                          alt="preview"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <lib.IconButton
                          size="small"
                          onClick={() => removeImage(index)}
                          sx={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <lib.Close color="error" />
                        </lib.IconButton>
                      </lib.Box>
                    ))}
                  </lib.Box>
                </lib.Grid>
              )}

              <lib.Grid item size={12} sx={{ ...styles.firstContainerButton }}>
                <lib.Box sx={{ ...styles.secondContainerButtons }}>
                  <lib.Box sx={{ ...styles.thirdContainerButtons }}>
                    <lib.Button
                      disabled={isAllFieldsEmpty(data) || disabled}
                      onClick={() => createProduct()}
                      variant="contained"
                      sx={{ ...styles.createButton }}
                      endIcon={
                        loading ? (
                          <lib.CircularProgress size={10} color="inherit" />
                        ) : (
                          <lib.CheckCircle />
                        )
                      }
                    >
                      {method === "create" ? "Si, crear" : "Si, editar"}
                    </lib.Button>
                    <lib.Button
                      disabled={loading}
                      endIcon={<lib.CloseOutlined />}
                      onClick={() => {
                        cleanData();
                        toggleModal(false);
                      }}
                      variant="contained"
                      sx={{ ...styles.noCreateButton }}
                    >
                      No, Cancelar
                    </lib.Button>
                  </lib.Box>
                </lib.Box>
              </lib.Grid>
            </lib.Grid>
          </lib.Box>
        </lib.Box>
      </lib.Modal>
    </div>
  );
}
