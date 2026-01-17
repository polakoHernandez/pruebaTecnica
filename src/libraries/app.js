/**
 * Módulo de librerías compartidas para el enrutamiento y utilidades globales.
 *
 * Centraliza la exportación de componentes relacionados con el routing
 * de la aplicación y herramientas globales como notificaciones (Toaster),
 * facilitando imports más limpios y mantenibles en el proyecto.
 *
 * @module libraries/router
 */
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../Views/Home";
import { Toaster } from "react-hot-toast";

export { Route, BrowserRouter, Routes, Home, Toaster };
