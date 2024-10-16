import React, { useState, useEffect } from "react";
import axios from "axios";
import './ListarUsuarios.css';  // Puedes añadir estilos personalizados aquí si es necesario.

const ListarUsuarios = ({ onEdit, onAdd }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error(error));
  }, []);

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(() => setUsuarios(usuarios.filter(user => user.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <div className="text-end mb-3">
        <button className="btn btn-primary" onClick={onAdd}>
          Agregar Nuevo Usuario
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(usuario)}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
 