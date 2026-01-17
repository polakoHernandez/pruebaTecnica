import * as lib from "../libraries/productCard";
import { styles } from "../Styles/producCard";
import { formatUSD } from "../Utils/productCard";

/**
 * Componente visual que representa una tarjeta de producto.
 *
 * Muestra la información principal del producto (imagen, título, slug,
 * calificación y precio) y permite acciones como editar o eliminar
 * mediante un overlay interactivo sobre la imagen.
 *
 * También integra un modal para edición del producto.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number | string} props.id - Identificador único del producto.
 * @param {string} props.title - Título del producto.
 * @param {number} props.price - Precio del producto.
 * @param {string} props.slug - Slug del producto.
 * @param {string} props.image - URL de la imagen del producto.
 * @param {string} props.description - Descripción del producto.
 * @param {number} props.categoryId - Identificador de la categoría del producto.
 * @param {Function} props.reload - Función para recargar la lista de productos.
 * @param {Function} props.onEdit - Callback para la acción de edición.
 * @param {Function} props.onDelete - Callback para la acción de eliminación.
 * @param {Function} props.openProductModal - Función para abrir el modal de producto.
 * @param {Object} props.info - Información adicional del producto.
 *
 * @returns {JSX.Element} Tarjeta de producto renderizada.
 */
const ProductCard = ({
  id,
  title,
  price,
  slug,
  image,
  description,
  categoryId,
  reload,
  onEdit,
  onDelete,
  openProductModal,
  info,
}) => {
  const [showActions, setShowActions] = lib.useState(false);
  const [open, setOpen] = lib.useState(false);
  const [method, setMethod] = lib.useState("edit");
  const [openDeleteModal, setOpenDeleteModal] = lib.useState(false);

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <lib.Box sx={{ ...styles.mainContainer }}>
      {/* IMAGEN */}
      <lib.Box
        sx={{
          ...styles.firstContainerImage,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={toggleActions}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* OVERLAY CON BOTONES */}
        {showActions && (
          <lib.Box
            onClick={(e) => e.stopPropagation()} // evita que se cierre al hacer click en botones
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <lib.IconButton
              sx={{ bgcolor: "white" }}
              color="primary"
              onClick={() => {
                setOpen(true);
                setMethod("edit");
              }}
            >
              <lib.Edit />
            </lib.IconButton>

            <lib.IconButton
              sx={{ bgcolor: "white" }}
              color="error"
              onClick={() => setOpenDeleteModal(true)}
            >
              <lib.Delete />
            </lib.IconButton>
          </lib.Box>
        )}
      </lib.Box>

      {/* RESTO */}
      <lib.Box sx={{ ...styles.firstContainerTitle }}>
        <lib.Typography fontWeight="bold">{title}</lib.Typography>
        <lib.IconButton>
          <lib.FavoriteBorderOutlined />
        </lib.IconButton>
      </lib.Box>

      <lib.Box sx={{ ...styles.firstContainerSlug }}>
        <lib.Typography sx={{ opacity: 0.5 }}>{slug}</lib.Typography>
      </lib.Box>

      <lib.Box sx={{ ...styles.firstContainerRaiting }}>
        <lib.Rating value={2} readOnly />
      </lib.Box>

      <lib.Box sx={{ ...styles.firstContainerPrice }}>
        {formatUSD(price)}
      </lib.Box>
      <lib.ProductModal
        reload={reload}
        id={id}
        title={title}
        price={price}
        slug={slug}
        image={image}
        description={description}
        categoryId={categoryId}
        method={method}
        open={open}
        toggleModal={() => setOpen(false)}
      />
      <lib.DeleteProductModal
        reload={reload}
        id={id}
        open={openDeleteModal}
        toggleModal={() => setOpenDeleteModal(false)}
      ></lib.DeleteProductModal>
    </lib.Box>
  );
};

export default ProductCard;
