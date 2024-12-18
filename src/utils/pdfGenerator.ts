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
        // Página 1: Cards de resumo
        const summarySection = doc.querySelector('.grid-cols-1');
        if (summarySection) {
          summarySection.style.pageBreakAfter = 'always';
          summarySection.style.marginBottom = '0';
          const cards = summarySection.querySelectorAll('.card');
          cards.forEach(card => {
            (card as HTMLElement).style.margin = '5px';
            (card as HTMLElement).style.padding = '10px';
          });
        }

        // Configurando seções de gráficos (páginas 2-8)
        const chartSections = doc.querySelectorAll('.card:not(.grid-cols-1 .card)');
        chartSections.forEach((section, index) => {
          if (index > 0) { // Não aplica no primeiro card que é o resumo
            section.style.pageBreakBefore = 'always';
            section.style.pageBreakAfter = 'auto';
            section.style.pageBreakInside = 'avoid';
            
            // Ajustando altura e largura dos gráficos
            const chart = section.querySelector('.recharts-wrapper');
            if (chart) {
              chart.style.height = '300px';
              chart.style.width = '100%';
              chart.style.marginBottom = '20px';
            }

            // Ajustando tabelas
            const table = section.querySelector('table');
            if (table) {
              table.style.width = '100%';
              table.style.fontSize = '11px';
              table.style.marginTop = '10px';
              table.style.marginBottom = '10px';
            }

            // Ajustando caixa de comentários
            const commentBox = section.querySelector('.comment-box');
            if (commentBox) {
              commentBox.style.marginTop = '10px';
              commentBox.style.minHeight = '100px';
              commentBox.style.maxHeight = '150px';
            }
          }
        });

        // Página 9: Considerações Finais
        const finalConsiderations = doc.querySelector('[data-chart-id="finalConsiderations"]');
        if (finalConsiderations) {
          finalConsiderations.style.pageBreakBefore = 'always';
          finalConsiderations.style.minHeight = '400px';
          finalConsiderations.style.margin = '20px';
          finalConsiderations.style.padding = '20px';
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