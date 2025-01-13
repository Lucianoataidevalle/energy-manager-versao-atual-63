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
    pdf.text('1. Identificação do Consumidor', margins, 20);
    
    let currentYPosition = 30;
    
    if (companyData && unitData) {
      pdf.setFontSize(12);
      const identificationText = [
        '1.1. Razão Social (sede): ' + companyData.razaoSocial,
        '1.2. CNPJ: ' + companyData.cnpj,
        '1.3. Município-Estado: ' + companyData.endereco,
        '1.4. Identificação da UC:',
        '    1.4.1. Nome da UC: ' + unitData.nome,
        '    1.4.2. Endereço: ' + unitData.endereco,
        '    1.4.3. Distribuidora: ' + unitData.distribuidora,
        '    1.4.4. Nº da UC: ' + unitData.numero,
        '    1.4.5. Subgrupo - Modalidade Tarifária: ' + unitData.grupoSubgrupo + ' - ' + unitData.modalidadeTarifaria,
        '    1.4.6. Demanda Contratada: ' + unitData.demandaContratada + ' kW'
      ];

      identificationText.forEach(text => {
        pdf.text(text, margins, currentYPosition);
        currentYPosition += 8;
      });
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
      
      const summaryImgData = summaryCanvas.toDataURL('image/png');
      const summaryAspectRatio = summaryCanvas.width / summaryCanvas.height;
      const summaryWidth = pageWidth - 2 * margins;
      const summaryHeight = summaryWidth / summaryAspectRatio;
      
      pdf.addImage(summaryImgData, 'PNG', margins, currentYPosition + 10, summaryWidth, summaryHeight);
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