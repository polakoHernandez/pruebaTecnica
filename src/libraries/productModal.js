/**
 * Módulo de librerías compartidas para el componente ProductModal.
 *
 * Centraliza la exportación de componentes de Material UI,
 * hooks de React, iconos y utilidades de notificaciones
 * utilizados dentro del modal de creación y edición de productos.
 *
 * Este archivo implementa el patrón *barrel* para simplificar
 * los imports y mantener una estructura de proyecto limpia.
 *
 * @module libraries/productModal
 */
import {
  Modal,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Cancel, CheckCircle, CloseOutlined, Close } from "@mui/icons-material";
import toast from "react-hot-toast";
export {
  Modal,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  useState,
  Cancel,
  CheckCircle,
  CloseOutlined,
  IconButton,
  Close,
  MenuItem,
  toast,
  CircularProgress,
};
