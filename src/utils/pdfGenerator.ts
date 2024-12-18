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
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; text-align: center;">Relatório de Gestão de Energia</h1>
      <p style="margin: 10px 0;">Empresa: ${companyName}</p>
      <p style="margin: 10px 0;">Unidade Consumidora: ${unitName}</p>
      <p style="margin: 10px 0;">Mês de Referência: ${month}</p>
    </div>
  `;

  const opt = {
    margin: [15, 15], // Aumentando as margens para 15mm
    filename: `relatorio-${unitName}-${month}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 1.5, // Reduzindo a escala para melhor ajuste
      useCORS: true,
      logging: true,
      windowWidth: 1600, // Ajustando a largura da janela
      scrollY: -window.scrollY,
      onclone: function(doc) {
        // Ajustando o tamanho dos gráficos e tabelas
        const sections = doc.querySelectorAll('.card');
        sections.forEach(section => {
          section.style.pageBreakInside = 'avoid';
          section.style.marginBottom = '20px';
          section.style.maxWidth = '100%';
          section.style.width = '100%';
          
          // Ajustando altura dos gráficos
          const charts = section.querySelectorAll('.recharts-wrapper');
          charts.forEach(chart => {
            chart.style.maxHeight = '500px';
            chart.style.width = '100%';
          });

          // Ajustando tabelas
          const tables = section.querySelectorAll('table');
          tables.forEach(table => {
            table.style.width = '100%';
            table.style.maxWidth = '100%';
            table.style.fontSize = '12px';
          });
        });
      }
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'landscape',
      compress: true,
      hotfixes: ['px_scaling']
    }
  };

  try {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.insertAdjacentHTML('afterbegin', headerHtml);
    
    // Escondendo botões de edição antes de gerar o PDF
    const editButtons = clonedElement.querySelectorAll('[data-print-hide="true"]');
    editButtons.forEach(button => {
      (button as HTMLElement).style.display = 'none';
    });
    
    await html2pdf().set(opt).from(clonedElement).save();
    
    console.log('PDF gerado com sucesso');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};