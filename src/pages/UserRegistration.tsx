import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import UserForm from "@/components/user/UserForm";
import UserList from "@/components/user/UserList";

const UserRegistration = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">Cadastro de Usuário</h1>
        <UserForm />
        <UserList />
      </div>
    </div>
  );
};

export default UserRegistration;