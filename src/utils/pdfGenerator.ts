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
  // Hide elements that shouldn't appear in the PDF
  const sidebar = document.querySelector('.md\\:fixed');
  const mobileSidebar = document.querySelector('.md\\:hidden');
  const editButtons = document.querySelectorAll('[data-print-hide="true"]');
  
  if (sidebar) {
    (sidebar as HTMLElement).style.display = 'none';
  }
  if (mobileSidebar) {
    (mobileSidebar as HTMLElement).style.display = 'none';
  }
  editButtons.forEach(button => {
    (button as HTMLElement).style.display = 'none';
  });

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

    // Add consumer identification page
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.setTextColor(44, 62, 80);
    pdf.text('1. Identificação do Consumidor', margins, 20);
    
    let currentYPosition = 35;
    
    if (companyData && unitData) {
      pdf.setFontSize(11);
      pdf.setTextColor(52, 73, 94);

      // Company Information Section
      pdf.setFillColor(236, 240, 241);
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

      // Capture and add summary cards
      const summarySection = document.querySelector('.dashboard-summary');
      if (summarySection) {
        const summaryCanvas = await html2canvas(summarySection as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const summaryImgData = summaryCanvas.toDataURL('image/png');
        const summaryAspectRatio = summaryCanvas.width / summaryCanvas.height;
        const summaryWidth = contentWidth;
        const summaryHeight = summaryWidth / summaryAspectRatio;
        
        currentYPosition += 20;
        pdf.addImage(summaryImgData, 'PNG', margins, currentYPosition, summaryWidth, summaryHeight);
      }
    }

    // Capture and add each chart section
    const chartSections = document.querySelectorAll('.chart-section');
    let lastChartSection: HTMLElement | null = null;

    for (const section of chartSections) {
      pdf.addPage();
      const chartCanvas = await html2canvas(section as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartAspectRatio = chartCanvas.width / chartCanvas.height;
      const chartWidth = contentWidth;
      const chartHeight = chartWidth / chartAspectRatio;
      
      pdf.addImage(chartImgData, 'PNG', margins, margins, chartWidth, chartHeight);

      // Keep track of the last chart section (Multas/Juros)
      if (section.textContent?.includes('Multas/Juros')) {
        lastChartSection = section as HTMLElement;
      }
    }

    // Add final considerations to the Multas/Juros page
    if (lastChartSection) {
      const finalConsiderationsSection = document.querySelector('.final-considerations');
      if (finalConsiderationsSection) {
        const considerationsCanvas = await html2canvas(finalConsiderationsSection as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const considerationsImgData = considerationsCanvas.toDataURL('image/png');
        const considerationsAspectRatio = considerationsCanvas.width / considerationsCanvas.height;
        const considerationsWidth = contentWidth;
        const considerationsHeight = considerationsWidth / considerationsAspectRatio;
        
        pdf.addImage(considerationsImgData, 'PNG', margins, pageHeight - considerationsHeight - margins, considerationsWidth, considerationsHeight);
      }
    }

    // Save the PDF
    const filename = `Relatório_${selectedCompany}_${selectedUnit}_${formattedMonth}.pdf`;
    pdf.save(filename);

    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Restore visibility of hidden elements
    if (sidebar) {
      (sidebar as HTMLElement).style.display = 'flex';
    }
    if (mobileSidebar) {
      (mobileSidebar as HTMLElement).style.display = 'block';
    }
    editButtons.forEach(button => {
      (button as HTMLElement).style.display = 'block';
    });
  }
};
