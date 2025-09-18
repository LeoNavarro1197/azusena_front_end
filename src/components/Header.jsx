import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/imagenes/logo-sena.svg";

export default function Header() {
  return (
    <div
      id="header"
      className="flex justify-between items-center p-6 bg-gray-800 w-full mx-auto"
    >
      <div className="flex items-center">
        <Logo />
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:text-gray-400">
          Inicio
        </Link>
        <Link to="/help" className="hover:text-gray-400">
          Ayuda
        </Link>
        <Link to="/contact" className="hover:text-gray-400">
          Contacto
        </Link>
      </nav>
    </div>
  );
}
