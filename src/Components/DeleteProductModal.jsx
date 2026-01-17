import * as lib from "..//libraries/deleteEmplyeModal";
import ProductController from "../Controllers/ProductController";
import toast from "react-hot-toast";

export default function DeleteProductModal({
  open,
  toggleModal,
  data,
  reload,
  id,
}) {
  const [loading, setLoading] = lib.useState(false);

  const deleteProduct = async () => {
    setLoading(true);
    const response = await ProductController.deleteProduct(id);

    switch (response.status) {
      case 200:
        toast.success("Producto eliminado correctamente");
        toggleModal(false);
        reload();
        setLoading(false);
        break;
      case 404:
        toast.error("Producto no encontrado");
        setLoading(false);

        break;
      case 401:
        toast.error("No autorizado para eliminar el producto");
        setLoading(false);
        break;
      default:
        toast.error("Error al eliminar el producto");
        setLoading(false);
        break;
    }
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
                onClick={() => toggleModal(false)}
                sx={{ ...styles.cancelButton }}
              ></lib.Cancel>
            </lib.Box>
            <lib.Box sx={{ ...styles.firstContainerHeaderText }}>
              <lib.Typography
                variant="h6"
                sx={{ ...styles.secondContainerHeaderText }}
              >
                {`¿Está seguro de eliminar este producto?`}
              </lib.Typography>
            </lib.Box>
          </lib.Box>
          <lib.Box sx={{ ...styles.firstContainerWarningText }}>
            <lib.Box sx={{ ...styles.secondContainerWarningText }}>
              <lib.Box sx={{ ...styles.thirdContainerWarningText }}>
                <lib.Typography>
                  Si lo eliminas, no podrás verlo en tu inventario
                </lib.Typography>
              </lib.Box>
            </lib.Box>
            <lib.Box>
              <lib.Box sx={{ ...styles.firstContainerButton }}>
                <lib.Box sx={{ ...styles.secondContainerButtons }}>
                  <lib.Box sx={{ ...styles.thirdContainerButtons }}>
                    <lib.Button
                      disabled={loading}
                      onClick={() => deleteProduct()}
                      endIcon={
                        loading ? (
                          <lib.CircularProgress
                            size={12}
                            color="inherit"
                          ></lib.CircularProgress>
                        ) : (
                          <lib.CheckCircle></lib.CheckCircle>
                        )
                      }
                      variant="contained"
                      sx={{ ...styles.createButton }}
                    >
                      Si, eliminar
                    </lib.Button>
                    <lib.Button
                      disabled={loading}
                      onClick={() => toggleModal(false)}
                      endIcon={<lib.CloseOutlined></lib.CloseOutlined>}
                      variant="contained"
                      sx={{ ...styles.noCreateButton }}
                    >
                      No, Cancelar
                    </lib.Button>
                  </lib.Box>
                </lib.Box>
              </lib.Box>
            </lib.Box>
          </lib.Box>
        </lib.Box>
      </lib.Modal>
    </div>
  );
}

const styles = {
  main: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "90%", md: "600px" },
    height: { xs: "90%", sm: "200px", md: "150px" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    border: "none",
    borderRadius: "10px",
    overflow: "auto",
  },

  cancelButton: {
    color: "red",
    cursor: "pointer",
  },

  firstContainerHeaderText: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  secondContainerHeaderText: {
    width: "90%",
    lineHeight: "25px",
  },

  firstContainerWarningText: {
    width: "100%",
    height: "70%",
    mt: "30px",
    boxSizing: "borderBox",
    pt: "10px",
  },
  secondContainerWarningText: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
  },

  thirdContainerWarningText: {
    width: "90%",
    height: "100%",
  },

  firstContainerButton: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
  },

  secondContainerButtons: {
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "end",
  },

  thirdContainerButtons: {
    width: "280px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  createButton: {
    bgcolor: "#000",
    textTransform: "none",
  },

  noCreateButton: {
    bgcolor: "transparent",
    textTransform: "none",
    border: "1px solid red",
    color: "red",
    "&:hover": {
      bgcolor: "red",
      textTransform: "none",
      border: "1px solid red",
      color: "white",
    },
  },
};
