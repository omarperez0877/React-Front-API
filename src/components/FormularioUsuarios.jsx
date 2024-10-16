// src/components/FormularioUsuarios.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const FormularioUsuarios = ({ usuarioSeleccionado, onGuardar }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Estado para manejar errores

  useEffect(() => {
    if (usuarioSeleccionado) {
      setFormData({
        id: usuarioSeleccionado.id,
        name: usuarioSeleccionado.name,
        email: usuarioSeleccionado.email,
        password: "", // Mantener campo de contraseña vacío al editar
      });
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        password: "",
      });
    }
  }, [usuarioSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar errores al cambiar el valor
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email

    if (!formData.name) {
      formErrors.name = "El nombre es obligatorio.";
    }

    if (!formData.email) {
      formErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "El email no tiene un formato válido.";
    }

    // Validar contraseña solo si se está creando un nuevo usuario
    if (!usuarioSeleccionado && !formData.password) { // Solo validar si no es un usuario existente
      formErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password && formData.password.length < 8) {
      formErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Retornar true si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // No enviar el formulario si hay errores
    }

    // Crear un objeto de datos a enviar a la API
    const { id, name, email, password } = formData;
    const dataToSend = {
      name,
      email,
      // Enviar la contraseña solo si se proporciona un nuevo valor
      password: password || undefined,
    };

    const request = id
      ? axios.put(`http://localhost:8000/api/users/${id}`, dataToSend) // Actualizar usuario
      : axios.post("http://localhost:8000/api/users", dataToSend); // Crear nuevo usuario

    request
      .then(() => {
        onGuardar(); // Actualizar lista de usuarios
        setFormData({ id: "", name: "", email: "", password: "" }); // Limpiar formulario
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error);
        alert("Hubo un error al guardar el usuario. Verifica los datos.");
      });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {usuarioSeleccionado ? "Actualizar Usuario" : "Crear Nuevo Usuario"}
            </h5>
            <button type="button" className="btn-close" onClick={onGuardar}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`} // Añadir clase de error
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Mensaje de error */}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`} // Añadir clase de error
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>} {/* Mensaje de error */}
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} // Añadir clase de error
                  name="password"
                  value={formData.password} // Aquí mantenemos la contraseña
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>} {/* Mensaje de error */}
              </div>
              <button type="submit" className="btn btn-success w-100">
                {usuarioSeleccionado ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuarios;
