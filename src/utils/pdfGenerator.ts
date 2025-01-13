import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Company, ConsumerUnit } from '@/contexts/types';

export const generatePDF = async (
  selectedCompany: string,
  selectedUnit: string,
  selectedMonth: string,
  companyData: Company | undefined,
  unitData: ConsumerUnit | undefined,
) => {
  // Hide sidebar before capturing
  const sidebar = document.querySelector('.md\\:fixed');
  const mobileSidebar = document.querySelector('.md\\:hidden');
  
  if (sidebar) {
    (sidebar as HTMLElement).style.display = 'none';
  }
  if (mobileSidebar) {
    (mobileSidebar as HTMLElement).style.display = 'none';
  }

  try {
    const content = document.querySelector('#report-content');
    if (!content) {
      console.error('Report content not found');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margins = 10;
    const contentWidth = pageWidth - (2 * margins);

    // Add cover page
    const formattedMonth = format(new Date(selectedMonth), "MMMM 'de' yyyy", { locale: ptBR });
    pdf.setFontSize(24);
    pdf.text('Relatório de Gestão de Energia', pageWidth / 2, pageHeight / 3, { align: 'center' });
    pdf.setFontSize(16);
    pdf.text(selectedCompany, pageWidth / 2, pageHeight / 2, { align: 'center' });
    pdf.text(formattedMonth, pageWidth / 2, (pageHeight / 2) + 10, { align: 'center' });

    // Add consumer identification page with modern layout
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.setTextColor(44, 62, 80); // Dark blue color for headers
    pdf.text('1. Identificação do Consumidor', margins, 20);
    
    let currentYPosition = 35;
    
    if (companyData && unitData) {
      pdf.setFontSize(11);
      pdf.setTextColor(52, 73, 94); // Slightly lighter blue for content

      // Company Information Section
      pdf.setFillColor(236, 240, 241); // Light gray background
      pdf.rect(margins, currentYPosition - 5, contentWidth, 30, 'F');
      
      pdf.text('Informações da Empresa', margins + 2, currentYPosition);
      currentYPosition += 8;
      pdf.text(`Razão Social: ${companyData.razaoSocial}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`CNPJ: ${companyData.cnpj}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Endereço: ${companyData.endereco}`, margins + 5, currentYPosition);
      
      currentYPosition += 15;

      // Consumer Unit Information Section
      pdf.setFillColor(236, 240, 241);
      pdf.rect(margins, currentYPosition - 5, contentWidth, 45, 'F');
      
      pdf.text('Informações da Unidade Consumidora', margins + 2, currentYPosition);
      currentYPosition += 8;
      pdf.text(`Nome da UC: ${unitData.nome}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Endereço: ${unitData.endereco}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Distribuidora: ${unitData.distribuidora}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Nº da UC: ${unitData.numero}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Subgrupo - Modalidade Tarifária: ${unitData.grupoSubgrupo} - ${unitData.modalidadeTarifaria}`, margins + 5, currentYPosition);
      currentYPosition += 6;
      pdf.text(`Demanda Contratada: ${unitData.demandaContratada} kW`, margins + 5, currentYPosition);
    }

    // Capture summary cards
    const summarySection = document.querySelector('.dashboard-summary');
    if (summarySection) {
      const summaryCanvas = await html2canvas(summarySection as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      pdf.addPage();
      const summaryImgData = summaryCanvas.toDataURL('image/png');
      const summaryAspectRatio = summaryCanvas.width / summaryCanvas.height;
      const summaryWidth = pageWidth - 2 * margins;
      const summaryHeight = summaryWidth / summaryAspectRatio;
      
      pdf.addImage(summaryImgData, 'PNG', margins, margins, summaryWidth, summaryHeight);
    }

    // Capture each chart section separately
    const chartSections = document.querySelectorAll('.chart-section');
    for (const section of chartSections) {
      pdf.addPage();
      const chartCanvas = await html2canvas(section as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      });
      
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartAspectRatio = chartCanvas.width / chartCanvas.height;
      const chartWidth = pageWidth - 2 * margins;
      const chartHeight = chartWidth / chartAspectRatio;
      
      pdf.addImage(chartImgData, 'PNG', margins, margins, chartWidth, chartHeight);
    }

    // Save the PDF
    const filename = `Relatório_${selectedCompany}_${selectedUnit}_${formattedMonth}.pdf`;
    pdf.save(filename);

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Restore sidebar visibility
    if (sidebar) {
      (sidebar as HTMLElement).style.display = 'flex';
    }
    if (mobileSidebar) {
      (mobileSidebar as HTMLElement).style.display = 'block';
    }
  }
};