/**
 * Módulo de librerías compartidas para la vista de productos.
 *
 * Centraliza la exportación de componentes de Material UI,
 * hooks de React, iconos, utilidades de notificaciones y
 * componentes propios usados en las vistas de la aplicación.
 *
 * Este archivo sigue el patrón *barrel* para simplificar
 * los imports y mejorar la mantenibilidad del código.
 *
 * @module libraries/products
 */
import {
  Box,
  Grid,
  CircularProgress,
  Pagination,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { SearchOutlined, CancelOutlined, Add } from "@mui/icons-material";
import toast from "react-hot-toast";
import ProdcutModal from "../Components/ProductModal";
export {
  Box,
  useEffect,
  ProductCard,
  useState,
  Grid,
  CircularProgress,
  Pagination,
  TextField,
  Button,
  SearchOutlined,
  toast,
  InputAdornment,
  CancelOutlined,
  Typography,
  Add,
  ProdcutModal,
};
