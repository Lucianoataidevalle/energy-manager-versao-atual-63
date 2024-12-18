import html2pdf from 'html2pdf.js';

export const generatePDF = async (
  companyName: string,
  unitName: string,
  month: string
) => {
  // Wait for all charts to be rendered
  await new Promise(resolve => setTimeout(resolve, 1000));

  const element = document.getElementById('report-content');
  if (!element) return;

  const headerHtml = `
    <div style="margin-bottom: 20px; padding: 20px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; text-align: center;">Relatório de Gestão de Energia</h1>
      <p style="margin: 10px 0;">Empresa: ${companyName}</p>
      <p style="margin: 10px 0;">Unidade Consumidora: ${unitName}</p>
      <p style="margin: 10px 0;">Mês de Referência: ${month}</p>
    </div>
  `;

  const opt = {
    margin: [10, 10],
    filename: `relatorio-${unitName}-${month}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: true,
      windowWidth: 1920,
      scrollY: -window.scrollY
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'landscape',
      compress: true,
      hotfixes: ['px_scaling']
    },
    pagebreak: { mode: 'avoid-all' }
  };

  try {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.insertAdjacentHTML('afterbegin', headerHtml);

    // Style adjustments for PDF generation
    const style = document.createElement('style');
    style.textContent = `
      @page {
        size: A4 landscape;
        margin: 10mm;
      }
      
      /* Page 1: Summary Cards */
      .grid-cols-1:first-of-type {
        page-break-after: always;
        margin-bottom: 0;
      }
      .grid-cols-1:first-of-type .card {
        margin: 5px;
        padding: 10px;
      }

      /* Pages 2-8: Charts with Data and Comments */
      .chart-section {
        page-break-before: always;
        page-break-after: always;
        page-break-inside: avoid;
      }
      
      .chart-section .recharts-wrapper {
        width: 100% !important;
        height: 300px !important;
        margin-bottom: 20px;
      }
      
      .chart-section table {
        width: 100%;
        font-size: 11px;
        margin: 10px 0;
      }
      
      .chart-section .comment-box {
        margin-top: 10px;
        min-height: 100px;
      }

      /* Page 9: Final Considerations */
      .final-considerations {
        page-break-before: always;
        min-height: 400px;
        margin: 20px;
        padding: 20px;
      }

      /* Hide elements not meant for printing */
      [data-print-hide="true"] {
        display: none !important;
      }
    `;

    clonedElement.appendChild(style);

    // Add class for chart sections
    const chartSections = clonedElement.querySelectorAll('.card:not(.grid-cols-1 .card)');
    chartSections.forEach(section => {
      section.classList.add('chart-section');
    });

    // Add class for final considerations
    const finalConsiderations = clonedElement.querySelector('[data-chart-id="finalConsiderations"]');
    if (finalConsiderations) {
      finalConsiderations.classList.add('final-considerations');
    }

    await html2pdf().set(opt).from(clonedElement).save();
    
    console.log('PDF gerado com sucesso');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};