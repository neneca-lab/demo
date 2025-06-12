import Dashboard from "./components/Dashboard";
import Login from "../src/pages/Login";
import RecuperarSenha from "../src/pages/RecuperarSenha";
import UserPage from "../src/pages/UserPage";
import PrivateRoute from "../src/components/PrivateRoute";
import {  Routes, Route, Navigate } from "react-router-dom";
import ResetPassword from "../src/pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/produtos"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/reset" element={<ResetPassword />} />
      
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;