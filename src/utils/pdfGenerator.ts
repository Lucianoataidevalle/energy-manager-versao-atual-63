import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '@/contexts/DataContext';

export const generatePDF = async (company: string, unit: string, month: string) => {
  const { companies, consumerUnits } = useData();
  
  // Hide sidebar before capturing
  const sidebar = document.querySelector('.md\\:fixed');
  const mobileSidebar = document.querySelector('.md\\:hidden');
  
  if (sidebar) {
    (sidebar as HTMLElement).style.display = 'none';
  }
  if (mobileSidebar) {
    (mobileSidebar as HTMLElement).style.display = 'none';
  }

  const content = document.querySelector('#report-content');
  if (!content) {
    if (sidebar) {
      (sidebar as HTMLElement).style.display = 'flex';
    }
    if (mobileSidebar) {
      (mobileSidebar as HTMLElement).style.display = 'block';
    }
    return;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margins = 10;

  const canvasOptions = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    foreignObjectRendering: false,
    removeContainer: true,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    onclone: (clonedDoc: Document) => {
      const images = clonedDoc.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.crossOrigin = 'anonymous';
        if (img.src.startsWith('https://')) {
          img.src = img.src.replace(/^https:\/\/[^/]+/, '');
        }
      }
    }
  };

  // Add cover page
  const formattedMonth = format(new Date(month), "MMMM 'de' yyyy", { locale: ptBR });
  pdf.setFontSize(24);
  pdf.text('Relatório de Gestão de Energia', pageWidth / 2, pageHeight / 3, { align: 'center' });
  pdf.setFontSize(16);
  pdf.text(company, pageWidth / 2, pageHeight / 2, { align: 'center' });
  pdf.text(formattedMonth, pageWidth / 2, (pageHeight / 2) + 10, { align: 'center' });

  // Add consumer identification page
  pdf.addPage();
  pdf.setFontSize(14);
  pdf.text('1. Identificação do Consumidor', margins, 20);
  
  const companyData = companies.find(c => c.razaoSocial === company);
  const unitData = consumerUnits.find(u => u.nome === unit && u.empresa === company);
  
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

    let yPosition = 30;
    identificationText.forEach(text => {
      pdf.text(text, margins, yPosition);
      yPosition += 8;
    });
  }

  // Capture summary cards
  const summarySection = document.querySelector('.dashboard-summary');
  if (summarySection) {
    const summaryCanvas = await html2canvas(summarySection as HTMLElement, canvasOptions);
    const summaryImgData = summaryCanvas.toDataURL('image/png');
    const summaryAspectRatio = summaryCanvas.width / summaryCanvas.height;
    const summaryWidth = pageWidth - 2 * margins;
    const summaryHeight = summaryWidth / summaryAspectRatio;
    pdf.addImage(summaryImgData, 'PNG', margins, yPosition + 10, summaryWidth, summaryHeight);
  }

  // Capture each chart section separately
  const chartSections = document.querySelectorAll('.chart-section');
  for (const section of chartSections) {
    pdf.addPage();
    const chartCanvas = await html2canvas(section as HTMLElement, canvasOptions);
    const chartImgData = chartCanvas.toDataURL('image/png');
    const chartAspectRatio = chartCanvas.width / chartCanvas.height;
    const chartWidth = pageWidth - 2 * margins;
    const chartHeight = chartWidth / chartAspectRatio;
    pdf.addImage(chartImgData, 'PNG', margins, margins, chartWidth, chartHeight);
  }

  // Capture final considerations
  const finalConsiderations = document.querySelector('.final-considerations');
  if (finalConsiderations) {
    pdf.addPage();
    const considerationsCanvas = await html2canvas(finalConsiderations as HTMLElement, canvasOptions);
    const considerationsImgData = considerationsCanvas.toDataURL('image/png');
    const considerationsAspectRatio = considerationsCanvas.width / considerationsCanvas.height;
    const considerationsWidth = pageWidth - 2 * margins;
    const considerationsHeight = considerationsWidth / considerationsAspectRatio;
    pdf.addImage(
      considerationsImgData,
      'PNG',
      margins,
      margins,
      considerationsWidth,
      considerationsHeight
    );
  }

  // Format filename with company, unit and month
  const filename = `Relatório_${company}_${unit}_${formattedMonth}.pdf`;
  pdf.save(filename);

  // Restore sidebar visibility after PDF generation
  if (sidebar) {
    (sidebar as HTMLElement).style.display = 'flex';
  }
  if (mobileSidebar) {
    (mobileSidebar as HTMLElement).style.display = 'block';
  }
};