import Navbar from "./components/navbar/Navbar";
import { Conteiner } from "./components/ui/Conteiner";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import { TareasProvider } from "./context/TareasContext";

import { Routes, Route, Outlet } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TareasPage from "./pages/TareasPage";
import TareasFormPage from "./pages/TareasFormPage";
import NotFound from "./pages/NotFound";


function App() {

  const {isAuth, loading} = useAuth();


if(loading){
    return <h1>Cargando...</h1>
}

  return (
    <>
    <Navbar/>
    <Conteiner className="py-5">
    <Routes>
    <Route element= {<ProtectedRoute isAllowed={!isAuth} redirectTo="tareas" />}>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    </Route>
    <Route element= {<ProtectedRoute isAllowed={isAuth} redirectTo="/login"/>}>
      <Route path="/perfil" element={<ProfilePage/>} />

      <Route element={<TareasProvider> 
          <Outlet/>
      </TareasProvider>}>

        <Route path="/tareas" element={<TareasPage/>} />
        <Route path="/tareas/crear" element={<TareasFormPage/>} />
        <Route path="/tareas/:id/editar" element={<TareasFormPage/>} />
      </Route>

    </Route>
    <Route path="*" element={NotFound} />

    </Routes>
    </Conteiner>
    </>
  )
}

export default App