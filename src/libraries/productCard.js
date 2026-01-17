/**
 * Módulo de librerías compartidas para el componente ProductCard.
 *
 * Centraliza la exportación de componentes de Material UI,
 * iconos, hooks de React y componentes propios utilizados
 * en la tarjeta de producto.
 *
 * Este archivo sigue el patrón *barrel* para simplificar
 * los imports y mantener el código más limpio y ordenado.
 *
 * @module libraries/productCard
 */
import { Box, Typography, IconButton, Rating } from "@mui/material";
import { FavoriteBorderOutlined, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import ProductModal from "../Components/ProductModal";
import DeleteProductModal from "../Components/DeleteProductModal";

export {
  Box,
  Typography,
  IconButton,
  Rating,
  FavoriteBorderOutlined,
  Edit,
  Delete,
  useState,
  ProductModal,
  DeleteProductModal,
};
