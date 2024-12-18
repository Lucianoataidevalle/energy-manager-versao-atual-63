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
    <div style="margin-bottom: 20px; padding: 20px; border-bottom: 1px solid #ccc;">
      <h2 style="margin: 0;">Relatório de Energia</h2>
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
      logging: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.insertAdjacentHTML('afterbegin', headerHtml);
    
    await html2pdf().set(opt).from(clonedElement).save();
    
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};