import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { users } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = users.find(u => u.email === email);
    
    if (user || (email === "admin" && password === "admin")) {
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
      });
      navigate("/dashboard");
    } else {
      toast.error("Credenciais inválidas!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="flex items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-center">Sistema de Gestão de Energia</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">E-mail</label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Senha</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;