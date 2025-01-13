import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const generatePDF = async (company: string, unit: string, month: string) => {
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
    // Restore sidebar visibility
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

  // Capture header only once for first page
  const header = document.querySelector('.report-header');
  let headerHeight = 0;
  if (header) {
    const headerCanvas = await html2canvas(header as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    });
    const headerImgData = headerCanvas.toDataURL('image/png');
    const headerAspectRatio = headerCanvas.width / headerCanvas.height;
    const headerWidth = pageWidth - 2 * margins;
    headerHeight = headerWidth / headerAspectRatio;
    pdf.addImage(headerImgData, 'PNG', margins, margins, headerWidth, headerHeight);
  }

  // Capture charts section
  const chartsSection = document.querySelector('#report-content');
  if (chartsSection) {
    const chartsCanvas = await html2canvas(chartsSection as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    });
    const chartsImgData = chartsCanvas.toDataURL('image/png');
    const chartsAspectRatio = chartsCanvas.width / chartsCanvas.height;
    const chartsWidth = pageWidth - 2 * margins;
    const chartsHeight = chartsWidth / chartsAspectRatio;

    // Add charts to new page
    pdf.addPage();
    pdf.addImage(chartsImgData, 'PNG', margins, margins, chartsWidth, chartsHeight);
  }

  // Capture final considerations
  const finalConsiderations = document.querySelector('.final-considerations');
  if (finalConsiderations) {
    const considerationsCanvas = await html2canvas(finalConsiderations as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    });
    const considerationsImgData = considerationsCanvas.toDataURL('image/png');
    const considerationsAspectRatio = considerationsCanvas.width / considerationsCanvas.height;
    const considerationsWidth = pageWidth - 2 * margins;
    const considerationsHeight = considerationsWidth / considerationsAspectRatio;

    // Add final considerations to new page
    pdf.addPage();
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
  const formattedMonth = format(new Date(month), 'MMMM yyyy', { locale: ptBR });
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