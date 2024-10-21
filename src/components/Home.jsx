// src/App.js
import React, { useState } from "react";
import ListarUsuarios from "./ListarUsuarios";
import FormularioUsuarios from "./FormularioUsuarios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const navigate = useNavigate();

  const handleAccessUsers = () => {
    navigate("/login");
  };

  const handleAgregar = () => {
    setUsuarioSeleccionado(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarFormulario(true);
  };

  const handleGuardar = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="Home">
      <div>
        <button className="btn btn-primary" onClick={handleAccessUsers}>
          Iniciar sesión
        </button>
      </div>
      {mostrarFormulario ? (
        <FormularioUsuarios
          usuarioSeleccionado={usuarioSeleccionado}
          onGuardar={handleGuardar}
        />
      ) : (
        <ListarUsuarios
          onEdit={handleEditar}
          onAdd={handleAgregar}
        />
      )}
    </div>
  );
};
