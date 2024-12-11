import { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { InvoiceFormData } from "./types";

export const useInvoiceForm = (
  onCompanyChange: (company: string) => void,
  onUnitChange: (unit: string) => void
) => {
  const { addInvoice, editingInvoice, editInvoice, consumerUnits } = useData();
  const [formData, setFormData] = useState<InvoiceFormData>({
    empresa: "",
    unidade: "",
    mes: format(subMonths(new Date(), 1), "yyyy-MM"),
    consumoForaPonta: "",
    consumoPonta: "",
    demandaMedidaForaPonta: "",
    demandaMedidaPonta: "",
    energiaReativaForaPonta: "",
    energiaReativaPonta: "",
    demandaReativaForaPonta: "",
    demandaReativaPonta: "",
    energiaInjetadaForaPonta: "",
    energiaInjetadaPonta: "",
    saldoAcumulado: "",
    custoConsumoForaPonta: "",
    custoConsumoPonta: "",
    custoDemandaMedidaForaPonta: "",
    custoDemandaMedidaPonta: "",
    custoDemandaIsentaForaPonta: "",
    custoDemandaIsentaPonta: "",
    demandaUltrapassagemForaPonta: "",
    demandaUltrapassagemPonta: "",
    custoEnergiaReativaForaPonta: "",
    custoEnergiaReativaPonta: "",
    custoDemandaReativaForaPonta: "",
    custoDemandaReativaPonta: "",
    custoEnergiaInjetadaForaPonta: "",
    custoEnergiaInjetadaPonta: "",
    multasJuros: "",
    valorFatura: "",
    bandeiraTarifaria: "",
  });

  useEffect(() => {
    if (editingInvoice) {
      setFormData({
        empresa: editingInvoice.empresa,
        unidade: editingInvoice.unidade,
        mes: editingInvoice.mes,
        consumoForaPonta: editingInvoice.consumoForaPonta.toString(),
        consumoPonta: editingInvoice.consumoPonta.toString(),
        demandaMedidaForaPonta: editingInvoice.demandaMedidaForaPonta.toString(),
        demandaMedidaPonta: editingInvoice.demandaMedidaPonta.toString(),
        energiaReativaForaPonta: editingInvoice.energiaReativaForaPonta.toString(),
        energiaReativaPonta: editingInvoice.energiaReativaPonta.toString(),
        demandaReativaForaPonta: editingInvoice.demandaReativaForaPonta.toString(),
        demandaReativaPonta: editingInvoice.demandaReativaPonta.toString(),
        energiaInjetadaForaPonta: editingInvoice.energiaInjetadaForaPonta?.toString() || "",
        energiaInjetadaPonta: editingInvoice.energiaInjetadaPonta?.toString() || "",
        saldoAcumulado: editingInvoice.saldoAcumulado?.toString() || "",
        custoConsumoForaPonta: editingInvoice.custoConsumoForaPonta?.toString() || "",
        custoConsumoPonta: editingInvoice.custoConsumoPonta?.toString() || "",
        custoDemandaMedidaForaPonta: editingInvoice.custoDemandaMedidaForaPonta?.toString() || "",
        custoDemandaMedidaPonta: editingInvoice.custoDemandaMedidaPonta?.toString() || "",
        custoDemandaIsentaForaPonta: editingInvoice.custoDemandaIsentaForaPonta?.toString() || "",
        custoDemandaIsentaPonta: editingInvoice.custoDemandaIsentaPonta?.toString() || "",
        demandaUltrapassagemForaPonta: editingInvoice.demandaUltrapassagemForaPonta.toString(),
        demandaUltrapassagemPonta: editingInvoice.demandaUltrapassagemPonta.toString(),
        custoEnergiaReativaForaPonta: editingInvoice.custoEnergiaReativaForaPonta?.toString() || "",
        custoEnergiaReativaPonta: editingInvoice.custoEnergiaReativaPonta?.toString() || "",
        custoDemandaReativaForaPonta: editingInvoice.custoDemandaReativaForaPonta?.toString() || "",
        custoDemandaReativaPonta: editingInvoice.custoDemandaReativaPonta?.toString() || "",
        custoEnergiaInjetadaForaPonta: editingInvoice.custoEnergiaInjetadaForaPonta?.toString() || "",
        custoEnergiaInjetadaPonta: editingInvoice.custoEnergiaInjetadaPonta?.toString() || "",
        multasJuros: editingInvoice.multasJuros.toString(),
        valorFatura: editingInvoice.valorFatura.toString(),
        bandeiraTarifaria: editingInvoice.bandeiraTarifaria,
      });
    }
  }, [editingInvoice]);

  const validateForm = () => {
    const selectedUnit = consumerUnits.find(unit => unit.nome === formData.unidade);
    const isGreenTariff = selectedUnit?.modalidadeTarifaria === "Verde";
    const isGroupB = selectedUnit?.grupoSubgrupo === "B";

    const requiredFields = [
      'empresa',
      'unidade',
      'mes',
      'consumoForaPonta',
      'valorFatura'
    ];

    // Add fields based on tariff type
    if (!isGroupB && !isGreenTariff) {
      requiredFields.push(
        'consumoPonta',
        'demandaMedidaForaPonta',
        'demandaMedidaPonta'
      );
    }

    if (!isGroupB && isGreenTariff) {
      requiredFields.push(
        'consumoPonta',
        'demandaMedidaForaPonta'
      );
    }

    return requiredFields.every(field => formData[field as keyof InvoiceFormData] !== "");
  };

  const handleSubmit = () => {
    const invoiceData = {
      empresa: formData.empresa,
      unidade: formData.unidade,
      mes: formData.mes,
      consumoForaPonta: Number(formData.consumoForaPonta),
      consumoPonta: Number(formData.consumoPonta),
      demandaMedidaForaPonta: Number(formData.demandaMedidaForaPonta),
      demandaMedidaPonta: Number(formData.demandaMedidaPonta),
      energiaReativaForaPonta: Number(formData.energiaReativaForaPonta),
      energiaReativaPonta: Number(formData.energiaReativaPonta),
      demandaReativaForaPonta: Number(formData.demandaReativaForaPonta),
      demandaReativaPonta: Number(formData.demandaReativaPonta),
      energiaInjetadaForaPonta: Number(formData.energiaInjetadaForaPonta),
      energiaInjetadaPonta: Number(formData.energiaInjetadaPonta),
      saldoAcumulado: Number(formData.saldoAcumulado),
      custoConsumoForaPonta: Number(formData.custoConsumoForaPonta),
      custoConsumoPonta: Number(formData.custoConsumoPonta),
      custoDemandaMedidaForaPonta: Number(formData.custoDemandaMedidaForaPonta),
      custoDemandaMedidaPonta: Number(formData.custoDemandaMedidaPonta),
      custoDemandaIsentaForaPonta: Number(formData.custoDemandaIsentaForaPonta),
      custoDemandaIsentaPonta: Number(formData.custoDemandaIsentaPonta),
      demandaUltrapassagemForaPonta: Number(formData.demandaUltrapassagemForaPonta),
      demandaUltrapassagemPonta: Number(formData.demandaUltrapassagemPonta),
      custoEnergiaReativaForaPonta: Number(formData.custoEnergiaReativaForaPonta),
      custoEnergiaReativaPonta: Number(formData.custoEnergiaReativaPonta),
      custoDemandaReativaForaPonta: Number(formData.custoDemandaReativaForaPonta),
      custoDemandaReativaPonta: Number(formData.custoDemandaReativaPonta),
      custoEnergiaInjetadaForaPonta: Number(formData.custoEnergiaInjetadaForaPonta),
      custoEnergiaInjetadaPonta: Number(formData.custoEnergiaInjetadaPonta),
      multasJuros: Number(formData.multasJuros),
      valorFatura: Number(formData.valorFatura),
      bandeiraTarifaria: formData.bandeiraTarifaria,
    };

    if (!editingInvoice) {
      addInvoice(invoiceData);
      toast.success("Fatura cadastrada com sucesso!");
    } else {
      editInvoice(editingInvoice.id, invoiceData);
      toast.success("Fatura atualizada com sucesso!");
    }

    setFormData({
      empresa: "",
      unidade: "",
      mes: format(subMonths(new Date(), 1), "yyyy-MM"),
      consumoForaPonta: "",
      consumoPonta: "",
      demandaMedidaForaPonta: "",
      demandaMedidaPonta: "",
      energiaReativaForaPonta: "",
      energiaReativaPonta: "",
      demandaReativaForaPonta: "",
      demandaReativaPonta: "",
      energiaInjetadaForaPonta: "",
      energiaInjetadaPonta: "",
      saldoAcumulado: "",
      custoConsumoForaPonta: "",
      custoConsumoPonta: "",
      custoDemandaMedidaForaPonta: "",
      custoDemandaMedidaPonta: "",
      custoDemandaIsentaForaPonta: "",
      custoDemandaIsentaPonta: "",
      demandaUltrapassagemForaPonta: "",
      demandaUltrapassagemPonta: "",
      custoEnergiaReativaForaPonta: "",
      custoEnergiaReativaPonta: "",
      custoDemandaReativaForaPonta: "",
      custoDemandaReativaPonta: "",
      custoEnergiaInjetadaForaPonta: "",
      custoEnergiaInjetadaPonta: "",
      multasJuros: "",
      valorFatura: "",
      bandeiraTarifaria: "",
    });
  };

  return { formData, setFormData, handleSubmit, validateForm };
};