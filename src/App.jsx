// src/App.js
import React, { useState } from "react";
import ListarUsuarios from "./components/ListarUsuarios";
import FormularioUsuarios from "./components/FormularioUsuarios";

export const App = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

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
    <div className="App">
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
