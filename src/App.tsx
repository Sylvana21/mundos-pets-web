import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Paquetes from "./pages/Paquetes";
import Ubicacion from "./pages/Ubicacion";
import Nosotros from "./pages/Nosotros";
import Agendar from "./pages/Agendar";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/paquetes" element={<Paquetes />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
