import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CHART_QUALITY = 2; // Increase for higher quality (2 = 2x resolution)
const PAGE_WIDTH = 297; // A4 landscape in mm
const PAGE_HEIGHT = 210;
const MARGIN = 10;

export const generatePDF = async (
  companyName: string,
  unitName: string,
  month: string
) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Set up reusable styles
  const addHeader = (pageNum: number) => {
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Relatório de Gestão de Energia', PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text([
      `Empresa: ${companyName}`,
      `Unidade Consumidora: ${unitName}`,
      `Mês de Referência: ${month}`,
      `Data de Geração: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`
    ], MARGIN, MARGIN + 25);
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Página ${pageNum} de ${totalPages}`,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - MARGIN,
      { align: 'right' }
    );
  };

  try {
    // Get all sections that need to be rendered
    const sections = document.querySelectorAll('.chart-section, #report-content > .grid-cols-1:first-of-type');
    const totalPages = sections.length;
    let currentPage = 1;

    // Process each section
    for (const section of sections) {
      // Add header and footer
      if (currentPage > 1) {
        pdf.addPage();
      }
      addHeader(currentPage);
      addFooter(currentPage, totalPages);

      // Capture the section as high-quality canvas
      const canvas = await html2canvas(section as HTMLElement, {
        scale: CHART_QUALITY,
        useCORS: true,
        logging: false,
        windowWidth: 1920,
        onclone: (document, element) => {
          // Remove elements that shouldn't be in the PDF
          element.querySelectorAll('[data-print-hide="true"]').forEach(el => el.remove());
          
          // Apply print-specific styles
          element.style.backgroundColor = 'white';
          element.style.padding = '20px';
          element.style.margin = '0';
          
          // Ensure charts take full width
          const chartContainer = element.querySelector('.recharts-wrapper');
          if (chartContainer) {
            (chartContainer as HTMLElement).style.width = '100%';
            (chartContainer as HTMLElement).style.height = '45vh';
          }
        }
      });

      // Calculate dimensions to fit within margins while maintaining aspect ratio
      const contentWidth = PAGE_WIDTH - (2 * MARGIN);
      const contentHeight = PAGE_HEIGHT - (2 * MARGIN) - 40; // 40mm reserved for header/footer
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
      
      // Add the image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(
        imgData,
        'JPEG',
        MARGIN,
        MARGIN + 35, // Below header
        imgWidth * ratio,
        imgHeight * ratio
      );

      currentPage++;
    }

    // Save the PDF
    const fileName = `relatorio-${unitName}-${month}.pdf`;
    pdf.save(fileName);
    
    console.log('PDF gerado com sucesso');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};