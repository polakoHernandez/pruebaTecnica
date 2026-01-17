const styles = {
  main: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "90%", md: "400px" },
    height: { xs: "90%", sm: "90%", md: "600px" },
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
  },

  firstContainerButton: {
    display: "flex",
    justifyContent: "center",
  },

  secondContainerButtons: {
    width: "90%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },

  thirdContainerButtons: {
    width: "260px",
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

export { styles };
