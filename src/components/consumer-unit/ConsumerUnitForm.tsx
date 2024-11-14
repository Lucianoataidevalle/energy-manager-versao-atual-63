import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

const ConsumerUnitForm = () => {
  const { addConsumerUnit, editingConsumerUnit, editConsumerUnit } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    numero: "",
    endereco: "",
    demandaContratada: "",
    demandaContratadaPonta: "",
    demandaContratadaForaPonta: "",
    distribuidora: "",
    grupoSubgrupo: "",
    modalidadeTarifaria: "",
  });

  useEffect(() => {
    if (editingConsumerUnit) {
      setFormData({
        empresa: editingConsumerUnit.empresa,
        nome: editingConsumerUnit.nome,
        numero: editingConsumerUnit.numero,
        endereco: editingConsumerUnit.endereco,
        demandaContratada: editingConsumerUnit.demandaContratada,
        demandaContratadaPonta: editingConsumerUnit.demandaContratadaPonta,
        demandaContratadaForaPonta: editingConsumerUnit.demandaContratadaForaPonta,
        distribuidora: editingConsumerUnit.distribuidora,
        grupoSubgrupo: editingConsumerUnit.grupoSubgrupo,
        modalidadeTarifaria: editingConsumerUnit.modalidadeTarifaria,
      });
    }
  }, [editingConsumerUnit]);

  const handleSubmit = () => {
    if (!editingConsumerUnit) {
      addConsumerUnit(formData);
      toast.success("Unidade consumidora cadastrada com sucesso!");
    } else {
      editConsumerUnit(editingConsumerUnit.id, formData);
      toast.success("Unidade consumidora atualizada com sucesso!");
    }

    setFormData({
      empresa: "",
      nome: "",
      numero: "",
      endereco: "",
      demandaContratada: "",
      demandaContratadaPonta: "",
      demandaContratadaForaPonta: "",
      distribuidora: "",
      grupoSubgrupo: "",
      modalidadeTarifaria: "",
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {/* Form fields for Consumer Unit */}
      <div>
        <label>Empresa</label>
        <input
          type="text"
          value={formData.empresa}
          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Número</label>
        <input
          type="text"
          value={formData.numero}
          onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Endereço</label>
        <input
          type="text"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Demanda Contratada</label>
        <input
          type="text"
          value={formData.demandaContratada}
          onChange={(e) => setFormData({ ...formData, demandaContratada: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Demanda Contratada Ponta</label>
        <input
          type="text"
          value={formData.demandaContratadaPonta}
          onChange={(e) => setFormData({ ...formData, demandaContratadaPonta: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Demanda Contratada Fora Ponta</label>
        <input
          type="text"
          value={formData.demandaContratadaForaPonta}
          onChange={(e) => setFormData({ ...formData, demandaContratadaForaPonta: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Distribuidora</label>
        <input
          type="text"
          value={formData.distribuidora}
          onChange={(e) => setFormData({ ...formData, distribuidora: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Grupo/Subgrupo</label>
        <input
          type="text"
          value={formData.grupoSubgrupo}
          onChange={(e) => setFormData({ ...formData, grupoSubgrupo: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Modalidade Tarifária</label>
        <input
          type="text"
          value={formData.modalidadeTarifaria}
          onChange={(e) => setFormData({ ...formData, modalidadeTarifaria: e.target.value })}
          required
        />
      </div>
      <button type="submit">
        {editingConsumerUnit ? "Atualizar Unidade" : "Cadastrar Unidade"}
      </button>
    </form>
  );
};

export default ConsumerUnitForm;
