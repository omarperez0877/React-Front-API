import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import FormularioUsuarios from "./components/FormularioUsuarios";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios/agregar" element={<FormularioUsuarios />} />
        

      </Routes>
    </Router>
  );
};