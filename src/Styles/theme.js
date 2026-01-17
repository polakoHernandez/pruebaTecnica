import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#999",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666",
          },
        },
        input: {
          padding: "12px 14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#555",
          fontSize: "14px",
          "&.Mui-focused": {
            color: "#333",
          },
        },
      },
    },

    // 🎯 Estilos globales para el DataGrid
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            minHeight: "65px !important",
            maxHeight: "65px !important",
            height: "65px !important",
          },
          "& .MuiDataGrid-columnHeader": {
            minHeight: "55px !important",
            maxHeight: "55px !important",
            height: "55px !important",
            lineHeight: "55px !important",
            padding: "0px",
          },
          "& .custom-header": {
            backgroundColor: "#dfdfdf",
            color: "#747374",
          },
          "& .even-row": {
            backgroundColor: "white",
          },
          "& .odd-row": {
            backgroundColor: "rgb(197, 227, 239)",
          },
          "& .MuiDataGrid-cell": {
            borderLeft: "0.5px solid black",
          },
          "& .disabled-row": {
            pointerEvents: "none",
            backgroundColor: "rgb(0, 255, 0)",
          },
          "& .MuiDataGrid-cell": {
            borderLeft: "none", // 👈 Elimina la línea vertical entre celdas
          },
        },
      },
    },
  },
});
