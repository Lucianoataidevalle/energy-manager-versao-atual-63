import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import { User } from "./types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { users } = useData();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(!!parsedUser.isAdmin);
      console.log("Loaded stored user:", parsedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Login attempt for:", email);
    console.log("Available users:", users);

    // Special case for admin
    if (email === "admin" && password === "admin") {
      const adminUser: User = {
        id: "admin",
        email: "admin",
        nome: "Administrador",
        fone: "",
        empresas: [],
        unidadesConsumidoras: [], // Added missing property
        isAdmin: true,
        isSuperUser: true, // Added as super user
        empresaRepresentada: { // Added missing property
          nome: "",
          cnpj: "",
          endereco: ""
        }
      };
      console.log("Admin login successful");
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }

    // Regular user login
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      console.log("User found:", foundUser);
      setUser(foundUser);
      setIsAdmin(!!foundUser.isAdmin);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    
    console.log("Login failed: Invalid credentials");
    toast.error("Credenciais inválidas!");
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};