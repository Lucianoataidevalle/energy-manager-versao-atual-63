import { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { InvoiceFormData } from "./types";
import { parseFormattedNumber } from "@/utils/numberFormat";

export const useInvoiceForm = (
  onCompanyChange: (company: string) => void,
  onUnitChange: (unit: string) => void
) => {
  const { addInvoice, editInvoice, editingInvoice, consumerUnits } = useData();
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
    geracaoTotal: "",
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
        geracaoTotal: editingInvoice.geracaoTotal?.toString() || "",
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

  const handleSubmit = async () => {
    try {
      const invoiceData = {
        empresa: formData.empresa,
        unidade: formData.unidade,
        mes: formData.mes,
        consumoForaPonta: parseFormattedNumber(formData.consumoForaPonta),
        consumoPonta: parseFormattedNumber(formData.consumoPonta),
        demandaMedidaForaPonta: parseFormattedNumber(formData.demandaMedidaForaPonta),
        demandaMedidaPonta: parseFormattedNumber(formData.demandaMedidaPonta),
        energiaReativaForaPonta: parseFormattedNumber(formData.energiaReativaForaPonta),
        energiaReativaPonta: parseFormattedNumber(formData.energiaReativaPonta),
        demandaReativaForaPonta: parseFormattedNumber(formData.demandaReativaForaPonta),
        demandaReativaPonta: parseFormattedNumber(formData.demandaReativaPonta),
        energiaInjetadaForaPonta: parseFormattedNumber(formData.energiaInjetadaForaPonta),
        energiaInjetadaPonta: parseFormattedNumber(formData.energiaInjetadaPonta),
        saldoAcumulado: parseFormattedNumber(formData.saldoAcumulado),
        geracaoTotal: parseFormattedNumber(formData.geracaoTotal),
        custoConsumoForaPonta: parseFormattedNumber(formData.custoConsumoForaPonta),
        custoConsumoPonta: parseFormattedNumber(formData.custoConsumoPonta),
        custoDemandaMedidaForaPonta: parseFormattedNumber(formData.custoDemandaMedidaForaPonta),
        custoDemandaMedidaPonta: parseFormattedNumber(formData.custoDemandaMedidaPonta),
        custoDemandaIsentaForaPonta: parseFormattedNumber(formData.custoDemandaIsentaForaPonta),
        custoDemandaIsentaPonta: parseFormattedNumber(formData.custoDemandaIsentaPonta),
        demandaUltrapassagemForaPonta: parseFormattedNumber(formData.demandaUltrapassagemForaPonta),
        demandaUltrapassagemPonta: parseFormattedNumber(formData.demandaUltrapassagemPonta),
        custoEnergiaReativaForaPonta: parseFormattedNumber(formData.custoEnergiaReativaForaPonta),
        custoEnergiaReativaPonta: parseFormattedNumber(formData.custoEnergiaReativaPonta),
        custoDemandaReativaForaPonta: parseFormattedNumber(formData.custoDemandaReativaForaPonta),
        custoDemandaReativaPonta: parseFormattedNumber(formData.custoDemandaReativaPonta),
        custoEnergiaInjetadaForaPonta: parseFormattedNumber(formData.custoEnergiaInjetadaForaPonta),
        custoEnergiaInjetadaPonta: parseFormattedNumber(formData.custoEnergiaInjetadaPonta),
        multasJuros: parseFormattedNumber(formData.multasJuros),
        valorFatura: parseFormattedNumber(formData.valorFatura),
        bandeiraTarifaria: formData.bandeiraTarifaria,
      };

      if (!editingInvoice) {
        await addInvoice(invoiceData);
        toast.success("Fatura cadastrada com sucesso!");
      } else {
        await editInvoice(editingInvoice.id, invoiceData);
        toast.success("Fatura atualizada com sucesso!");
      }

      // Reset form after successful submission
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
        geracaoTotal: "",
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
    } catch (error) {
      if (error instanceof Error && error.message === "Já existe uma fatura cadastrada para este mês") {
        toast.error("Já existe uma fatura cadastrada para este mês e unidade");
      } else {
        console.error('Error submitting invoice:', error);
        toast.error("Erro ao salvar a fatura");
      }
    }
  };

  return { formData, setFormData, handleSubmit, validateForm };
};