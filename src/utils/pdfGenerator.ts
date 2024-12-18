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
    margin: [15, 15],
    filename: `relatorio-${unitName}-${month}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 1.5,
      useCORS: true,
      logging: true,
      windowWidth: 1600,
      scrollY: -window.scrollY,
      onclone: function(doc) {
        // Ajustando o layout das páginas
        const summaryCards = doc.querySelector('.grid-cols-1');
        if (summaryCards) {
          summaryCards.style.pageBreakAfter = 'always';
        }

        // Configurando cada seção de gráfico
        const sections = doc.querySelectorAll('.card');
        sections.forEach((section, index) => {
          section.style.pageBreakInside = 'avoid';
          section.style.pageBreakBefore = index > 0 ? 'always' : 'auto';
          section.style.marginBottom = '20px';
          section.style.maxWidth = '100%';
          section.style.width = '100%';
          
          // Ajustando altura dos gráficos
          const charts = section.querySelectorAll('.recharts-wrapper');
          charts.forEach(chart => {
            chart.style.maxHeight = '400px';
            chart.style.width = '100%';
          });

          // Ajustando tabelas
          const tables = section.querySelectorAll('table');
          tables.forEach(table => {
            table.style.width = '100%';
            table.style.maxWidth = '100%';
            table.style.fontSize = '12px';
            table.style.marginTop = '20px';
          });

          // Ajustando comentários
          const comments = section.querySelectorAll('.comment-box');
          comments.forEach(comment => {
            comment.style.marginTop = '20px';
            comment.style.minHeight = '150px';
          });
        });

        // Configurando considerações finais
        const finalConsiderations = doc.querySelector('[data-chart-id="finalConsiderations"]');
        if (finalConsiderations) {
          finalConsiderations.style.pageBreakBefore = 'always';
          finalConsiderations.style.minHeight = '500px';
        }

        // Escondendo elementos que não devem ser impressos
        const hideElements = doc.querySelectorAll('[data-print-hide="true"]');
        hideElements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
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
    
    await html2pdf().set(opt).from(clonedElement).save();
    
    console.log('PDF gerado com sucesso');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};