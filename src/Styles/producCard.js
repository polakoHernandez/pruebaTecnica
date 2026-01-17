const styles = {
  mainContainer: {
    width: 250,
    height: 400,
    borderRadius: 3,
    overflow: "hidden",
    bgcolor: "#fff",
    cursor: "pointer",

    // ✨ animación al aparecer
    animation: "fadeUp 0.6s ease",

    // 🖱️ hover effect
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      "& img": {
        transform: "scale(1.08)",
      },
    },

    "@keyframes fadeUp": {
      from: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },

  firstContainerImage: {
    height: "58%",
    overflow: "hidden",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.4s ease",
    },
  },

  firstContainerTitle: {
    px: 2,
    py: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "0.95rem",
    fontWeight: 600,
    lineHeight: 1.2,
  },

  favButton: {
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.2)",
      color: "error.main",
    },
  },

  firstContainerSlug: {
    px: 2,
  },

  firstContainerRaiting: {
    px: 2,
    py: 0.5,
  },

  firstContainerPrice: {
    px: 2,
    mt: "auto",
  },

  price: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "primary.main",
  },
};

export { styles };
